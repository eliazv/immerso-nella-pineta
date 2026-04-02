# Google Apps Script — Immerso nella Pineta

Questa cartella contiene il codice Google Apps Script per la gestione delle prenotazioni su Google Sheets e la sincronizzazione del calendario tramite feed iCal.

## File

| File            | Descrizione                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- |
| `Code.gs`       | Operazioni CRUD (aggiunta, modifica, eliminazione) sulle prenotazioni nel foglio Google     |
| `ICalExport.gs` | Generazione del feed iCal per la sincronizzazione con Google Calendar, Apple Calendar, ecc. |

---

## Setup iniziale

### 1. Aprire il progetto Apps Script

1. Apri il Google Sheet: [Immerso nella Pineta](https://docs.google.com/spreadsheets/d/156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc)
2. Vai su **Estensioni → Apps Script**
3. Nella finestra dell'editor, crea due file: `Code.gs` e `ICalExport.gs`
4. Copia il contenuto dei rispettivi file da questa cartella

### 2. Pubblicare come Web App

1. Clicca su **Distribuisci → Nuova distribuzione**
2. Seleziona tipo: **App Web**
3. Configurazione:
   - **Esegui come:** Me (il tuo account Google)
   - **Chi può accedere:** Chiunque
4. Clicca **Distribuisci**
5. **Copia l'URL** generato (sarà del tipo `https://script.google.com/macros/s/AKf.../exec`)

### 3. Configurare l'app React

Nel file `.env` del progetto React, imposta:

```
VITE_GOOGLE_SCRIPT_ENDPOINT=https://script.google.com/macros/s/TUO_SCRIPT_ID/exec
```

Riavvia il server di sviluppo (`npm run dev`).

---

## Struttura del foglio Google Sheets

Il foglio deve avere le seguenti intestazioni nella riga 1 (i nomi sono flessibili, il codice li cerca in modo case-insensitive):

| Colonna | Nome intestazione | Campo booking   |
| ------- | ----------------- | --------------- |
| A       | Nome              | `Nome`          |
| B       | OTA               | `OTA`           |
| C       | Check-in          | `CheckIn`       |
| D       | Check-out         | `CheckOut`      |
| E       | Notti             | `Notti`         |
| F       | Adulti            | `adulti`        |
| G       | Bambini           | `bambini`       |
| H       | Animali           | `animali`       |
| I       | Totale cliente    | `TotaleCliente` |
| J       | Fuori OTA         | `FuoriOTA`      |
| K       | Costo notti       | `CostoNotti`    |
| L       | Media a notte     | `MediaANotte`   |
| M       | Pulizia           | `Pulizia`       |
| N       | Sconti            | `Sconti`        |
| O       | Soggiorno Tax     | `SoggiornoTax`  |
| P       | OTA Tax           | `OTATax`        |
| Q       | Cedolare secca    | `CedolareSecca` |
| R       | Totale            | `Totale`        |
| S       | Note              | `Note`          |

> **Nota:** I fogli per gli appartamenti sono: `Affitti3` (Principale), `Affitti4` (Secondario), `Affitti8` (Terziario)

---

## Operazioni CRUD

### Aggiungere una prenotazione

L'app invia una richiesta GET con parametro `data`:

```json
{
  "action": "add",
  "booking": { "Nome": "Mario Rossi", "CheckIn": "01/07/2025", ... },
  "sheet": "Affitti3",
  "spreadsheetId": "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc"
}
```

### Modificare una prenotazione

```json
{
  "action": "update",
  "booking": { "Nome": "Mario Rossi", "rowIndex": 5, ... },
  "sheet": "Affitti3",
  "spreadsheetId": "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc"
}
```

### Eliminare una prenotazione

```json
{
  "action": "delete",
  "booking": { "Nome": "Mario Rossi", "rowIndex": 5, "CheckIn": "01/07/2025" },
  "sheet": "Affitti3",
  "spreadsheetId": "156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc"
}
```

---

## Feed iCal — Sincronizzazione calendario

Il feed iCal permette di aggiungere le prenotazioni al proprio calendario personale (Google Calendar, Apple Calendar, Outlook, ecc.) e tenerle sincronizzate automaticamente.

### URL del feed

Sostituisci `TUO_SCRIPT_ID` con l'ID dello script pubblicato:

| Appartamento                | URL                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------- |
| Tutti                       | `https://script.google.com/macros/s/TUO_SCRIPT_ID/exec?action=ical`                |
| Appartamento 3 (Principale) | `https://script.google.com/macros/s/TUO_SCRIPT_ID/exec?action=ical&sheet=Affitti3` |
| Appartamento 4 (Secondario) | `https://script.google.com/macros/s/TUO_SCRIPT_ID/exec?action=ical&sheet=Affitti4` |
| Appartamento 8 (Terziario)  | `https://script.google.com/macros/s/TUO_SCRIPT_ID/exec?action=ical&sheet=Affitti8` |

Oppure con il nome dell'appartamento:

| Appartamento | URL                                    |
| ------------ | -------------------------------------- |
| Principale   | `...?action=ical&apartment=principale` |
| Secondario   | `...?action=ical&apartment=secondario` |
| Terziario    | `...?action=ical&apartment=terziario`  |
| Tutti        | `...?action=ical&apartment=all`        |

### Aggiungere a Google Calendar

1. Apri [Google Calendar](https://calendar.google.com)
2. Clicca **+** accanto ad "Altri calendari" → **Da URL**
3. Incolla l'URL del feed iCal
4. Clicca **Aggiungi calendario**

> Google Calendar aggiorna i feed iCal condivisi ogni ~12-24 ore automaticamente.

### Aggiungere ad Apple Calendar (macOS/iOS)

1. Apri **Calendario** → **File → Nuovo abbonamento a calendario**
2. Incolla l'URL del feed iCal
3. Scegli la frequenza di aggiornamento (ogni ora, ogni giorno, ecc.)

### Aggiungere a Outlook

1. Apri Outlook → **Aggiungi calendario → Da Internet**
2. Incolla l'URL del feed iCal

### Se il feed risulta vuoto (solo BEGIN/END:VCALENDAR)

Controlla questi punti:

1. Le righe devono avere almeno `Nome`, `Check-in`, `Check-out`
2. I fogli devono chiamarsi `Affitti3`, `Affitti4`, `Affitti8` (oppure usa `sheet=` corretto nell'URL)
3. Dopo modifiche al codice Apps Script, crea una nuova distribuzione Web App

Il parser ora supporta automaticamente anche date native di Google Sheets (non solo stringhe).

---

## Notifica arrivi giornaliera (opzionale)

Se vuoi ricevere una mail quando arriva un ospite (giorno di check-in):

1. In `ICalExport.gs`, aggiungi in alto una variabile globale:

```javascript
var ARRIVAL_NOTIFICATION_EMAIL = "tua-email@gmail.com";
```

2. Nell'editor Apps Script esegui una volta la funzione `createDailyArrivalNotificationTrigger`
3. Autorizza lo script quando richiesto

Da quel momento, ogni giorno alle 08:00 viene eseguita `sendTodayArrivalsEmail` e ricevi una mail solo se ci sono arrivi previsti oggi.

---

## Note importanti

- **Autorizzazioni:** Alla prima esecuzione, Google chiederà di autorizzare lo script ad accedere ai Google Sheets. Accetta le autorizzazioni necessarie.
- **Aggiornamenti:** Ogni volta che modifichi il codice, devi creare una **nuova distribuzione** e aggiornare l'URL in `.env`.
- **CORS:** Le Web App di Google Apps Script con accesso "Chiunque" includono automaticamente gli header `Access-Control-Allow-Origin: *`. L'app React comunica direttamente tramite `fetch()` senza finestre popup né workaround.
- **Timeout:** Le richieste CRUD hanno un timeout di 20 secondi. Se Apps Script impiega più tempo (raro), l'operazione sarà considerata fallita e verrà mostrato un errore.
- **Cache:** Dopo ogni operazione di aggiunta/modifica/eliminazione, la cache locale viene invalidata e i dati vengono ricaricati dal foglio con un refresh forzato.
