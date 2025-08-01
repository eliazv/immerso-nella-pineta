/**
 * Servizio per il salvataggio di file su servizi di storage gratuiti
 * Supporta servizi affidabili senza autenticazione
 */

export interface StorageResult {
  success: boolean;
  url?: string;
  downloadUrl?: string;
  error?: string;
  service?: string;
}

export class FileStorageService {
  /**
   * Carica file su GitHub Gist (anonimo)
   */
  static async uploadToGitHubGist(
    fileName: string,
    content: string,
    description?: string
  ): Promise<StorageResult> {
    try {
      const gistData = {
        description: description || `Schedina Alloggiati - ${fileName}`,
        public: false, // Gist privato
        files: {
          [fileName]: {
            content: content,
          },
        },
      };

      const response = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify(gistData),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const result = await response.json();

      return {
        success: true,
        url: result.html_url,
        downloadUrl: result.files[fileName].raw_url,
      };
    } catch (error) {
      console.error("Errore upload GitHub Gist:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Carica file su Pastebin
   */
  static async uploadToPastebin(
    fileName: string,
    content: string,
    apiKey?: string
  ): Promise<StorageResult> {
    try {
      // Se non c'è API key, usa il servizio anonimo
      const formData = new FormData();
      formData.append("api_dev_key", apiKey || "guest");
      formData.append("api_option", "paste");
      formData.append("api_paste_code", content);
      formData.append("api_paste_name", fileName);
      formData.append("api_paste_private", "1"); // Privato
      formData.append("api_paste_expire_date", "1M"); // Scade in 1 mese

      const response = await fetch("https://pastebin.com/api/api_post.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Pastebin error: ${response.status}`);
      }

      const result = await response.text();

      if (result.startsWith("Bad API request")) {
        throw new Error(result);
      }

      return {
        success: true,
        url: result,
        downloadUrl: result + "/raw",
      };
    } catch (error) {
      console.error("Errore upload Pastebin:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Carica file su file.io (servizio temporaneo)
   */
  static async uploadToFileIO(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const blob = new Blob([content], { type: "text/plain" });
      const formData = new FormData();
      formData.append("file", blob, fileName);

      const response = await fetch("https://file.io", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`File.io error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Upload fallito");
      }

      return {
        success: true,
        url: result.link,
        downloadUrl: result.link,
      };
    } catch (error) {
      console.error("Errore upload File.io:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Carica file su JSONBin (per file di testo)
   */
  static async uploadToJSONBin(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const data = {
        fileName: fileName,
        content: content,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("https://api.jsonbin.io/v3/b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Bin-Name": fileName,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`JSONBin error: ${response.status}`);
      }

      const result = await response.json();

      return {
        success: true,
        url: `https://jsonbin.io/${result.metadata.id}`,
        downloadUrl: `https://api.jsonbin.io/v3/b/${result.metadata.id}/latest`,
      };
    } catch (error) {
      console.error("Errore upload JSONBin:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Errore sconosciuto",
      };
    }
  }

  /**
   * Metodo principale che prova diversi servizi in ordine
   */
  static async uploadFile(
    fileName: string,
    content: string,
    description?: string
  ): Promise<StorageResult> {
    // Prova GitHub Gist per primo (più affidabile)
    console.log("Tentativo upload su GitHub Gist...");
    const gistResult = await this.uploadToGitHubGist(
      fileName,
      content,
      description
    );
    if (gistResult.success) {
      console.log("Upload su GitHub Gist riuscito");
      return gistResult;
    }

    // Se fallisce, prova File.io
    console.log("Tentativo upload su File.io...");
    const fileIOResult = await this.uploadToFileIO(fileName, content);
    if (fileIOResult.success) {
      console.log("Upload su File.io riuscito");
      return fileIOResult;
    }

    // Se fallisce, prova JSONBin
    console.log("Tentativo upload su JSONBin...");
    const jsonBinResult = await this.uploadToJSONBin(fileName, content);
    if (jsonBinResult.success) {
      console.log("Upload su JSONBin riuscito");
      return jsonBinResult;
    }

    // Se tutti falliscono, ritorna l'ultimo errore
    return {
      success: false,
      error: "Tutti i servizi di storage hanno fallito",
    };
  }

  /**
   * Genera un link di download diretto per il contenuto
   */
  static generateDataURL(fileName: string, content: string): string {
    const blob = new Blob([content], { type: "text/plain" });
    return URL.createObjectURL(blob);
  }
}
