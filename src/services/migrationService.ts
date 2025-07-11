import axios from "axios";
import { Booking, CalendarType } from "@/types/calendar";
import { localStorageService } from "./localStorageService";

/**
 * Servizio per migrare i dati da Google Sheets allo store locale
 * Questo servizio è opzionale e serve per importare dati esistenti
 */

// Base URL per l'API Google Sheets (lettura)
const BASE_URL = "https://opensheet.elk.sh/";
const SPREADSHEET_ID = "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc";

// Mapping dei fogli per ogni calendario (solo per migrazione legacy)
const SHEET_MAPPING: Record<string, string> = {
  principale: "Affitti3",
  secondario: "Affitti4",
  terziario: "Affitti8",
};

// Mapping legacy per la migrazione - assegna agli appartamenti esistenti
const getApartmentIdForMigration = (legacyType: string): string => {
  const apartments = localStorageService.getApartments();

  // Se non ci sono appartamenti, restituisce un ID temporaneo
  if (apartments.length === 0) {
    return "temp-" + legacyType;
  }

  // Assegna in base all'ordine degli appartamenti esistenti
  switch (legacyType) {
    case "principale":
      return apartments[0]?.id || "temp-principale";
    case "secondario":
      return apartments[1]?.id || apartments[0]?.id || "temp-secondario";
    case "terziario":
      return apartments[2]?.id || apartments[0]?.id || "temp-terziario";
    default:
      return apartments[0]?.id || "temp-unknown";
  }
};

/**
 * Migra le prenotazioni da Google Sheets per un singolo calendario
 */
export const migrateBookingsFromSheet = async (
  calendarType: CalendarType
): Promise<number> => {
  if (calendarType === "all") {
    throw new Error(
      "Impossibile migrare per il tipo 'all'. Usa i singoli calendari."
    );
  }

  try {
    const sheet = SHEET_MAPPING[calendarType];
    const url = `${BASE_URL}${SPREADSHEET_ID}/${sheet}`;

    console.log(`Migrazione prenotazioni da: ${url}`);

    const response = await axios.get(url);
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Formato dati non valido ricevuto da Google Sheets");
    }

    // Filtra e converte i dati
    const validBookings: Booking[] = data
      .filter((row: Record<string, string>) => {
        // Filtra le righe con dati validi
        return (
          row["Nome"] &&
          row["Nome"].trim() !== "" &&
          row["Check-in"] &&
          row["Check-out"]
        );
      })
      .map((row: Record<string, string>, index: number) => ({
        Nome: row["Nome"] || "",
        OTA: row["OTA"] || "",
        CheckIn: row["Check-in"] || "",
        CheckOut: row["Check-out"] || "",
        Notti: row["Notti"] || "1",
        adulti: row["adulti"] || "2",
        bambini: row["bambini"] || "0",
        animali: row["animali"] || "0",
        TotaleCliente: row["TotaleCliente"] || "0",
        FuoriOTA: row["FuoriOTA"] || "0",
        CostoNotti: row["CostoNotti"] || "0",
        MediaANotte: row["MediaANotte"] || "0",
        Pulizia: row["Pulizia"] || "0",
        Sconti: row["Sconti"] || "0",
        SoggiornoTax: row["SoggiornoTax"] || "0",
        OTATax: row["OTATax"] || "0",
        CedolareSecca: row["CedolareSecca"] || "0",
        Totale: row["Totale"] || "0",
        Note: row["Note"] || "",
        apartment: getApartmentIdForMigration(calendarType),
        rowIndex: index + 2, // +2 perché la prima riga è l'header e gli indici partono da 1
      }));

    console.log(
      `Trovate ${validBookings.length} prenotazioni valide per ${calendarType}`
    );

    // Salva le prenotazioni nello store locale
    let migratedCount = 0;
    for (const booking of validBookings) {
      try {
        // Verifica se la prenotazione esiste già (per evitare duplicati)
        const existingBookings = localStorageService.getBookingsByApartment(
          booking.apartment!
        );
        const exists = existingBookings.some(
          (existing) =>
            existing.Nome === booking.Nome &&
            existing.CheckIn === booking.CheckIn &&
            existing.CheckOut === booking.CheckOut
        );

        if (!exists) {
          localStorageService.addBooking(booking);
          migratedCount++;
        } else {
          console.log(
            `Prenotazione già esistente: ${booking.Nome} (${booking.CheckIn} - ${booking.CheckOut})`
          );
        }
      } catch (error) {
        console.error(
          `Errore nella migrazione della prenotazione ${booking.Nome}:`,
          error
        );
      }
    }

    console.log(`Migrate ${migratedCount} prenotazioni per ${calendarType}`);
    return migratedCount;
  } catch (error) {
    console.error(`Errore nella migrazione per ${calendarType}:`, error);
    throw error;
  }
};

/**
 * Migra tutte le prenotazioni da tutti i calendari
 */
export const migrateAllBookings = async (): Promise<{
  principale: number;
  secondario: number;
  terziario: number;
  total: number;
}> => {
  const results = {
    principale: 0,
    secondario: 0,
    terziario: 0,
    total: 0,
  };

  try {
    // Migra ogni calendario sequenzialmente per evitare sovraccarico
    results.principale = await migrateBookingsFromSheet("principale");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Pausa di 1 secondo

    results.secondario = await migrateBookingsFromSheet("secondario");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Pausa di 1 secondo

    results.terziario = await migrateBookingsFromSheet("terziario");

    results.total = results.principale + results.secondario + results.terziario;

    console.log("Migrazione completata:", results);
    return results;
  } catch (error) {
    console.error("Errore nella migrazione completa:", error);
    throw error;
  }
};

/**
 * Pulisce tutte le prenotazioni esistenti nello store locale
 * ATTENZIONE: Questa operazione è irreversibile
 */
export const clearAllBookings = (): void => {
  const bookings = localStorageService.getBookings();
  console.log(`Eliminazione di ${bookings.length} prenotazioni esistenti...`);

  // Salva un backup prima di eliminare
  const backup = {
    timestamp: new Date().toISOString(),
    bookings: bookings,
  };
  localStorage.setItem("migration_backup", JSON.stringify(backup));

  // Elimina tutte le prenotazioni
  bookings.forEach((booking) => {
    if (booking.id) {
      localStorageService.deleteBooking(booking.id);
    }
  });

  console.log(
    "Tutte le prenotazioni sono state eliminate. Backup salvato in 'migration_backup'."
  );
};

/**
 * Ripristina le prenotazioni dal backup
 */
export const restoreFromBackup = (): boolean => {
  try {
    const backupData = localStorage.getItem("migration_backup");
    if (!backupData) {
      console.error("Nessun backup trovato");
      return false;
    }

    const backup = JSON.parse(backupData);
    const bookings: Booking[] = backup.bookings;

    console.log(`Ripristino di ${bookings.length} prenotazioni dal backup...`);

    bookings.forEach((booking) => {
      // Rimuovi l'ID per forzare la creazione di un nuovo ID
      const { id, ...bookingData } = booking;
      localStorageService.addBooking(bookingData);
    });

    console.log("Ripristino completato");
    return true;
  } catch (error) {
    console.error("Errore nel ripristino dal backup:", error);
    return false;
  }
};

/**
 * Ottiene statistiche sulla migrazione
 */
export const getMigrationStats = () => {
  const apartments = localStorageService.getApartments();
  const bookings = localStorageService.getBookings();

  const stats = {
    apartments: apartments.length,
    totalBookings: bookings.length,
    bookingsByApartment: {} as Record<string, number>,
  };

  apartments.forEach((apartment) => {
    const apartmentBookings = localStorageService.getBookingsByApartment(
      apartment.id
    );
    stats.bookingsByApartment[apartment.name] = apartmentBookings.length;
  });

  return stats;
};

/**
 * Valida i dati migrati
 */
export const validateMigratedData = (): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const bookings = localStorageService.getBookings();
  const apartments = localStorageService.getApartments();

  // Verifica che ci siano appartamenti
  if (apartments.length === 0) {
    errors.push("Nessun appartamento trovato");
  }

  // Verifica integrità delle prenotazioni
  bookings.forEach((booking, index) => {
    if (!booking.Nome || booking.Nome.trim() === "") {
      errors.push(`Prenotazione ${index + 1}: Nome mancante`);
    }

    if (!booking.CheckIn || !booking.CheckOut) {
      errors.push(
        `Prenotazione ${index + 1}: Date check-in/check-out mancanti`
      );
    }

    if (!booking.apartment) {
      warnings.push(
        `Prenotazione ${booking.Nome}: Appartamento non specificato`
      );
    } else {
      const apartment = localStorageService.getApartmentById(booking.apartment);
      if (!apartment) {
        errors.push(
          `Prenotazione ${booking.Nome}: Appartamento ${booking.apartment} non trovato`
        );
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};
