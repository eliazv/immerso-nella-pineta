/**
 * Script per migrare i dati da Google Sheets a Turso
 * Questo script deve essere eseguito una sola volta per trasferire tutti i dati esistenti
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

async function runMigration() {
  console.log("🚀 Starting migration from Google Sheets to Turso...");
  
  try {
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
      console.log("1. Update your .env.local with Turso credentials");
      console.log("2. Test the calendar to ensure everything works");
      console.log("3. Switch the BookingModal to use newBookingService");
      console.log("4. Remove the old Google Sheets service once confident");
    } else {
      console.log(`⚠️  ${totalFailed} bookings failed to migrate. Check the logs above.`);
    }

  } catch (error) {
    console.error("💥 Fatal error during migration:", error);
    process.exit(1);
  }
}

// Verifica delle credenziali prima della migrazione
function checkCredentials() {
  const tursoUrl = import.meta.env.VITE_TURSO_DATABASE_URL;
  const tursoToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

  if (!tursoUrl || !tursoToken) {
    console.error("❌ Missing Turso credentials!");
    console.error("Please set VITE_TURSO_DATABASE_URL and VITE_TURSO_AUTH_TOKEN in your .env.local file");
    console.error("\nExample:");
    console.error("VITE_TURSO_DATABASE_URL=libsql://your-database.turso.io");
    console.error("VITE_TURSO_AUTH_TOKEN=eyJ0eXAiOiJKV1Q...");
    process.exit(1);
  }

  console.log("✅ Turso credentials found");
  console.log(`📍 Database URL: ${tursoUrl}`);
}

// Esegui la migrazione solo se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  checkCredentials();
  runMigration();
}

export { runMigration, migrateApartment };