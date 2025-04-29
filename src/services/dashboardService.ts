import { Booking, CalendarType } from "@/types/calendar";
import { fetchBookings } from "./bookingService";

// Interfaccia per le statistiche di occupazione
export interface OccupancyStats {
  totalDays: number;
  occupiedDays: number;
  occupancyRate: number; // Percentuale
  monthlyOccupancy: { month: string; rate: number }[];
}

// Interfaccia per le statistiche di ricavo
export interface RevenueStats {
  totalRevenue: number;
  averagePerNight: number;
  averagePerBooking: number;
  monthlyRevenue: { month: string; revenue: number }[];
  yearlyRevenue: { year: string; revenue: number }[];
}

// Interfaccia per le statistiche delle OTA
export interface OTAStats {
  bookingCount: { ota: string; count: number }[];
  revenue: { ota: string; revenue: number }[];
  averagePerNight: { ota: string; average: number }[];
}

// Interfaccia per le statistiche di stagionalità
export interface SeasonalityStats {
  monthlyBookings: { month: string; count: number }[];
  monthlyAvgPrice: { month: string; price: number }[];
}

// Interfaccia per le statistiche generali
export interface DashboardStats {
  occupancy: OccupancyStats;
  revenue: RevenueStats;
  ota: OTAStats;
  seasonality: SeasonalityStats;
  topMonths: { month: string; occupancyRate: number; revenue: number }[];
  worstMonths: { month: string; occupancyRate: number; revenue: number }[];
}

// Funzione per parsare il valore monetario (rimuove il simbolo € e converte in numero)
const parseMoneyValue = (value: string): number => {
  if (!value) return 0;
  return parseFloat(
    value.replace("€", "").replace(/\./g, "").replace(/,/g, ".").trim()
  );
};

// Funzione per ottenere il numero di giorni tra due date
const getDaysBetweenDates = (
  startDateStr: string,
  endDateStr: string
): number => {
  // Le date sono in formato DD/MM/YYYY
  const [startDay, startMonth, startYear] = startDateStr.split("/").map(Number);
  const [endDay, endMonth, endYear] = endDateStr.split("/").map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  // Calcola la differenza in millisecondi e converte in giorni
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Nomi dei mesi in italiano per riferimento
const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

// Funzione per calcolare le statistiche di occupazione
const calculateOccupancyStats = (
  bookings: Booking[],
  year: number
): OccupancyStats => {
  // Inizializza array per occupazione mensile (indice 0 = Gennaio)
  const monthlyOccupiedDays = Array(12).fill(0);
  const daysInMonth = Array(12)
    .fill(0)
    .map((_, index) => {
      // Febbraio ha 29 giorni negli anni bisestili
      if (index === 1) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? 29
          : 28;
      }
      // 30 giorni hanno aprile, giugno, settembre e novembre
      if ([3, 5, 8, 10].includes(index)) {
        return 30;
      }
      // Tutti gli altri mesi hanno 31 giorni
      return 31;
    });

  // Filtra le prenotazioni dell'anno corrente
  const yearBookings = bookings.filter((booking) => {
    if (!booking.CheckIn || !booking.CheckOut) return false;

    const checkInYear = parseInt(booking.CheckIn.split("/")[2]);
    const checkOutYear = parseInt(booking.CheckOut.split("/")[2]);
    return checkInYear === year || checkOutYear === year;
  });

  // Calcola i giorni occupati per ogni mese
  yearBookings.forEach((booking) => {
    if (!booking.CheckIn || !booking.CheckOut) return;

    const [startDay, startMonth, startYear] =
      booking.CheckIn.split("/").map(Number);
    const [endDay, endMonth, endYear] = booking.CheckOut.split("/").map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    // Itera su tutti i giorni della prenotazione
    const currentDate = new Date(startDate);
    while (currentDate < endDate) {
      // Se siamo nell'anno richiesto, aggiungi il giorno al conteggio del mese
      if (currentDate.getFullYear() === year) {
        monthlyOccupiedDays[currentDate.getMonth()]++;
      }
      // Passa al giorno successivo
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  // Calcola il tasso di occupazione per ogni mese
  const monthlyOccupancy = monthlyOccupiedDays.map((occupiedDays, index) => {
    const rate = (occupiedDays / daysInMonth[index]) * 100;
    return {
      month: monthNames[index],
      rate: parseFloat(rate.toFixed(2)),
    };
  });

  // Calcola il totale di giorni e il tasso di occupazione generale
  const totalDays = daysInMonth.reduce((sum, days) => sum + days, 0);
  const occupiedDays = monthlyOccupiedDays.reduce((sum, days) => sum + days, 0);
  const occupancyRate = parseFloat(
    ((occupiedDays / totalDays) * 100).toFixed(2)
  );

  return {
    totalDays,
    occupiedDays,
    occupancyRate,
    monthlyOccupancy,
  };
};

// Funzione per calcolare le statistiche di ricavo
const calculateRevenueStats = (
  bookings: Booking[],
  year: number
): RevenueStats => {
  // Filtra le prenotazioni con valori validi e dell'anno selezionato
  const validBookings = bookings.filter((booking) => {
    if (!booking.Totale || !booking.CheckIn) return false;

    // Filtra per anno
    const bookingYear = parseInt(booking.CheckIn.split("/")[2]);
    return bookingYear === year;
  });

  if (validBookings.length === 0) {
    return {
      totalRevenue: 0,
      averagePerNight: 0,
      averagePerBooking: 0,
      monthlyRevenue: [],
      yearlyRevenue: [],
    };
  }

  // Calcola il ricavo totale
  const totalRevenue = validBookings.reduce((sum, booking) => {
    return sum + parseMoneyValue(booking.Totale || "0");
  }, 0);

  // Calcola il numero totale di notti
  const totalNights = validBookings.reduce((sum, booking) => {
    return sum + parseInt(booking.Notti || "0");
  }, 0);

  // Calcola medie
  const averagePerBooking = totalRevenue / validBookings.length;
  const averagePerNight = totalNights > 0 ? totalRevenue / totalNights : 0;

  // Inizializza strutture per ricavi mensili e annuali
  const monthlyRevenueMap = new Map<string, number>();
  const yearlyRevenueMap = new Map<string, number>();

  // Raggruppa i ricavi per mese e anno
  validBookings.forEach((booking) => {
    if (!booking.CheckIn) return;

    const [day, month, year] = booking.CheckIn.split("/");
    const monthYear = `${monthNames[parseInt(month) - 1]} ${year}`;
    const revenue = parseMoneyValue(booking.Totale || "0");

    monthlyRevenueMap.set(
      monthYear,
      (monthlyRevenueMap.get(monthYear) || 0) + revenue
    );

    yearlyRevenueMap.set(year, (yearlyRevenueMap.get(year) || 0) + revenue);
  });

  // Converte le mappe in array per l'output
  const monthlyRevenue = Array.from(monthlyRevenueMap.entries()).map(
    ([month, revenue]) => ({ month, revenue: parseFloat(revenue.toFixed(2)) })
  );

  const yearlyRevenue = Array.from(yearlyRevenueMap.entries()).map(
    ([year, revenue]) => ({ year, revenue: parseFloat(revenue.toFixed(2)) })
  );

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    averagePerNight: parseFloat(averagePerNight.toFixed(2)),
    averagePerBooking: parseFloat(averagePerBooking.toFixed(2)),
    monthlyRevenue,
    yearlyRevenue,
  };
};

// Funzione per calcolare le statistiche OTA
const calculateOTAStats = (bookings: Booking[], year: number): OTAStats => {
  // Filtra le prenotazioni dell'anno selezionato
  const yearBookings = bookings.filter((booking) => {
    if (!booking.CheckIn) return false;
    const bookingYear = parseInt(booking.CheckIn.split("/")[2]);
    return bookingYear === year;
  });

  // Inizializza le mappe per conteggio, ricavi e notti per OTA
  const countMap = new Map<string, number>();
  const revenueMap = new Map<string, number>();
  const nightsMap = new Map<string, number>();

  // Raggruppa i dati per OTA
  yearBookings.forEach((booking) => {
    const ota = booking.OTA || "Sconosciuto";
    const revenue = parseMoneyValue(booking.Totale || "0");
    const nights = parseInt(booking.Notti || "0");

    countMap.set(ota, (countMap.get(ota) || 0) + 1);
    revenueMap.set(ota, (revenueMap.get(ota) || 0) + revenue);
    nightsMap.set(ota, (nightsMap.get(ota) || 0) + nights);
  });

  // Converti le mappe in array per l'output
  const bookingCount = Array.from(countMap.entries()).map(([ota, count]) => ({
    ota,
    count,
  }));

  const revenue = Array.from(revenueMap.entries()).map(([ota, revenue]) => ({
    ota,
    revenue: parseFloat(revenue.toFixed(2)),
  }));

  // Calcola la media per notte per ogni OTA
  const averagePerNight = Array.from(revenueMap.keys()).map((ota) => {
    const totalRevenue = revenueMap.get(ota) || 0;
    const totalNights = nightsMap.get(ota) || 1; // Evita divisione per zero
    return {
      ota,
      average: parseFloat((totalRevenue / totalNights).toFixed(2)),
    };
  });

  return {
    bookingCount,
    revenue,
    averagePerNight,
  };
};

// Funzione per calcolare le statistiche di stagionalità
const calculateSeasonalityStats = (
  bookings: Booking[],
  year: number
): SeasonalityStats => {
  // Filtra le prenotazioni dell'anno selezionato
  const yearBookings = bookings.filter((booking) => {
    if (!booking.CheckIn) return false;
    const bookingYear = parseInt(booking.CheckIn.split("/")[2]);
    return bookingYear === year;
  });

  // Inizializza contatori per prenotazioni e prezzi mensili
  const monthlyBookingsMap = new Map<string, number>();
  const monthlyRevenueMap = new Map<string, number>();
  const monthlyNightsMap = new Map<string, number>();

  // Raggruppa prenotazioni per mese
  yearBookings.forEach((booking) => {
    if (!booking.CheckIn) return;

    const [_, month] = booking.CheckIn.split("/");
    const monthName = monthNames[parseInt(month) - 1];
    const revenue = parseMoneyValue(booking.Totale || "0");
    const nights = parseInt(booking.Notti || "0");

    monthlyBookingsMap.set(
      monthName,
      (monthlyBookingsMap.get(monthName) || 0) + 1
    );
    monthlyRevenueMap.set(
      monthName,
      (monthlyRevenueMap.get(monthName) || 0) + revenue
    );
    monthlyNightsMap.set(
      monthName,
      (monthlyNightsMap.get(monthName) || 0) + nights
    );
  });

  // Crea array ordinati per i mesi (Gennaio -> Dicembre)
  const monthlyBookings = monthNames.map((month) => ({
    month,
    count: monthlyBookingsMap.get(month) || 0,
  }));

  const monthlyAvgPrice = monthNames.map((month) => {
    const revenue = monthlyRevenueMap.get(month) || 0;
    const nights = monthlyNightsMap.get(month) || 1; // Evita divisione per zero
    return {
      month,
      price: parseFloat((revenue / nights).toFixed(2)),
    };
  });

  return {
    monthlyBookings,
    monthlyAvgPrice,
  };
};

// Funzione principale per ottenere tutte le statistiche della dashboard
export const getDashboardStats = async (
  calendarType: CalendarType,
  year: number = new Date().getFullYear()
): Promise<{
  stats: DashboardStats;
  isCachedData: boolean; // Indichiamo se i dati sono cached
}> => {
  try {
    // Se si richiede la visualizzazione combinata, otteniamo i dati di tutti gli appartamenti
    if (calendarType === "all") {
      // Otteniamo i dati di ciascun appartamento separatamente
      const { bookings: bookingsPrincipale, isCachedData: isCachedPrincipale } =
        await fetchBookings("principale");
      const { bookings: bookingsSecondario, isCachedData: isCachedSecondario } =
        await fetchBookings("secondario");
      const { bookings: bookingsTerziario, isCachedData: isCachedTerziario } =
        await fetchBookings("terziario");

      // Calcoliamo le singole statistiche per ogni appartamento
      const occupancyPrincipale = calculateOccupancyStats(
        bookingsPrincipale,
        year
      );
      const occupancySecondario = calculateOccupancyStats(
        bookingsSecondario,
        year
      );
      const occupancyTerziario = calculateOccupancyStats(
        bookingsTerziario,
        year
      );

      // Combiniamo tutti i bookings per calcolare le altre statistiche
      const allBookings = [
        ...bookingsPrincipale,
        ...bookingsSecondario,
        ...bookingsTerziario,
      ];
      // Aggiungiamo l'apartment come proprietà per distinguere i booking nella lista
      const allBookingsWithApartment = allBookings.map((booking) => {
        if (bookingsPrincipale.includes(booking))
          return { ...booking, apartment: "principale" };
        if (bookingsSecondario.includes(booking))
          return { ...booking, apartment: "secondario" };
        if (bookingsTerziario.includes(booking))
          return { ...booking, apartment: "terziario" };
        return booking;
      });

      // Calcoliamo l'occupazione combinata correttamente
      const combinedOccupancy = {
        // Il totale dei giorni è 365 * 3 (per i tre appartamenti)
        totalDays: occupancyPrincipale.totalDays * 3,
        // La somma dei giorni occupati nei tre appartamenti
        occupiedDays:
          occupancyPrincipale.occupiedDays +
          occupancySecondario.occupiedDays +
          occupancyTerziario.occupiedDays,
        // La percentuale corretta
        occupancyRate: parseFloat(
          (
            ((occupancyPrincipale.occupiedDays +
              occupancySecondario.occupiedDays +
              occupancyTerziario.occupiedDays) /
              (occupancyPrincipale.totalDays * 3)) *
            100
          ).toFixed(2)
        ),
        // Occupazione mensile media dai tre appartamenti
        monthlyOccupancy: monthNames.map((month, index) => {
          const ratePrincipale =
            occupancyPrincipale.monthlyOccupancy[index].rate;
          const rateSecondario =
            occupancySecondario.monthlyOccupancy[index].rate;
          const rateTerziario = occupancyTerziario.monthlyOccupancy[index].rate;
          // Media aritmetica delle percentuali di occupazione
          const avgRate = parseFloat(
            ((ratePrincipale + rateSecondario + rateTerziario) / 3).toFixed(2)
          );
          return {
            month,
            rate: avgRate,
          };
        }),
      };

      // Calcoliamo le altre statistiche sul set combinato
      const revenue = calculateRevenueStats(allBookingsWithApartment, year);
      const ota = calculateOTAStats(allBookingsWithApartment, year);
      const seasonality = calculateSeasonalityStats(
        allBookingsWithApartment,
        year
      );

      // Calcoliamo i mesi migliori e peggiori
      const monthlyData = monthNames.map((month, index) => {
        const occupancyRate = combinedOccupancy.monthlyOccupancy[index].rate;
        const monthlyRevenueEntry = revenue.monthlyRevenue.find((entry) =>
          entry.month.startsWith(month)
        );
        const monthRevenue = monthlyRevenueEntry
          ? monthlyRevenueEntry.revenue
          : 0;

        return {
          month,
          occupancyRate,
          revenue: monthRevenue,
        };
      });

      // Ordina per ricavi (decrescente)
      const sortedByRevenue = [...monthlyData].sort(
        (a, b) => b.revenue - a.revenue
      );

      const stats = {
        occupancy: combinedOccupancy,
        revenue,
        ota,
        seasonality,
        topMonths: sortedByRevenue.slice(0, 3), // I primi 3 mesi
        worstMonths: sortedByRevenue.slice(-3).reverse(), // Gli ultimi 3 mesi (dal peggiore al meno peggiore)
      };

      return {
        stats,
        isCachedData:
          isCachedPrincipale && isCachedSecondario && isCachedTerziario,
      };
    }

    // Gestione normale per la visualizzazione di un singolo appartamento
    const { bookings, isCachedData } = await fetchBookings(calendarType);

    // Calcola le diverse statistiche
    const occupancy = calculateOccupancyStats(bookings, year);
    const revenue = calculateRevenueStats(bookings, year);
    const ota = calculateOTAStats(bookings, year);
    const seasonality = calculateSeasonalityStats(bookings, year);

    // Calcola i mesi migliori e peggiori (combinando occupazione e ricavi)
    const monthlyData = monthNames.map((month, index) => {
      const occupancyRate = occupancy.monthlyOccupancy[index].rate;
      const monthlyRevenueEntry = revenue.monthlyRevenue.find((entry) =>
        entry.month.startsWith(month)
      );
      const monthRevenue = monthlyRevenueEntry
        ? monthlyRevenueEntry.revenue
        : 0;

      return {
        month,
        occupancyRate,
        revenue: monthRevenue,
      };
    });

    // Ordina per ricavi (decrescente)
    const sortedByRevenue = [...monthlyData].sort(
      (a, b) => b.revenue - a.revenue
    );

    const stats = {
      occupancy,
      revenue,
      ota,
      seasonality,
      topMonths: sortedByRevenue.slice(0, 3), // I primi 3 mesi
      worstMonths: sortedByRevenue.slice(-3).reverse(), // Gli ultimi 3 mesi (dal peggiore al meno peggiore)
    };

    return {
      stats,
      isCachedData,
    };
  } catch (error) {
    console.error("Errore durante il recupero delle statistiche:", error);

    // Restituisci dati vuoti in caso di errore
    const emptyStats = {
      occupancy: {
        totalDays: 365,
        occupiedDays: 0,
        occupancyRate: 0,
        monthlyOccupancy: monthNames.map((month) => ({ month, rate: 0 })),
      },
      revenue: {
        totalRevenue: 0,
        averagePerNight: 0,
        averagePerBooking: 0,
        monthlyRevenue: [],
        yearlyRevenue: [],
      },
      ota: {
        bookingCount: [],
        revenue: [],
        averagePerNight: [],
      },
      seasonality: {
        monthlyBookings: monthNames.map((month) => ({ month, count: 0 })),
        monthlyAvgPrice: monthNames.map((month) => ({ month, price: 0 })),
      },
      topMonths: [],
      worstMonths: [],
    };
    return { stats: emptyStats, isCachedData: false };
  }
};
