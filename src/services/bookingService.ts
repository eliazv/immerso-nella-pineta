import axios from "axios";
import { Booking, CalendarType, CalendarEvent } from "@/types/calendar";

// Base URL per l'API Google Sheets
const BASE_URL =
  "https://opensheet.elk.sh/156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc/";

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
