import { Booking, CalendarType, CalendarEvent } from "@/types/calendar";
import { localStorageService } from "./localStorageService";
import { notificationService } from "./notificationService";

/**
 * Emette un evento personalizzato per notificare l'aggiornamento delle prenotazioni
 */
const notifyBookingsUpdate = () => {
  window.dispatchEvent(new CustomEvent("bookingsUpdated"));
};

/**
 * Servizio per la gestione delle prenotazioni utilizzando lo store locale
 * Sostituisce il bookingService basato su Google Sheets
 */

// Interfaccia per i dati di creazione prenotazione
export interface CreateBookingData {
  Nome: string;
  OTA: string;
  CheckIn: string;
  CheckOut: string;
  Notti: string;
  adulti: string;
  bambini: string;
  animali: string;
  // Nuovi campi per importi dettagliati
  TotalePagatoOspite?: string;
  CostoPulizia?: string;
  ScontiApplicati?: string;
  Supplementi?: string;
  CommissioneOTA?: string;
  TassaSoggiorno?: string;
  CedolareSecca?: string;
  TotaleNetto?: string;
  // Campi legacy (mantenuti per compatibilità)
  TotaleCliente: string;
  FuoriOTA: string;
  CostoNotti: string;
  MediaANotte: string;
  Pulizia: string;
  Sconti: string;
  SoggiornoTax: string;
  OTATax: string;
  Totale: string;
  Note?: string;
  apartment: string; // ID dell'appartamento
}

/**
 * Recupera le prenotazioni per un tipo di calendario
 */
export const fetchBookings = async (
  calendarType: CalendarType,
  forceRefresh = false
): Promise<{
  events: CalendarEvent[];
  bookings: Booking[];
  isCachedData: boolean;
}> => {
  try {
    // Con lo store locale non abbiamo bisogno di cache/refresh
    // I dati sono sempre aggiornati e disponibili immediatamente

    let bookings: Booking[];

    if (calendarType === "all") {
      // Recupera tutte le prenotazioni
      bookings = localStorageService.getBookings();
    } else {
      // Recupera prenotazioni per un appartamento specifico
      bookings = localStorageService.getBookingsByCalendarType(calendarType);
    }

    // Converte le prenotazioni in eventi per il calendario
    const events = createCalendarEvents(bookings, calendarType);

    return {
      events,
      bookings,
      isCachedData: false, // I dati sono sempre "freschi" con lo store locale
    };
  } catch (error) {
    console.error("Errore nel recupero delle prenotazioni:", error);
    return {
      events: [],
      bookings: [],
      isCachedData: false,
    };
  }
};

/**
 * Crea eventi per FullCalendar dalle prenotazioni
 */
const createCalendarEvents = (
  bookings: Booking[],
  calendarType: CalendarType
): CalendarEvent[] => {
  return bookings
    .filter((booking) => booking.CheckIn && booking.CheckOut)
    .map((booking) => {
      // Determina il colore in base all'OTA per default
      let backgroundColor = "#808080"; // Default: grigio
      const otaLower = booking.OTA.toLowerCase();

      if (otaLower.includes("booking")) backgroundColor = "#0000FF"; // Blu
      if (otaLower.includes("airbnb")) backgroundColor = "#B22222"; // Rosso scuro
      if (otaLower.includes("extra")) backgroundColor = "#008000"; // Verde

      // Se stiamo visualizzando tutti gli appartamenti, usa i colori degli appartamenti
      if (calendarType === "all" && booking.apartment) {
        const apartment = localStorageService.getApartmentById(
          booking.apartment
        );
        if (apartment && apartment.color) {
          backgroundColor = apartment.color;
        }
      }

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

/**
 * Formatta una data dal formato DD/MM/YYYY a YYYY-MM-DD
 */
const formatDate = (date: string): string => {
  if (!date) return "";

  // Se la data è già nel formato YYYY-MM-DD, restituiscila così com'è
  if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date;
  }

  // Se la data è nel formato DD/MM/YYYY, convertila
  if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    const [day, month, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  console.warn("Formato data non riconosciuto:", date);
  return "";
};

/**
 * Aggiunge un giorno a una data in formato YYYY-MM-DD
 */
const addOneDay = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
};

/**
 * Crea una nuova prenotazione
 */
export const createBooking = async (
  bookingData: CreateBookingData
): Promise<Booking> => {
  try {
    // Validazione dati
    validateBookingData(bookingData);

    // Verifica che l'appartamento esista
    const apartment = localStorageService.getApartmentById(
      bookingData.apartment
    );
    if (!apartment) {
      throw new Error("Appartamento non trovato");
    }

    // Verifica sovrapposizioni di date
    const existingBookings = localStorageService.getBookingsByApartment(
      bookingData.apartment
    );
    if (hasDateOverlap(bookingData, existingBookings)) {
      throw new Error(
        "Le date selezionate si sovrappongono con una prenotazione esistente"
      );
    }

    const newBooking = localStorageService.addBooking(bookingData);

    // Schedule notifications for check-in/check-out
    const apartmentName =
      localStorageService.getApartmentById(bookingData.apartment)?.name ||
      "Appartamento";
    notificationService.scheduleBookingNotifications(newBooking, apartmentName);

    // Notifica l'aggiornamento
    notifyBookingsUpdate();

    return newBooking;
  } catch (error) {
    console.error("Errore nella creazione della prenotazione:", error);
    throw error;
  }
};

/**
 * Aggiorna una prenotazione esistente
 */
export const updateBooking = async (
  booking: Booking,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    if (!booking.id) {
      throw new Error("ID prenotazione mancante");
    }

    // Validazione dati
    validateBookingData(booking);

    // Se l'appartamento è cambiato, verifica che il nuovo appartamento esista
    if (booking.apartment) {
      const apartment = localStorageService.getApartmentById(booking.apartment);
      if (!apartment) {
        throw new Error("Appartamento non trovato");
      }
    }

    // Verifica sovrapposizioni di date (escludendo la prenotazione corrente)
    const apartmentId = booking.apartment || APARTMENT_MAPPING[calendarType];
    const existingBookings = localStorageService
      .getBookingsByApartment(apartmentId)
      .filter((b) => b.id !== booking.id);

    if (hasDateOverlap(booking, existingBookings)) {
      throw new Error(
        "Le date selezionate si sovrappongono con una prenotazione esistente"
      );
    }

    const success = localStorageService.updateBooking(booking.id, booking);

    if (success) {
      // Cancel old notifications and schedule new ones
      notificationService.cancelBookingNotifications(booking.id);
      const apartmentName =
        localStorageService.getApartmentById(booking.apartment || "")?.name ||
        "Appartamento";
      notificationService.scheduleBookingNotifications(booking, apartmentName);

      // Notifica l'aggiornamento
      notifyBookingsUpdate();
    }

    return success;
  } catch (error) {
    console.error("Errore nell'aggiornamento della prenotazione:", error);
    throw error;
  }
};

/**
 * Elimina una prenotazione
 */
export const deleteBooking = async (
  booking: Booking,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    if (!booking.id) {
      throw new Error("ID prenotazione mancante");
    }

    const success = localStorageService.deleteBooking(booking.id);

    if (success) {
      // Cancel notifications for deleted booking
      notificationService.cancelBookingNotifications(booking.id);

      // Notifica l'aggiornamento
      notifyBookingsUpdate();
    }

    return success;
  } catch (error) {
    console.error("Errore nell'eliminazione della prenotazione:", error);
    throw error;
  }
};

/**
 * Valida i dati di una prenotazione
 */
const validateBookingData = (booking: Partial<Booking>): void => {
  if (!booking.Nome?.trim()) {
    throw new Error("Il nome del cliente è obbligatorio");
  }

  if (!booking.CheckIn) {
    throw new Error("La data di check-in è obbligatoria");
  }

  if (!booking.CheckOut) {
    throw new Error("La data di check-out è obbligatoria");
  }

  // Verifica che check-out sia dopo check-in
  const checkIn = new Date(formatDate(booking.CheckIn));
  const checkOut = new Date(formatDate(booking.CheckOut));

  if (checkOut <= checkIn) {
    throw new Error("La data di check-out deve essere successiva al check-in");
  }
};

/**
 * Verifica se ci sono sovrapposizioni di date con prenotazioni esistenti
 */
const hasDateOverlap = (
  newBooking: Partial<Booking>,
  existingBookings: Booking[]
): boolean => {
  const newCheckIn = new Date(formatDate(newBooking.CheckIn!));
  const newCheckOut = new Date(formatDate(newBooking.CheckOut!));

  return existingBookings.some((booking) => {
    const existingCheckIn = new Date(formatDate(booking.CheckIn));
    const existingCheckOut = new Date(formatDate(booking.CheckOut));

    // Verifica sovrapposizione: nuova prenotazione inizia prima che finisca quella esistente
    // E nuova prenotazione finisce dopo che inizia quella esistente
    return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;
  });
};

/**
 * Recupera prenotazioni per un periodo specifico
 */
export const getBookingsByDateRange = (
  calendarType: CalendarType,
  startDate: string,
  endDate: string
): Booking[] => {
  const bookings =
    calendarType === "all"
      ? localStorageService.getBookings()
      : localStorageService.getBookingsByCalendarType(calendarType);

  const start = new Date(startDate);
  const end = new Date(endDate);

  return bookings.filter((booking) => {
    const checkIn = new Date(formatDate(booking.CheckIn));
    const checkOut = new Date(formatDate(booking.CheckOut));

    // Include prenotazioni che si sovrappongono al periodo richiesto
    return checkIn <= end && checkOut >= start;
  });
};

/**
 * Cerca prenotazioni per nome cliente
 */
export const searchBookingsByName = (
  query: string,
  calendarType?: CalendarType
): Booking[] => {
  const bookings =
    calendarType && calendarType !== "all"
      ? localStorageService.getBookingsByCalendarType(calendarType)
      : localStorageService.getBookings();

  if (!query.trim()) return bookings;

  const searchTerm = query.toLowerCase().trim();
  return bookings.filter(
    (booking) =>
      booking.Nome.toLowerCase().includes(searchTerm) ||
      (booking.Note && booking.Note.toLowerCase().includes(searchTerm))
  );
};
