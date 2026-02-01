# Setup EmailJS per Allegati - Guida Completa

## 1. Configurazione EmailJS Dashboard

### Step 1: Accedi a EmailJS

1. Vai su [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Accedi con il tuo account

### Step 2: Verifica il Servizio Email

1. Vai su **Services** nella sidebar
2. Assicurati che il servizio `service_8vct8zl` sia configurato correttamente
3. Se non esiste, creane uno nuovo con Gmail/Outlook

### Step 3: Crea/Modifica il Template

1. Vai su **Templates** nella sidebar
2. Trova il template `template_8zgge3d` o creane uno nuovo
3. Usa questo contenuto per il template:

#### Template Subject:

```
{{subject}}
```

#### Template HTML Body:

```html
<h2>{{subject}}</h2>

<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <p><strong>File:</strong> {{file_name}}</p>

  <div
    style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;"
  >
    {{message}}
  </div>

  {{#download_url}}
  <div
    style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #2196F3;"
  >
    <h3>📎 FILE DISPONIBILE PER IL DOWNLOAD</h3>
    <p><strong>Nome file:</strong> {{file_name}}</p>
    <p>
      <strong>Link download diretto:</strong>
      <a
        href="{{download_url}}"
        target="_blank"
        style="color: #2196F3; text-decoration: none; font-weight: bold;"
        >Clicca qui per scaricare</a
      >
    </p>
  </div>
  {{/download_url}} {{#view_url}}
  <div
    style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #ffc107;"
  >
    <p>
      <strong>🔗 Link alternativo:</strong>
      <a href="{{view_url}}" target="_blank" style="color: #856404;"
        >Visualizza file</a
      >
    </p>
  </div>
  {{/view_url}}

  <hr style="margin: 20px 0;" />

  <p>
    <small
      >Email generata automaticamente dal sistema Alloggiati Web di Immerso
      nella Pineta</small
    >
  </p>
</div>
```

#### Template Text Body (Fallback):

```
{{subject}}

File: {{file_name}}

{{message}}

{{#attachment_content}}
📎 ALLEGATO: {{attachment_name}}
Il file è allegato a questa email.
{{/attachment_content}}

{{#download_url}}
🔗 LINK BACKUP: {{download_url}}
{{/download_url}}

---
Email generata automaticamente dal sistema Alloggiati Web
```

### Step 4: Test del Template

1. Usa il pulsante **Test** nel template editor
2. Aggiungi questi dati di test:

```json
{
  "to_email": "test@example.com",
  "from_email": "zavattaelia@gmail.com",
  "subject": "Test Allegato",
  "message": "Questo è un test",
  "file_name": "test.txt",
  "attachment_name": "test.txt",
  "attachment_content": "VGVzdCBjb250ZW50",
  "download_url": "https://example.com/backup"
}
```

## 2. Configurazione Avanzata (Opzionale)

### Attivare Allegati Base64 in EmailJS

**IMPORTANTE**: EmailJS supporta allegati base64 solo nei piani a pagamento. Se hai un piano gratuito, il sistema userà automaticamente il backup GitHub Gist.

#### Per Piani Premium:

1. Vai su **Settings** > **General**
2. Abilita **"Allow base64 attachments"**
3. Imposta limite dimensione file (max 10MB consigliato)

#### Modifica Template per Allegati Premium:

Aggiungi questo campo al template:

```html
{{#attachment_content}}
<div class="attachment">
  <h3>📎 File Allegato</h3>
  <p>Nome: {{attachment_name}}</p>
  <p>Il file è incluso come allegato in questa email.</p>
</div>
{{/attachment_content}}
```

## 3. Setup Backup GitHub Gist

Il sistema usa GitHub Gist come backup automatico quando:

- EmailJS non supporta allegati
- L'allegato supera i limiti di dimensione
- Errori di invio email

**Vantaggi GitHub Gist:**

- ✅ Gratuito e illimitato
- ✅ Nessuna registrazione richiesta
- ✅ Link diretti per download
- ✅ Nessun problema CORS

## 4. Test Completo

### Test in Sviluppo:

1. Vai su `http://localhost:8080/alloggiati`
2. Compila il form con dati di test
3. Invia i documenti
4. Controlla:
   - Email ricevuta su zavattaelia@gmail.com
   - File allegato presente
   - Link backup funzionante (se usato)

### Troubleshooting Comune:

#### "EmailJS not found"

- Verifica che il script EmailJS sia caricato
- Controlla la console per errori di rete

#### "Template not found"

- Verifica l'ID template in AlloggiatiWeb.tsx (linea 65)
- Controlla che il template esista nella dashboard

#### "Email not received"

- Controlla spam/junk folder
- Verifica l'indirizzo email di destinazione
- Testa con un template semplice prima

#### "Allegato mancante"

- Se hai piano gratuito, l'allegato viene sostituito dal backup link
- Controlla che il file sia stato caricato su GitHub Gist
- Usa il link di backup fornito nell'email

## 5. Monitoraggio

### Logs Disponibili:

```javascript
// Nel browser console:
console.log("Invio email con allegato...");
console.log("Email inviata con successo");
console.log("File backup disponibile su:", backupUrl);
```

### Metriche EmailJS:

1. Dashboard EmailJS > **Statistics**
2. Monitora:
   - Email inviate/fallite
   - Errori comuni
   - Utilizzo quota mensile

## 6. Backup Plan

Se tutto fallisce, il sistema:

1. Crea automaticamente il backup su GitHub Gist
2. Invia email con link di download
3. Mostra messaggio di successo all'utente
4. Mantiene i dati nel localStorage per recovery

**Nessun dato viene mai perso!**
