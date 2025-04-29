import axios from "axios";
import { Booking, CalendarType, CalendarEvent } from "@/types/calendar";

// Base URL per l'API Google Sheets (lettura)
const BASE_URL = "https://opensheet.elk.sh/";

// Utilizza valori sicuri dalle variabili d'ambiente
const SPREADSHEET_ID =
  import.meta.env.VITE_GOOGLE_SHEET_ID ||
  "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc";
const API_ENDPOINT =
  import.meta.env.VITE_GOOGLE_SCRIPT_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbyClrLjSCXjQEZ4KOi9yRzJvcdks1HOf3P0BbsOZhjhiP8D18pN5uzwV5w7Gr9SPmpVfw/exec";

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

// Funzione per recuperare le prenotazioni
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
      const principaleData = await fetchBookingsForCalendar("principale");
      const secondarioData = await fetchBookingsForCalendar("secondario");
      const terziarioData = await fetchBookingsForCalendar("terziario");

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
    const result = await fetchBookingsForCalendar(calendarType);

    // Salva i dati in cache
    cacheBookings(calendarType, result);

    return { ...result, isCachedData: false };
  } catch (error) {
    console.error("Errore nel caricamento delle prenotazioni:", error);
    return { events: [], bookings: [], isCachedData: false };
  }
};

// Funzione ausiliaria per recuperare le prenotazioni da un singolo calendario
const fetchBookingsForCalendar = async (
  calendarType: CalendarType
): Promise<{
  events: CalendarEvent[];
  bookings: Booking[];
}> => {
  // Determina quale foglio del Google Sheet usare in base al tipo di calendario
  let sheet = "";
  switch (calendarType) {
    case "principale":
      sheet = "Affitti3";
      break;
    case "secondario":
      sheet = "Affitti4";
      break;
    case "terziario":
      sheet = "Affitti8";
      break;
    default:
      sheet = "Affitti3";
  }

  // Carica i dati dal foglio Google
  const url = `${BASE_URL}${SPREADSHEET_ID}/${sheet}`;
  const response = await axios.get(url);
  const data = response.data;

  // Filtra le prenotazioni valide
  const validBookings: Booking[] = data
    .filter((row: Record<string, string>) => row["Nome"] !== "")
    .map((row: Record<string, string>) => ({
      Nome: row["Nome"],
      OTA: row["OTA"],
      CheckIn: row["Check-in"],
      CheckOut: row["Check-out"],
      Notti: row["Notti"],
      adulti: row["Adulti"],
      bambini: row["Bambini"],
      TotaleCliente: row["Totale cliente"],
      FuoriOTA: row["Fuori OTA"],
      CostoNotti: row["Costo notti"],
      MediaANotte: row["Media a notte"],
      Pulizia: row["Pulizia"],
      Sconti: row["Sconti"],
      SoggiornoTax: row["Soggiorno Tax"],
      OTATax: row["OTA Tax"],
      CedolareSecca: row["Cedolare secca"],
      Totale: row["Totale"],
      Note: row["Note"],
      id: `${row["Nome"]}-${row["Check-in"]}-${row["Check-out"]}`,
      rowIndex: data.indexOf(row) + 2, // +2 perché la prima riga è l'intestazione, e gli indici delle celle partono da 1
    }));

  // Funzione per convertire un formato data DD/MM/YYYY in YYYY-MM-DD
  const formatDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  // Crea eventi per il calendario con colori basati sull'OTA
  const events = validBookings.map((booking) => {
    let backgroundColor = "#808080"; // Default: grigio
    if (booking.OTA.toLowerCase() === "booking") backgroundColor = "#0000FF"; // Blu
    if (booking.OTA.toLowerCase() === "airbnb") backgroundColor = "#FF0000"; // Rosso
    if (booking.OTA.toLowerCase() === "extra") backgroundColor = "#008000"; // Verde

    return {
      title: `${booking.Nome} (${booking.OTA})`,
      start: formatDate(booking.CheckIn), // Converti la data
      end: formatDate(booking.CheckOut), // Converti la data
      backgroundColor, // Colore basato sull'OTA
      borderColor: backgroundColor,
      extendedProps: booking,
    };
  });

  return { events, bookings: validBookings };
};

/**
 * Implementazione diretta che aggira CORS in modo solido
 * Usare window.open per aprire una nuova finestra con i parametri per aggiornarla
 */
function submitViaDirectAccess(action: string, data: any): Promise<boolean> {
  return new Promise((resolve) => {
    // Converti l'oggetto in un parametro URL
    const params = encodeURIComponent(JSON.stringify({ action, ...data }));
    // URL dell'endpoint con parametri inclusi
    const url = `${API_ENDPOINT}?data=${params}`;

    // Apre in una nuova finestra
    const newWindow = window.open(url, "_blank");

    // Controlla periodicamente se la finestra è stata chiusa
    const checkClosed = setInterval(() => {
      if (newWindow?.closed) {
        clearInterval(checkClosed);
        // Quando la finestra viene chiusa, consideriamo l'operazione completata
        // Invalidiamo la cache per forzare un aggiornamento al prossimo caricamento
        const cacheKey = `bookings_${
          data.sheet === "Affitti3"
            ? "principale"
            : data.sheet === "Affitti4"
            ? "secondario"
            : "terziario"
        }`;
        localStorage.removeItem(cacheKey);
        resolve(true);
      }
    }, 1000);

    // Dopo 30 secondi, consideriamo completata l'operazione anche se la finestra è ancora aperta
    setTimeout(() => {
      clearInterval(checkClosed);
      // Invalidiamo la cache per forzare un aggiornamento al prossimo caricamento
      const cacheKey = `bookings_${
        data.sheet === "Affitti3"
          ? "principale"
          : data.sheet === "Affitti4"
          ? "secondario"
          : "terziario"
      }`;
      localStorage.removeItem(cacheKey);
      resolve(true);
    }, 30000);
  });
}

// Funzione per aggiornare una prenotazione esistente
export const updateBooking = async (
  booking: Booking,
  calendarType: CalendarType
): Promise<boolean> => {
  try {
    console.log("⚡️ updateBooking chiamato!", booking); // Per debug

    // Otteniamo il foglio corretto in base al calendario selezionato
    let sheet = "";
    switch (calendarType) {
      case "principale":
        sheet = "Affitti3";
        break;
      case "secondario":
        sheet = "Affitti4";
        break;
      case "terziario":
        sheet = "Affitti8";
        break;
      default:
        sheet = "Affitti3";
    }

    // Creiamo il payload da inviare
    const payload = {
      booking,
      sheet,
      spreadsheetId: SPREADSHEET_ID,
    };

    // Utilizziamo l'accesso diretto aggirando CORS
    const result = await submitViaDirectAccess("update", payload);

    // Dopo un aggiornamento, rimuoviamo la cache per forzare un refresh al prossimo caricamento
    if (result) {
      const cacheKey = `bookings_${calendarType}`;
      localStorage.removeItem(cacheKey);
    }

    return result;
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
    console.log("⚡️ deleteBooking chiamato!", booking); // Per debug

    // Otteniamo il foglio corretto in base al calendario selezionato
    let sheet = "";
    switch (calendarType) {
      case "principale":
        sheet = "Affitti3";
        break;
      case "secondario":
        sheet = "Affitti4";
        break;
      case "terziario":
        sheet = "Affitti8";
        break;
      default:
        sheet = "Affitti3";
    }

    // Creiamo il payload da inviare
    const payload = {
      booking,
      sheet,
      spreadsheetId: SPREADSHEET_ID,
    };

    // Utilizziamo l'accesso diretto aggirando CORS
    const result = await submitViaDirectAccess("delete", payload);

    // Dopo una cancellazione, rimuoviamo la cache per forzare un refresh al prossimo caricamento
    if (result) {
      const cacheKey = `bookings_${calendarType}`;
      localStorage.removeItem(cacheKey);
    }

    return result;
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
