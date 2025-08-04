-- Turso Database Schema for Immerso Nella Pineta
-- Replica la struttura di Google Sheets ma con vantaggi di un vero database

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  
  -- Identificazione appartamento
  apartment TEXT NOT NULL, -- 'principale', 'secondario', 'terziario'
  
  -- Dati ospite e prenotazione
  nome TEXT NOT NULL,
  ota TEXT, -- Booking, Airbnb, Extra, Agenzia, Diretta
  check_in TEXT, -- Formato DD/MM/YYYY (mantengo compatibilità)
  check_out TEXT, -- Formato DD/MM/YYYY
  notti INTEGER,
  
  -- Ospiti
  adulti INTEGER,
  bambini INTEGER,
  animali INTEGER,
  
  -- Importi (uso TEXT per mantenere compatibilità con formato esistente)
  totale_cliente TEXT,
  fuori_ota TEXT,
  costo_notti TEXT,
  media_a_notte TEXT,
  pulizia TEXT,
  sconti TEXT,
  
  -- Tasse
  soggiorno_tax TEXT,
  soggiorno_tax_riscossa TEXT, -- 'Sì', 'No', NULL
  ota_tax TEXT,
  cedolare_secca TEXT,
  totale TEXT,
  
  -- Note e metadati
  note TEXT,
  
  -- Campi per tracking (Google Sheets non li aveva)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_bookings_apartment ON bookings(apartment);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_ota ON bookings(ota);

-- Trigger per aggiornare updated_at automaticamente
CREATE TRIGGER IF NOT EXISTS update_bookings_updated_at 
  AFTER UPDATE ON bookings
  FOR EACH ROW
BEGIN
  UPDATE bookings 
  SET updated_at = CURRENT_TIMESTAMP 
  WHERE id = NEW.id;
END;