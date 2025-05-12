const axios = require("axios");
const { promisify } = require("util");
const { exec } = require("child_process");
const execAsync = promisify(exec);
const readline = require("readline");
const path = require("path");
const fs = require("fs");

// Interfaccia per lettura input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// URL del server PocketBase
const BASE_URL = "http://127.0.0.1:8090";

// Credenziali admin (da richiedere all'utente)
let ADMIN_EMAIL;
let ADMIN_PASSWORD;

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

// Funzione per richiedere input all'utente
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Funzione per controllare se PocketBase è in esecuzione
async function checkPocketBaseRunning() {
  try {
    console.log(
      `${colors.blue}Controllo se PocketBase è in esecuzione...${colors.reset}`
    );
    await axios.get(`${BASE_URL}/api/health`, { timeout: 2000 });
    console.log(`${colors.green}✓ PocketBase è attivo${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ PocketBase non è in esecuzione${colors.reset}`);
    return false;
  }
}

// Funzione per avviare PocketBase se non è in esecuzione
async function startPocketBaseIfNeeded() {
  const isRunning = await checkPocketBaseRunning();
  if (!isRunning) {
    const answer = await prompt("Vuoi avviare PocketBase? (s/n): ");
    if (
      answer.toLowerCase() === "s" ||
      answer.toLowerCase() === "si" ||
      answer.toLowerCase() === "sì"
    ) {
      console.log(
        `${colors.yellow}Avvio di PocketBase in corso...${colors.reset}`
      );
      try {
        // Cerca lo script start-pocketbase
        let scriptPath;
        if (
          fs.existsSync(
            path.join(__dirname, "..", "scripts", "start-pocketbase.bat")
          )
        ) {
          scriptPath = path.join(
            __dirname,
            "..",
            "scripts",
            "start-pocketbase.bat"
          );
        } else if (
          fs.existsSync(path.join(__dirname, "..", "start-pocketbase.bat"))
        ) {
          scriptPath = path.join(__dirname, "..", "start-pocketbase.bat");
        } else {
          throw new Error("Script start-pocketbase.bat non trovato");
        }

        // Avvia lo script in una nuova finestra
        const process = require("child_process").spawn(
          "cmd.exe",
          ["/c", "start", "cmd.exe", "/k", scriptPath],
          {
            detached: true,
            stdio: "ignore",
          }
        );
        process.unref();

        console.log(
          `${colors.yellow}PocketBase è stato avviato in una nuova finestra${colors.reset}`
        );
        console.log(
          `${colors.yellow}Attendi 5 secondi per l'avvio...${colors.reset}`
        );

        // Attendi alcuni secondi per l'avvio
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Verifica se è stato avviato
        const nowRunning = await checkPocketBaseRunning();
        if (!nowRunning) {
          console.log(
            `${colors.red}✗ Impossibile avviare PocketBase automaticamente${colors.reset}`
          );
          console.log(
            `${colors.yellow}Per favore avvia PocketBase manualmente ed esegui di nuovo questo script${colors.reset}`
          );
          process.exit(1);
        }
      } catch (error) {
        console.error(
          `${colors.red}Errore durante l'avvio di PocketBase:${colors.reset}`,
          error
        );
        console.log(
          `${colors.yellow}Per favore avvia PocketBase manualmente ed esegui di nuovo questo script${colors.reset}`
        );
        process.exit(1);
      }
    } else {
      console.log(
        `${colors.yellow}Test interrotto. Avvia PocketBase manualmente ed esegui di nuovo questo script.${colors.reset}`
      );
      process.exit(1);
    }
  }
}

// Funzione per testare il login admin
async function testAdminLogin() {
  try {
    ADMIN_EMAIL = await prompt("Email admin: ");
    ADMIN_PASSWORD = await prompt("Password admin: ");

    const response = await axios.post(
      `${BASE_URL}/api/admins/auth-with-password`,
      {
        identity: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }
    );

    console.log(`${colors.green}✓ Login admin riuscito!${colors.reset}`);
    console.log(`Token: ${response.data.token.slice(0, 15)}...`);
    return response.data.token;
  } catch (error) {
    console.error(
      `${colors.red}✗ Login admin fallito:${colors.reset}`,
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

// Funzione per testare il recupero delle collezioni
async function testCollections(token) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${BASE_URL}/api/collections`, {
      headers,
    });

    console.log(
      `${colors.green}✓ Recupero collezioni riuscito!${colors.reset}`
    );
    console.log(`Collezioni trovate: ${response.data.items.length}`);
    console.log(
      `Nomi collezioni: ${response.data.items.map((c) => c.name).join(", ")}`
    );

    // Verifica se esistono le collezioni dei tre appartamenti
    const collections = response.data.items.map((c) => c.name);
    const requiredCollections = [
      "bookings_principale",
      "bookings_secondario",
      "bookings_terziario",
    ];

    let allExist = true;
    for (const coll of requiredCollections) {
      if (!collections.includes(coll)) {
        console.log(
          `${colors.red}✗ Collezione "${coll}" non trovata${colors.reset}`
        );
        allExist = false;
      } else {
        console.log(
          `${colors.green}✓ Collezione "${coll}" trovata${colors.reset}`
        );
      }
    }

    if (!allExist) {
      console.log(
        `${colors.yellow}Suggerimento: Esegui lo script di migrazione per creare le collezioni mancanti:${colors.reset}`
      );
      console.log(`node scripts/migrateToDatabase.js`);
    }

    return true;
  } catch (error) {
    console.error(
      `${colors.red}✗ Recupero collezioni fallito:${colors.reset}`,
      error.response ? error.response.data : error.message
    );
    return false;
  }
}

// Funzione per testare il recupero delle prenotazioni dall'appartamento principale
async function testBookings() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/collections/bookings_principale/records`
    );

    console.log(
      `${colors.green}✓ Recupero prenotazioni riuscito!${colors.reset}`
    );
    console.log(`Prenotazioni trovate: ${response.data.items.length}`);
    if (response.data.items.length > 0) {
      const sample = response.data.items[0];
      console.log(`${colors.cyan}Esempio di prenotazione:${colors.reset}`);
      console.log(`- ID: ${sample.id}`);
      console.log(`- Nome: ${sample.Nome}`);
      console.log(`- Check-in: ${sample.CheckIn}`);
      console.log(`- Check-out: ${sample.CheckOut}`);
    } else {
      console.log(
        `${colors.yellow}Nessuna prenotazione trovata nella collezione bookings_principale${colors.reset}`
      );
    }
    return true;
  } catch (error) {
    console.error(
      `${colors.red}✗ Recupero prenotazioni fallito:${colors.reset}`,
      error.response ? error.response.data : error.message
    );

    if (error.response && error.response.status === 404) {
      console.log(
        `${colors.yellow}Suggerimento: La collezione "bookings_principale" potrebbe non esistere.${colors.reset}`
      );
      console.log(
        `Esegui lo script di migrazione per crearla: node scripts/migrateToDatabase.js`
      );
    }

    return false;
  }
}

// Funzione per verificare le regole di accesso pubblico
async function testPublicAccess() {
  try {
    console.log(
      `${colors.blue}Test di accesso pubblico alle prenotazioni...${colors.reset}`
    );
    const response = await axios.get(
      `${BASE_URL}/api/collections/bookings_principale/records`
    );

    console.log(
      `${colors.green}✓ Accesso pubblico alle prenotazioni configurato correttamente${colors.reset}`
    );
    return true;
  } catch (error) {
    console.error(
      `${colors.red}✗ Accesso pubblico alle prenotazioni fallito:${colors.reset}`,
      error.response ? error.response.data.message : error.message
    );

    console.log(
      `${colors.yellow}Suggerimento: Verifica le regole di accesso della collezione "bookings_principale" in PocketBase.${colors.reset}`
    );
    console.log(
      `${colors.yellow}Dovresti consentire le operazioni "List/Search" e "View" per gli utenti pubblici.${colors.reset}`
    );

    return false;
  }
}

// Esecuzione dei test
async function runTests() {
  console.log(`${colors.bright}🔍 Avvio test di PocketBase...${colors.reset}`);

  try {
    await startPocketBaseIfNeeded();

    // Test di accesso pubblico
    await testPublicAccess();

    // Test con login admin (se necessario)
    const token = await testAdminLogin();
    if (token) {
      await testCollections(token);
    }

    await testBookings();

    console.log(`${colors.bright}🏁 Test completati!${colors.reset}`);
    rl.close();
  } catch (error) {
    console.error(
      `${colors.red}Errore durante l'esecuzione dei test:${colors.reset}`,
      error
    );
    rl.close();
    process.exit(1);
  }
}

runTests();
