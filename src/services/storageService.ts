import { AlloggiatiFormData, GuestData } from "@/types/alloggiati";
import { AlloggiatiService } from "./alloggiatiService";

/**
 * Servizio per la gestione dello storage e condivisione dati
 */
export class StorageService {
  /**
   * Salva i dati in localStorage per condivisione tramite link
   */
  static saveToLocalStorage(formData: AlloggiatiFormData): string {
    const id = this.generateId();
    const data = {
      id,
      formData,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 giorni
    };

    localStorage.setItem(`alloggiati_${id}`, JSON.stringify(data));
    return id;
  }

  /**
   * Recupera i dati dal localStorage
   */
  static loadFromLocalStorage(id: string): AlloggiatiFormData | null {
    try {
      const stored = localStorage.getItem(`alloggiati_${id}`);
      if (!stored) return null;

      const data = JSON.parse(stored);

      // Verifica scadenza
      if (new Date(data.expiresAt) < new Date()) {
        localStorage.removeItem(`alloggiati_${id}`);
        return null;
      }

      return data.formData;
    } catch (error) {
      console.error("Errore nel caricamento dati:", error);
      return null;
    }
  }

  /**
   * Genera un link condivisibile
   */
  static generateShareableLink(formData: AlloggiatiFormData): string {
    const id = this.saveToLocalStorage(formData);
    const baseUrl = window.location.origin;
    return `${baseUrl}/alloggiati?data=${id}`;
  }

  /**
   * Invia i dati via email (usando EmailJS o servizio simile)
   */
  static async sendViaEmail(
    formData: AlloggiatiFormData,
    recipientEmail: string,
    senderName?: string,
  ): Promise<boolean> {
    try {
      // Genera il contenuto della schedina
      const content = AlloggiatiService.generateSchedina(formData);
      const fileName = AlloggiatiService.generateFileName(
        formData.idAppartamento,
      );

      // Prepara i dati per l'email
      const emailData = {
        to_email: recipientEmail,
        from_name: senderName || "Sistema Alloggiati",
        subject: `Schedina Alloggiati - ${fileName}`,
        message: this.generateEmailMessage(formData),
        attachment_content: content,
        attachment_name: fileName,
      };

      // Qui dovresti integrare con EmailJS o un altro servizio email
      console.log("Dati email preparati:", emailData);

      // Simulazione invio (sostituire con vera implementazione)
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
    } catch (error) {
      console.error("Errore invio email:", error);
      return false;
    }
  }

  /**
   * Salva su Google Sheets (richiede configurazione Google Apps Script)
   */
  static async saveToGoogleSheets(
    formData: AlloggiatiFormData,
    scriptUrl?: string,
  ): Promise<boolean> {
    if (!scriptUrl) {
      console.warn("URL Google Apps Script non configurato");
      return false;
    }

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "saveAlloggiati",
          data: formData,
          timestamp: new Date().toISOString(),
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Errore salvataggio Google Sheets:", error);
      return false;
    }
  }

  /**
   * Esporta i dati in formato CSV
   */
  static exportToCSV(formData: AlloggiatiFormData): string {
    const headers = [
      "Cognome",
      "Nome",
      "Sesso",
      "Data Nascita",
      "Luogo Nascita",
      "Provincia Nascita",
      "Stato Nascita",
      "Cittadinanza",
      "Tipo Documento",
      "Numero Documento",
      "Luogo Rilascio",
      "Data Arrivo",
      "Giorni Permanenza",
      "Tipo Alloggiato",
      "ID Appartamento",
    ];

    const rows = formData.ospiti.map((guest) => [
      guest.cognome,
      guest.nome,
      guest.sesso,
      guest.dataNascita,
      guest.luogoNascita,
      guest.provinciaNascita || "",
      guest.statoNascita,
      guest.cittadinanza,
      guest.tipoDocumento || "",
      guest.numeroDocumento || "",
      guest.luogoRilascio || "",
      guest.dataArrivo,
      guest.giorniPermanenza.toString(),
      guest.tipoAlloggiato,
      formData.idAppartamento,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    return csvContent;
  }

  /**
   * Scarica i dati come CSV
   */
  static downloadCSV(formData: AlloggiatiFormData): void {
    const csvContent = this.exportToCSV(formData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `alloggiati_${formData.idAppartamento}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /**
   * Genera un ID univoco
   */
  private static generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /**
   * Genera il messaggio per l'email
   */
  private static generateEmailMessage(formData: AlloggiatiFormData): string {
    const ospiteCount = formData.ospiti.length;
    const dataArrivo = formData.ospiti[0]?.dataArrivo || "";

    return `
Gentile gestore,

in allegato trovi la schedina degli alloggiati generata automaticamente.

Dettagli:
- Appartamento: ${formData.idAppartamento}
- Numero ospiti: ${ospiteCount}
- Data arrivo: ${dataArrivo}
- Generata il: ${new Date().toLocaleDateString("it-IT")}

Il file è pronto per essere caricato sul Portale Alloggiati Web.

${formData.note ? `Note: ${formData.note}` : ""}

Cordiali saluti,
Sistema Alloggiati Web
    `.trim();
  }

  /**
   * Pulisce i dati scaduti dal localStorage
   */
  static cleanupExpiredData(): void {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("alloggiati_"),
    );

    keys.forEach((key) => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const data = JSON.parse(stored);
          if (new Date(data.expiresAt) < new Date()) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        // Rimuovi dati corrotti
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Ottiene statistiche sui dati salvati
   */
  static getStorageStats(): { count: number; totalSize: number } {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("alloggiati_"),
    );
    let totalSize = 0;

    keys.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
      }
    });

    return {
      count: keys.length,
      totalSize,
    };
  }
}
