import { useState, useEffect } from "react";
import { Booking } from "@/types/calendar";
import {
  createBooking,
  CreateBookingData,
} from "@/services/localBookingService";
import { localStorageService } from "@/services/localStorageService";
import { addDays, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  // Pulisce la stringa da eventuali spazi
  const cleanDateString = dateString.trim();

  // Prova prima il formato DD/MM/YYYY
  const parts = cleanDateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Verifica che i valori siano validi
    if (
      !isNaN(day) &&
      !isNaN(month) &&
      !isNaN(year) &&
      day >= 1 &&
      day <= 31 &&
      month >= 1 &&
      month <= 12 &&
      year >= 1900
    ) {
      return new Date(year, month - 1, day);
    }
  }

  // Se il formato DD/MM/YYYY non funziona, prova ISO
  try {
    return parseISO(cleanDateString);
  } catch {
    return null;
  }
};

export const useBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadUpcomingBookings = () => {
    // Carica prenotazioni prossime (prossimi 7 giorni)
    const allBookings = localStorageService.getBookings();
    const today = new Date();
    const nextWeek = addDays(today, 7);

    const upcoming = allBookings
      .filter((booking) => {
        const checkInDate = parseDate(booking.CheckIn);
        const checkOutDate = parseDate(booking.CheckOut);
        return (
          (checkInDate && checkInDate >= today && checkInDate <= nextWeek) ||
          (checkOutDate && checkOutDate >= today && checkOutDate <= nextWeek)
        );
      })
      .sort((a, b) => {
        const dateA = parseDate(a.CheckIn) || new Date();
        const dateB = parseDate(b.CheckIn) || new Date();
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 6); // Mostra solo le prime 6

    setUpcomingBookings(upcoming);
  };

  useEffect(() => {
    loadUpcomingBookings();
  }, []);

  const createNewBooking = async (formData: CreateBookingData) => {
    try {
      setIsLoading(true);
      await createBooking(formData);
      toast({
        title: "Successo",
        description: "Prenotazione creata con successo",
        variant: "success",
      });
      loadUpcomingBookings();
      return true;
    } catch (error) {
      toast({
        title: "Errore",
        description:
          error instanceof Error ? error.message : "Errore nella creazione",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultBookingFormData = (apartmentId?: string): CreateBookingData => {
    return {
      Nome: "",
      OTA: "",
      CheckIn: "",
      CheckOut: "",
      Notti: "1",
      adulti: "2",
      bambini: "0",
      animali: "0",
      TotaleCliente: "0",
      FuoriOTA: "0",
      CostoNotti: "0",
      MediaANotte: "0",
      Pulizia: "0",
      Sconti: "0",
      SoggiornoTax: "0",
      OTATax: "0",
      CedolareSecca: "0",
      Totale: "0",
      Note: "",
      apartment: apartmentId || "",
    };
  };

  return {
    upcomingBookings,
    isLoading,
    loadUpcomingBookings,
    createNewBooking,
    getDefaultBookingFormData,
  };
};
