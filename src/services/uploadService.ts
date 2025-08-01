/**
 * Servizio per l'upload di file su servizi cloud
 */

export interface UploadResult {
  success: boolean;
  fileId?: string;
  url?: string;
  error?: string;
}

export class UploadService {
  /**
   * Upload su Google Drive tramite Google Apps Script
   * Questo metodo richiede un Google Apps Script deployato come web app
   */
  static async uploadToGoogleDrive(
    content: string,
    fileName: string,
    mimeType: string = "text/plain"
  ): Promise<UploadResult> {
    try {
      // URL del Google Apps Script web app
      const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!SCRIPT_URL || SCRIPT_URL.includes("YOUR_SCRIPT_ID")) {
        throw new Error("Google Apps Script URL non configurato");
      }

      const formData = new FormData();
      const blob = new Blob([content], { type: mimeType });
      formData.append("file", blob, fileName);
      formData.append("fileName", fileName);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        return {
          success: true,
          fileId: result.fileId,
          url: result.url,
        };
      } else {
        return {
          success: false,
          error: result.error || "Upload fallito",
        };
      }
    } catch (error) {
      console.error("Errore upload Google Drive:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Upload tramite webhook (alternativa semplice)
   * Invia i dati a un endpoint che può processarli
   */
  static async uploadViaWebhook(
    content: string,
    fileName: string,
    metadata: Record<string, any>
  ): Promise<UploadResult> {
    try {
      // URL del webhook (può essere Zapier, Make.com, o un endpoint personalizzato)
      const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

      if (!WEBHOOK_URL || WEBHOOK_URL.includes("YOUR_WEBHOOK_ID")) {
        throw new Error("Webhook URL non configurato");
      }

      const payload = {
        fileName,
        content,
        metadata,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Errore upload webhook:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Upload locale nel browser (fallback)
   * Salva il file nel localStorage per recupero successivo
   */
  static uploadToLocalStorage(
    content: string,
    fileName: string,
    metadata: Record<string, any>
  ): UploadResult {
    try {
      const data = {
        content,
        fileName,
        metadata,
        timestamp: new Date().toISOString(),
      };

      const key = `alloggiati_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem(key, JSON.stringify(data));

      // Mantieni solo gli ultimi 10 file
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith("alloggiati_")
      );
      if (keys.length > 10) {
        keys
          .sort()
          .slice(0, keys.length - 10)
          .forEach((k) => localStorage.removeItem(k));
      }

      return {
        success: true,
        fileId: key,
      };
    } catch (error) {
      console.error("Errore salvataggio locale:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Metodo principale che prova diversi metodi di upload
   */
  static async uploadFile(
    content: string,
    fileName: string,
    metadata: Record<string, any> = {}
  ): Promise<UploadResult> {
    // Prova prima Google Drive
    const driveResult = await this.uploadToGoogleDrive(content, fileName);
    if (driveResult.success) {
      console.log("Upload su Google Drive riuscito");
      return driveResult;
    }

    // Se fallisce, prova webhook
    const webhookResult = await this.uploadViaWebhook(
      content,
      fileName,
      metadata
    );
    if (webhookResult.success) {
      console.log("Upload via webhook riuscito");
      return webhookResult;
    }

    // Come fallback, salva localmente
    console.log("Fallback: salvataggio locale");
    return this.uploadToLocalStorage(content, fileName, metadata);
  }
}

/**
 * Esempio di Google Apps Script per ricevere i file:
 *
 * function doPost(e) {
 *   try {
 *     const blob = e.parameter.file;
 *     const fileName = e.parameter.fileName;
 *
 *     // Crea il file su Google Drive
 *     const file = DriveApp.createFile(blob);
 *     file.setName(fileName);
 *
 *     // Sposta in una cartella specifica (opzionale)
 *     const folder = DriveApp.getFolderById('YOUR_FOLDER_ID');
 *     folder.addFile(file);
 *     DriveApp.getRootFolder().removeFile(file);
 *
 *     return ContentService
 *       .createTextOutput(JSON.stringify({
 *         success: true,
 *         fileId: file.getId(),
 *         url: file.getUrl()
 *       }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *
 *   } catch (error) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({
 *         success: false,
 *         error: error.toString()
 *       }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 */
