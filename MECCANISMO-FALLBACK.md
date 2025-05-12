# Meccanismo di Fallback in Immerso nella Pineta

Questo documento descrive il meccanismo di fallback implementato nell'applicazione per garantire che le prenotazioni siano sempre visibili anche quando PocketBase non è disponibile.

## Architettura del sistema

L'applicazione utilizza un'architettura a cascata per l'accesso ai dati:

1. **PocketBase (database principale)**: Sistema database locale che contiene tutte le prenotazioni
2. **Google Sheets (fonte secondaria)**: Accesso ai dati attraverso l'API di Google Sheets
3. **Cache locale (fallback finale)**: Memorizzazione delle prenotazioni nel localStorage del browser

## Flusso di recupero dati

Quando l'applicazione deve visualizzare le prenotazioni, segue questo processo:

1. **Verifica PocketBase**:

   - Controlla se PocketBase è disponibile con un timeout di 3 secondi
   - Se disponibile, recupera le prenotazioni dalle collezioni appropriate

2. **Fallback a Google Sheets**:

   - Se PocketBase non risponde, l'applicazione importa dinamicamente il `bookingService`
   - Recupera i dati direttamente da Google Sheets attraverso l'API

3. **Utilizzo della cache locale**:

   - Se anche Google Sheets non è disponibile, l'applicazione verifica la cache locale
   - La cache è considerata valida solo se è stata aggiornata nelle ultime 24 ore

4. **Messaggi di errore**:
   - Se tutti i metodi falliscono, mostra un messaggio di errore all'utente

## File chiave

I file principali coinvolti nel meccanismo di fallback sono:

- `src/components/BookingForm.tsx`: Gestisce la logica di fallback per il form di prenotazione
- `src/services/pocketbaseService.ts`: Contiene la logica per verificare PocketBase e recuperare le prenotazioni
- `src/services/bookingService.ts`: Gestisce l'accesso ai dati da Google Sheets come fallback

## Configurazione dei timeout

I timeout sono configurati in modo da garantire che l'interfaccia utente rimanga responsive:

- **PocketBase Health Check**: 3 secondi
- **Richieste a PocketBase**: 5 secondi
- **Timeout Google Sheets**: 10 secondi

## Manutenzione

Per garantire un funzionamento ottimale del meccanismo di fallback:

1. **Mantieni sincronizzati i dati**: Assicurati che PocketBase e Google Sheets contengano gli stessi dati
2. **Controlla regolarmente PocketBase**: Verifica che sia in esecuzione e funzionante
3. **Verifica la connettività Internet**: Necessaria per l'accesso a Google Sheets come fallback

## Risoluzione problemi

Se il meccanismo di fallback non funziona correttamente:

1. Controlla se PocketBase è in esecuzione: `Invoke-WebRequest -Uri "http://127.0.0.1:8090/api/health"`
2. Verifica l'accesso a Google Sheets
3. Controlla l'output della console del browser per errori
4. Se necessario, svuota la cache locale dal browser: localStorage.clear()
