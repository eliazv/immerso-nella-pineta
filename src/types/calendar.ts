export interface Booking {
  Nome: string;
  OTA: string;
  CheckIn: string;
  CheckOut: string;
  Notti: string;
  adulti: string;
  bambini: string;
  animali: string;
  TotaleCliente: string;
  FuoriOTA: string;
  CostoNotti: string;
  MediaANotte: string;
  Pulizia: string;
  Sconti: string;
  SoggiornoTax: string;
  SoggiornoTaxRiscossa?: string; // "Sì" o "No" per tracciare se la tassa è stata riscossa
  OTATax: string;
  CedolareSecca: string;
  Totale: string;
  Note?: string;
  id?: string; // Identificatore univoco per la prenotazione
  rowIndex?: number; // Numero della riga nel foglio Excel
  apartment?: string; // Identificatore dell'appartamento (solo nella vista 'all')
}

// Tipo di calendario selezionabile - now dynamic based on accommodations
export type CalendarType = string; // Can be any accommodation ID or "all"

// Evento per FullCalendar
export interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps: Booking;
}
