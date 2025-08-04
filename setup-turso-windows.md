# 🪟 Setup Turso per Windows - Guida Semplificata

## 🔧 Step 1: Crea Database su Turso

1. **Vai su** [turso.tech/dashboard](https://turso.tech/dashboard)
2. **Login** con il tuo account
3. **Clicca** "Create Database"
4. **Nome:** `immerso-pineta`
5. **Località:** Europe (consigliata per l'Italia)
6. **Clicca** "Create"

## 🔑 Step 2: Ottieni le Credenziali

### Database URL:
1. Nella dashboard, clicca sul tuo database `immerso-pineta`
2. Copia l'URL che vedi (tipo: `libsql://immerso-pineta-username.turso.io`)

### Auth Token:
1. Nel database, vai alla sezione "Tokens"
2. Clicca "Create Token"
3. **Nome:** `immerso-pineta-token`
4. **Scadenza:** Never expires (raccomandato)
5. Clicca "Create" e copia il token generato

## ⚙️ Step 3: Configura Ambiente

Crea il file `.env.local` nella root del progetto con:

```env
# Sostituisci con i tuoi valori reali
VITE_TURSO_DATABASE_URL=libsql://immerso-pineta-[IL-TUO-USERNAME].turso.io
VITE_TURSO_AUTH_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.[IL-TUO-TOKEN-COMPLETO]

# Le altre variabili esistenti...
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
# ... resto del file
```

## 🧪 Step 4: Test Setup

```powershell
# Test che tutto funzioni
npm run dev
```

Poi vai su `http://localhost:5173/calendar` e verifica:
- ✅ La pagina si carica senza errori
- ✅ Non ci sono errori nella console del browser
- ✅ Il calendario appare (anche se vuoto)

## 🔄 Step 5: Migra i Dati (Opzionale)

Se vuoi trasferire i dati da Google Sheets:

1. **Assicurati** che Google Sheets funzioni ancora
2. **Apri** la console del browser (F12)
3. **Esegui:**
   ```javascript
   // Questo codice va nella console del browser
   import('./src/scripts/migrateToTurso.ts').then(m => m.runMigration());
   ```

## ✅ Verifica Finale

Il setup è riuscito se:
- ✅ `/calendar` si carica senza errori
- ✅ Puoi aggiungere una nuova prenotazione
- ✅ La prenotazione appare nel calendario
- ✅ Non ci sono errori 404 o di connessione

## 🆘 Troubleshooting

### Errore "libsql protocol error"
- ✅ Controlla che l'URL inizi con `libsql://`
- ✅ Verifica che l'URL sia copiato completamente

### Errore "Unauthorized"
- ✅ Controlla che il token sia copiato completamente
- ✅ Verifica che il token non sia scaduto
- ✅ Genera un nuovo token se necessario

### Errore "Network Error"
- ✅ Controlla la connessione internet
- ✅ Prova a ricaricare la pagina

---

## 🎯 Una volta completato

Avrai sostituito Google Sheets con un database veloce e affidabile! 

**Performance attese:**
- ⚡ Caricamento calendario: da 3-5 secondi a <500ms
- 🚀 Operazioni CRUD: immediate
- 📊 Niente più rate limits di Google Sheets