# Regole di Sicurezza Firestore - Immerso nella Pineta

## 🌍 Configurazione Località

**Consigliata**: `europe-west1` (Belgio)

- Latenza minima per l'Italia
- Prezzi standard EU
- Tutti i servizi Firebase disponibili

## 🔐 Regole di Sicurezza per Fasi

### FASE 1: Setup e Test (TEMPORANEO)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Usare SOLO per setup iniziale - max 1 settimana!**

---

### FASE 2: Produzione Base (CONSIGLIATA per iniziare)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Proprietà - pubbliche per visualizzazione disponibilità
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Prenotazioni
    match /bookings/{bookingId} {
      // Lettura solo per utenti autenticati (backoffice)
      allow read: if request.auth != null;

      // Creazione libera (form prenotazione pubblico)
      allow create: if true;

      // Modifica solo per utenti autenticati
      allow update, delete: if request.auth != null;
    }

    // Statistiche - solo lettura per autenticati
    match /stats/{statId} {
      allow read: if request.auth != null;
      allow write: if false; // Generate da Cloud Functions
    }

    // Promemoria/Notifiche
    match /reminders/{reminderId} {
      allow read, write: if request.auth != null;
    }

    // Log di sistema (opzionale)
    match /logs/{logId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

### FASE 3: Sicurezza Avanzata (Per il futuro)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    function getUserRole() {
      return isAuthenticated() ?
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role :
        null;
    }

    function isAdmin() {
      return getUserRole() == 'admin';
    }

    function isManager() {
      return getUserRole() in ['admin', 'manager'];
    }

    // Rate limiting per prevenire spam
    function isValidBookingCreation() {
      return request.time > resource.data.lastBookingTime + duration.value(1, 'm');
    }

    // Proprietà
    match /properties/{propertyId} {
      allow read: if true; // Pubblico
      allow create, update: if isAdmin();
      allow delete: if false; // Mai eliminare, solo disabilitare
    }

    // Prenotazioni
    match /bookings/{bookingId} {
      allow read: if isManager();
      allow create: if true &&
                      // Validazioni base
                      request.resource.data.guestName is string &&
                      request.resource.data.guestEmail is string &&
                      request.resource.data.checkInDate is timestamp &&
                      request.resource.data.checkOutDate is timestamp &&
                      // Check-in deve essere nel futuro
                      request.resource.data.checkInDate > request.time;
      allow update: if isManager() &&
                      // Non permettere modifica di alcuni campi critici
                      request.resource.data.id == resource.data.id;
      allow delete: if isAdmin();
    }

    // Utenti del backoffice
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAdmin();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }

    // Statistiche (generate automaticamente)
    match /stats/{statId} {
      allow read: if isManager();
      allow write: if false; // Solo Cloud Functions
    }
  }
}
```

## 🛡️ Configurazione Sicurezza Aggiuntiva

### 1. App Check (Raccomandato)

```bash
# Protegge dalle richieste da bot/script
firebase app-distribution:testers:add --project=your-project-id
```

### 2. Backup Automatico

```javascript
// Abilita backup giornaliero automatico
// Console Firebase > Firestore > Backup e Export
```

### 3. Monitoraggio

```javascript
// Abilita audit logging
// Console Firebase > Firestore > Utilizzo > Audit logs
```

## 📋 Checklist Implementazione

- [ ] 1. Scegli locality: `europe-west1`
- [ ] 2. Inizia con FASE 1 (solo per setup)
- [ ] 3. Passa alla FASE 2 entro 1 settimana
- [ ] 4. Testa tutte le funzionalità
- [ ] 5. Implementa autenticazione PIN robusta
- [ ] 6. Abilita backup automatico
- [ ] 7. Configura alerting per errori
- [ ] 8. Pianifica upgrade a FASE 3

## 🚨 Alert di Sicurezza

### Cosa Monitorare:

- Tentativi di accesso non autorizzati
- Picchi di letture/scritture inusuali
- Errori di validazione
- Creazione prenotazioni in massa

### Limiti Consigliati:

- Max 100 letture/minuto per IP
- Max 10 scritture/minuto per IP
- Max 5 creazioni prenotazioni/ora per IP
