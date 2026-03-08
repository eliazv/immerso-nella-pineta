# Configurazione Alloggiati Web

Questa guida spiega come configurare l'invio automatico di email e l'upload su Google Drive per il sistema Alloggiati Web.

## 1. Configurazione EmailJS (Invio Email)

### Passo 1: Registrazione su EmailJS
1. Vai su [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea un account gratuito
3. Verifica la tua email

### Passo 2: Configurazione del servizio email
1. Nel dashboard EmailJS, vai su "Email Services"
2. Clicca "Add New Service"
3. Scegli il tuo provider email (Gmail, Outlook, etc.)
4. Segui le istruzioni per collegare il tuo account email
5. Annota il **Service ID** generato

### Passo 3: Creazione del template email
1. Vai su "Email Templates"
2. Clicca "Create New Template"
3. Usa questo template:

```
Subject: {{subject}}

{{message}}

---
Inviato automaticamente dal sistema Alloggiati Web
```

4. Annota il **Template ID** generato

### Passo 4: Configurazione nel codice
1. Aggiungi lo script EmailJS nel file `public/index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // Sostituisci con la tua public key
  })();
</script>
```

2. Nel file `src/pages/AlloggiatiWeb.tsx`, sostituisci:
   - `YOUR_SERVICE_ID` con il tuo Service ID
   - `YOUR_TEMPLATE_ID` con il tuo Template ID
   - `YOUR_PUBLIC_KEY` con la tua Public Key

## 2. Configurazione Google Apps Script (Upload su Google Drive)

### Passo 1: Creazione dello script
1. Vai su [https://script.google.com/](https://script.google.com/)
2. Clicca "Nuovo progetto"
3. Sostituisci il codice con:

```javascript
function doPost(e) {
  try {
    // Ottieni i parametri
    const fileName = e.parameter.fileName;
    const fileContent = e.parameter.file;
    
    if (!fileName || !fileContent) {
      throw new Error('Parametri mancanti');
    }
    
    // Crea il blob dal contenuto
    const blob = Utilities.newBlob(fileContent, 'text/plain', fileName);
    
    // Crea il file su Google Drive
    const file = DriveApp.createFile(blob);
    
    // Sposta in una cartella specifica (opzionale)
    // Sostituisci YOUR_FOLDER_ID con l'ID della tua cartella
    const folderId = 'YOUR_FOLDER_ID';
    if (folderId && folderId !== 'YOUR_FOLDER_ID') {
      const folder = DriveApp.getFolderById(folderId);
      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
    }
    
    // Restituisci il risultato
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileId: file.getId(),
        url: file.getUrl(),
        fileName: fileName
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Servizio attivo')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### Passo 2: Deploy dello script
1. Clicca su "Deploy" > "Nuova distribuzione"
2. Scegli tipo: "App web"
3. Descrizione: "Alloggiati Web Upload Service"
4. Esegui come: "Me"
5. Chi ha accesso: "Chiunque"
6. Clicca "Deploy"
7. Copia l'**URL dell'app web** generato

### Passo 3: Configurazione nel codice
Nel file `src/services/uploadService.ts`, sostituisci:
- `YOUR_SCRIPT_ID` nell'URL con l'URL completo della tua app web

### Passo 4: Creazione cartella Google Drive (opzionale)
1. Vai su [https://drive.google.com/](https://drive.google.com/)
2. Crea una nuova cartella chiamata "Alloggiati Web"
3. Apri la cartella e copia l'ID dall'URL (la parte dopo `/folders/`)
4. Sostituisci `YOUR_FOLDER_ID` nel codice Google Apps Script

## 3. Alternativa: Webhook con Zapier/Make.com

Se preferisci non usare Google Apps Script, puoi usare un webhook:

### Con Zapier:
1. Crea un account su [https://zapier.com/](https://zapier.com/)
2. Crea un nuovo Zap
3. Trigger: "Webhooks by Zapier" > "Catch Hook"
4. Action: "Google Drive" > "Create File"
5. Copia l'URL del webhook
6. Nel file `src/services/uploadService.ts`, sostituisci `YOUR_WEBHOOK_ID` con l'URL completo

### Con Make.com:
1. Crea un account su [https://www.make.com/](https://www.make.com/)
2. Crea un nuovo scenario
3. Aggiungi modulo "Webhooks" > "Custom webhook"
4. Aggiungi modulo "Google Drive" > "Upload a file"
5. Collega i moduli e attiva lo scenario
6. Usa l'URL del webhook nel codice

## 4. Test della configurazione

1. Compila il form con dati di test
2. Clicca "Invia i documenti"
3. Verifica che:
   - Ricevi l'email di notifica
   - Il file appare su Google Drive (se configurato)
   - Appare il messaggio di conferma

## 5. Risoluzione problemi

### Email non arriva:
- Verifica le credenziali EmailJS
- Controlla la cartella spam
- Verifica i limiti del piano gratuito EmailJS

### Upload Google Drive fallisce:
- Verifica che lo script sia deployato correttamente
- Controlla i permessi di Google Drive
- Verifica l'URL dell'app web

### Errori CORS:
- Assicurati che Google Apps Script sia configurato per accettare richieste da qualsiasi origine
- Per webhook, verifica che supportino CORS

## 6. Sicurezza

- Non esporre mai le chiavi API nel codice frontend
- Usa variabili d'ambiente per le configurazioni sensibili
- Limita i permessi di Google Apps Script al minimo necessario
- Monitora l'uso delle API per evitare abusi

## 7. Limiti e considerazioni

### EmailJS (piano gratuito):
- 200 email/mese
- 50 email/giorno

### Google Apps Script:
- 6 minuti di esecuzione per trigger
- 20 chiamate simultanee

### Google Drive API:
- 1000 richieste per 100 secondi per utente
- 10000 richieste per 100 secondi

Per uso intensivo, considera piani a pagamento o soluzioni enterprise.
