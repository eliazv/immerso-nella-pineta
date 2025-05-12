import fetch from "node-fetch";
import PocketBase from "pocketbase";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

// Ottieni il percorso del file corrente in contesto ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// URL del server PocketBase
const BASE_URL = "http://127.0.0.1:8090";
const pb = new PocketBase(BASE_URL);

// Colori per console
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

console.log(
  `${colors.bright}=== Test di connessione a PocketBase ===${colors.reset}`
);

// Funzione per verificare lo stato di PocketBase
async function testPocketBaseConnection() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${BASE_URL}/api/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      console.log(
        `${colors.green}✓ PocketBase è in esecuzione correttamente${colors.reset}`
      );
      console.log(`${colors.cyan}Risposta API Health:${colors.reset}`, data);
      return true;
    } else {
      console.error(
        `${colors.red}✗ PocketBase è in esecuzione ma ha risposto con un errore${colors.reset}`
      );
      console.error(`Stato: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error(
      `${colors.red}✗ Impossibile connettersi a PocketBase${colors.reset}`
    );
    console.error(`Errore:`, error.message || error);
    return false;
  }
}

// Funzione per verificare le collezioni esistenti
async function testCollections() {
  try {
    console.log(`${colors.bright}Verifica delle collezioni...${colors.reset}`);

    const collections = [
      "bookings_principale",
      "bookings_secondario",
      "bookings_terziario",
    ];
    const results = [];

    for (const collectionName of collections) {
      try {
        const exists = await testCollection(collectionName);
        results.push({ name: collectionName, exists });
      } catch (error) {
        console.error(
          `Errore durante il test della collezione ${collectionName}:`,
          error.message || error
        );
        results.push({
          name: collectionName,
          exists: false,
          error: error.message || error,
        });
      }
    }

    console.log(`${colors.bright}Stato delle collezioni:${colors.reset}`);
    for (const result of results) {
      if (result.exists) {
        console.log(`${colors.green}✓ ${result.name} esiste${colors.reset}`);
      } else {
        console.log(
          `${colors.red}✗ ${result.name} non esiste o non è accessibile${colors.reset}`
        );
        if (result.error) {
          console.log(`  Errore: ${result.error}`);
        }
      }
    }

    return results.every((r) => r.exists);
  } catch (error) {
    console.error(
      `${colors.red}✗ Errore durante la verifica delle collezioni${colors.reset}`
    );
    console.error(`Errore:`, error.message || error);
    return false;
  }
}

// Testa una singola collezione
async function testCollection(collectionName) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/collections/${collectionName}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      return true;
    } else if (response.status === 404) {
      return false;
    } else {
      const data = await response.text();
      throw new Error(`Stato ${response.status}: ${data}`);
    }
  } catch (error) {
    throw error;
  }
}

// Funzione principale
async function runTests() {
  const isConnected = await testPocketBaseConnection();

  if (isConnected) {
    await testCollections();

    console.log(`\n${colors.bright}Suggerimenti:${colors.reset}`);
    console.log(
      `${colors.cyan}1. Se le collezioni non esistono, esegui lo script di migrazione:${colors.reset}`
    );
    console.log(`   node scripts/migrateEsm.js`);
    console.log(
      `${colors.cyan}2. Verifica che PocketBase sia sempre in esecuzione quando utilizzi l'applicazione${colors.reset}`
    );
    console.log(`   (puoi usare lo script start-pocketbase.bat)`);
  } else {
    console.log(`\n${colors.bright}Suggerimenti:${colors.reset}`);
    console.log(
      `${colors.yellow}1. Avvia PocketBase usando lo script:${colors.reset}`
    );
    console.log(`   start-pocketbase.bat`);
    console.log(
      `${colors.yellow}2. Assicurati che la porta 8090 non sia già in uso da altri servizi${colors.reset}`
    );
  }
}

runTests().catch((error) => {
  console.error(
    `${colors.red}Errore durante l'esecuzione dei test:${colors.reset}`,
    error
  );
});
