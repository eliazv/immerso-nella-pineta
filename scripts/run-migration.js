/**
 * Script per eseguire la migrazione da Google Sheets a PocketBase
 * Questo script avvia PocketBase se non è già in esecuzione e poi esegue la migrazione
 */
const { exec, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

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

// Interfaccia per lettura input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Funzione per controllare se PocketBase è in esecuzione
async function isPocketBaseRunning() {
  return new Promise((resolve) => {
    const testUrl = "http://127.0.0.1:8090/api/health";
    const http = require("http");
    const req = http.get(testUrl, (res) => {
      resolve(res.statusCode === 200);
      res.resume();
    });

    req.on("error", () => {
      resolve(false);
    });

    req.setTimeout(2000, () => {
      req.abort();
      resolve(false);
    });
  });
}

// Funzione per avviare PocketBase
async function startPocketBase() {
  console.log(`${colors.blue}Avvio di PocketBase...${colors.reset}`);

  const rootDir = path.resolve(__dirname, "..");
  const batPath = path.join(rootDir, "start-pocketbase.bat");

  if (!fs.existsSync(batPath)) {
    console.error(
      `${colors.red}File start-pocketbase.bat non trovato!${colors.reset}`
    );
    return false;
  }

  // Avvia PocketBase in una nuova finestra
  const pocketBaseProcess = spawn(
    "cmd.exe",
    ["/c", "start", "cmd.exe", "/k", batPath],
    {
      detached: true,
      stdio: "ignore",
      cwd: rootDir,
    }
  );

  pocketBaseProcess.unref();

  // Attendi che PocketBase sia pronto
  console.log(
    `${colors.yellow}Attendere l'avvio di PocketBase...${colors.reset}`
  );

  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (await isPocketBaseRunning()) {
      console.log(`${colors.green}PocketBase è in esecuzione!${colors.reset}`);
      return true;
    }

    process.stdout.write(".");
  }

  console.error(
    `\n${colors.red}Impossibile avviare PocketBase dopo ${maxAttempts} tentativi.${colors.reset}`
  );
  return false;
}

// Funzione per eseguire lo script di migrazione
async function runMigration() {
  console.log(
    `${colors.blue}Esecuzione dello script di migrazione...${colors.reset}`
  );

  return new Promise((resolve) => {
    const rootDir = path.resolve(__dirname, "..");
    const migrationScript = path.join(__dirname, "migrateToDatabase.js");

    if (!fs.existsSync(migrationScript)) {
      console.error(
        `${colors.red}Script di migrazione non trovato!${colors.reset}`
      );
      return resolve(false);
    }

    const migrationProcess = spawn("node", [migrationScript], {
      stdio: "inherit",
      cwd: rootDir,
    });

    migrationProcess.on("close", (code) => {
      if (code === 0) {
        console.log(
          `${colors.green}Migrazione completata con successo!${colors.reset}`
        );
        resolve(true);
      } else {
        console.error(
          `${colors.red}Errore durante la migrazione (codice ${code})${colors.reset}`
        );
        resolve(false);
      }
    });
  });
}

// Funzione principale
async function main() {
  console.log(
    `${colors.bright}=== Migrazione da Google Sheets a PocketBase ===${colors.reset}`
  );
  console.log(
    `${colors.cyan}Questo script eseguirà la migrazione dei dati dalle tabelle di Google Sheets a PocketBase.${colors.reset}`
  );

  // Verifica se PocketBase è già in esecuzione
  const isPBRunning = await isPocketBaseRunning();

  if (!isPBRunning) {
    console.log(
      `${colors.yellow}PocketBase non è in esecuzione.${colors.reset}`
    );
    const startPB = await prompt("Vuoi avviare PocketBase? (s/n): ");

    if (
      startPB.toLowerCase() === "s" ||
      startPB.toLowerCase() === "si" ||
      startPB.toLowerCase() === "sì"
    ) {
      const started = await startPocketBase();
      if (!started) {
        console.log(
          `${colors.red}Impossibile procedere senza PocketBase attivo.${colors.reset}`
        );
        rl.close();
        return;
      }
    } else {
      console.log(
        `${colors.red}Impossibile procedere senza PocketBase attivo.${colors.reset}`
      );
      rl.close();
      return;
    }
  } else {
    console.log(
      `${colors.green}PocketBase è già in esecuzione.${colors.reset}`
    );
  }

  // Chiedi conferma per eseguire la migrazione
  const confirmMigration = await prompt(
    `${colors.yellow}Sei sicuro di voler eseguire la migrazione? Questo potrebbe sovrascrivere dati esistenti. (s/n): ${colors.reset}`
  );

  if (
    confirmMigration.toLowerCase() === "s" ||
    confirmMigration.toLowerCase() === "si" ||
    confirmMigration.toLowerCase() === "sì"
  ) {
    await runMigration();
  } else {
    console.log(`${colors.blue}Operazione annullata.${colors.reset}`);
  }

  rl.close();
}

main().catch((err) => {
  console.error(
    `${colors.red}Errore durante l'esecuzione:${colors.reset}`,
    err
  );
  rl.close();
  process.exit(1);
});
