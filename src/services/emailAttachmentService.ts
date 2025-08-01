/**
 * Servizio per l'invio di email con allegati usando EmailJS
 * Soluzione ottimale che evita problemi CORS
 */

export interface EmailAttachmentResult {
  success: boolean;
  error?: string;
  emailSent?: boolean;
  backupUrl?: string;
}

export interface EmailAttachmentConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
  fromEmail: string;
}

export class EmailAttachmentService {
  /**
   * Invia email con file - SEMPRE con contenuto inline + link opzionale
   */
  static async sendEmailWithAttachment(
    config: EmailAttachmentConfig,
    fileName: string,
    fileContent: string,
    subject: string,
    message: string,
    attachmentName?: string
  ): Promise<EmailAttachmentResult> {
    try {
      // Verifica che EmailJS sia disponibile
      if (typeof window === 'undefined' || !window.emailjs) {
        throw new Error('EmailJS non disponibile');
      }

      console.log('Tentativo caricamento file per link download...', {
        fileName: fileName,
        contentSize: fileContent.length
      });

      // Prova GitHub Gist prima, poi Catbox come backup
      let backupResult = await this.createGitHubGistBackup(
        fileName,
        fileContent,
        subject
      );
      
      // SEMPRE invia email con contenuto inline + link se disponibile  
      const emailResult = await this.sendEmailWithInlineContent(
        config,
        subject,
        message,
        fileName,
        fileContent,
        backupResult.success ? backupResult.url : undefined
      );
      
      if (!emailResult.success) {
        throw new Error(`Errore invio email: ${emailResult.error}`);
      }

      console.log('Email con contenuto inline inviata con successo');
      
      return {
        success: true,
        emailSent: true,
        backupUrl: backupResult.success ? backupResult.url : undefined
      };

    } catch (error) {
      console.error('Errore servizio email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Carica su GitHub Gist (principale)
   */
  private static async createGitHubGistBackup(
    fileName: string,
    content: string,
    description: string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      console.log('Tentativo caricamento su GitHub Gist...', { fileName, contentSize: content.length });

      const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
      if (!githubToken) {
        console.log('Token GitHub non configurato, provo Catbox...');
        return await this.createCatboxBackup(fileName, content, description);
      }

      const gistData = {
        description: `${description} - ${fileName}`,
        public: false,
        files: {
          [fileName]: {
            content: content
          }
        }
      };

      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubToken}`
        },
        body: JSON.stringify(gistData)
      });

      if (!response.ok) {
        console.log('GitHub Gist fallito, provo Catbox...');
        return await this.createCatboxBackup(fileName, content, description);
      }

      const result = await response.json();
      const fileUrl = result.files[fileName].raw_url;

      console.log('File caricato su GitHub Gist:', fileUrl);
      
      return {
        success: true,
        url: fileUrl
      };
    } catch (error) {
      console.log('GitHub Gist fallito, provo Catbox...', error);
      return await this.createCatboxBackup(fileName, content, description);
    }
  }

  /**
   * Carica su Catbox.moe (backup)
   */
  private static async createCatboxBackup(
    fileName: string,
    content: string,
    description: string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      console.log('Tentativo caricamento su Catbox.moe...', { fileName, contentSize: content.length });

      const formData = new FormData();
      const blob = new Blob([content], { type: 'text/plain' });
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', blob, fileName);

      const response = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Catbox API error: ${response.status}`);
      }

      const fileUrl = await response.text();
      
      if (!fileUrl || fileUrl.includes('error')) {
        throw new Error('Upload fallito');
      }

      console.log('File caricato su Catbox:', fileUrl);
      
      return {
        success: true,
        url: fileUrl.trim()
      };
    } catch (error) {
      console.log('Catbox fallito, procedo solo con email inline:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Invia email con contenuto inline (sempre) + link opzionale
   */
  private static async sendEmailWithInlineContent(
    config: EmailAttachmentConfig,
    subject: string,
    message: string,
    fileName: string,
    fileContent: string,
    downloadUrl?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const emailMessage = `${downloadUrl ? `🔗 CLICCA QUI PER SCARICARE IL FILE: ${downloadUrl}

` : ''}${message}

--- CONTENUTO FILE: ${fileName} ---
${fileContent}
--- FINE FILE ---

NOTA: ${downloadUrl ? 'Usa il link sopra per scaricare direttamente il file, oppure ' : ''}Copia il contenuto tra le righe "--- CONTENUTO FILE ---" e "--- FINE FILE ---" e salvalo come file .txt`;

      const templateParams = {
        to_email: config.toEmail,
        from_email: config.fromEmail,
        subject: subject,
        message: emailMessage,
        attachment_content: fileContent,
        attachment_name: fileName,
        download_url: downloadUrl || 'Non disponibile'
      };

      const response = await window.emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.publicKey
      );

      console.log('Email con contenuto inline inviata:', response);
      return { success: true };
    } catch (error) {
      console.error('Errore invio email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore invio email'
      };
    }
  }
}