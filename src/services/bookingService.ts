import axios from "axios";
import { Booking, CalendarType, CalendarEvent } from "@/types/calendar";

// Base URL per l'API Google Sheets (lettura)
const BASE_URL =
  "https://opensheet.elk.sh/156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc/";

// URL del Google Apps Script
const API_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyClrLjSCXjQEZ4KOi9yRzJvcdks1HOf3P0BbsOZhjhiP8D18pN5uzwV5w7Gr9SPmpVfw/exec";

// Funzione per recuperare i dati dal foglio Google Sheets
export const fetchBookings = async (
  calendarType: CalendarType
): Promise<{
  events: CalendarEvent[];
  bookings: Booking[];
}> => {
  try {
    let url = BASE_URL;

    // Seleziona il foglio corretto in base al calendario selezionato
    switch (calendarType) {
      case "principale":
        url += "Affitti3";
        break;
      case "secondario":
        url += "Affitti4";
        break;
      case "terziario":
        url += "Affitti8";
        break;
      default:
        url += "Affitti3";
    }

    const response = await axios.get(url);
    const data = response.data;

    // Mappa i dati dell'API ai nuovi nomi dei campi
    const validBookings: Booking[] = data
      .filter((row: Record<string, string>) => row["Nome"] !== "")
      .map((row: Record<string, string>) => ({
        Nome: row["Nome"],
        OTA: row["OTA"],
        CheckIn: row["Check-in"],
        CheckOut: row["Check-out"],
        Notti: row["Notti"],
        adulti: row["adulti"],
        bambini: row["bambini"],
        TotaleCliente: row["Totale cliente"],
        FuoriOTA: row["Fuori OTA"],
        CostoNotti: row["Costo notti"],
        MediaANotte: row["Media a notte"],
        Pulizia: row["Pulizia"],
        Sconti: row["Sconti "],
        SoggiornoTax: row["Soggiorno Tax"],
        OTATax: row["OTA tax"],
        CedolareSecca: row["Cedolare Secca (21%)"],
        Totale: row["Totale"],
        Note: row["Note"],
        id:
          row["id"] || `${row["Nome"]}-${row["Check-in"]}-${row["Check-out"]}`, // Aggiungiamo un ID univoco
        rowIndex: row["__rowNum__"], // Per identificare la riga esatta nel foglio Excel
      }));

    // Funzione per convertire le date da DD/MM/YYYY a YYYY-MM-DD
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
  } catch (error) {
    console.error("Errore durante il recupero delle prenotazioni:", error);
    return { events: [], bookings: [] };
  }
};

/**
 * Implementazione diretta che aggira CORS in modo solido
 * Usare window.open per aprire una nuova finestra con i parametri per aggiornarla
 */
function submitViaDirectAccess(action: string, data: any): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`Chiamata API: ${action}`, data); // Per debug

    // Creo URL-encoded dati
    const jsonStr = encodeURIComponent(JSON.stringify(data));

    // Apro una finestra temporanea con i parametri
    const popupWindow = window.open(
      `${API_ENDPOINT}?action=${action}&data=${jsonStr}`,
      "_blank",
      "width=1,height=1"
    );

    // Attendi 3 secondi, poi chiudi la finestra popup se ancora aperta
    setTimeout(() => {
      if (popupWindow && !popupWindow.closed) {
        popupWindow.close();
      }
      console.log("API chiamata completata:", action);
      resolve(true);
    }, 3000);
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
      spreadsheetId: "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc",
    };

    // Utilizziamo l'accesso diretto aggirando CORS
    return await submitViaDirectAccess("update", payload);
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
      spreadsheetId: "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc",
    };

    // Utilizziamo l'accesso diretto aggirando CORS
    return await submitViaDirectAccess("delete", payload);
  } catch (error) {
    console.error("Errore durante la cancellazione della prenotazione:", error);
    return false;
  }
};
