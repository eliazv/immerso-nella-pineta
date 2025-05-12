import PocketBase from "pocketbase";
import { fileURLToPath } from "url";
import { dirname } from "path";
import readline from "readline";

// Ottieni il percorso del file corrente in contesto ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// URL del server PocketBase
const POCKETBASE_URL = "http://127.0.0.1:8090";

// Crea un'interfaccia readline per l'input utente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

async function createPocketBaseAdmin() {
  console.log(
    `${colors.bright}=== Creazione account amministratore PocketBase ===${colors.reset}`
  );

  try {
    // Verifichiamo se PocketBase è in esecuzione
    try {
      const response = await fetch(`${POCKETBASE_URL}/api/health`);
      if (!response.ok) {
        throw new Error(`PocketBase ha risposto con status ${response.status}`);
      }
      console.log(
        `${colors.green}✓ PocketBase è in esecuzione correttamente${colors.reset}`
      );
    } catch (error) {
      console.error(
        `${colors.red}✗ PocketBase non è in esecuzione o non risponde${colors.reset}`
      );
      console.error(
        `${colors.yellow}Avvia PocketBase con start-pocketbase.bat e riprova${colors.reset}`
      );
      rl.close();
      return;
    }

    // Inizializza PocketBase
    const pb = new PocketBase(POCKETBASE_URL);

    // Verifichiamo se è il primo avvio (nessun admin configurato)
    let isFirstRun = false;
    try {
      const response = await fetch(
        `${POCKETBASE_URL}/api/admins/auth-with-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identity: "test@example.com",
            password: "invalid_password",
          }),
        }
      );

      const data = await response.json();
      isFirstRun =
        data.code === 400 && data.message.includes("Missing required admin");
    } catch (error) {
      // Se otteniamo un errore che non è 400, probabilmente gli admin sono già configurati
      isFirstRun = false;
    }

    if (isFirstRun) {
      console.log(
        `${colors.yellow}Sembra che PocketBase sia al primo avvio e richieda la configurazione di un admin${colors.reset}`
      );

      // Richiedi i dati per il nuovo admin
      const email = await prompt(
        "Inserisci l'email per l'account amministratore: "
      );
      const password = await prompt(
        "Inserisci la password per l'account amministratore: "
      );
      const passwordConfirm = await prompt("Conferma la password: ");

      if (password !== passwordConfirm) {
        console.error(
          `${colors.red}Le password non corrispondono${colors.reset}`
        );
        rl.close();
        return;
      }

      try {
        // Crea il primo admin
        const response = await fetch(`${POCKETBASE_URL}/api/admins`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            passwordConfirm: password,
          }),
        });

        if (response.ok) {
          console.log(
            `${colors.green}✓ Account amministratore creato con successo${colors.reset}`
          );
        } else {
          const data = await response.json();
          console.error(
            `${colors.red}✗ Errore durante la creazione dell'account amministratore:${colors.reset}`,
            data.message
          );
        }
      } catch (error) {
        console.error(
          `${colors.red}✗ Errore durante la creazione dell'account amministratore:${colors.reset}`,
          error.message
        );
      }
    } else {
      console.log(
        `${colors.blue}PocketBase ha già un account amministratore configurato${colors.reset}`
      );
      console.log(
        `${colors.cyan}Se hai dimenticato le credenziali, puoi reimpostare la password utilizzando l'interfaccia web o i file di PocketBase${colors.reset}`
      );
    }

    console.log(`\n${colors.bright}=== Prossimi passi ===${colors.reset}`);
    console.log(
      `${colors.cyan}1. Ora puoi eseguire lo script di migrazione:${colors.reset}`
    );
    console.log(`   node scripts/migrateEsm.js`);
    console.log(
      `${colors.cyan}2. Utilizzare l'interfaccia amministrativa di PocketBase:${colors.reset}`
    );
    console.log(`   http://127.0.0.1:8090/_/`);
  } catch (error) {
    console.error(`${colors.red}Errore imprevisto:${colors.reset}`, error);
  } finally {
    rl.close();
  }
}

// Esecuzione della funzione principale
createPocketBaseAdmin().catch((error) => {
  console.error(`${colors.red}Errore imprevisto:${colors.reset}`, error);
  rl.close();
});
