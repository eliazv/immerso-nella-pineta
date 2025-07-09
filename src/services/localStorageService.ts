import {
  Apartment,
  Booking,
  CalendarType,
  APARTMENT_MAPPING,
} from "@/types/calendar";

// Chiavi per localStorage
const STORAGE_KEYS = {
  APARTMENTS: "immerso_apartments",
  BOOKINGS: "immerso_bookings",
  INITIALIZED: "immerso_initialized",
} as const;

// Interfaccia per i dati dello store
interface LocalStoreData {
  apartments: Apartment[];
  bookings: Booking[];
  lastUpdated: string;
}

/**
 * Servizio per gestire lo storage locale dei dati
 * Sostituisce Google Sheets con localStorage per funzionamento offline
 */
class LocalStorageService {
  /**
   * Inizializza lo store con dati di default se non esistono
   */
  public initializeStore(): void {
    if (!this.isInitialized()) {
      this.createDefaultApartments();
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
    }
  }

  /**
   * Verifica se lo store è già stato inizializzato
   */
  private isInitialized(): boolean {
    return localStorage.getItem(STORAGE_KEYS.INITIALIZED) === "true";
  }

  /**
   * Crea gli appartamenti di default basati sulla configurazione esistente
   */
  private createDefaultApartments(): void {
    const defaultApartments: Apartment[] = [
      {
        id: "apt-3",
        name: "N° 3",
        description: "Appartamento principale",
        maxGuests: 4,
        basePrice: 0,
        cleaningFee: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "#3DA9A9", // Petrolio
        icon: "Home",
      },
      {
        id: "apt-4",
        name: "N° 4",
        description: "Appartamento secondario",
        maxGuests: 4,
        basePrice: 0,
        cleaningFee: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "#60D394", // Accent verde
        icon: "Building",
      },
      {
        id: "apt-8",
        name: "N° 8",
        description: "Appartamento terziario",
        maxGuests: 4,
        basePrice: 0,
        cleaningFee: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "#FF6B6B", // Coral red
        icon: "Castle",
      },
    ];

    this.saveApartments(defaultApartments);

    // Inizializza anche un array vuoto per le prenotazioni
    this.saveBookings([]);
  }

  // ==================== GESTIONE APPARTAMENTI ====================

  /**
   * Recupera tutti gli appartamenti
   */
  public getApartments(): Apartment[] {
    const stored = localStorage.getItem(STORAGE_KEYS.APARTMENTS);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Recupera un appartamento per ID
   */
  public getApartmentById(id: string): Apartment | null {
    const apartments = this.getApartments();
    return apartments.find((apt) => apt.id === id) || null;
  }

  /**
   * Recupera un appartamento per CalendarType (compatibilità)
   */
  public getApartmentByCalendarType(
    calendarType: CalendarType
  ): Apartment | null {
    if (calendarType === "all") return null;
    const apartmentId = APARTMENT_MAPPING[calendarType];
    return this.getApartmentById(apartmentId);
  }

  /**
   * Salva un nuovo appartamento
   */
  public addApartment(
    apartment: Omit<Apartment, "id" | "createdAt" | "updatedAt">
  ): Apartment {
    const apartments = this.getApartments();
    const newApartment: Apartment = {
      ...apartment,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    apartments.push(newApartment);
    this.saveApartments(apartments);
    return newApartment;
  }

  /**
   * Aggiorna un appartamento esistente
   */
  public updateApartment(
    id: string,
    updates: Partial<Omit<Apartment, "id" | "createdAt">>
  ): boolean {
    const apartments = this.getApartments();
    const index = apartments.findIndex((apt) => apt.id === id);

    if (index === -1) return false;

    apartments[index] = {
      ...apartments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveApartments(apartments);
    return true;
  }

  /**
   * Elimina un appartamento
   */
  public deleteApartment(id: string): boolean {
    const apartments = this.getApartments();
    const filteredApartments = apartments.filter((apt) => apt.id !== id);

    if (filteredApartments.length === apartments.length) return false;

    // Elimina anche tutte le prenotazioni associate
    const bookings = this.getBookings();
    const filteredBookings = bookings.filter(
      (booking) => booking.apartment !== id
    );
    this.saveBookings(filteredBookings);

    this.saveApartments(filteredApartments);
    return true;
  }

  /**
   * Salva gli appartamenti nel localStorage
   */
  private saveApartments(apartments: Apartment[]): void {
    localStorage.setItem(STORAGE_KEYS.APARTMENTS, JSON.stringify(apartments));
  }

  // ==================== GESTIONE PRENOTAZIONI ====================

  /**
   * Recupera tutte le prenotazioni
   */
  public getBookings(): Booking[] {
    const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Recupera prenotazioni per un appartamento specifico
   */
  public getBookingsByApartment(apartmentId: string): Booking[] {
    const bookings = this.getBookings();
    return bookings.filter((booking) => booking.apartment === apartmentId);
  }

  /**
   * Recupera prenotazioni per CalendarType (compatibilità)
   */
  public getBookingsByCalendarType(calendarType: CalendarType): Booking[] {
    if (calendarType === "all") {
      return this.getBookings();
    }
    const apartmentId = APARTMENT_MAPPING[calendarType];
    return this.getBookingsByApartment(apartmentId);
  }

  /**
   * Recupera una prenotazione per ID
   */
  public getBookingById(id: string): Booking | null {
    const bookings = this.getBookings();
    return bookings.find((booking) => booking.id === id) || null;
  }

  /**
   * Salva una nuova prenotazione
   */
  public addBooking(booking: Omit<Booking, "id">): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: this.generateId(),
    };

    bookings.push(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  }

  /**
   * Aggiorna una prenotazione esistente
   */
  public updateBooking(
    id: string,
    updates: Partial<Omit<Booking, "id">>
  ): boolean {
    const bookings = this.getBookings();
    const index = bookings.findIndex((booking) => booking.id === id);

    if (index === -1) return false;

    bookings[index] = {
      ...bookings[index],
      ...updates,
    };

    this.saveBookings(bookings);
    return true;
  }

  /**
   * Elimina una prenotazione
   */
  public deleteBooking(id: string): boolean {
    const bookings = this.getBookings();
    const filteredBookings = bookings.filter((booking) => booking.id !== id);

    if (filteredBookings.length === bookings.length) return false;

    this.saveBookings(filteredBookings);
    return true;
  }

  /**
   * Salva le prenotazioni nel localStorage
   */
  private saveBookings(bookings: Booking[]): void {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }

  // ==================== UTILITY ====================

  /**
   * Genera un ID univoco
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Pulisce completamente lo store (per debug/reset)
   */
  public clearStore(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Esporta tutti i dati dello store
   */
  public exportData(): LocalStoreData {
    return {
      apartments: this.getApartments(),
      bookings: this.getBookings(),
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Importa dati nello store
   */
  public importData(data: LocalStoreData): void {
    this.saveApartments(data.apartments);
    this.saveBookings(data.bookings);
  }
}

// Esporta un'istanza singleton
export const localStorageService = new LocalStorageService();
export default localStorageService;
