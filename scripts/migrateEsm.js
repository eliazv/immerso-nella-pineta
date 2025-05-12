import axios from "axios";
import PocketBase from "pocketbase";
import readline from "readline";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { exec, spawn } from "child_process";
import { promises as fs } from "fs";

// Ottieni il percorso del file corrente in contesto ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurazione
const SPREADSHEET_ID =
  process.env.VITE_GOOGLE_SHEET_ID ||
  "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc";
const BASE_URL = "https://opensheet.elk.sh/";
const POCKETBASE_URL = "http://127.0.0.1:8090";

// Crea un'interfaccia readline per l'input utente
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Funzione per richiedere input all'utente
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Mappatura tra fogli Google Sheet e collezioni PocketBase
const sheetsMapping = [
  {
    sheet: "Affitti3",
    collection: "bookings_principale",
    apartment: "principale",
  },
  {
    sheet: "Affitti4",
    collection: "bookings_secondario",
    apartment: "secondario",
  },
  {
    sheet: "Affitti8",
    collection: "bookings_terziario",
    apartment: "terziario",
  },
];

// Funzione principale per la migrazione
async function migrateDataToPocketBase() {
  const pb = new PocketBase(POCKETBASE_URL);

  // Test di connessione
  try {
    const health = await axios.get(`${POCKETBASE_URL}/api/health`);
    console.log("✅ Connessione a PocketBase stabilita");
  } catch (error) {
    console.error(
      "❌ Impossibile connettersi a PocketBase. Assicurati che il server sia in esecuzione."
    );
    console.error(
      "Esegui prima lo script start-pocketbase.bat in una finestra di terminale separata."
    );
    process.exit(1);
  }
  // Autenticazione come admin
  try {
    // Richiedi le credenziali all'utente
    const email =
      (await prompt("Inserisci l'email dell'amministratore: ")) ||
      "admin@example.com";
    const password =
      (await prompt("Inserisci la password: ")) || "password_sicura";

    try {
      // Prima prova con il nuovo metodo (PocketBase v0.15+)
      await pb.admins.authWithPassword(email, password);
    } catch (adminAuthError) {
      try {
        // Se fallisce, prova con il metodo di autenticazione a basso livello
        const authData = await pb.send("/api/admins/auth-with-password", {
          method: "POST",
          body: {
            identity: email,
            password: password,
          },
        });

        pb.authStore.save(authData.token, authData.admin);
      } catch (fallbackError) {
        throw fallbackError;
      }
    }

    console.log("✅ Login effettuato con successo");
  } catch (error) {
    console.error("❌ Errore durante il login:", error);
    console.log("Continuando senza autenticazione...");
    // Continuiamo comunque perché alcune operazioni potrebbero non richiedere autenticazione
  }

  // Verifica e crea le collezioni se necessario
  for (const mapping of sheetsMapping) {
    const collectionExists = await checkIfCollectionExists(
      pb,
      mapping.collection
    );
    if (!collectionExists) {
      console.log(`Creazione della collezione ${mapping.collection}...`);
      await createCollection(pb, mapping.collection);
    } else {
      console.log(`La collezione ${mapping.collection} esiste già.`);
    }
  }

  // Funzione helper per trovare valori nel foglio con case insensitive e varianti dei nomi
  const findFieldValue = (row, fieldNames) => {
    // Prima prova a cercare esattamente i nomi forniti
    for (const fieldName of fieldNames) {
      if (row[fieldName] !== undefined) {
        return row[fieldName] || "";
      }
    }

    // Se non trova, prova a cercare con case insensitive
    const allKeys = Object.keys(row);
    for (const fieldName of fieldNames) {
      const lowerFieldName = fieldName.toLowerCase();
      const matchingKey = allKeys.find(
        (key) => key.toLowerCase() === lowerFieldName
      );
      if (matchingKey) {
        return row[matchingKey] || "";
      }
    }

    // Se ancora non trova, prova a cercare chiavi che contengono il testo cercato
    for (const fieldName of fieldNames) {
      const lowerFieldName = fieldName.toLowerCase();
      const matchingKey = allKeys.find((key) =>
        key.toLowerCase().includes(lowerFieldName)
      );
      if (matchingKey) {
        return row[matchingKey] || "";
      }
    }

    return ""; // Se non trova nulla, ritorna stringa vuota
  };

  // Migrazione di ogni foglio
  for (const mapping of sheetsMapping) {
    console.log(`Migrazione di ${mapping.sheet} a ${mapping.collection}...`);

    try {
      // Carica i dati da Google Sheets
      const url = `${BASE_URL}${SPREADSHEET_ID}/${mapping.sheet}`;
      const response = await axios.get(url);
      const data = response.data;

      if (!data || !Array.isArray(data) || data.length === 0) {
        console.log(`Nessun dato trovato in ${mapping.sheet}`);
        continue;
      }

      console.log(`Trovate ${data.length} righe in ${mapping.sheet}`);

      // Filtra e mappa i dati
      const validBookings = data
        .filter((row) => {
          return (
            findFieldValue(row, [
              "Nome",
              "nome",
              "Name",
              "name",
              "Cliente",
              "cliente",
            ]) !== ""
          );
        })
        .map((row) => {
          // Estrae e normalizza tutti i campi
          const nome = findFieldValue(row, [
            "Nome",
            "nome",
            "Name",
            "name",
            "Cliente",
            "cliente",
          ]);

          return {
            Nome: nome,
            OTA: findFieldValue(row, [
              "OTA",
              "ota",
              "Canale",
              "canale",
              "Channel",
            ]),
            CheckIn: findFieldValue(row, [
              "Check-in",
              "check-in",
              "CheckIn",
              "checkin",
              "Arrivo",
              "arrivo",
              "Data arrivo",
            ]),
            CheckOut: findFieldValue(row, [
              "Check-out",
              "check-out",
              "CheckOut",
              "checkout",
              "Partenza",
              "partenza",
              "Data partenza",
            ]),
            Notti: findFieldValue(row, [
              "Notti",
              "notti",
              "Nights",
              "nights",
              "Durata",
              "durata",
            ]),
            adulti: findFieldValue(row, [
              "Adulti",
              "adulti",
              "Adults",
              "adults",
              "Ospiti adulti",
              "Adult",
              "adult",
              "Persone",
              "persone",
              "Num Adulti",
            ]),
            bambini: findFieldValue(row, [
              "Bambini",
              "bambini",
              "Children",
              "children",
              "Ospiti bambini",
              "Child",
              "child",
              "Num Bambini",
            ]),
            animali: findFieldValue(row, [
              "Animali",
              "animali",
              "Pets",
              "pets",
              "Pet",
              "pet",
              "Num Animali",
            ]),
            TotaleCliente: findFieldValue(row, [
              "Totale cliente",
              "totale cliente",
              "Pagato",
              "pagato",
              "Totale pagato",
            ]),
            FuoriOTA: findFieldValue(row, [
              "Fuori OTA",
              "fuori ota",
              "Extra",
              "extra",
              "Pagamento extra",
            ]),
            CostoNotti: findFieldValue(row, [
              "Costo notti",
              "costo notti",
              "Prezzo notti",
              "prezzo notti",
            ]),
            MediaANotte: findFieldValue(row, [
              "Media a notte",
              "media a notte",
              "Media notte",
              "media notte",
              "Media",
              "media",
            ]),
            Pulizia: findFieldValue(row, [
              "Pulizia",
              "pulizia",
              "Pulizie",
              "pulizie",
              "Costo pulizia",
              "costo pulizia",
            ]),
            Sconti: findFieldValue(row, [
              "Sconti",
              "sconti",
              "Sconto",
              "sconto",
              "Discount",
              "discount",
            ]),
            SoggiornoTax: findFieldValue(row, [
              "Tassa soggiorno",
              "tassa soggiorno",
              "Soggiorno tax",
              "soggiorno tax",
              "City tax",
              "city tax",
            ]),
            OTATax: findFieldValue(row, [
              "Tassa OTA",
              "tassa ota",
              "OTA tax",
              "ota tax",
              "Fee OTA",
              "fee ota",
            ]),
            CedolareSecca: findFieldValue(row, [
              "Cedolare",
              "cedolare",
              "Cedolare secca",
              "cedolare secca",
              "Tasse",
              "tasse",
            ]),
            Totale: findFieldValue(row, [
              "Totale",
              "totale",
              "Totale netto",
              "totale netto",
              "Netto",
              "netto",
            ]),
            Note: findFieldValue(row, ["Note", "note", "Notes", "notes"]),
            apartment: mapping.apartment,
          };
        });

      console.log(`Trovate ${validBookings.length} prenotazioni valide`);

      // Salva le prenotazioni su PocketBase
      let successCount = 0;
      let errorCount = 0;

      for (const booking of validBookings) {
        try {
          await pb.collection(mapping.collection).create(booking);
          successCount++;
        } catch (error) {
          console.error(
            `Errore nell'importazione della prenotazione per ${booking.Nome}:`,
            error
          );
          errorCount++;
        }
      }

      console.log(
        `Importate ${successCount} prenotazioni, errori: ${errorCount}`
      );
    } catch (error) {
      console.error(`Errore nella migrazione di ${mapping.sheet}:`, error);
    }
  }

  console.log("Migrazione completata!");
  rl.close();
}

// Verifica se una collezione esiste
async function checkIfCollectionExists(pb, collectionName) {
  try {
    await pb.collections.getOne(collectionName);
    return true;
  } catch (error) {
    return false;
  }
}

// Crea una nuova collezione
async function createCollection(pb, collectionName) {
  const collectionData = {
    name: collectionName,
    type: "base",
    schema: [
      {
        name: "Nome",
        type: "text",
      },
      {
        name: "OTA",
        type: "text",
      },
      {
        name: "CheckIn",
        type: "text",
      },
      {
        name: "CheckOut",
        type: "text",
      },
      {
        name: "Notti",
        type: "text",
      },
      {
        name: "adulti",
        type: "text",
      },
      {
        name: "bambini",
        type: "text",
      },
      {
        name: "animali",
        type: "text",
      },
      {
        name: "TotaleCliente",
        type: "text",
      },
      {
        name: "FuoriOTA",
        type: "text",
      },
      {
        name: "CostoNotti",
        type: "text",
      },
      {
        name: "MediaANotte",
        type: "text",
      },
      {
        name: "Pulizia",
        type: "text",
      },
      {
        name: "Sconti",
        type: "text",
      },
      {
        name: "SoggiornoTax",
        type: "text",
      },
      {
        name: "OTATax",
        type: "text",
      },
      {
        name: "CedolareSecca",
        type: "text",
      },
      {
        name: "Totale",
        type: "text",
      },
      {
        name: "Note",
        type: "text",
      },
      {
        name: "apartment",
        type: "text",
      },
    ],
  };
  try {
    await pb.collections.create(collectionData);
    console.log(`Collezione ${collectionName} creata con successo`);
    return true;
  } catch (error) {
    console.error(
      `Errore durante la creazione della collezione ${collectionName}:`,
      error
    );
    return false;
  }
}

// Esecuzione della migrazione
migrateDataToPocketBase()
  .then(() => {
    console.log("Script di migrazione completato");
    rl.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error("Errore nello script di migrazione:", error);
    rl.close();
    process.exit(1);
  });
