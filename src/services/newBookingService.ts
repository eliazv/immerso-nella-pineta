import { Booking, CalendarEvent, CalendarType } from "@/types/calendar";
import { 
  getBookingsByApartment, 
  createBooking as createBookingInDB, 
  updateBooking as updateBookingInDB, 
  deleteBooking as deleteBookingInDB 
} from "@/services/tursoService";

// Tempo di scadenza della cache (in millisecondi)
const CACHE_EXPIRATION = 1000 * 60 * 60 * 1; // 1 ora (più frequente di Google Sheets)

// Funzione per salvare le prenotazioni nella cache locale
const cacheBookings = (
  calendarType: CalendarType,
  data: { events: CalendarEvent[]; bookings: Booking[] }
) => {
  const cacheKey = `turso_bookings_${calendarType}`;
  const cachedData = {
    timestamp: new Date().getTime(),
    data: data,
  };
  localStorage.setItem(cacheKey, JSON.stringify(cachedData));
};

// Funzione per recuperare le prenotazioni dalla cache locale
const getCachedBookings = (
  calendarType: CalendarType
): { events: CalendarEvent[]; bookings: Booking[] } | null => {
  const cacheKey = `turso_bookings_${calendarType}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  const now = new Date().getTime();

  // Verifica se la cache è scaduta
  if (now - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(cacheKey);
    return null;
  }

  return data;
};

// Funzione per convertire le prenotazioni in eventi calendario
const bookingsToEvents = (bookings: Booking[]): CalendarEvent[] => {
  return bookings
    .filter((booking) => booking.CheckIn && booking.CheckOut)
    .map((booking) => {
      let backgroundColor = "#808080"; // Default: grigio
      const otaLower = booking.OTA.toLowerCase();

      if (otaLower.includes("booking")) backgroundColor = "#0000FF"; // Blu
      if (otaLower.includes("airbnb")) backgroundColor = "#B22222"; // Rosso scuro
      if (otaLower.includes("extra")) backgroundColor = "#008000"; // Verde

      return {
        title: booking.Nome,
        start: formatDate(booking.CheckIn),
        end: addOneDay(formatDate(booking.CheckOut)),
        backgroundColor,
        borderColor: backgroundColor,
        extendedProps: booking,
      };
    });
};

// Funzione per convertire un formato data DD/MM/YYYY in YYYY-MM-DD
const formatDate = (date: string) => {
  if (!date || date.trim() === "") return "";

  if (date.includes("/")) {
    const parts = date.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
        2,
        "0"
      )}`;
    }
  } else if (date.includes("-")) {
    const parts = date.split("-");
    if (parts.length === 3 && parts[0].length === 4) {
      return date;
    } else if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
        2,
        "0"
      )}`;
    }
  }

  console.warn("Formato data non riconosciuto:", date);
  return "";
};

// Funzione per aggiungere un giorno a una data in formato YYYY-MM-DD
const addOneDay = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
};

// Funzione principale per recuperare le prenotazioni
export const fetchBookings = async (
  calendarType: CalendarType,
  forceRefresh = false
): Promise<{
  events: CalendarEvent[];
  bookings: Booking[];
  isCachedData: boolean;
}> => {
  try {
    // Se non è richiesto un refresh, controlla se esiste una versione in cache
    if (!forceRefresh) {
      const cachedData = getCachedBookings(calendarType);
      if (cachedData) {
        return { ...cachedData, isCachedData: true };
      }
    }

    // Ottieni le prenotazioni dal database
    const bookings = await getBookingsByApartment(calendarType);

    // Se è stata selezionata la vista "all", gestisci i colori per appartamento
    let processedBookings = bookings;
    let events: CalendarEvent[];

    if (calendarType === "all") {
      // Aggiungi colori diversi per appartamento
      events = bookings.map((booking) => {
        const baseEvent = bookingsToEvents([booking])[0];
        if (!baseEvent) return null;

        let backgroundColor = "#808080";
        let borderColor = "#808080";

        // Colori per appartamento
        switch (booking.apartment) {
          case "principale":
            backgroundColor = "#3498db"; // Blu
            borderColor = "#3498db";
            break;
          case "secondario":
            backgroundColor = "#e74c3c"; // Rosso
            borderColor = "#e74c3c";
            break;
          case "terziario":
            backgroundColor = "#2ecc71"; // Verde
            borderColor = "#2ecc71";
            break;
        }

        return {
          ...baseEvent,
          backgroundColor,
          borderColor,
          extendedProps: {
            ...baseEvent.extendedProps,
            apartment: booking.apartment,
          },
        };
      }).filter(Boolean) as CalendarEvent[];
    } else {
      events = bookingsToEvents(bookings);
    }

    const result = { events, bookings: processedBookings };

    // Salva i dati in cache
    cacheBookings(calendarType, result);

    return { ...result, isCachedData: false };
  } catch (error) {
    console.error("Errore nel caricamento delle prenotazioni da Turso:", error);
    return { events: [], bookings: [], isCachedData: false };
  }
};

// Funzione per aggiungere una nuova prenotazione
export const addBooking = async (
  booking: Partial<Booking>,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    const success = await createBookingInDB(booking, calendarType);
    
    if (success) {
      // Invalida la cache per forzare un refresh al prossimo caricamento
      const cacheKey = `turso_bookings_${calendarType}`;
      localStorage.removeItem(cacheKey);
      // Invalida anche la cache "all" se necessario
      if (calendarType !== "all") {
        localStorage.removeItem("turso_bookings_all");
      }
    }

    return success;
  } catch (error) {
    console.error("Errore durante l'aggiunta della prenotazione:", error);
    return false;
  }
};

// Funzione per aggiornare una prenotazione esistente
export const updateBooking = async (
  booking: Booking,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    const success = await updateBookingInDB(booking, calendarType);

    if (success) {
      // Invalida la cache
      const cacheKey = `turso_bookings_${calendarType}`;
      localStorage.removeItem(cacheKey);
      if (calendarType !== "all") {
        localStorage.removeItem("turso_bookings_all");
      }
    }

    return success;
  } catch (error) {
    console.error("Errore durante l'aggiornamento della prenotazione:", error);
    return false;
  }
};

// Funzione per cancellare una prenotazione
export const deleteBooking = async (
  booking: Booking,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    const success = await deleteBookingInDB(booking);

    if (success) {
      // Invalida la cache
      const cacheKey = `turso_bookings_${calendarType}`;
      localStorage.removeItem(cacheKey);
      if (calendarType !== "all") {
        localStorage.removeItem("turso_bookings_all");
      }
    }

    return success;
  } catch (error) {
    console.error("Errore durante la cancellazione della prenotazione:", error);
    return false;
  }
};

// Funzione per forzare un refresh della cache
export const refreshBookingsCache = async (
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    await fetchBookings(calendarType, true);
    return true;
  } catch (error) {
    console.error("Errore durante l'aggiornamento forzato della cache:", error);
    return false;
  }
};