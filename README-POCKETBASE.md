# Guida all'integrazione con PocketBase per Immerso nella Pineta

## Prerequisiti

1. Scaricare PocketBase dalla [pagina ufficiale](https://pocketbase.io/docs/)
2. Estrarre l'eseguibile nella cartella `pocketbase` nella root del progetto

## Prima installazione

### 1. Avviare PocketBase

Esegui il file `start-pocketbase.bat` nella root del progetto facendo doppio clic su di esso o aprendolo tramite terminale:

```
cd c:\Users\eliaz\Desktop\Progetti\immerso-nella-pineta
start-pocketbase.bat
```

### 2. Configurare l'account amministratore

1. Apri il browser all'indirizzo [http://127.0.0.1:8090/\_/](http://127.0.0.1:8090/_/)
2. Al primo avvio, crea un account amministratore
3. Prendi nota delle credenziali

### 3. Eseguire la migrazione dei dati da Google Sheets

Esegui lo script di migrazione dalla console:

```
cd c:\Users\eliaz\Desktop\Progetti\immerso-nella-pineta
node scripts\run-migration.js
```

Oppure, in alternativa, esegui direttamente lo script migrateToDatabase.js:

```
cd c:\Users\eliaz\Desktop\Progetti\immerso-nella-pineta
node scripts\migrateToDatabase.js
```

Lo script ti chiederà di inserire le credenziali dell'account amministratore di PocketBase e poi procederà a:

- Creare le collezioni necessarie se non esistono
- Importare tutte le prenotazioni da Google Sheets a PocketBase

## Uso quotidiano

1. Assicurati che PocketBase sia in esecuzione aprendo start-pocketbase.bat
2. Avvia l'applicazione normalmente (npm run dev o npm start)

## Risoluzione problemi

### PocketBase non si avvia

- Verifica che l'eseguibile di PocketBase sia nella cartella `pocketbase`
- Controlla i permessi e i firewall che potrebbero bloccare l'esecuzione o le porte

### Errore durante la migrazione

- Verifica le credenziali di amministratore
- Assicurati che PocketBase sia in esecuzione
- Controlla la connessione Internet per accedere a Google Sheets

### Problemi di accesso al database

- Verifica che PocketBase sia in esecuzione
- Controlla che le collezioni siano state create correttamente
- Verifica che le regole di accesso permettano le operazioni necessarie

## Test dell'installazione

Puoi verificare se PocketBase è configurato correttamente eseguendo lo script di test:

```
node scripts\testPocketBase.js
```

Il test verificherà:

- Se il server PocketBase è in esecuzione
- Se le collezioni necessarie esistono
- Se è possibile accedere alle prenotazioni
