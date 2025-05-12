import PocketBase from "pocketbase";
import { Booking, CalendarType, CalendarEvent } from "@/types/calendar";

// Cliente PocketBase per connessione al database
export const pb = new PocketBase("http://127.0.0.1:8090");

// Tempo di scadenza della cache (in millisecondi)
const CACHE_EXPIRATION = 1000 * 60 * 60 * 6; // 6 ore

// Funzione per salvare le prenotazioni nella cache locale
const cacheBookings = (
  calendarType: CalendarType,
  data: { events: CalendarEvent[]; bookings: Booking[] }
) => {
  const cacheKey = `bookings_${calendarType}`;
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
  const cacheKey = `bookings_${calendarType}`;
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

// Mappa i tipi di appartamento con le collections in PocketBase
const getCollectionForCalendarType = (calendarType: CalendarType): string => {
  switch (calendarType) {
    case "principale":
      return "bookings_principale";
    case "secondario":
      return "bookings_secondario";
    case "terziario":
      return "bookings_terziario";
    default:
      return "bookings_principale";
  }
};

// Funzione per recuperare le prenotazioni da PocketBase
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

    // Se è stata selezionata la vista "all", recupera le prenotazioni da tutti gli appartamenti
    if (calendarType === "all") {
      const principaleData = await fetchBookingsFromPocketBase("principale");
      const secondarioData = await fetchBookingsFromPocketBase("secondario");
      const terziarioData = await fetchBookingsFromPocketBase("terziario");

      // Aggiungi l'identificativo dell'appartamento a ciascuna prenotazione e evento
      const allBookings = [
        ...principaleData.bookings.map((booking) => ({
          ...booking,
          apartment: "principale",
        })),
        ...secondarioData.bookings.map((booking) => ({
          ...booking,
          apartment: "secondario",
        })),
        ...terziarioData.bookings.map((booking) => ({
          ...booking,
          apartment: "terziario",
        })),
      ];

      // Modifica i colori degli eventi in base all'appartamento
      const allEvents = [
        ...principaleData.events.map((event) => ({
          ...event,
          backgroundColor: "#3498db", // Blu per l'appartamento principale
          borderColor: "#3498db",
          extendedProps: {
            ...event.extendedProps,
            apartment: "principale",
          },
        })),
        ...secondarioData.events.map((event) => ({
          ...event,
          backgroundColor: "#e74c3c", // Rosso per l'appartamento secondario
          borderColor: "#e74c3c",
          extendedProps: {
            ...event.extendedProps,
            apartment: "secondario",
          },
        })),
        ...terziarioData.events.map((event) => ({
          ...event,
          backgroundColor: "#2ecc71", // Verde per l'appartamento terziario
          borderColor: "#2ecc71",
          extendedProps: {
            ...event.extendedProps,
            apartment: "terziario",
          },
        })),
      ];

      const result = { events: allEvents, bookings: allBookings };

      // Salva i dati in cache
      cacheBookings(calendarType, result);

      return { ...result, isCachedData: false };
    }

    // Altrimenti, recupera le prenotazioni solo per il calendario selezionato
    const result = await fetchBookingsFromPocketBase(calendarType);

    // Salva i dati in cache
    cacheBookings(calendarType, result);

    return { ...result, isCachedData: false };
  } catch (error) {
    console.error("Errore nel caricamento delle prenotazioni:", error);
    return { events: [], bookings: [], isCachedData: false };
  }
};

// Funzione ausiliaria per recuperare le prenotazioni da PocketBase
const fetchBookingsFromPocketBase = async (
  calendarType: CalendarType
): Promise<{
  events: CalendarEvent[];
  bookings: Booking[];
}> => {
  // Determina quale collezione di PocketBase usare in base al tipo di calendario
  const collection = getCollectionForCalendarType(calendarType);

  try {
    // Recupera i dati da PocketBase
    const records = await pb.collection(collection).getFullList({
      sort: "CheckIn",
    });

    // Formatta i dati come Booking
    const validBookings: Booking[] = records.map((record) => {
      return {
        id: record.id,
        Nome: record.Nome || "",
        OTA: record.OTA || "",
        CheckIn: record.CheckIn || "",
        CheckOut: record.CheckOut || "",
        Notti: record.Notti || "",
        adulti: record.adulti || "1",
        bambini: record.bambini || "0",
        animali: record.animali || "",
        TotaleCliente: record.TotaleCliente || "",
        FuoriOTA: record.FuoriOTA || "",
        CostoNotti: record.CostoNotti || "",
        MediaANotte: record.MediaANotte || "",
        Pulizia: record.Pulizia || "",
        Sconti: record.Sconti || "",
        SoggiornoTax: record.SoggiornoTax || "",
        OTATax: record.OTATax || "",
        CedolareSecca: record.CedolareSecca || "",
        Totale: record.Totale || "",
        Note: record.Note || "",
        rowIndex: 0, // non necessario con PocketBase
      };
    });

    // Converti le prenotazioni in eventi per il calendario
    const events = validBookings
      .filter((booking) => booking.CheckIn && booking.CheckOut)
      .map((booking) => {
        let backgroundColor = "#808080"; // Default: grigio
        const otaLower = booking.OTA.toLowerCase();

        if (otaLower.includes("booking")) backgroundColor = "#0000FF"; // Blu
        if (otaLower.includes("airbnb")) backgroundColor = "#FF0000"; // Rosso
        if (otaLower.includes("extra")) backgroundColor = "#008000"; // Verde

        return {
          title: `${booking.Nome} (${booking.OTA})`,
          start: formatISODate(booking.CheckIn),
          end: formatISODate(booking.CheckOut),
          backgroundColor,
          borderColor: backgroundColor,
          extendedProps: booking,
        };
      });

    return { events, bookings: validBookings };
  } catch (error) {
    console.error(
      `Errore nel recupero delle prenotazioni da PocketBase (${calendarType}):`,
      error
    );
    return { events: [], bookings: [] };
  }
};

// Funzione per convertire una data in formato DD/MM/YYYY al formato ISO standard YYYY-MM-DD
const formatISODate = (date: string): string => {
  if (!date || date.trim() === "") return "";

  // Se la data è già in formato ISO (YYYY-MM-DD), la restituisce come è
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  // Gestisce formati come DD/MM/YYYY o DD-MM-YYYY
  let parts;
  if (date.includes("/")) {
    parts = date.split("/");
  } else if (date.includes("-")) {
    parts = date.split("-");
  } else {
    console.warn("Formato data non riconosciuto:", date);
    return "";
  }

  if (parts && parts.length === 3) {
    // Controlla se il primo segmento è l'anno (ha 4 cifre)
    if (parts[0].length === 4) {
      return date; // È già nel formato corretto
    } else {
      // Converte da DD/MM/YYYY a YYYY-MM-DD
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
        2,
        "0"
      )}`;
    }
  }

  console.warn("Formato data non riconosciuto:", date);
  return "";
};

// Funzione per aggiornare una prenotazione esistente
export const updateBooking = async (
  booking: Booking,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    const collection = getCollectionForCalendarType(calendarType);

    // Prepara i dati da aggiornare
    const data = {
      Nome: booking.Nome,
      OTA: booking.OTA,
      CheckIn: booking.CheckIn,
      CheckOut: booking.CheckOut,
      Notti: booking.Notti,
      adulti: booking.adulti,
      bambini: booking.bambini,
      animali: booking.animali,
      TotaleCliente: booking.TotaleCliente,
      FuoriOTA: booking.FuoriOTA,
      CostoNotti: booking.CostoNotti,
      MediaANotte: booking.MediaANotte,
      Pulizia: booking.Pulizia,
      Sconti: booking.Sconti,
      SoggiornoTax: booking.SoggiornoTax,
      OTATax: booking.OTATax,
      CedolareSecca: booking.CedolareSecca,
      Totale: booking.Totale,
      Note: booking.Note,
    };

    // Aggiorna il record in PocketBase
    await pb.collection(collection).update(booking.id, data);

    // Invalida la cache per forzare un aggiornamento al prossimo caricamento
    const cacheKey = `bookings_${calendarType}`;
    localStorage.removeItem(cacheKey);

    return true;
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
    const collection = getCollectionForCalendarType(calendarType);

    // Elimina il record da PocketBase
    await pb.collection(collection).delete(booking.id);

    // Invalida la cache per forzare un aggiornamento al prossimo caricamento
    const cacheKey = `bookings_${calendarType}`;
    localStorage.removeItem(cacheKey);

    return true;
  } catch (error) {
    console.error("Errore durante la cancellazione della prenotazione:", error);
    return false;
  }
};

// Funzione per creare una nuova prenotazione
export const createBooking = async (
  booking: Omit<Booking, "id" | "rowIndex">,
  calendarType: CalendarType
): Promise<string | null> => {
  try {
    const collection = getCollectionForCalendarType(calendarType);

    // Crea il record in PocketBase
    const record = await pb.collection(collection).create(booking);

    // Invalida la cache per forzare un aggiornamento al prossimo caricamento
    const cacheKey = `bookings_${calendarType}`;
    localStorage.removeItem(cacheKey);

    return record.id;
  } catch (error) {
    console.error("Errore durante la creazione della prenotazione:", error);
    return null;
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

// Funzione per eseguire il login in PocketBase (utile per l'amministratore)
export const loginAdmin = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    await pb.admins.authWithPassword(email, password);
    return pb.authStore.isValid;
  } catch (error) {
    console.error("Errore durante il login:", error);
    return false;
  }
};

// Funzione per verificare se l'utente è autenticato
export const isAuthenticated = (): boolean => {
  return pb.authStore.isValid;
};

// Funzione per effettuare il logout
export const logout = (): void => {
  pb.authStore.clear();
};

// Funzione per inizializzare PocketBase e verificare la connessione
export const initPocketBase = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${pb.baseUrl}/api/health`);
    const data = await response.json();
    return data.code === 200;
  } catch (error) {
    console.error("Errore durante l'inizializzazione di PocketBase:", error);
    return false;
  }
};

// Funzione per gestire gli errori di PocketBase
export const handlePocketBaseError = (error: any): string => {
  console.error("Errore PocketBase:", error);

  if (error.status === 0) {
    return "Impossibile connettersi al server. Verifica che PocketBase sia in esecuzione.";
  }

  if (error.status === 401) {
    return "Sessione scaduta o non autorizzata. Effettua nuovamente l'accesso.";
  }

  if (error.data?.message) {
    return `Errore: ${error.data.message}`;
  }

  return "Si è verificato un errore imprevisto. Riprova più tardi.";
};

// Verifica se PocketBase è disponibile
export const isPocketBaseAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${pb.baseUrl}/api/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Timeout di 5 secondi
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.error("PocketBase non disponibile:", error);
    return false;
  }
};

// Funzione per verificare se una collezione esiste
export const collectionExists = async (
  collectionName: string
): Promise<boolean> => {
  try {
    await pb.collections.getOne(collectionName);
    return true;
  } catch (error) {
    return false;
  }
};
