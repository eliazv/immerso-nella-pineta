import { useState, useEffect, useCallback } from "react";
import { DocumentSnapshot, Timestamp } from "firebase/firestore";
import { firebaseBookingService } from "@/services/firebaseBookingService";
import {
  Booking,
  BookingFilters,
  BookingSortOptions,
  Property,
} from "@/types/firebase";

export interface UseBookingsResult {
  bookings: Booking[];
  properties: Property[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;

  // Azioni
  loadBookings: (reset?: boolean) => Promise<void>;
  createBooking: (
    booking: Omit<Booking, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  updateTaxStatus: (
    id: string,
    isPaid: boolean,
    paymentDate?: Date
  ) => Promise<void>;

  // Filtri e ordinamento
  filters: BookingFilters;
  setFilters: (filters: BookingFilters) => void;
  sortOptions: BookingSortOptions;
  setSortOptions: (options: BookingSortOptions) => void;

  // Statistiche rapide
  totalBookings: number;
  bookingsWithTaxDue: number;
  todayCheckIns: number;
  todayCheckOuts: number;
}

export const useBookings = (
  initialFilters: BookingFilters = {}
): UseBookingsResult => {
  // Stati
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>();

  // Filtri e ordinamento
  const [filters, setFilters] = useState<BookingFilters>(initialFilters);
  const [sortOptions, setSortOptions] = useState<BookingSortOptions>({
    field: "checkInDate",
    direction: "desc",
  });

  // Carica le proprietà una volta sola
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const props = await firebaseBookingService.getProperties();
        setProperties(props);
      } catch (err) {
        console.error("Errore caricamento proprietà:", err);
      }
    };

    loadProperties();
  }, []);

  // Funzione per caricare le prenotazioni
  const loadBookings = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);

        const { bookings: newBookings, lastDoc: newLastDoc } =
          await firebaseBookingService.getBookings(
            filters,
            sortOptions,
            50,
            reset ? undefined : lastDoc
          );

        if (reset) {
          setBookings(newBookings);
        } else {
          setBookings((prev) => [...prev, ...newBookings]);
        }

        setLastDoc(newLastDoc);
        setHasMore(newBookings.length === 50);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    },
    [filters, sortOptions, lastDoc]
  );

  // Ricarica quando cambiano filtri o ordinamento
  useEffect(() => {
    setLastDoc(undefined);
    loadBookings(true);
  }, [filters, sortOptions, loadBookings]);

  // Azioni CRUD
  const createBooking = useCallback(
    async (bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt">) => {
      try {
        setLoading(true);
        setError(null);

        const id = await firebaseBookingService.createBooking(bookingData);

        // Ricarica la lista per includere la nuova prenotazione
        await loadBookings(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Errore creazione prenotazione"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadBookings]
  );

  const updateBooking = useCallback(
    async (id: string, updates: Partial<Booking>) => {
      try {
        await firebaseBookingService.updateBooking(id, updates);

        // Aggiorna la prenotazione nella lista locale
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, ...updates } : booking
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Errore aggiornamento prenotazione"
        );
        throw err;
      }
    },
    []
  );

  const deleteBooking = useCallback(async (id: string) => {
    try {
      await firebaseBookingService.deleteBooking(id);

      // Rimuovi dalla lista locale
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore cancellazione prenotazione"
      );
      throw err;
    }
  }, []);

  const updateTaxStatus = useCallback(
    async (id: string, isPaid: boolean, paymentDate?: Date) => {
      try {
        await firebaseBookingService.updateTaxStatus(id, isPaid, paymentDate);

        // Aggiorna la prenotazione nella lista locale
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id
              ? {
                  ...booking,
                  tassaSoggiornoPagata: isPaid,
                  dataPagamentoTassa: paymentDate
                    ? Timestamp.fromDate(paymentDate)
                    : undefined,
                }
              : booking
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Errore aggiornamento tassa"
        );
        throw err;
      }
    },
    []
  );

  // Statistiche rapide calcolate dai dati locali
  const totalBookings = bookings.length;
  const bookingsWithTaxDue = bookings.filter(
    (b) => !b.tassaSoggiornoPagata
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayCheckIns = bookings.filter((b) => {
    const checkIn = b.checkInDate.toDate();
    return checkIn >= today && checkIn < tomorrow;
  }).length;

  const todayCheckOuts = bookings.filter((b) => {
    const checkOut = b.checkOutDate.toDate();
    return checkOut >= today && checkOut < tomorrow;
  }).length;

  return {
    bookings,
    properties,
    loading,
    error,
    hasMore,

    loadBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    updateTaxStatus,

    filters,
    setFilters,
    sortOptions,
    setSortOptions,

    totalBookings,
    bookingsWithTaxDue,
    todayCheckIns,
    todayCheckOuts,
  };
};
