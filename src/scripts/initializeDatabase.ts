import { firebaseBookingService } from "@/services/firebaseBookingService";
import { Timestamp } from "firebase/firestore";

/**
 * Script per inizializzare il database Firebase con dati di esempio
 * Esegui questo script una volta sola dopo aver configurato Firebase
 */

// Appartamenti di esempio
const sampleProperties = [
  {
    name: "Appartamento N° 3",
    code: "principale",
    address: "Via della Pineta 3, Immerso nella Pineta",
    maxGuests: 4,
    description: "Appartamento principale con vista pineta",
    amenities: ["WiFi", "Aria condizionata", "Cucina", "Parcheggio"],
    isActive: true,
  },
  {
    name: "Appartamento N° 4",
    code: "secondario",
    address: "Via della Pineta 4, Immerso nella Pineta",
    maxGuests: 6,
    description: "Appartamento familiare con terrazza",
    amenities: [
      "WiFi",
      "Aria condizionata",
      "Cucina",
      "Terrazza",
      "Parcheggio",
    ],
    isActive: true,
  },
  {
    name: "Appartamento N° 8",
    code: "terziario",
    address: "Via della Pineta 8, Immerso nella Pineta",
    maxGuests: 2,
    description: "Appartamento intimo per coppie",
    amenities: ["WiFi", "Aria condizionata", "Cucina", "Vista mare"],
    isActive: true,
  },
];

// Prenotazioni di esempio
const sampleBookings = [
  {
    propertyCode: "principale",
    guestName: "Mario Rossi",
    guestEmail: "mario.rossi@email.com",
    guestPhone: "+39 123 456 7890",
    numberOfGuests: 2,
    checkInDate: new Date("2025-07-15"),
    checkOutDate: new Date("2025-07-22"),
    totalAmount: 450.0,
    tassaSoggiornoPagata: false,
    status: "confirmed" as const,
    source: "direct",
    notes: "Richiesto check-in tardivo",
  },
  {
    propertyCode: "secondario",
    guestName: "Anna Bianchi",
    guestEmail: "anna.bianchi@email.com",
    guestPhone: "+39 987 654 3210",
    numberOfGuests: 4,
    checkInDate: new Date("2025-07-20"),
    checkOutDate: new Date("2025-07-27"),
    totalAmount: 680.0,
    tassaSoggiornoPagata: true,
    dataPagamentoTassa: new Date("2025-07-18"),
    status: "confirmed" as const,
    source: "booking.com",
  },
  {
    propertyCode: "terziario",
    guestName: "Luca Verdi",
    guestEmail: "luca.verdi@email.com",
    guestPhone: "+39 555 123 4567",
    numberOfGuests: 2,
    checkInDate: new Date("2025-06-30"),
    checkOutDate: new Date("2025-07-01"),
    totalAmount: 120.0,
    tassaSoggiornoPagata: false,
    status: "checked-out" as const,
    source: "airbnb",
  },
];

export const initializeDatabase = async () => {
  try {
    console.log("🔥 Inizializzazione database Firebase...");

    // 1. Crea le proprietà
    console.log("📍 Creazione proprietà...");
    const propertyIds: { [key: string]: string } = {};

    for (const property of sampleProperties) {
      const propertyId = await firebaseBookingService.createProperty(property);
      propertyIds[property.code] = propertyId;
      console.log(`✅ Creata proprietà: ${property.name} (${propertyId})`);
    }

    // 2. Crea le prenotazioni
    console.log("📅 Creazione prenotazioni...");

    for (const booking of sampleBookings) {
      const propertyId = propertyIds[booking.propertyCode];
      const propertyName =
        sampleProperties.find((p) => p.code === booking.propertyCode)?.name ||
        "Proprietà Sconosciuta";

      const bookingData = {
        propertyId,
        propertyName,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        numberOfGuests: booking.numberOfGuests,
        checkInDate: Timestamp.fromDate(booking.checkInDate),
        checkOutDate: Timestamp.fromDate(booking.checkOutDate),
        bookingDate: Timestamp.now(),
        totalAmount: booking.totalAmount,
        currency: "EUR",
        paymentStatus: "paid" as const,
        tassaSoggiornoPagata: booking.tassaSoggiornoPagata,
        dataPagamentoTassa: booking.dataPagamentoTassa
          ? Timestamp.fromDate(booking.dataPagamentoTassa)
          : undefined,
        importoTassaSoggiorno: booking.numberOfGuests * 2.5, // 2.50€ per persona per notte
        status: booking.status,
        source: booking.source,
        notes: booking.notes,
        specialRequests: "",
        notificationsEnabled: true,
        remindersSent: {
          checkIn: false,
          tassaSoggiorno: false,
          checkOut: false,
        },
      };

      const bookingId = await firebaseBookingService.createBooking(bookingData);
      console.log(
        `✅ Creata prenotazione: ${booking.guestName} (${bookingId})`
      );
    }

    console.log("🎉 Database inizializzato con successo!");
    console.log(`📊 Proprietà create: ${sampleProperties.length}`);
    console.log(`📅 Prenotazioni create: ${sampleBookings.length}`);

    return {
      success: true,
      propertiesCreated: sampleProperties.length,
      bookingsCreated: sampleBookings.length,
      propertyIds,
    };
  } catch (error) {
    console.error("❌ Errore inizializzazione database:", error);
    throw error;
  }
};

// Funzione per pulire il database (usare con cautela!)
export const clearDatabase = async () => {
  console.warn("⚠️ ATTENZIONE: Questa funzione eliminerà TUTTI i dati!");
  // Implementa la logica di pulizia se necessario
  // NON implementata per sicurezza
};
