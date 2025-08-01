# Sistema Alloggiati Web - Documentazione Completa

## 🎯 Obiettivo Raggiunto

È stato integrato con successo nel tuo sito un sistema completo per la raccolta dati ospiti e la generazione di schedine conformi al Portale Alloggiati Web della Questura.

## 🚀 Funzionalità Implementate

### ✅ Form di Raccolta Dati
- **Multi-ospite**: Gestione di singoli, famiglie e gruppi
- **Validazione completa**: Controlli real-time su tutti i campi
- **Cittadini italiani/stranieri**: Gestione automatica dei campi specifici
- **Documenti**: Supporto per carta d'identità, passaporto, patente
- **Date**: Validazione arrivo (solo oggi/ieri) e permanenza (max 30 giorni)

### ✅ Generazione Schedine
- **Formato ufficiale**: Tracciato a posizione fissa da 174 caratteri
- **Codici conformi**: Utilizzo delle tabelle ufficiali Alloggiati Web
- **File .txt**: Pronto per upload diretto sul portale
- **Nome automatico**: Con timestamp per identificazione univoca

### ✅ Sistema di Condivisione
- **Link temporanei**: Validi 7 giorni per condivisione sicura
- **Storage locale**: Nessun database esterno richiesto
- **URL parametrizzati**: Caricamento automatico dati condivisi

### ✅ Export e Download
- **File principale**: Schedina .txt per Alloggiati Web
- **Export CSV**: Per elaborazioni con Excel/Google Sheets
- **Download immediato**: Senza necessità di server

### ✅ Sicurezza e Privacy
- **GDPR compliant**: Consenso esplicito e informativa
- **Dati temporanei**: Auto-eliminazione dopo 7 giorni
- **Nessun server**: Elaborazione completamente client-side

## 🌐 Come Accedere

Il sistema è disponibile all'indirizzo:
```
https://tuodominio.com/alloggiati
```

## 📋 Flusso di Utilizzo

### 1. Compilazione Form
1. Accedi alla pagina `/alloggiati`
2. Inserisci i dati dell'appartamento
3. Compila i dati di ogni ospite
4. Aggiungi ospiti aggiuntivi se necessario

### 2. Generazione Schedina
1. Clicca "Genera Schedina Alloggiati"
2. Il sistema valida automaticamente i dati
3. Viene generata la schedina conforme

### 3. Download e Condivisione
1. **Scarica File**: Download diretto del file .txt
2. **Condividi**: Genera link temporaneo per altri utenti
3. **Export CSV**: Per elaborazioni aggiuntive

### 4. Upload su Alloggiati Web
1. Accedi al [Portale Alloggiati Web](https://alloggiatiweb.poliziadistato.it)
2. Carica il file .txt generato
3. Completa la trasmissione alla Questura

## 🔧 Configurazione Avanzata

### Codici Comuni e Stati
I codici sono preconfigurati per i comuni principali. Per aggiungere nuovi codici:

1. Modifica il file `src/types/alloggiati.ts`
2. Aggiungi i codici nella sezione `ALLOGGIATI_CODES`
3. Ricompila l'applicazione

### Personalizzazione ID Appartamento
Il campo ID Appartamento può essere personalizzato per ogni struttura ricettiva.

### Integrazione Email (Opzionale)
Per abilitare l'invio via email:

1. Configura un servizio come EmailJS
2. Aggiorna il metodo `sendViaEmail` in `src/services/storageService.ts`
3. Inserisci le credenziali del servizio

## 📱 Compatibilità

- ✅ **Desktop**: Tutti i browser moderni
- ✅ **Mobile**: Interfaccia responsive ottimizzata
- ✅ **Tablet**: Layout adattivo
- ✅ **Offline**: Funziona senza connessione internet

## 🛡️ Sicurezza

### Dati Personali
- **Elaborazione locale**: Nessun invio a server esterni
- **Storage temporaneo**: Auto-eliminazione dopo 7 giorni
- **Consenso GDPR**: Richiesto esplicitamente

### Link di Condivisione
- **Scadenza automatica**: 7 giorni massimo
- **ID univoci**: Non indovinabili
- **Pulizia automatica**: Rimozione dati scaduti

## 📞 Supporto

### Link Utili
- [Portale Alloggiati Web](https://alloggiatiweb.poliziadistato.it)
- [Manuale Ufficiale](https://alloggiatiweb.poliziadistato.it/portalealloggiati/Download/Manuali/MANUALEALBERGHI.pdf)

### Risoluzione Problemi

**Errore "Link scaduto"**
- I link di condivisione scadono dopo 7 giorni
- Genera un nuovo link se necessario

**File non conforme**
- Verifica che tutti i campi obbligatori siano compilati
- Controlla le date (arrivo solo oggi/ieri)
- Assicurati che i giorni di permanenza siano ≤ 30

**Problemi di download**
- Verifica che il browser permetta i download
- Controlla le impostazioni popup/blocco download

## 🎉 Risultato Finale

Hai ora un sistema completo e professionale per:

1. **Raccogliere** i dati degli ospiti in modo semplice e veloce
2. **Generare** schedine conformi al formato ufficiale
3. **Condividere** i dati in modo sicuro e temporaneo
4. **Scaricare** file pronti per Alloggiati Web
5. **Rispettare** tutte le normative GDPR e di sicurezza

Il sistema è **pronto per l'uso immediato** e **completamente conforme** alle specifiche del Portale Alloggiati Web! 🚀
