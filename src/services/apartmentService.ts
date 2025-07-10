import { Apartment, CalendarType } from "@/types/calendar";
import { localStorageService } from "./localStorageService";

/**
 * Servizio per la gestione degli appartamenti
 * Fornisce un'interfaccia semplificata per le operazioni CRUD sugli appartamenti
 */

// Interfaccia per i dati di creazione appartamento
export interface CreateApartmentData {
  name: string;
  description?: string;
  maxGuests: number;
  address?: string;
  amenities?: string[];
  basePrice?: number;
  cleaningFee?: number;
  isActive?: boolean;
  color?: string;
  icon?: string;
}

// Interfaccia per i dati di aggiornamento appartamento
export interface UpdateApartmentData {
  name?: string;
  description?: string;
  maxGuests?: number;
  address?: string;
  amenities?: string[];
  basePrice?: number;
  cleaningFee?: number;
  isActive?: boolean;
  color?: string;
  icon?: string;
}

/**
 * Recupera tutti gli appartamenti attivi
 */
export const getActiveApartments = (): Apartment[] => {
  return localStorageService.getApartments().filter((apt) => apt.isActive);
};

/**
 * Recupera tutti gli appartamenti (attivi e non)
 */
export const getAllApartments = (): Apartment[] => {
  return localStorageService.getApartments();
};

/**
 * Recupera un appartamento per ID
 */
export const getApartmentById = (id: string): Apartment | null => {
  return localStorageService.getApartmentById(id);
};

/**
 * Recupera un appartamento per CalendarType (compatibilità con sistema esistente)
 */
export const getApartmentByCalendarType = (
  calendarType: CalendarType
): Apartment | null => {
  return localStorageService.getApartmentByCalendarType(calendarType);
};

/**
 * Crea un nuovo appartamento
 */
export const createApartment = (data: CreateApartmentData): Apartment => {
  // Validazione dati
  if (!data.name.trim()) {
    throw new Error("Il nome dell'appartamento è obbligatorio");
  }

  if (data.maxGuests <= 0) {
    throw new Error("Il numero massimo di ospiti deve essere maggiore di 0");
  }

  // Verifica che non esista già un appartamento con lo stesso nome
  const existingApartments = localStorageService.getApartments();
  const nameExists = existingApartments.some(
    (apt) => apt.name.toLowerCase() === data.name.toLowerCase()
  );

  if (nameExists) {
    throw new Error("Esiste già un appartamento con questo nome");
  }

  const apartmentData = {
    name: data.name.trim(),
    description: data.description?.trim() || "",
    maxGuests: data.maxGuests,
    address: data.address?.trim() || "",
    amenities: data.amenities || [],
    basePrice: data.basePrice || 0,
    cleaningFee: data.cleaningFee || 0,
    isActive: data.isActive !== undefined ? data.isActive : true,
    color: data.color || "#3DA9A9",
    icon: data.icon || "Home",
  };

  return localStorageService.addApartment(apartmentData);
};

/**
 * Aggiorna un appartamento esistente
 */
export const updateApartment = (
  id: string,
  data: UpdateApartmentData
): boolean => {
  // Verifica che l'appartamento esista
  const existingApartment = localStorageService.getApartmentById(id);
  if (!existingApartment) {
    throw new Error("Appartamento non trovato");
  }

  // Validazione dati se forniti
  if (data.name !== undefined) {
    if (!data.name.trim()) {
      throw new Error("Il nome dell'appartamento non può essere vuoto");
    }

    // Verifica che non esista già un altro appartamento con lo stesso nome
    const existingApartments = localStorageService.getApartments();
    const nameExists = existingApartments.some(
      (apt) =>
        apt.id !== id && apt.name.toLowerCase() === data.name!.toLowerCase()
    );

    if (nameExists) {
      throw new Error("Esiste già un appartamento con questo nome");
    }
  }

  if (data.maxGuests !== undefined && data.maxGuests <= 0) {
    throw new Error("Il numero massimo di ospiti deve essere maggiore di 0");
  }

  // Prepara i dati per l'aggiornamento
  const updateData: Partial<Apartment> = {};

  if (data.name !== undefined) updateData.name = data.name.trim();
  if (data.description !== undefined)
    updateData.description = data.description.trim();
  if (data.maxGuests !== undefined) updateData.maxGuests = data.maxGuests;
  if (data.address !== undefined) updateData.address = data.address.trim();
  if (data.amenities !== undefined) updateData.amenities = data.amenities;
  if (data.basePrice !== undefined) updateData.basePrice = data.basePrice;
  if (data.cleaningFee !== undefined) updateData.cleaningFee = data.cleaningFee;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  return localStorageService.updateApartment(id, updateData);
};

/**
 * Elimina un appartamento
 * ATTENZIONE: Elimina anche tutte le prenotazioni associate
 */
export const deleteApartment = (id: string): boolean => {
  // Verifica che l'appartamento esista
  const existingApartment = localStorageService.getApartmentById(id);
  if (!existingApartment) {
    throw new Error("Appartamento non trovato");
  }

  // Verifica se ci sono prenotazioni associate
  const bookings = localStorageService.getBookingsByApartment(id);
  if (bookings.length > 0) {
    // Potresti voler impedire l'eliminazione se ci sono prenotazioni
    // o chiedere conferma all'utente
    console.warn(
      `Eliminazione appartamento ${id}: verranno eliminate anche ${bookings.length} prenotazioni associate`
    );
  }

  return localStorageService.deleteApartment(id);
};

/**
 * Disattiva un appartamento (soft delete)
 */
export const deactivateApartment = (id: string): boolean => {
  return updateApartment(id, { isActive: false });
};

/**
 * Riattiva un appartamento
 */
export const activateApartment = (id: string): boolean => {
  return updateApartment(id, { isActive: true });
};

/**
 * Recupera statistiche sugli appartamenti
 */
export const getApartmentStats = () => {
  const apartments = localStorageService.getApartments();
  const activeApartments = apartments.filter((apt) => apt.isActive);

  return {
    total: apartments.length,
    active: activeApartments.length,
    inactive: apartments.length - activeApartments.length,
    totalCapacity: activeApartments.reduce(
      (sum, apt) => sum + apt.maxGuests,
      0
    ),
    averagePrice:
      activeApartments.length > 0
        ? activeApartments.reduce((sum, apt) => sum + (apt.basePrice || 0), 0) /
          activeApartments.length
        : 0,
  };
};

/**
 * Cerca appartamenti per nome o descrizione
 */
export const searchApartments = (query: string): Apartment[] => {
  if (!query.trim()) return getAllApartments();

  const searchTerm = query.toLowerCase().trim();
  return localStorageService
    .getApartments()
    .filter(
      (apt) =>
        apt.name.toLowerCase().includes(searchTerm) ||
        (apt.description &&
          apt.description.toLowerCase().includes(searchTerm)) ||
        (apt.address && apt.address.toLowerCase().includes(searchTerm))
    );
};

/**
 * Valida i dati di un appartamento
 */
export const validateApartmentData = (
  data: CreateApartmentData | UpdateApartmentData
): string[] => {
  const errors: string[] = [];

  if ("name" in data && data.name !== undefined) {
    if (!data.name.trim()) {
      errors.push("Il nome dell'appartamento è obbligatorio");
    }
  }

  if ("maxGuests" in data && data.maxGuests !== undefined) {
    if (data.maxGuests <= 0) {
      errors.push("Il numero massimo di ospiti deve essere maggiore di 0");
    }
    if (data.maxGuests > 20) {
      errors.push("Il numero massimo di ospiti non può superare 20");
    }
  }

  if ("basePrice" in data && data.basePrice !== undefined) {
    if (data.basePrice < 0) {
      errors.push("Il prezzo base non può essere negativo");
    }
  }

  if ("cleaningFee" in data && data.cleaningFee !== undefined) {
    if (data.cleaningFee < 0) {
      errors.push("Il costo di pulizia non può essere negativo");
    }
  }

  return errors;
};
