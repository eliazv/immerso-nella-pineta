// Interfaccia per gli alloggi/appartamenti
export interface Apartment {
  id: string; // Identificatore univoco
  name: string; // Nome dell'appartamento (es. "N° 3", "N° 4", "N° 8")
  description?: string; // Descrizione dell'appartamento
  maxGuests: number; // Numero massimo di ospiti
  address?: string; // Indirizzo
  amenities?: string[]; // Servizi disponibili
  basePrice?: number; // Prezzo base per notte
  cleaningFee?: number; // Costo pulizia
  isActive: boolean; // Se l'appartamento è attivo
  createdAt: string; // Data di creazione
  updatedAt: string; // Data ultimo aggiornamento
  color?: string; // Colore dell'appartamento (es. "#3DA9A9")
  icon?: string; // Nome dell'icona Lucide (es. "Home", "Building", "Castle")
}

export interface Booking {
  Nome: string;
  OTA: string;
  CheckIn: string;
  CheckOut: string;
  Notti: string;
  adulti: string;
  bambini: string;
  animali: string;
  // Nuovi campi per importi dettagliati
  TotalePagatoOspite?: string; // Totale pagato dall'ospite
  CostoPulizia?: string; // Costo pulizia
  ScontiApplicati?: string; // Sconti applicati
  Supplementi?: string; // Supplementi
  CommissioneOTA?: string; // Commissione OTA
  TassaSoggiorno?: string; // Tassa di soggiorno
  CedolareSecca?: string; // Cedolare secca
  TotaleNetto?: string; // Totale netto (quello che vedo come anteprima)
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
  id?: string; // Identificatore univoco per la prenotazione
  rowIndex?: number; // Numero della riga nel foglio Excel (deprecato per store locale)
  apartment?: string; // Identificatore dell'appartamento
}

// Tipo di calendario selezionabile (mantenuto per compatibilità)
export type CalendarType = "principale" | "secondario" | "terziario" | "all";

// Mapping tra CalendarType e ID appartamenti per compatibilità
export const APARTMENT_MAPPING: Record<CalendarType, string> = {
  principale: "apt-3",
  secondario: "apt-4",
  terziario: "apt-8",
  all: "all",
};

// Evento per FullCalendar
export interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps: Booking;
}
