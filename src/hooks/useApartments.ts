import { useState, useEffect, useCallback, useMemo } from "react";
import { Apartment } from "@/types/calendar";
import {
  getActiveApartments,
  getApartmentStats,
  createApartment,
  CreateApartmentData,
} from "@/services/apartmentService";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";

export const useApartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    inactive: number;
    totalCapacity: number;
    averagePrice: number;
  } | null>(null);
  const createApartmentOperation = useAsyncOperation({
    successMessage: "Alloggio creato con successo",
    errorMessage: "Errore durante la creazione dell'alloggio",
  });

  const loadApartments = useCallback(() => {
    const apartmentList = getActiveApartments();
    setApartments(apartmentList);

    const apartmentStats = getApartmentStats();
    setStats(apartmentStats);
  }, []);

  useEffect(() => {
    loadApartments();
  }, []);

  const getNextAvailableIconColor = useMemo(() => {
    const availableIcons = [
      "Home",
      "Building",
      "Castle",
      "House",
      "Building2",
      "TreePine",
      "Waves",
      "Mountain",
      "Sun",
      "Star",
    ];

    const availableColors = [
      "#3DA9A9", // teal
      "#37474F", // slate gray
      "#60D394", // mint green
      "#FF6B6B", // coral red
      "#4ECDC4", // turquoise
      "#45B7D1", // sky blue
      "#96CEB4", // sage green
      "#FFEAA7", // light yellow
      "#DDA0DD", // plum
      "#F39C12", // orange
    ];

    // Ottieni le combinazioni già utilizzate
    const usedCombinations = apartments.map(
      (apt) => `${apt.icon}-${apt.color}`
    );

    // Trova la prima combinazione disponibile
    for (const icon of availableIcons) {
      for (const color of availableColors) {
        const combination = `${icon}-${color}`;
        if (!usedCombinations.includes(combination)) {
          return { icon, color };
        }
      }
    }

    // Se tutte le combinazioni sono utilizzate, usa valori di default
    return { icon: "Home", color: "#3DA9A9" };
  }, [apartments]);

  const createNewApartment = useCallback(
    async (formData: CreateApartmentData) => {
      const result = await createApartmentOperation.execute(async () => {
        await createApartment(formData);
        loadApartments();
        return true;
      });
      return result !== null;
    },
    [createApartmentOperation, loadApartments]
  );

  const getDefaultFormData = useCallback((): CreateApartmentData => {
    const { icon, color } = getNextAvailableIconColor;
    return {
      name: "",
      description: "",
      maxGuests: 4,
      address: "",
      amenities: [],
      basePrice: 0,
      cleaningFee: 0,
      isActive: true,
      color,
      icon,
    };
  }, [getNextAvailableIconColor]);

  return {
    apartments,
    stats,
    isLoading: createApartmentOperation.isLoading,
    loadApartments,
    createNewApartment,
    getDefaultFormData,
  };
};
