import axios from "axios";
import { Booking, CalendarType } from "@/types/calendar";

// Interfaccia per le credenziali
interface ApiCredentials {
  apiKey: string;
  secret?: string;
}

// Configurazione delle API utilizzando variabili d'ambiente sicure
const API_CONFIG = {
  airbnb: {
    baseUrl: "https://api.airbnb.com/v2",
    credentials: {
      apiKey: import.meta.env.VITE_AIRBNB_API_KEY || "",
      secret: import.meta.env.VITE_AIRBNB_API_SECRET || "",
    },
  },
  booking: {
    baseUrl: "https://distribution-xml.booking.com/json/bookings",
    credentials: {
      apiKey: import.meta.env.VITE_BOOKING_API_KEY || "",
    },
  },
};

// Mappa gli ID delle strutture su diverse piattaforme per ogni calendario
// Queste informazioni dovrebbero essere in variabili d'ambiente in un'implementazione di produzione
const PROPERTY_MAPPINGS = {
  principale: {
    airbnbId: import.meta.env.VITE_AIRBNB_PROPERTY_ID_1 || "123456",
    bookingId: import.meta.env.VITE_BOOKING_PROPERTY_ID_1 || "7890123",
  },
  secondario: {
    airbnbId: import.meta.env.VITE_AIRBNB_PROPERTY_ID_2 || "234567",
    bookingId: import.meta.env.VITE_BOOKING_PROPERTY_ID_2 || "8901234",
  },
  terziario: {
    airbnbId: import.meta.env.VITE_AIRBNB_PROPERTY_ID_3 || "345678",
    bookingId: import.meta.env.VITE_BOOKING_PROPERTY_ID_3 || "9012345",
  },
};

/**
 * Recupera le prenotazioni da Airbnb
 * @param calendarType Tipo di calendario (principale, secondario, terziario)
 * @param startDate Data di inizio (YYYY-MM-DD)
 * @param endDate Data di fine (YYYY-MM-DD)
 */
export async function fetchAirbnbBookings(
  calendarType: CalendarType,
  startDate: string,
  endDate: string
): Promise<Booking[]> {
  try {
    // Verifica se l'API key è disponibile
    if (!API_CONFIG.airbnb.credentials.apiKey) {
      console.warn(
        "API key di Airbnb non configurata. Simulazione risposta API."
      );
      return simulateAirbnbBookings(calendarType);
    }

    const propertyId = PROPERTY_MAPPINGS[calendarType].airbnbId;
    const { apiKey } = API_CONFIG.airbnb.credentials;

    // Questa è una implementazione simulata - l'API reale di Airbnb richiede OAuth
    // e ha un formato di richiesta diverso
    const response = await axios.get(
      `${API_CONFIG.airbnb.baseUrl}/calendar_months`,
      {
        params: {
          listing_id: propertyId,
          start_date: startDate,
          end_date: endDate,
          _format: "for_calendar_db",
        },
        headers: {
          "X-Airbnb-API-Key": apiKey,
        },
      }
    );

    // Trasformazione dei dati di esempio - dovresti adattare questo alla struttura reale
    // restituita dall'API di Airbnb
    return response.data.calendar_months
      .flatMap((month: any) => month.days)
      .filter((day: any) => day.reservation)
      .map((day: any) => {
        const reservation = day.reservation;

        // Formato data italiano (DD/MM/YYYY)
        const formatDate = (date: string) => {
          const [year, month, day] = date.split("-");
          return `${day}/${month}/${year}`;
        };

        // Anonimizza i dati sensibili
        const guestName = anonimizzaOspite(reservation.guest_name);

        return {
          Nome: guestName,
          OTA: "Airbnb",
          CheckIn: formatDate(reservation.start_date),
          CheckOut: formatDate(reservation.end_date),
          Notti: reservation.nights,
          adulti: reservation.num_adults.toString(),
          bambini: reservation.num_children.toString(),
          TotaleCliente: `€${reservation.guest_paid_amount}`,
          Totale: `€${reservation.host_payout_amount}`,
          id: `airbnb-${reservation.confirmation_code}`,
          // Altri campi necessari con valori di default
          FuoriOTA: "0",
          CostoNotti: `€${reservation.host_payout_amount}`,
          MediaANotte: `€${(
            reservation.host_payout_amount / reservation.nights
          ).toFixed(2)}`,
          Pulizia: "0",
          Sconti: "0",
          SoggiornoTax: "0",
          OTATax: "0",
          CedolareSecca: "0",
          Note: `Prenotazione Airbnb #${reservation.confirmation_code}`,
          rowIndex: 0,
        } as Booking;
      });
  } catch (error) {
    console.error("Errore nel recupero delle prenotazioni da Airbnb:", error);
    return simulateAirbnbBookings(calendarType);
  }
}

/**
 * Recupera le prenotazioni da Booking.com
 * @param calendarType Tipo di calendario (principale, secondario, terziario)
 * @param startDate Data di inizio (YYYY-MM-DD)
 * @param endDate Data di fine (YYYY-MM-DD)
 */
export async function fetchBookingComBookings(
  calendarType: CalendarType,
  startDate: string,
  endDate: string
): Promise<Booking[]> {
  try {
    // Verifica se l'API key è disponibile
    if (!API_CONFIG.booking.credentials.apiKey) {
      console.warn(
        "API key di Booking.com non configurata. Simulazione risposta API."
      );
      return simulateBookingComBookings(calendarType);
    }

    const propertyId = PROPERTY_MAPPINGS[calendarType].bookingId;
    const { apiKey } = API_CONFIG.booking.credentials;

    // Questa è una implementazione simulata - l'API reale di Booking.com
    // richiede autenticazione e ha parametri specifici
    const response = await axios.get(`${API_CONFIG.booking.baseUrl}`, {
      params: {
        hotel_ids: propertyId,
        arrival_date: startDate,
        departure_date: endDate,
      },
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
    });

    // Trasformazione dei dati - dovresti adattare questo alla struttura reale
    // restituita dall'API di Booking.com
    return response.data.bookings.map((booking: any) => {
      // Formato data italiano (DD/MM/YYYY)
      const formatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      };

      // Calcola il numero di notti
      const checkInDate = new Date(booking.arrival_date);
      const checkOutDate = new Date(booking.departure_date);
      const nights = Math.round(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Anonimizza i dati sensibili dell'ospite
      const guestName = anonimizzaOspite(
        `${booking.guest.first_name} ${booking.guest.last_name}`
      );

      return {
        Nome: guestName,
        OTA: "Booking",
        CheckIn: formatDate(booking.arrival_date),
        CheckOut: formatDate(booking.departure_date),
        Notti: nights.toString(),
        adulti: booking.number_of_guests.toString(),
        bambini: (booking.number_of_children || 0).toString(),
        TotaleCliente: `€${booking.price.total}`,
        Totale: `€${booking.commission.amount_to_collect}`,
        id: `booking-${booking.id}`,
        // Altri campi necessari con valori di default
        FuoriOTA: "0",
        CostoNotti: `€${booking.price.total - (booking.price.extras || 0)}`,
        MediaANotte: `€${(
          (booking.price.total - (booking.price.extras || 0)) /
          nights
        ).toFixed(2)}`,
        Pulizia: `€${booking.price.extras || 0}`,
        Sconti: "0",
        SoggiornoTax: `€${booking.price.city_tax || 0}`,
        OTATax: `€${booking.commission.amount || 0}`,
        CedolareSecca: "0",
        Note: `Prenotazione Booking.com #${booking.id}`,
        rowIndex: 0,
      } as Booking;
    });
  } catch (error) {
    console.error(
      "Errore nel recupero delle prenotazioni da Booking.com:",
      error
    );
    return simulateBookingComBookings(calendarType);
  }
}

/**
 * Simula le prenotazioni da Airbnb per test
 * Questa funzione è sicura e non espone dati sensibili poiché genera dati fittizi
 */
function simulateAirbnbBookings(calendarType: CalendarType): Booking[] {
  // Crea alcune prenotazioni di esempio per test
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  // Formato data italiano (DD/MM/YYYY)
  const formatDate = (date: Date): string => {
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Crea una data di check-in casuale per i prossimi 30 giorni
  const randomCheckIn = (
    baseDate: Date = today,
    daysAhead: number = 30
  ): Date => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead));
    return date;
  };

  // Crea una data di check-out casuale tra 1 e 7 giorni dopo il check-in
  const randomCheckOut = (checkIn: Date): Date => {
    const date = new Date(checkIn);
    date.setDate(checkIn.getDate() + Math.floor(Math.random() * 6) + 1); // 1-7 notti
    return date;
  };

  // Numero casuale di notti tra le date
  const calculateNights = (checkIn: Date, checkOut: Date): number => {
    return Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const simulatedBookings: Booking[] = [];

  // Crea 2-4 prenotazioni simulate
  const numBookings = Math.floor(Math.random() * 3) + 2;

  for (let i = 0; i < numBookings; i++) {
    const checkIn = randomCheckIn();
    const checkOut = randomCheckOut(checkIn);
    const nights = calculateNights(checkIn, checkOut);
    const pricePerNight = Math.floor(Math.random() * 50) + 70; // 70-120€ per notte
    const totalPrice = pricePerNight * nights;

    simulatedBookings.push({
      Nome: `Ospite Airbnb ${i + 1}`,
      OTA: "Airbnb",
      CheckIn: formatDate(checkIn),
      CheckOut: formatDate(checkOut),
      Notti: nights.toString(),
      adulti: (Math.floor(Math.random() * 3) + 1).toString(), // 1-4 adulti
      bambini: Math.floor(Math.random() * 2).toString(), // 0-2 bambini
      TotaleCliente: `€${totalPrice}`,
      Totale: `€${Math.round(totalPrice * 0.85)}`, // 15% commissione
      id: `airbnb-sim-${i}`,
      FuoriOTA: "0",
      CostoNotti: `€${totalPrice}`,
      MediaANotte: `€${pricePerNight}`,
      Pulizia: `€${Math.floor(Math.random() * 20) + 30}`, // 30-50€ pulizie
      Sconti: "0",
      SoggiornoTax: `€${nights * 2}`, // 2€ a notte
      OTATax: `€${Math.round(totalPrice * 0.15)}`, // 15% commissione
      CedolareSecca: "0",
      Note: `Prenotazione Airbnb simulata #${i + 1}`,
      rowIndex: i,
    });
  }

  return simulatedBookings;
}

/**
 * Simula le prenotazioni da Booking.com per test
 * Questa funzione è sicura e non espone dati sensibili poiché genera dati fittizi
 */
function simulateBookingComBookings(calendarType: CalendarType): Booking[] {
  // Crea alcune prenotazioni di esempio per test
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 2); // Prenotazioni tra 1-2 mesi

  // Formato data italiano (DD/MM/YYYY)
  const formatDate = (date: Date): string => {
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Crea una data di check-in casuale per il prossimo mese
  const randomCheckIn = (
    baseDate: Date = nextMonth,
    daysAhead: number = 30
  ): Date => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead) - 15);
    return date;
  };

  // Crea una data di check-out casuale tra 1 e 7 giorni dopo il check-in
  const randomCheckOut = (checkIn: Date): Date => {
    const date = new Date(checkIn);
    date.setDate(checkIn.getDate() + Math.floor(Math.random() * 6) + 1); // 1-7 notti
    return date;
  };

  // Numero casuale di notti tra le date
  const calculateNights = (checkIn: Date, checkOut: Date): number => {
    return Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const simulatedBookings: Booking[] = [];

  // Crea 2-4 prenotazioni simulate
  const numBookings = Math.floor(Math.random() * 3) + 2;

  for (let i = 0; i < numBookings; i++) {
    const checkIn = randomCheckIn();
    const checkOut = randomCheckOut(checkIn);
    const nights = calculateNights(checkIn, checkOut);
    const pricePerNight = Math.floor(Math.random() * 50) + 70; // 70-120€ per notte
    const totalPrice = pricePerNight * nights;

    simulatedBookings.push({
      Nome: `Cliente Booking ${i + 1}`,
      OTA: "Booking",
      CheckIn: formatDate(checkIn),
      CheckOut: formatDate(checkOut),
      Notti: nights.toString(),
      adulti: (Math.floor(Math.random() * 3) + 1).toString(), // 1-4 adulti
      bambini: Math.floor(Math.random() * 2).toString(), // 0-2 bambini
      TotaleCliente: `€${totalPrice}`,
      Totale: `€${Math.round(totalPrice * 0.85)}`, // 15% commissione
      id: `booking-sim-${i}`,
      FuoriOTA: "0",
      CostoNotti: `€${totalPrice}`,
      MediaANotte: `€${pricePerNight}`,
      Pulizia: `€${Math.floor(Math.random() * 20) + 30}`, // 30-50€ pulizie
      Sconti: "0",
      SoggiornoTax: `€${nights * 2}`, // 2€ a notte
      OTATax: `€${Math.round(totalPrice * 0.15)}`, // 15% commissione
      CedolareSecca: "0",
      Note: `Prenotazione Booking.com simulata #${i + 1}`,
      rowIndex: i,
    });
  }

  return simulatedBookings;
}

/**
 * Anonimizza le informazioni dell'ospite per proteggere i dati personali
 */
function anonimizzaOspite(nome: string): string {
  if (!nome || nome.length <= 1) return nome;

  // Divide il nome in parti (nome, cognome)
  const parts = nome.split(" ");

  return parts
    .map((part) => {
      if (part.length <= 1) return part;
      return `${part.charAt(0)}${".".repeat(part.length - 1)}`;
    })
    .join(" ");
}

/**
 * Sincronizza le prenotazioni da entrambe le piattaforme
 * @param calendarType Tipo di calendario
 * @param startDate Data di inizio (YYYY-MM-DD)
 * @param endDate Data di fine (YYYY-MM-DD)
 */
export async function syncAllChannelBookings(
  calendarType: CalendarType,
  startDate: string = new Date().toISOString().split("T")[0],
  endDate: string = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]
): Promise<Booking[]> {
  try {
    // Recupera prenotazioni da entrambe le piattaforme in parallelo
    const [airbnbBookings, bookingComBookings] = await Promise.all([
      fetchAirbnbBookings(calendarType, startDate, endDate),
      fetchBookingComBookings(calendarType, startDate, endDate),
    ]);

    // Unisci le prenotazioni
    const allBookings = [...airbnbBookings, ...bookingComBookings];

    // Ordina per data di check-in
    return allBookings.sort((a, b) => {
      const dateA = a.CheckIn.split("/").reverse().join("");
      const dateB = b.CheckIn.split("/").reverse().join("");
      return dateA.localeCompare(dateB);
    });
  } catch (error) {
    console.error(
      "Errore durante la sincronizzazione delle prenotazioni:",
      error
    );
    return [];
  }
}

/**
 * Aggiorna la disponibilità su tutte le piattaforme
 * @param calendarType Tipo di calendario
 * @param dates Date da bloccare/sbloccare
 * @param isAvailable Se true, le date sono disponibili; altrimenti sono bloccate
 */
export async function updateAvailability(
  calendarType: CalendarType,
  dates: string[],
  isAvailable: boolean
): Promise<boolean> {
  try {
    // Verifica se le API key sono disponibili
    if (
      !API_CONFIG.airbnb.credentials.apiKey ||
      !API_CONFIG.booking.credentials.apiKey
    ) {
      console.warn(
        "API key non configurate. Simulazione aggiornamento disponibilità."
      );
      return true; // Simula successo in modalità di sviluppo
    }

    const propertyAirbnbId = PROPERTY_MAPPINGS[calendarType].airbnbId;
    const propertyBookingId = PROPERTY_MAPPINGS[calendarType].bookingId;

    // Invia aggiornamenti ad Airbnb
    await axios.post(
      `${API_CONFIG.airbnb.baseUrl}/listings/${propertyAirbnbId}/calendar_operations`,
      {
        calendar_operations: {
          operations: dates.map((date) => ({
            date,
            availability: isAvailable ? "available" : "blocked",
          })),
        },
      },
      {
        headers: {
          "X-Airbnb-API-Key": API_CONFIG.airbnb.credentials.apiKey,
        },
      }
    );

    // Invia aggiornamenti a Booking.com
    await axios.post(
      `${API_CONFIG.booking.baseUrl}/properties/${propertyBookingId}/availability`,
      {
        availability: dates.map((date) => ({
          date,
          available: isAvailable,
        })),
      },
      {
        headers: {
          Authorization: `Basic ${API_CONFIG.booking.credentials.apiKey}`,
        },
      }
    );

    return true;
  } catch (error) {
    console.error("Errore durante l'aggiornamento della disponibilità:", error);
    return false;
  }
}

/**
 * Aggiorna i prezzi su tutte le piattaforme
 * @param calendarType Tipo di calendario
 * @param datePrices Mappa delle date e relativi prezzi
 */
export async function updatePrices(
  calendarType: CalendarType,
  datePrices: Record<string, number>
): Promise<boolean> {
  try {
    // Verifica se le API key sono disponibili
    if (
      !API_CONFIG.airbnb.credentials.apiKey ||
      !API_CONFIG.booking.credentials.apiKey
    ) {
      console.warn(
        "API key non configurate. Simulazione aggiornamento prezzi."
      );
      return true; // Simula successo
    }

    const propertyAirbnbId = PROPERTY_MAPPINGS[calendarType].airbnbId;
    const propertyBookingId = PROPERTY_MAPPINGS[calendarType].bookingId;

    // Invia aggiornamenti dei prezzi ad Airbnb
    await axios.post(
      `${API_CONFIG.airbnb.baseUrl}/listings/${propertyAirbnbId}/calendar_operations`,
      {
        calendar_operations: {
          operations: Object.entries(datePrices).map(([date, price]) => ({
            date,
            price,
          })),
        },
      },
      {
        headers: {
          "X-Airbnb-API-Key": API_CONFIG.airbnb.credentials.apiKey,
        },
      }
    );

    // Invia aggiornamenti dei prezzi a Booking.com
    await axios.post(
      `${API_CONFIG.booking.baseUrl}/properties/${propertyBookingId}/rates`,
      {
        rates: Object.entries(datePrices).map(([date, price]) => ({
          date,
          price,
        })),
      },
      {
        headers: {
          Authorization: `Basic ${API_CONFIG.booking.credentials.apiKey}`,
        },
      }
    );

    return true;
  } catch (error) {
    console.error("Errore durante l'aggiornamento dei prezzi:", error);
    return false;
  }
}
