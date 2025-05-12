const axios = require("axios");
const PocketBase = require("pocketbase");
const readline = require("readline");

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

  // Autenticazione come admin (è necessario impostare credenziali valide)
  try {
    // Prima di eseguire lo script, create un admin in PocketBase tramite l'interfaccia
    // e inserite qui le credenziali
    const email =
      prompt("Inserisci l'email dell'amministratore: ") || "admin@example.com";
    const password = prompt("Inserisci la password: ") || "password_sicura";

    await pb.admins.authWithPassword(email, password);
    console.log("✅ Login effettuato con successo");
  } catch (error) {
    console.error("❌ Errore durante il login:", error);
    return;
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

          const mappedBooking = {
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
              "num adulti",
              "Numero Adulti",
              "numero adulti",
              "N° Adulti",
              "n° adulti",
              "Ospiti Adulti",
              "Adulto",
              "adulto",
              "Num. Adulti",
            ]),
            bambini: findFieldValue(row, [
              "Bambini",
              "bambini",
              "Children",
              "children",
              "Ospiti bambini",
            ]),
            animali: findFieldValue(row, [
              "Animali",
              "animali",
              "Pets",
              "pets",
              "Animali domestici",
            ]),
            TotaleCliente: findFieldValue(row, [
              "Totale cliente",
              "totale cliente",
              "Total",
              "total",
              "Importo",
            ]),
            FuoriOTA: findFieldValue(row, [
              "Fuori OTA",
              "fuori ota",
              "Extra OTA",
            ]),
            CostoNotti: findFieldValue(row, [
              "Costo notti",
              "costo notti",
              "Room cost",
            ]),
            MediaANotte: findFieldValue(row, [
              "Media a notte",
              "media a notte",
              "Average",
            ]),
            Pulizia: findFieldValue(row, [
              "Pulizia",
              "pulizia",
              "Cleaning",
              "cleaning",
            ]),
            Sconti: findFieldValue(row, [
              "Sconti",
              "sconti",
              "Discount",
              "discount",
            ]),
            SoggiornoTax: findFieldValue(row, [
              "Soggiorno Tax",
              "soggiorno tax",
              "City Tax",
              "city tax",
              "Tassa di soggiorno",
            ]),
            OTATax: findFieldValue(row, ["OTA Tax", "ota tax", "Service Fee"]),
            CedolareSecca: findFieldValue(row, [
              "Cedolare secca",
              "Cedolare Secca (21%)",
              "cedolare",
              "Tassa",
              "tassa",
            ]),
            Totale: findFieldValue(row, [
              "Totale",
              "totale",
              "Total Income",
              "Income",
            ]),
            Note: findFieldValue(row, [
              "Note",
              "note",
              "Notes",
              "notes",
              "Commenti",
              "commenti",
            ]),
            apartment: mapping.apartment,
          };

          // Gestione speciale per gli adulti: se non è stato trovato, prova a dedurlo
          if (!mappedBooking.adulti) {
            // Cerca il totale ospiti
            const totaleOspiti = findFieldValue(row, [
              "Ospiti totali",
              "Totale ospiti",
              "Total guests",
              "Guests",
              "Ospiti",
              "Totale persone",
              "N° Ospiti",
              "Numero ospiti",
            ]);

            if (totaleOspiti && totaleOspiti.trim() !== "") {
              const ospiti = parseInt(totaleOspiti, 10);
              const bambini = parseInt(mappedBooking.bambini || "0", 10);

              if (!isNaN(ospiti) && ospiti > 0) {
                // Deduce il numero di adulti sottraendo i bambini
                mappedBooking.adulti = Math.max(1, ospiti - bambini).toString();
              }
            } else {
              // Se proprio non trova nulla, imposta a 1 adulto come minimo
              mappedBooking.adulti = "1";
            }
          }

          return mappedBooking;
        });

      console.log(
        `Trovate ${validBookings.length} prenotazioni valide in ${mapping.sheet}`
      );

      // Crea o aggiorna i dati in PocketBase
      const collectionExists = await checkIfCollectionExists(
        pb,
        mapping.collection
      );

      if (!collectionExists) {
        console.log(`Creazione collezione ${mapping.collection}...`);
        await createBookingCollection(pb, mapping.collection);
      }

      // Inserisci i dati in PocketBase
      let inserted = 0;
      for (const booking of validBookings) {
        try {
          await pb.collection(mapping.collection).create(booking);
          inserted++;
        } catch (error) {
          console.error(
            `Errore durante l'inserimento della prenotazione ${booking.Nome}:`,
            error
          );
        }
      }

      console.log(`Inserite ${inserted} prenotazioni in ${mapping.collection}`);
    } catch (error) {
      console.error(`Errore durante la migrazione di ${mapping.sheet}:`, error);
    }
  }

  console.log("Migrazione completata!");
}

// Controlla se una collezione esiste già in PocketBase
async function checkIfCollectionExists(pb, collectionName) {
  try {
    await pb.collections.getOne(collectionName);
    return true;
  } catch (error) {
    return false;
  }
}

// Crea una nuova collezione in PocketBase per le prenotazioni
async function createBookingCollection(pb, collectionName) {
  const collectionData = {
    name: collectionName,
    type: "base",
    schema: [
      {
        name: "Nome",
        type: "text",
        required: true,
      },
      {
        name: "OTA",
        type: "text",
      },
      {
        name: "CheckIn",
        type: "text",
        required: true,
      },
      {
        name: "CheckOut",
        type: "text",
        required: true,
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
