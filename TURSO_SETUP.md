# 🚀 Guida Setup Turso Database

Questa guida ti aiuterà a completare la migrazione da Google Sheets a Turso Database.

## 📋 Prerequisiti

- Account Turso (gratuito): [turso.tech](https://turso.tech)
- Turso CLI installato globalmente

## 🔧 Step 1: Setup Turso CLI

```bash
# Installa Turso CLI
npm install -g @turso/cli

# Accedi al tuo account
turso auth signup
# oppure se hai già un account:
turso auth login
```

## 🗄️ Step 2: Crea il Database

```bash
# Crea il database
turso db create immerso-pineta

# Genera il token di accesso
turso db tokens create immerso-pineta

# Ottieni l'URL del database
turso db show immerso-pineta
```

## ⚙️ Step 3: Configura le Variabili d'Ambiente

Crea/aggiorna il file `.env.local` con le credenziali Turso:

```env
# Turso Database Configuration
VITE_TURSO_DATABASE_URL=libsql://your-database-name-user.turso.io
VITE_TURSO_AUTH_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9...
```

**Dove trovare i valori:**
- `VITE_TURSO_DATABASE_URL`: Mostrato nel comando `turso db show immerso-pineta`
- `VITE_TURSO_AUTH_TOKEN`: Generato con `turso db tokens create immerso-pineta`

## 🔄 Step 4: Migrazione Dati

**IMPORTANTE:** Fai un backup dei tuoi dati Google Sheets prima di procedere!

1. **Verifica che Google Sheets funzioni ancora:**
   ```bash
   npm run dev
   # Vai su /calendar e verifica che le prenotazioni si caricano
   ```

2. **Esegui la migrazione:**
   ```typescript
   // Nel browser console o tramite script Node.js
   import { runMigration } from './src/scripts/migrateToTurso.ts';
   await runMigration();
   ```

3. **Verifica la migrazione:**
   ```bash
   # Controlla che i dati siano stati inseriti
   turso db shell immerso-pineta
   > SELECT COUNT(*) FROM bookings;
   > SELECT apartment, COUNT(*) FROM bookings GROUP BY apartment;
   ```

## ✅ Step 5: Test dell'Implementazione

1. **Avvia l'applicazione:**
   ```bash
   npm run dev
   ```

2. **Testa le funzionalità:**
   - ✅ Visualizzazione calendario (`/calendar`)
   - ✅ Aggiunta nuova prenotazione
   - ✅ Modifica prenotazione esistente
   - ✅ Eliminazione prenotazione
   - ✅ Cambio appartamento (principale/secondario/terziario)

## 🎯 Vantaggi Ottenuti

| Aspetto | Google Sheets | Turso |
|---------|---------------|-------|
| **Performance** | ⚠️ 2-5 secondi | ✅ <500ms |
| **Concurrent Users** | ⚠️ Limitato | ✅ Illimitato |
| **Rate Limits** | ⚠️ Quotas API | ✅ Generoso |
| **Offline Capability** | ❌ No | ✅ Possibile |
| **SQL Queries** | ❌ No | ✅ Completo |
| **Caching** | ⚠️ Complesso | ✅ Semplice |

## 🔧 Troubleshooting

### Errore: "Database URL not found"
```env
# Assicurati che le variabili d'ambiente siano corrette
VITE_TURSO_DATABASE_URL=libsql://your-database.turso.io
VITE_TURSO_AUTH_TOKEN=your-token-here
```

### Errore: "Permission denied"
```bash
# Ricontrolla il token
turso db tokens create immerso-pineta
# Copia il nuovo token in .env.local
```

### Migrazione fallisce
```bash
# Controlla che Google Sheets funzioni
# Verifica le credenziali Turso
# Controlla i log nel browser console
```

## 🚨 Rollback Plan

Se qualcosa va storto, puoi sempre tornare a Google Sheets:

1. **Ripristina gli import:**
   ```typescript
   // Cambia in tutti i file da:
   import { fetchBookings } from "@/services/newBookingService";
   // A:
   import { fetchBookings } from "@/services/bookingService";
   ```

2. **Rimuovi le variabili Turso dal .env.local**

3. **Restart dell'app:** `npm run dev`

## 🎉 Prossimi Passi

Una volta che tutto funziona:

1. **Monitora le performance** per 1-2 settimane
2. **Considera la rimozione** di `bookingService.ts` (Google Sheets)
3. **Imposta backup automatici** Turso
4. **Ottimizza le query** se necessario

## 📞 Supporto

- **Turso Docs:** [docs.turso.tech](https://docs.turso.tech)
- **Community Discord:** [discord.gg/turso](https://discord.gg/turso)

---

✨ **Buona migrazione!** Una volta completata, avrai un database performante e scalabile per il tuo sistema booking!