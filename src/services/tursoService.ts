import { createClient } from "@libsql/client";
import { Booking, CalendarType } from "@/types/calendar";

// Configurazione client Turso
const client = createClient({
  url: import.meta.env.VITE_TURSO_DATABASE_URL || "file:local.db", // Fallback a SQLite locale
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
});

// Interfaccia per il database - mantengo compatibilità con i nomi esistenti
interface DatabaseBooking {
  id?: number;
  apartment: string;
  nome: string;
  ota?: string;
  check_in?: string;
  check_out?: string;
  notti?: string;
  adulti?: string;
  bambini?: string;
  animali?: string;
  totale_cliente?: string;
  fuori_ota?: string;
  costo_notti?: string;
  media_a_notte?: string;
  pulizia?: string;
  sconti?: string;
  soggiorno_tax?: string;
  soggiorno_tax_riscossa?: string;
  ota_tax?: string;
  cedolare_secca?: string;
  totale?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
}

// Converte da formato database a formato componenti
function dbBookingToBooking(dbBooking: DatabaseBooking): Booking {
  return {
    Nome: dbBooking.nome,
    OTA: dbBooking.ota || "",
    CheckIn: dbBooking.check_in || "",
    CheckOut: dbBooking.check_out || "",
    Notti: dbBooking.notti || "",
    adulti: dbBooking.adulti || "",
    bambini: dbBooking.bambini || "",
    animali: dbBooking.animali || "",
    TotaleCliente: dbBooking.totale_cliente || "",
    FuoriOTA: dbBooking.fuori_ota || "",
    CostoNotti: dbBooking.costo_notti || "",
    MediaANotte: dbBooking.media_a_notte || "",
    Pulizia: dbBooking.pulizia || "",
    Sconti: dbBooking.sconti || "",
    SoggiornoTax: dbBooking.soggiorno_tax || "",
    SoggiornoTaxRiscossa: dbBooking.soggiorno_tax_riscossa || "",
    OTATax: dbBooking.ota_tax || "",
    CedolareSecca: dbBooking.cedolare_secca || "",
    Totale: dbBooking.totale || "",
    Note: dbBooking.note || "",
    id: `${dbBooking.nome}-${dbBooking.check_in}-${dbBooking.check_out}`,
    rowIndex: dbBooking.id, // Uso l'ID del database come rowIndex
    apartment: dbBooking.apartment,
  };
}

// Converte da formato componenti a formato database
function bookingToDbBooking(booking: Booking | Partial<Booking>, apartment: CalendarType): Omit<DatabaseBooking, 'id' | 'created_at' | 'updated_at'> {
  return {
    apartment,
    nome: booking.Nome || "",
    ota: booking.OTA || "",
    check_in: booking.CheckIn || "",
    check_out: booking.CheckOut || "",
    notti: booking.Notti || "",
    adulti: booking.adulti || "",
    bambini: booking.bambini || "",
    animali: booking.animali || "",
    totale_cliente: booking.TotaleCliente || "",
    fuori_ota: booking.FuoriOTA || "",
    costo_notti: booking.CostoNotti || "",
    media_a_notte: booking.MediaANotte || "",
    pulizia: booking.Pulizia || "",
    sconti: booking.Sconti || "",
    soggiorno_tax: booking.SoggiornoTax || "",
    soggiorno_tax_riscossa: booking.SoggiornoTaxRiscossa || "",
    ota_tax: booking.OTATax || "",
    cedolare_secca: booking.CedolareSecca || "",
    totale: booking.Totale || "",
    note: booking.Note || "",
  };
}

// Inizializza il database (crea tabelle se non esistono)
export async function initializeDatabase(): Promise<void> {
  try {
    // Schema SQL hardcoded per evitare problemi di fetch
    const statements = [
      `CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        apartment TEXT NOT NULL,
        nome TEXT NOT NULL,
        ota TEXT,
        check_in TEXT,
        check_out TEXT,
        notti TEXT,
        adulti TEXT,
        bambini TEXT,
        animali TEXT,
        totale_cliente TEXT,
        fuori_ota TEXT,
        costo_notti TEXT,
        media_a_notte TEXT,
        pulizia TEXT,
        sconti TEXT,
        soggiorno_tax TEXT,
        soggiorno_tax_riscossa TEXT,
        ota_tax TEXT,
        cedolare_secca TEXT,
        totale TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_apartment ON bookings(apartment)`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in)`,
      `CREATE INDEX IF NOT EXISTS idx_bookings_ota ON bookings(ota)`
    ];

    // Esegui ogni statement separatamente
    for (const statement of statements) {
      await client.execute(statement);
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Ottieni tutte le prenotazioni per un appartamento
export async function getBookingsByApartment(apartment: CalendarType): Promise<Booking[]> {
  try {
    await initializeDatabase(); // Assicura che il DB sia inizializzato

    let query: string;
    let params: any[] = [];

    if (apartment === "all") {
      query = "SELECT * FROM bookings ORDER BY check_in DESC";
    } else {
      query = "SELECT * FROM bookings WHERE apartment = ? ORDER BY check_in DESC";
      params = [apartment];
    }

    const result = await client.execute({
      sql: query,
      args: params,
    });

    return result.rows.map((row: any) => dbBookingToBooking(row as DatabaseBooking));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

// Crea una nuova prenotazione
export async function createBooking(booking: Partial<Booking>, apartment: CalendarType): Promise<boolean> {
  try {
    await initializeDatabase();

    const dbBooking = bookingToDbBooking(booking, apartment);
    
    const result = await client.execute({
      sql: `INSERT INTO bookings (
        apartment, nome, ota, check_in, check_out, notti, 
        adulti, bambini, animali, totale_cliente, fuori_ota,
        costo_notti, media_a_notte, pulizia, sconti, 
        soggiorno_tax, soggiorno_tax_riscossa, ota_tax, 
        cedolare_secca, totale, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        dbBooking.apartment,
        dbBooking.nome,
        dbBooking.ota,
        dbBooking.check_in,
        dbBooking.check_out,
        dbBooking.notti,
        dbBooking.adulti,
        dbBooking.bambini,
        dbBooking.animali,
        dbBooking.totale_cliente,
        dbBooking.fuori_ota,
        dbBooking.costo_notti,
        dbBooking.media_a_notte,
        dbBooking.pulizia,
        dbBooking.sconti,
        dbBooking.soggiorno_tax,
        dbBooking.soggiorno_tax_riscossa,
        dbBooking.ota_tax,
        dbBooking.cedolare_secca,
        dbBooking.totale,
        dbBooking.note,
      ],
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error creating booking:", error);
    return false;
  }
}

// Aggiorna una prenotazione esistente
export async function updateBooking(booking: Booking, apartment: CalendarType): Promise<boolean> {
  try {
    await initializeDatabase();

    const dbBooking = bookingToDbBooking(booking, apartment);
    const bookingId = booking.rowIndex; // Uso rowIndex come ID

    if (!bookingId) {
      console.error("Cannot update booking without ID");
      return false;
    }

    const result = await client.execute({
      sql: `UPDATE bookings SET 
        apartment = ?, nome = ?, ota = ?, check_in = ?, check_out = ?, notti = ?,
        adulti = ?, bambini = ?, animali = ?, totale_cliente = ?, fuori_ota = ?,
        costo_notti = ?, media_a_notte = ?, pulizia = ?, sconti = ?,
        soggiorno_tax = ?, soggiorno_tax_riscossa = ?, ota_tax = ?,
        cedolare_secca = ?, totale = ?, note = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
      args: [
        dbBooking.apartment,
        dbBooking.nome,
        dbBooking.ota,
        dbBooking.check_in,
        dbBooking.check_out,
        dbBooking.notti,
        dbBooking.adulti,
        dbBooking.bambini,
        dbBooking.animali,
        dbBooking.totale_cliente,
        dbBooking.fuori_ota,
        dbBooking.costo_notti,
        dbBooking.media_a_notte,
        dbBooking.pulizia,
        dbBooking.sconti,
        dbBooking.soggiorno_tax,
        dbBooking.soggiorno_tax_riscossa,
        dbBooking.ota_tax,
        dbBooking.cedolare_secca,
        dbBooking.totale,
        dbBooking.note,
        bookingId,
      ],
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error updating booking:", error);
    return false;
  }
}

// Elimina una prenotazione
export async function deleteBooking(booking: Booking): Promise<boolean> {
  try {
    await initializeDatabase();

    const bookingId = booking.rowIndex;

    if (!bookingId) {
      console.error("Cannot delete booking without ID");
      return false;
    }

    const result = await client.execute({
      sql: "DELETE FROM bookings WHERE id = ?",
      args: [bookingId],
    });

    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error deleting booking:", error);
    return false;
  }
}

// Statistiche veloci (bonus!)
export async function getBookingStats() {
  try {
    await initializeDatabase();

    const stats = await client.execute({
      sql: `
        SELECT 
          apartment,
          COUNT(*) as total_bookings,
          SUM(CASE WHEN ota = 'Booking' THEN 1 ELSE 0 END) as booking_count,
          SUM(CASE WHEN ota = 'Airbnb' THEN 1 ELSE 0 END) as airbnb_count,
          SUM(CASE WHEN ota = 'Diretta' THEN 1 ELSE 0 END) as direct_count
        FROM bookings 
        GROUP BY apartment
      `,
    });

    return stats.rows;
  } catch (error) {
    console.error("Error getting stats:", error);
    return [];
  }
}