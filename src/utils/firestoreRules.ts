/**
 * Regole di sicurezza Firestore pronte per l'uso
 * Copia e incolla queste regole nella console Firebase
 */

// FASE 1: Solo per setup iniziale (MAX 1 settimana)
export const SETUP_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ⚠️ PERICOLOSO - Solo per setup iniziale!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

// FASE 2: Produzione base (CONSIGLIATA per iniziare)
export const PRODUCTION_BASIC_RULES = `rules_version = '2';
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
}`;

// FASE 3: Sicurezza avanzata (Per il futuro)
export const PRODUCTION_ADVANCED_RULES = `rules_version = '2';
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
    
    // Validazioni per prenotazioni
    function isValidBooking(booking) {
      return booking.guestName is string && booking.guestName.size() > 0 &&
             booking.guestEmail is string && booking.guestEmail.matches('.*@.*\\..*') &&
             booking.checkInDate is timestamp &&
             booking.checkOutDate is timestamp &&
             booking.checkInDate < booking.checkOutDate &&
             booking.checkInDate > request.time;
    }
    
    // Proprietà
    match /properties/{propertyId} {
      allow read: if true; // Pubblico per visualizzazione disponibilità
      allow create, update: if isAdmin();
      allow delete: if false; // Mai eliminare proprietà, solo disabilitare
    }
    
    // Prenotazioni
    match /bookings/{bookingId} {
      allow read: if isManager();
      allow create: if isValidBooking(request.resource.data);
      allow update: if isManager() &&
                      // Impedisci modifica di campi critici
                      request.resource.data.id == resource.data.id &&
                      request.resource.data.createdAt == resource.data.createdAt;
      allow delete: if isAdmin();
    }
    
    // Utenti del backoffice
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAdmin();
      allow update: if (isOwner(userId) && 
                        // Gli utenti non possono modificare il proprio ruolo
                        request.resource.data.role == resource.data.role) || 
                       isAdmin();
      allow delete: if isAdmin();
    }
    
    // Statistiche (generate automaticamente da Cloud Functions)
    match /stats/{statId} {
      allow read: if isManager();
      allow write: if false; // Solo Cloud Functions possono scrivere
    }
    
    // Log di sistema
    match /logs/{logId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
      allow update, delete: if false; // I log non si modificano mai
    }
    
    // Backup metadata (se necessario)
    match /backups/{backupId} {
      allow read: if isAdmin();
      allow write: if false; // Solo Cloud Functions
    }
  }
}`;

// Regole per la modalità di sviluppo locale
export const DEVELOPMENT_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Per sviluppo locale - accesso limitato solo agli utenti autenticati
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`;

/**
 * Utility per copiare le regole negli appunti
 */
export const copyRulesToClipboard = (rules: string): Promise<void> => {
  return navigator.clipboard.writeText(rules);
};

/**
 * Istruzioni per applicare le regole
 */
export const RULES_INSTRUCTIONS = `
## Come Applicare le Regole di Sicurezza

1. **Vai alla Console Firebase**
   - Apri https://console.firebase.google.com
   - Seleziona il tuo progetto

2. **Naviga verso Firestore**
   - Menu laterale > Firestore Database
   - Tab "Regole" in alto

3. **Incolla le Regole**
   - Cancella tutto il contenuto esistente
   - Incolla le nuove regole
   - Clicca "Pubblica"

4. **Testa le Regole**
   - Usa il simulatore nella console
   - Testa scenari di lettura/scrittura
   - Verifica che tutto funzioni

## ⚠️ ATTENZIONE

- **Backup**: Salva sempre le regole attuali prima di modificarle
- **Test**: Testa le nuove regole prima di pubblicarle in produzione
- **Graduale**: Implementa le regole gradualmente (Fase 1 → 2 → 3)
- **Monitoraggio**: Controlla i log per errori dopo la pubblicazione
`;

export { RULES_INSTRUCTIONS as default };
