# Configurazione Firebase per il Sistema Prenotazioni

## 🔥 Setup Firebase

### 1. Crea un progetto Firebase

1. Vai su https://console.firebase.google.com/
2. Clicca su "Crea un progetto"
3. Inserisci il nome del progetto (es. "immerso-nella-pineta")
4. Abilita Google Analytics (opzionale)

### 2. Configura Firestore Database

1. Nel pannello Firebase, vai su "Firestore Database"
2. Clicca "Crea database"
3. Inizia in modalità test (per ora)
4. Scegli la region più vicina (europe-west)

### 3. Configura Authentication (opzionale)

1. Vai su "Authentication" > "Sign-in method"
2. Abilita "Email/Password" se vuoi un sistema di login più robusto

### 4. Ottieni le credenziali

1. Vai su "Impostazioni progetto" (icona ingranaggio)
2. Scorri fino a "Le tue app"
3. Clicca sull'icona web (</>)
4. Registra l'app con un nome
5. Copia le credenziali di configurazione

### 5. Configura il progetto

Sostituisci le credenziali in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tuo-progetto.firebaseapp.com",
  projectId: "tuo-progetto-id",
  storageBucket: "tuo-progetto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop",
};
```

## 📊 Struttura Database

### Collection: `properties`

```typescript
{
  id: string,
  name: "Appartamento N° 3",
  code: "principale",
  address: "Via Example 123",
  maxGuests: 4,
  isActive: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `bookings`

```typescript
{
  id: string,
  propertyId: "property-id",
  propertyName: "Appartamento N° 3",
  guestName: "Mario Rossi",
  guestEmail: "mario@example.com",
  guestPhone: "+39 123 456 7890",
  numberOfGuests: 2,
  checkInDate: Timestamp,
  checkOutDate: Timestamp,
  totalAmount: 150.00,
  tassaSoggiornoPagata: false,
  status: "confirmed",
  source: "direct",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔐 Regole di Sicurezza

Vai su "Firestore Database" > "Regole" e imposta:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permetti accesso solo agli utenti autenticati (per ora pubblico per test)
    match /{document=**} {
      allow read, write: if true; // CAMBIA QUESTO IN PRODUZIONE!
    }
  }
}
```

**⚠️ IMPORTANTE**: In produzione, implementa regole di sicurezza più stringenti!

## 🚀 Funzionalità Implementate

✅ **CRUD Prenotazioni completo**

- Creazione, lettura, aggiornamento, cancellazione
- Filtri avanzati (data, stato, proprietà)
- Paginazione automatica

✅ **Gestione Multi-proprietà**

- Supporto per più appartamenti
- Filtro per proprietà specifica

✅ **Tassa di Soggiorno**

- Tracciamento stato pagamento
- Data di pagamento
- Promemoria automatici

✅ **Dashboard in tempo reale**

- Statistiche aggiornate
- Check-in/out del giorno
- Tasse in scadenza

## 📱 Prossimi Passi

### 1. Notifiche Push (opzionale)

1. Vai su "Cloud Messaging" nel console Firebase
2. Configura il service worker
3. Implementa la logica di notifica

### 2. Importazione dati Excel

Crea uno script per importare i dati esistenti:

```typescript
// Esempio script di migrazione
import { firebaseBookingService } from "./src/services/firebaseBookingService";

const importFromExcel = async (excelData) => {
  for (const row of excelData) {
    await firebaseBookingService.createBooking({
      propertyId: "principale",
      propertyName: "Appartamento N° 3",
      guestName: row.nome,
      guestEmail: row.email,
      // ... altri campi
    });
  }
};
```

### 3. Backup automatico

Configura backup automatici su Google Cloud Storage

### 4. App Mobile (PWA)

Il progetto è già ottimizzato per mobile, puoi trasformarlo in PWA aggiungendo:

- Service Worker
- Web App Manifest
- Cache offline

## 🎯 Vantaggi del nuovo sistema

- ✅ **Multi-utente**: Tu e il tuo collaboratore potete lavorare contemporaneamente
- ✅ **Real-time**: Aggiornamenti istantanei
- ✅ **Mobile-friendly**: Interfaccia ottimizzata per smartphone
- ✅ **Backup automatico**: Firebase gestisce tutto
- ✅ **Scalabile**: Supporta crescita del business
- ✅ **Sicuro**: Crittografia e backup automatici
- ✅ **Notifiche**: Sistema di promemoria integrato
