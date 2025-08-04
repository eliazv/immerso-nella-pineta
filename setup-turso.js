/**
 * Script per configurare Turso automaticamente
 * Esegui con: node setup-turso.js
 */

import { createClient } from "@libsql/client";
import fs from 'fs';
import path from 'path';

console.log("🚀 Turso Setup Assistant");
console.log("========================");

// Configurazione
const DB_NAME = "immerso-pineta";
const ENV_FILE = ".env.local";

async function setupTurso() {
  console.log("\n📋 Passo 1: Verifica delle credenziali");
  console.log("ℹ️  Hai bisogno di:");
  console.log("   1. Database URL da Turso Dashboard");
  console.log("   2. Auth Token da Turso Dashboard");
  console.log("");
  console.log("🌐 Vai su: https://turso.tech/dashboard");
  console.log("📝 Crea un database chiamato 'immerso-pineta'");
  console.log("🔑 Genera un token di accesso");
  console.log("");

  // Controlla se esistono le variabili d'ambiente
  const envPath = path.join(process.cwd(), ENV_FILE);
  let envContent = "";
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log(`✅ File ${ENV_FILE} trovato`);
  } else {
    console.log(`📄 Creando nuovo file ${ENV_FILE}`);
    // Copia dal template
    if (fs.existsSync('.env.example')) {
      envContent = fs.readFileSync('.env.example', 'utf8');
    }
  }

  // Aggiungi/aggiorna le variabili Turso se non esistono
  if (!envContent.includes('VITE_TURSO_DATABASE_URL')) {
    console.log("➕ Aggiungendo configurazione Turso a .env.local");
    envContent += `
# Turso Database Configuration
VITE_TURSO_DATABASE_URL=libsql://immerso-pineta-[YOUR-USERNAME].turso.io
VITE_TURSO_AUTH_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.[YOUR-TOKEN-HERE]
`;
    fs.writeFileSync(envPath, envContent);
  }

  console.log("\n🔧 Passo 2: Configura le credenziali");
  console.log(`📝 Apri il file ${ENV_FILE} e inserisci:`);
  console.log("   - VITE_TURSO_DATABASE_URL: Il tuo database URL");
  console.log("   - VITE_TURSO_AUTH_TOKEN: Il tuo auth token");
  console.log("");

  return true;
}

async function testConnection() {
  console.log("\n🧪 Passo 3: Test connessione");
  
  try {
    // Carica le variabili d'ambiente
    const envPath = path.join(process.cwd(), ENV_FILE);
    if (!fs.existsSync(envPath)) {
      throw new Error("File .env.local non trovato");
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      if (line.includes('=') && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        envVars[key.trim()] = value.trim();
      }
    });

    const dbUrl = envVars.VITE_TURSO_DATABASE_URL;
    const authToken = envVars.VITE_TURSO_AUTH_TOKEN;

    if (!dbUrl || dbUrl.includes('[YOUR-USERNAME]')) {
      console.log("⚠️  Database URL non configurato correttamente");
      return false;
    }

    if (!authToken || authToken.includes('[YOUR-TOKEN-HERE]')) {
      console.log("⚠️  Auth Token non configurato correttamente");
      return false;
    }

    // Test connessione
    const client = createClient({
      url: dbUrl,
      authToken: authToken,
    });

    // Prova una query semplice
    await client.execute("SELECT 1 as test");
    console.log("✅ Connessione a Turso riuscita!");

    return true;
  } catch (error) {
    console.log("❌ Errore connessione:", error.message);
    return false;
  }
}

async function initializeDatabase() {
  console.log("\n🗄️  Passo 4: Inizializzazione database");
  
  try {
    // Carica credenziali
    const envPath = path.join(process.cwd(), ENV_FILE);
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      if (line.includes('=') && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        envVars[key.trim()] = value.trim();
      }
    });

    const client = createClient({
      url: envVars.VITE_TURSO_DATABASE_URL,
      authToken: envVars.VITE_TURSO_AUTH_TOKEN,
    });

    // Schema del database
    const schema = `
      CREATE TABLE IF NOT EXISTS bookings (
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
      );
      
      CREATE INDEX IF NOT EXISTS idx_bookings_apartment ON bookings(apartment);
      CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
      CREATE INDEX IF NOT EXISTS idx_bookings_ota ON bookings(ota);
    `;

    // Esegui schema
    const statements = schema.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await client.execute(statement.trim());
      }
    }

    console.log("✅ Database inizializzato con successo!");
    
    // Inserisci dati di test
    await client.execute({
      sql: `INSERT INTO bookings (apartment, nome, ota, check_in, check_out, notti) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: ['principale', 'Test Booking', 'Airbnb', '2025-08-10', '2025-08-15', '5']
    });

    console.log("✅ Dati di test inseriti!");
    return true;

  } catch (error) {
    console.log("❌ Errore inizializzazione:", error.message);
    return false;
  }
}

async function main() {
  try {
    await setupTurso();
    
    console.log("\n⏸️  PAUSA: Configura ora le credenziali in .env.local");
    console.log("📝 Quando hai finito, premi ENTER per continuare...");
    
    // Simula input utente (in un vero script useresti readline)
    console.log("⏭️  Continuando con test connessione...");
    
    const connected = await testConnection();
    if (!connected) {
      console.log("\n❌ Configurazione non completata. Segui i passaggi sopra.");
      return;
    }

    const initialized = await initializeDatabase();
    if (!initialized) {
      console.log("\n❌ Inizializzazione fallita.");
      return;
    }

    console.log("\n🎉 Setup Turso completato!");
    console.log("✅ Database configurato e funzionante");
    console.log("✅ Dati di test inseriti");
    console.log("");
    console.log("🔄 Prossimi passi:");
    console.log("   1. Esegui 'npm run dev' per testare l'app");
    console.log("   2. Vai su /calendar per vedere se funziona");
    console.log("   3. Esegui la migrazione da Google Sheets quando pronto");

  } catch (error) {
    console.log("💥 Errore fatale:", error.message);
  }
}

main();