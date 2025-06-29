import { Timestamp } from "firebase/firestore";

// Tipo per gli immobili/appartamenti
export interface Property {
  id: string;
  name: string; // es. "Appartamento N° 3"
  code: string; // es. "principale", "secondario", "terziario"
  address: string;
  maxGuests: number;
  description?: string;
  amenities?: string[];
  images?: string[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Tipo per le prenotazioni
export interface Booking {
  id: string;
  propertyId: string; // Riferimento all'immobile
  propertyName: string; // Nome dell'immobile per comodità

  // Informazioni ospite
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  numberOfGuests: number;

  // Date
  checkInDate: Timestamp;
  checkOutDate: Timestamp;
  bookingDate: Timestamp;

  // Informazioni economiche
  totalAmount: number;
  currency: string; // "EUR"
  paymentStatus: "pending" | "paid" | "cancelled";

  // Tassa di soggiorno
  tassaSoggiornoPagata: boolean;
  dataPagamentoTassa?: Timestamp;
  importoTassaSoggiorno?: number;

  // Stati della prenotazione
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
  source: string; // "direct", "booking.com", "airbnb", etc.

  // Note
  notes?: string;
  specialRequests?: string;

  // Notifiche
  notificationsEnabled: boolean;
  remindersSent: {
    checkIn?: boolean;
    tassaSoggiorno?: boolean;
    checkOut?: boolean;
  };

  // Metadati
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy?: string; // ID utente che ha creato la prenotazione
}

// Tipo per i promemoria/notifiche
export interface Reminder {
  id: string;
  bookingId: string;
  propertyId: string;
  type: "check-in" | "tassa-soggiorno" | "check-out" | "custom";
  title: string;
  message: string;
  scheduledFor: Timestamp;
  isCompleted: boolean;
  isSent: boolean;
  createdAt: Timestamp;
}

// Tipo per gli utenti (se necessario)
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: "admin" | "manager" | "viewer";
  permissions: {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canViewReports: boolean;
  };
  assignedProperties: string[]; // IDs delle proprietà a cui ha accesso
  createdAt: Timestamp;
  lastLoginAt?: Timestamp;
}

// Tipi per le statistiche
export interface BookingStats {
  propertyId: string;
  month: string; // "2025-06"
  year: number;
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  averageStayLength: number;
  guestCount: number;
  tassaSoggiornoCollected: number;
}

// Tipo per i filtri
export interface BookingFilters {
  propertyId?: string;
  status?: Booking["status"];
  dateFrom?: Date;
  dateTo?: Date;
  guestName?: string;
  tassaSoggiornoPagata?: boolean;
}

// Tipo per l'ordinamento
export interface BookingSortOptions {
  field:
    | "checkInDate"
    | "checkOutDate"
    | "bookingDate"
    | "guestName"
    | "totalAmount";
  direction: "asc" | "desc";
}
