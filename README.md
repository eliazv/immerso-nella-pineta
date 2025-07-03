# Immerso nella Pineta – Backoffice App

Questo progetto è un sito web completo per la gestione e la promozione di una Casa Vacanze in affitto.

## Descrizione

Il sito è suddiviso in due aree principali:

- **Sezione pubblica**: Presenta la Casa Vacanze con una galleria fotografica, descrizione dettagliata degli ambienti, servizi offerti, regole della casa e un form di contatto per richieste di prenotazione diretta. L'obiettivo è fornire tutte le informazioni utili agli ospiti e facilitare la comunicazione.

- **Sezione privata (Backoffice)**: Accessibile solo al proprietario o gestore tramite autenticazione, permette di controllare e gestire tutte le prenotazioni ricevute, visualizzare statistiche di occupazione, confrontare i dati con i portali OTA e gestire il calendario delle disponibilità. L'interfaccia è ottimizzata per l'uso sia da desktop che da mobile.

## Tecnologie principali

- React + TypeScript
- Vite
- Tailwind CSS
- Capacitor (Android)
- shadcn-ui

## Avvio locale

```sh
npm install
npm run dev
```

## Build produzione

```sh
npm run build
```

## Build APK Android

```sh
npx cap sync android
npx cap open android
# Poi builda l'APK da Android Studio
```

---

Sviluppo moderno, UI responsive e ottimizzata per mobile e web. Tutto il codice sorgente si trova nella cartella `src/`.
