export interface Booking {
  Nome: string;
  OTA: string;
  CheckIn: string;
  CheckOut: string;
  Notti: string;
  adulti: string;
  bambini: string;
  TotaleCliente: string;
  FuoriOTA: string;
  CostoNotti: string;
  MediaANotte: string;
  Pulizia: string;
  Sconti: string;
  SoggiornoTax: string;
  OTATax: string;
  CedolareSecca: string;
  Totale: string;
  Note?: string;
  id?: string; // Identificatore univoco per la prenotazione
  rowIndex?: number; // Numero della riga nel foglio Excel
}

// Tipo di calendario selezionabile
export type CalendarType = "principale" | "secondario" | "terziario" | "all";

// Evento per FullCalendar
export interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps: Booking;
}
