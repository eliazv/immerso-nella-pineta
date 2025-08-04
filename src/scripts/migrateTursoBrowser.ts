/**
 * Script per migrare i dati da Google Sheets a Turso - Versione Browser
 * Esegui dalla console del browser: import('./src/scripts/migrateTursoBrowser.ts').then(m => m.runMigration());
 */

import { fetchBookings as fetchFromSheets } from "../services/bookingService";
import { createBooking, initializeDatabase } from "../services/tursoService";
import { CalendarType } from "../types/calendar";

const APARTMENTS: CalendarType[] = ["principale", "secondario", "terziario"];

async function migrateApartment(apartment: CalendarType) {
  console.log(`🏠 Migrating ${apartment}...`);
  
  try {
    // Ottieni dati da Google Sheets
    const { bookings } = await fetchFromSheets(apartment);
    console.log(`📋 Found ${bookings.length} bookings in ${apartment}`);

    if (bookings.length === 0) {
      console.log(`✅ No bookings to migrate for ${apartment}`);
      return { success: 0, failed: 0 };
    }

    let success = 0;
    let failed = 0;

    // Migra ogni singola prenotazione
    for (const booking of bookings) {
      try {
        const result = await createBooking(booking, apartment);
        if (result) {
          success++;
          console.log(`✅ Migrated: ${booking.Nome} (${booking.CheckIn} - ${booking.CheckOut})`);
        } else {
          failed++;
          console.log(`❌ Failed to migrate: ${booking.Nome}`);
        }
      } catch (error) {
        failed++;
        console.log(`❌ Error migrating ${booking.Nome}:`, error);
      }

      // Piccola pausa per non sovraccaricare il database
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`📊 ${apartment}: ${success} successi, ${failed} fallimenti`);
    return { success, failed };

  } catch (error) {
    console.error(`❌ Error migrating ${apartment}:`, error);
    return { success: 0, failed: 0 };
  }
}

export async function runMigration() {
  console.log("🚀 Starting migration from Google Sheets to Turso...");
  
  try {
    // Verifica credenziali
    const tursoUrl = import.meta.env.VITE_TURSO_DATABASE_URL;
    const tursoToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

    if (!tursoUrl || !tursoToken || tursoUrl.includes('[IL-TUO-USERNAME]') || tursoToken.includes('[IL-TUO-TOKEN]')) {
      console.error("❌ Missing or incomplete Turso credentials!");
      console.error("Please check your .env.local file");
      return;
    }

    console.log("✅ Turso credentials found");
    console.log(`📍 Database URL: ${tursoUrl}`);

    // Inizializza il database
    console.log("🔧 Initializing Turso database...");
    await initializeDatabase();
    console.log("✅ Database initialized");

    let totalSuccess = 0;
    let totalFailed = 0;

    // Migra ogni appartamento
    for (const apartment of APARTMENTS) {
      const result = await migrateApartment(apartment);
      totalSuccess += result.success;
      totalFailed += result.failed;
    }

    console.log("\n🎉 Migration completed!");
    console.log(`📊 Total: ${totalSuccess} migrated, ${totalFailed} failed`);

    if (totalFailed === 0) {
      console.log("✅ All bookings migrated successfully!");
      console.log("\n🔄 Next steps:");
      console.log("   1. Refresh the calendar page to see migrated data");
      console.log("   2. Test adding/editing/deleting bookings");
      console.log("   3. Migration is complete! 🎉");
    } else {
      console.log(`⚠️  ${totalFailed} bookings failed to migrate. Check the logs above.`);
    }

  } catch (error) {
    console.error("💥 Fatal error during migration:", error);
  }
}

export { migrateApartment };