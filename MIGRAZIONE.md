# Guida alla migrazione dei dati da Google Sheets a PocketBase

Questo documento fornisce istruzioni dettagliate su come eseguire correttamente la migrazione dei dati dalle tabelle Google Sheets a PocketBase per l'applicazione "Immerso nella Pineta".

## Prerequisiti

1. Assicurati di avere Node.js installato (versione 16 o superiore)
2. Verifica che PocketBase sia scaricato e configurato nella cartella `pocketbase`

## Passi per la migrazione

### 1. Avviare PocketBase (se non è già in esecuzione)

Esegui lo script `start-pocketbase.bat` nella cartella principale del progetto:

```powershell
cd "c:\Users\eliaz\Desktop\Progetti\immerso-nella-pineta"
.\start-pocketbase.bat
```

Questo aprirà una nuova finestra di terminale con PocketBase in esecuzione.

### 2. Eseguire lo script di migrazione

Ora puoi eseguire lo script di migrazione che convertirà i dati da Google Sheets a PocketBase.

#### Utilizzo dello script corretto per il tipo di modulo

Poiché il progetto è configurato come un modulo ES (type: "module" nel package.json), è necessario utilizzare lo script compatibile in formato ESM:

```powershell
cd "c:\Users\eliaz\Desktop\Progetti\immerso-nella-pineta"
node .\scripts\runMigrationEsm.js
```

Lo script eseguirà le seguenti operazioni:

1. Verificherà se PocketBase è in esecuzione e, se necessario, ti offrirà di avviarlo automaticamente
2. Chiederà conferma prima di procedere con la migrazione (che potrebbe sovrascrivere dati esistenti)
3. Ti chiederà di inserire le credenziali dell'amministratore di PocketBase
4. Creerà le collezioni necessarie (se non esistono) e importerà tutti i dati

### 3. Verificare che le collezioni siano state create correttamente

Dopo aver eseguito la migrazione, accedi all'interfaccia di amministrazione di PocketBase:

- URL: http://127.0.0.1:8090/_/

Verifica che siano state create le seguenti collezioni con i relativi dati:

- `bookings_principale`: Prenotazioni per l'Appartamento 3
- `bookings_secondario`: Prenotazioni per l'Appartamento 4
- `bookings_terziario`: Prenotazioni per l'Appartamento 8

## Risoluzione problemi

### PocketBase non si avvia

1. Verifica che l'eseguibile `pocketbase.exe` sia presente nella cartella `pocketbase`
2. Assicurati che non ci siano già istanze di PocketBase in esecuzione sulla porta 8090

### Errori durante la migrazione

1. Verifica di aver configurato correttamente l'account amministratore di PocketBase
2. Controlla l'accesso al foglio Google Sheets (ID: 156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc)
3. Esamina eventuali errori nei log della console

### Il modulo BookingForm non visualizza le date corrette

1. Verifica che PocketBase sia in esecuzione
2. Controlla che la collezione `bookings_principale` contenga dati validi
3. Pulisci la cache del browser per assicurarti che non ci siano dati obsoleti

---

Per ulteriori informazioni, consulta la documentazione di [PocketBase](https://pocketbase.io/docs/) o contatta l'amministratore del sistema.
