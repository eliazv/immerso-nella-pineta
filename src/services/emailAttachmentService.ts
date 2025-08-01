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
  private static isDev = import.meta.env.DEV;
  
  private static log(message: string, data?: unknown) {
    if (this.isDev) {
      console.log(message, data);
    }
  }
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

      this.log('Tentativo caricamento file per link download...', {
        fileName: fileName,
        contentSize: fileContent.length
      });

      // Prova solo GitHub Gist (no Catbox per evitare CORS)
      const backupResult = await this.createGitHubGistBackup(
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

      this.log('Email con contenuto inline inviata con successo');
      
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
      this.log('Tentativo caricamento su GitHub Gist...', { fileName, contentSize: content.length });

      const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
      if (!githubToken) {
        this.log('Token GitHub non configurato, procedo solo con email inline');
        return {
          success: false,
          error: 'Token GitHub non configurato'
        };
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
        this.log('GitHub Gist fallito, procedo solo con email inline');
        return {
          success: false,
          error: `GitHub API error: ${response.status}`
        };
      }

      const result = await response.json();
      const fileUrl = result.files[fileName].raw_url;

      this.log('File caricato su GitHub Gist:', fileUrl);
      
      return {
        success: true,
        url: fileUrl
      };
    } catch (error) {
      this.log('GitHub Gist fallito, procedo solo con email inline:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore GitHub Gist'
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

      this.log('Email con contenuto inline inviata:', response);
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