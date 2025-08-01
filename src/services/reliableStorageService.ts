/**
 * Servizio per il salvataggio di file su servizi di storage affidabili
 * Utilizza servizi testati che funzionano senza autenticazione
 */

export interface StorageResult {
  success: boolean;
  url?: string;
  downloadUrl?: string;
  error?: string;
  service?: string;
}

export class ReliableStorageService {
  /**
   * Carica file su 0x0.st (servizio anonimo molto affidabile)
   */
  static async uploadTo0x0(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', blob, fileName);

      const response = await fetch('https://0x0.st', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`0x0.st error: ${response.status}`);
      }

      const url = await response.text();
      const cleanUrl = url.trim();
      
      return {
        success: true,
        url: cleanUrl,
        downloadUrl: cleanUrl,
        service: '0x0.st'
      };
    } catch (error) {
      console.error('Errore upload 0x0.st:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Carica file su catbox.moe (servizio anonimo affidabile)
   */
  static async uploadToCatbox(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', blob, fileName);

      const response = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Catbox error: ${response.status}`);
      }

      const url = await response.text();
      const cleanUrl = url.trim();
      
      return {
        success: true,
        url: cleanUrl,
        downloadUrl: cleanUrl,
        service: 'catbox.moe'
      };
    } catch (error) {
      console.error('Errore upload Catbox:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Carica file su ix.io (servizio pastebin affidabile)
   */
  static async uploadToIxIo(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const formData = new FormData();
      formData.append('f:1', content);

      const response = await fetch('https://ix.io', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`ix.io error: ${response.status}`);
      }

      const url = await response.text();
      const cleanUrl = url.trim();
      
      return {
        success: true,
        url: cleanUrl,
        downloadUrl: cleanUrl,
        service: 'ix.io'
      };
    } catch (error) {
      console.error('Errore upload ix.io:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Carica file su transfer.sh (servizio temporaneo affidabile)
   */
  static async uploadToTransferSh(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      
      const response = await fetch(`https://transfer.sh/${fileName}`, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': 'text/plain'
        }
      });

      if (!response.ok) {
        throw new Error(`transfer.sh error: ${response.status}`);
      }

      const url = await response.text();
      const cleanUrl = url.trim();
      
      return {
        success: true,
        url: cleanUrl,
        downloadUrl: cleanUrl,
        service: 'transfer.sh'
      };
    } catch (error) {
      console.error('Errore upload transfer.sh:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Carica file su tmpfiles.org (servizio temporaneo)
   */
  static async uploadToTmpFiles(
    fileName: string,
    content: string
  ): Promise<StorageResult> {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('file', blob, fileName);

      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`tmpfiles.org error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.error || 'Upload fallito');
      }

      return {
        success: true,
        url: result.data.url,
        downloadUrl: result.data.url.replace('/tmpfiles.org/', '/tmpfiles.org/dl/'),
        service: 'tmpfiles.org'
      };
    } catch (error) {
      console.error('Errore upload tmpfiles.org:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore sconosciuto'
      };
    }
  }

  /**
   * Metodo principale che prova diversi servizi in ordine di affidabilità
   */
  static async uploadFile(
    fileName: string,
    content: string,
    description?: string
  ): Promise<StorageResult> {
    // Prova 0x0.st per primo (molto affidabile)
    console.log('Tentativo upload su 0x0.st...');
    const zeroResult = await this.uploadTo0x0(fileName, content);
    if (zeroResult.success) {
      console.log('Upload su 0x0.st riuscito');
      return zeroResult;
    }

    // Se fallisce, prova catbox.moe
    console.log('Tentativo upload su catbox.moe...');
    const catboxResult = await this.uploadToCatbox(fileName, content);
    if (catboxResult.success) {
      console.log('Upload su catbox.moe riuscito');
      return catboxResult;
    }

    // Se fallisce, prova ix.io
    console.log('Tentativo upload su ix.io...');
    const ixResult = await this.uploadToIxIo(fileName, content);
    if (ixResult.success) {
      console.log('Upload su ix.io riuscito');
      return ixResult;
    }

    // Se fallisce, prova transfer.sh
    console.log('Tentativo upload su transfer.sh...');
    const transferResult = await this.uploadToTransferSh(fileName, content);
    if (transferResult.success) {
      console.log('Upload su transfer.sh riuscito');
      return transferResult;
    }

    // Se tutti falliscono, ritorna l'ultimo errore
    return {
      success: false,
      error: 'Tutti i servizi di storage hanno fallito'
    };
  }

  /**
   * Genera un link di download diretto per il contenuto
   */
  static generateDataURL(fileName: string, content: string): string {
    const blob = new Blob([content], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }
}
