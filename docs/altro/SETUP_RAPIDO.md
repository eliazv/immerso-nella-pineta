# Setup Rapido - Alloggiati Web

## 🚀 Avvio Immediato

Il sistema è **già configurato** e pronto all'uso! Serve solo aggiungere lo script EmailJS.

### 1. Aggiungi script EmailJS

Nel file `public/index.html`, aggiungi prima del tag `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function(){
    emailjs.init("cL0t8BEEWVW6SEE86");
  })();
</script>
```

### 2. Test del sistema

1. Vai alla pagina Alloggiati Web
2. Compila il form con dati di test
3. Clicca "Invia i documenti"
4. Verifica che arrivi l'email a zavattaelia@gmail.com

## ✅ Cosa funziona già

- **Email automatica** con file allegato
- **Validazione completa** del form
- **Dropdown comuni** italiani con ricerca
- **Calcolo automatico** giorni permanenza
- **Gestione cittadinanza** italiana migliorata
- **Interface responsive** e intuitiva

## 📧 Template Email

L'email che riceverai conterrà:
- **Oggetto**: "Nuova registrazione ospiti - [nome_file]"
- **Allegato**: File TXT con dati formattati per Alloggiati Web
- **Corpo**: Dettagli registrazione (numero ospiti, date, contatti)

## 🔧 Funzionalità Avanzate

### Dropdown Comuni
- Ricerca in tempo reale (min 2 caratteri)
- 100+ comuni italiani principali
- Auto-completamento provincia
- Validazione codici ufficiali

### Gestione Date
- Data arrivo: oggi o ieri
- Data partenza: dopo data arrivo
- Giorni permanenza: calcolati automaticamente

### Validazione Intelligente
- Controllo campi obbligatori
- Validazione email
- Controllo date logiche
- Gestione documenti per capo famiglia

## 🎯 Esperienza Utente

### Per gli Ospiti:
1. **Guida chiara** all'inizio della pagina
2. **Form intuitivo** con validazione in tempo reale
3. **Conferma immediata** dell'invio
4. **Nessuna confusione** con opzioni tecniche

### Per Te:
1. **Email automatica** con tutti i dettagli
2. **File pronto** per upload su Alloggiati Web
3. **Backup locale** automatico
4. **Log dettagliati** per debugging

## 🚨 Risoluzione Problemi

### Email non arriva:
- Verifica che lo script EmailJS sia caricato
- Controlla la cartella spam
- Verifica connessione internet

### Dropdown comuni non funziona:
- Digita almeno 2 caratteri
- Prova con nomi comuni (es. "ROMA", "MILANO")
- Verifica che sia selezionato "Cittadino Italiano"

### Errori di validazione:
- Controlla che tutti i campi obbligatori (*) siano compilati
- Verifica che le date siano logiche
- Per capo famiglia: inserire numero documento

## 📱 Compatibilità

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablet (iPad, Android)

## 🔒 Privacy e Sicurezza

- **Nessun dato** memorizzato su server esterni
- **Backup locale** temporaneo nel browser
- **Email criptata** tramite EmailJS
- **Conformità GDPR** per trattamento dati

## 📊 Monitoraggio

Per monitorare l'uso del sistema:
1. Controlla le email ricevute
2. Verifica i log del browser (F12 > Console)
3. Monitora eventuali errori EmailJS

## 🎉 Pronto all'Uso!

Il sistema è completamente funzionale e pronto per essere utilizzato dagli ospiti. 

**Link da condividere**: `[tuo-dominio]/alloggiati-web`

Buon utilizzo! 🏠✨
