# Configurazione PocketBase per Immerso nella Pineta

Questa guida ti aiuterà a configurare PocketBase come database per l'applicazione "Immerso nella Pineta", sostituendo Google Sheets.

## Requisiti

- Node.js (versione 16 o superiore)
- [PocketBase](https://pocketbase.io/docs) scaricato per il tuo sistema operativo

## Installazione di PocketBase

1. Scarica PocketBase per il tuo sistema operativo da [pocketbase.io](https://pocketbase.io/docs).
2. Estrai il file scaricato nella cartella `pocketbase` all'interno della directory del progetto.
3. Usa lo script `scripts/start-pocketbase.bat` (Windows) o crea uno script equivalente per Mac/Linux.

### Per Mac/Linux (start-pocketbase.sh)

```bash
#!/bin/bash
cd pocketbase
echo "Avvio PocketBase..."
./pocketbase serve &
echo "PocketBase avviato! Accedi all'amministrazione su http://127.0.0.1:8090/_/"
```

4. Rendi lo script eseguibile (solo per Mac/Linux):

```bash
chmod +x scripts/start-pocketbase.sh
```

## Primo avvio e configurazione

1. Esegui lo script appena creato per avviare PocketBase.
2. Apri il browser all'indirizzo http://127.0.0.1:8090/_/
3. Al primo avvio, ti verrà richiesto di creare un account amministratore.
4. Compila il form con le tue credenziali:
   - Email: inserisci la tua email
   - Password: scegli una password sicura

## Migrazione dei dati da Google Sheets

1. Assicurati che PocketBase sia in esecuzione.
2. Esegui lo script di migrazione:

```bash
node scripts/migrateToDatabase.js
```

3. Segui le istruzioni a schermo per inserire le credenziali dell'amministratore.
4. Lo script creerà le collezioni necessarie e importerà i dati.

## Struttura del database

PocketBase creerà le seguenti collezioni:

- `bookings_principale`: Prenotazioni per l'Appartamento 3
- `bookings_secondario`: Prenotazioni per l'Appartamento 4
- `bookings_terziario`: Prenotazioni per l'Appartamento 8

Ogni prenotazione contiene i seguenti campi:

- `Nome`: Nome del cliente
- `OTA`: Canale di prenotazione (Booking, Airbnb, ecc.)
- `CheckIn`: Data di arrivo
- `CheckOut`: Data di partenza
- `Notti`: Numero di notti
- ...e molti altri campi (vedere lo schema completo in `src/types/calendar.ts`)

## Test dell'installazione

1. Esegui lo script di test per verificare che PocketBase sia configurato correttamente:

```bash
node scripts/testPocketBase.js
```

2. Verifica che tutti i test passino.

## Utilizzo nell'applicazione

L'applicazione è stata configurata per utilizzare automaticamente PocketBase. Assicurati che:

1. PocketBase sia in esecuzione quando usi l'applicazione
2. Le variabili d'ambiente siano impostate correttamente nel file `.env`:

```
POCKETBASE_URL=http://127.0.0.1:8090
```

## Configurazione delle regole di accesso

Per impostazione predefinita, le collezioni PocketBase hanno restrizioni di accesso severe. Per consentire l'accesso pubblico alle prenotazioni (solo lettura) per il form di prenotazione frontend:

1. Accedi all'interfaccia di amministrazione PocketBase
2. Vai in "Collections" e seleziona una collezione (es. `bookings_principale`)
3. Vai nella scheda "Rules"
4. Aggiungi una regola che consenta la lettura pubblica:

   - Seleziona "Public" nel menu a discesa
   - Abilita "List/Search" e "View"
   - Disabilita le altre operazioni (Create, Update, Delete)
   - Salva le modifiche

5. Ripeti per tutte le collezioni che devono essere accessibili pubblicamente

## Risoluzione dei problemi

### PocketBase non si avvia

- Verifica che il percorso alla cartella `pocketbase` sia corretto nello script di avvio
- Controlla che non ci siano altre istanze di PocketBase già in esecuzione

### Errori di connessione nell'applicazione

- Verifica che PocketBase sia in esecuzione
- Controlla che l'URL nel file `.env` corrisponda all'indirizzo e alla porta di PocketBase

### Errori durante la migrazione

- Assicurati di aver inserito correttamente le credenziali di amministratore
- Verifica che il file Google Sheets sia accessibile e condiviso correttamente

## Backup dei dati

PocketBase salva tutti i dati in un file SQL situato nella cartella `pocketbase/pb_data/data.db`. Per eseguire un backup:

1. Ferma PocketBase
2. Copia il file `pb_data/data.db` in una posizione sicura
3. Riavvia PocketBase

Per ripristinare un backup, sostituisci il file `data.db` con la versione di backup e riavvia PocketBase.
