import axios from "axios";
import { Booking, CalendarType, CalendarEvent } from "@/types/calendar";

// Base URL per l'API Google Sheets (lettura)
const BASE_URL = "https://opensheet.elk.sh/";

// Utilizza valori sicuri dalle variabili d'ambiente
const SPREADSHEET_ID =
  import.meta.env.VITE_GOOGLE_SHEET_ID ||
  "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc";
const API_END            // Deduce il numero di adulti sottraendo i bambini
            // (se ci sono bambini e il totale è maggiore)
            mappedBooking.adulti = (Math.max(1, ospiti - bambini)).toString();
          }
        } else {
          // Se proprio non trova nulla, imposta a 1 adulto come minimo
          mappedBooking.adulti = "1";
        }mport.meta.env.VITE_GOOGLE_SCRIPT_ENDPOINT ||
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
  const data = response.data;  // Logging per debug delle intestazioni
  if (data && data.length > 0) {
    // Intestazioni e valori del foglio Excel
  }

  // Funzione helper per trovare valori nel foglio con case insensitive e varianti dei nomi
  const findFieldValue = (
    row: Record<string, string>,
    fieldNames: string[]
  ): string => {
    // Prima prova a cercare esattamente i nomi forniti
    for (const fieldName of fieldNames) {
      if (row[fieldName] !== undefined) {
        return row[fieldName] || "";
      }
    }

    // Se non trova, prova a cercare con case insensitive
    const allKeys = Object.keys(row);
    for (const fieldName of fieldNames) {
      const lowerFieldName = fieldName.toLowerCase();
      const matchingKey = allKeys.find(
        (key) => key.toLowerCase() === lowerFieldName
      );
      if (matchingKey) {
        return row[matchingKey] || "";
      }
    }

    // Se ancora non trova, prova a cercare chiavi che contengono il testo cercato
    for (const fieldName of fieldNames) {
      const lowerFieldName = fieldName.toLowerCase();
      const matchingKey = allKeys.find((key) =>
        key.toLowerCase().includes(lowerFieldName)
      );
      if (matchingKey) {
        return row[matchingKey] || "";
      }
    }

    return ""; // Se non trova nulla, ritorna stringa vuota
  };

  // Filtra le prenotazioni valide
  const validBookings: Booking[] = data
    .filter((row: Record<string, string>) => {
      // Verifichiamo che ci sia almeno un nome o un identificativo di prenotazione
      return (
        findFieldValue(row, [
          "Nome",
          "nome",
          "Name",
          "name",
          "Cliente",
          "cliente",
        ]) !== ""
      );
    })
    .map((row: Record<string, string>) => {
      // Verifica e normalizza tutti i campi per assicurarsi che non siano undefined
      const mappedBooking = {
        Nome: findFieldValue(row, [
          "Nome",
          "nome",
          "Name",
          "name",
          "Cliente",
          "cliente",
        ]),
        OTA: findFieldValue(row, ["OTA", "ota", "Canale", "canale", "Channel"]),
        CheckIn: findFieldValue(row, [
          "Check-in",
          "check-in",
          "CheckIn",
          "checkin",
          "Arrivo",
          "arrivo",
          "Data arrivo",
        ]),
        CheckOut: findFieldValue(row, [
          "Check-out",
          "check-out",
          "CheckOut",
          "checkout",
          "Partenza",
          "partenza",
          "Data partenza",
        ]),
        Notti: findFieldValue(row, [
          "Notti",
          "notti",
          "Nights",
          "nights",
          "Durata",
          "durata",
        ]),
        adulti: findFieldValue(row, [
          "Adulti",
          "adulti",
          "Adults",
          "adults",
          "Ospiti adulti",
          "Adult",
          "adult",
          "Persone",
          "persone",
          "Num Adulti",
          "num adulti",
          "Numero Adulti",
          "numero adulti",
          "N° Adulti",
          "n° adulti",
          "Ospiti Adulti",
          "Adulto",
          "adulto",
          "Num. Adulti",
        ]),
        bambini: findFieldValue(row, [
          "Bambini",
          "bambini",
          "Children",
          "children",
          "Ospiti bambini",
        ]),
        animali: findFieldValue(row, [
          "Animali",
          "animali",
          "Pets",
          "pets",
          "Animali domestici",
        ]),
        TotaleCliente: findFieldValue(row, [
          "Totale cliente",
          "totale cliente",
          "Total",
          "total",
          "Importo",
        ]),
        FuoriOTA: findFieldValue(row, ["Fuori OTA", "fuori ota", "Extra OTA"]),
        CostoNotti: findFieldValue(row, [
          "Costo notti",
          "costo notti",
          "Room cost",
        ]),
        MediaANotte: findFieldValue(row, [
          "Media a notte",
          "media a notte",
          "Average",
        ]),
        Pulizia: findFieldValue(row, [
          "Pulizia",
          "pulizia",
          "Cleaning",
          "cleaning",
        ]),
        Sconti: findFieldValue(row, [
          "Sconti",
          "sconti",
          "Discount",
          "discount",
        ]),
        SoggiornoTax: findFieldValue(row, [
          "Soggiorno Tax",
          "soggiorno tax",
          "City Tax",
          "city tax",
          "Tassa di soggiorno",
        ]),
        OTATax: findFieldValue(row, ["OTA Tax", "ota tax", "Service Fee"]),
        CedolareSecca: findFieldValue(row, [
          "Cedolare secca",
          "Cedolare Secca (21%)",
          "cedolare",
          "Tassa",
          "tassa",
        ]),
        Totale: findFieldValue(row, [
          "Totale",
          "totale",
          "Total Income",
          "Income",
        ]),
        Note: findFieldValue(row, [
          "Note",
          "note",
          "Notes",
          "notes",
          "Commenti",
          "commenti",
        ]),
        id: `${findFieldValue(row, ["Nome", "nome", "Name"])}-${findFieldValue(
          row,
          ["Check-in", "check-in", "CheckIn"]
        )}-${findFieldValue(row, ["Check-out", "check-out", "CheckOut"])}`,
        rowIndex: data.indexOf(row) + 2, // +2 perché la prima riga è l'intestazione, e gli indici delle celle partono da 1
      };

      // Gestione speciale per gli adulti: se non è stato trovato, prova a dedurlo
      if (!mappedBooking.adulti) {
        // Cerca il totale ospiti
        const totaleOspiti = findFieldValue(row, [
          "Ospiti totali",
          "Totale ospiti",
          "Total guests",
          "Guests",
          "Ospiti",
          "Totale persone",
          "N° Ospiti",
          "Numero ospiti",
        ]);

        if (totaleOspiti && totaleOspiti.trim() !== "") {
          const ospiti = parseInt(totaleOspiti, 10);
          const bambini = parseInt(mappedBooking.bambini || "0", 10);

          if (!isNaN(ospiti) && ospiti > 0) {
            // Deduce il numero di adulti sottraendo i bambini
            // (se ci sono bambini e il totale è maggiore)
            mappedBooking.adulti = Math.max(1, ospiti - bambini).toString();
        
          }
        } else {
          // Se proprio non trova nulla, imposta a 1 adulto come minimo
          mappedBooking.adulti = "1";
        }
      }

      return mappedBooking;
    });
  // Funzione per convertire un formato data DD/MM/YYYY in YYYY-MM-DD
  const formatDate = (date: string) => {
    if (!date || date.trim() === "") return "";

    // Gestisce diversi possibili formati di data
    if (date.includes("/")) {
      const parts = date.split("/");
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
          2,
          "0"
        )}`;
      }
    } else if (date.includes("-")) {
      // Controlla se è già nel formato YYYY-MM-DD
      const parts = date.split("-");
      if (parts.length === 3 && parts[0].length === 4) {
        return date; // È già nel formato corretto
      } else if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
          2,
          "0"
        )}`;
      }
    }

    // Se non riesce a interpretare la data, ritorna una stringa vuota
    console.warn("Formato data non riconosciuto:", date);
    return "";
  };

  // Crea eventi per il calendario con colori basati sull'OTA
  const events = validBookings
    .filter((booking) => booking.CheckIn && booking.CheckOut) // Filtra le prenotazioni senza date valide
    .map((booking) => {
      let backgroundColor = "#808080"; // Default: grigio
      const otaLower = booking.OTA.toLowerCase();

      if (otaLower.includes("booking")) backgroundColor = "#0000FF"; // Blu
      if (otaLower.includes("airbnb")) backgroundColor = "#FF0000"; // Rosso
      if (otaLower.includes("extra")) backgroundColor = "#008000"; // Verde

      return {
        title: `${booking.Nome} (${booking.OTA})`,
        start: formatDate(booking.CheckIn),
        end: formatDate(booking.CheckOut),
        backgroundColor,
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
function submitViaDirectAccess(
  action: string,
  data: Record<string, unknown>
): Promise<boolean> {
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
