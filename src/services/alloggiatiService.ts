import {
  GuestData,
  AlloggiatiFormData,
  AlloggiatiWebRecord,
  ALLOGGIATI_CODES,
} from "@/types/alloggiati";
import { getComuneByNome } from "@/data/comuni";

/**
 * Servizio per la gestione delle schedine Alloggiati Web
 */
export class AlloggiatiService {
  /**
   * Converte i dati del form nel formato richiesto da Alloggiati Web
   */
  static generateSchedina(formData: AlloggiatiFormData): string {
    const records: string[] = [];

    for (const guest of formData.ospiti) {
      const record = this.convertGuestToRecord(guest, formData.idAppartamento);
      const line = this.formatRecord(record);
      records.push(line);
    }

    // Unisce le righe con CR+LF (tranne l'ultima)
    return records.join("\r\n");
  }

  /**
   * Converte un ospite in un record Alloggiati Web
   */
  private static convertGuestToRecord(
    guest: GuestData,
    idAppartamento: string
  ): AlloggiatiWebRecord {
    return {
      tipoAlloggiato: this.getTipoAlloggiato(guest.tipoAlloggiato),
      dataArrivo: this.formatDate(guest.dataArrivo),
      giorniPermanenza: this.padLeft(guest.giorniPermanenza.toString(), 2, "0"),
      cognome: this.padRight(guest.cognome.toUpperCase(), 50),
      nome: this.padRight(guest.nome.toLowerCase(), 30),
      sesso: ALLOGGIATI_CODES.sesso[guest.sesso],
      dataNascita: this.formatDate(guest.dataNascita),
      comuneNascita: this.getComuneNascita(guest),
      provinciaNascita: this.getProvinciaNascita(guest),
      statoNascita: this.getStatoCode(guest.statoNascita),
      cittadinanza: this.getStatoCode(guest.cittadinanza),
      tipoDocumento: this.getTipoDocumento(guest),
      numeroDocumento: this.getNumeroDocumento(guest),
      luogoRilascio: this.getLuogoRilascio(guest),
      idAppartamento: this.padLeft(idAppartamento, 6, "0"),
    };
  }

  /**
   * Formatta un record in una riga di 169 caratteri
   */
  private static formatRecord(record: AlloggiatiWebRecord): string {
    return [
      record.tipoAlloggiato, // 2 caratteri (0-1)
      record.dataArrivo, // 10 caratteri (2-11)
      record.giorniPermanenza, // 2 caratteri (12-13)
      record.cognome, // 50 caratteri (14-63)
      record.nome, // 30 caratteri (64-93)
      record.sesso, // 1 carattere (94)
      record.dataNascita, // 10 caratteri (95-104)
      record.comuneNascita, // 9 caratteri (105-113)
      record.provinciaNascita, // 2 caratteri (114-115)
      record.statoNascita, // 9 caratteri (116-124)
      record.cittadinanza, // 9 caratteri (125-133)
      record.tipoDocumento, // 5 caratteri (134-138)
      record.numeroDocumento, // 20 caratteri (139-158)
      record.luogoRilascio, // 9 caratteri (159-167)
      // ID appartamento non incluso per seguire il formato degli esempi
    ].join("");
  }

  /**
   * Converte il tipo alloggiato nel codice corrispondente
   */
  private static getTipoAlloggiato(tipo: string): string {
    switch (tipo) {
      case "singolo":
        return ALLOGGIATI_CODES.tipoAlloggiato.singolo;
      case "capo_famiglia":
        return ALLOGGIATI_CODES.tipoAlloggiato.capo_famiglia;
      case "membro_famiglia":
        return ALLOGGIATI_CODES.tipoAlloggiato.membro_famiglia;
      default:
        return ALLOGGIATI_CODES.tipoAlloggiato.singolo;
    }
  }

  /**
   * Formatta una data da YYYY-MM-DD a gg/mm/aaaa
   */
  private static formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  /**
   * Ottiene il codice del comune di nascita
   */
  private static getComuneNascita(guest: GuestData): string {
    if (!guest.isItaliano) {
      return this.padRight("", 9); // 9 spazi per stranieri
    }

    // Cerca il codice del comune nel database
    const comune = getComuneByNome(guest.luogoNascita);
    const codice =
      comune?.codice ||
      ALLOGGIATI_CODES.comuni[guest.luogoNascita.toUpperCase()];
    return this.padRight(codice || "000000000", 9);
  }

  /**
   * Ottiene la provincia di nascita
   */
  private static getProvinciaNascita(guest: GuestData): string {
    if (!guest.isItaliano) {
      return this.padRight("", 2); // 2 spazi per stranieri
    }

    return this.padRight(guest.provinciaNascita || "", 2);
  }

  /**
   * Ottiene il codice dello stato
   */
  private static getStatoCode(stato: string): string {
    const codice = ALLOGGIATI_CODES.stati[stato.toUpperCase()];
    return this.padRight(codice || "100000100", 9); // Default Italia
  }

  /**
   * Ottiene il tipo documento (solo per capo famiglia/gruppo)
   */
  private static getTipoDocumento(guest: GuestData): string {
    if (!guest.isCapoFamiglia) {
      return this.padRight("", 5); // 5 spazi per membri famiglia
    }

    return this.padRight(guest.tipoDocumento || "IDENT", 5);
  }

  /**
   * Ottiene il numero documento (solo per capo famiglia/gruppo)
   */
  private static getNumeroDocumento(guest: GuestData): string {
    if (!guest.isCapoFamiglia) {
      return this.padRight("", 20); // 20 spazi per membri famiglia
    }

    return this.padRight((guest.numeroDocumento || "").toLowerCase(), 20);
  }

  /**
   * Ottiene il luogo di rilascio documento (solo per capo famiglia/gruppo)
   */
  private static getLuogoRilascio(guest: GuestData): string {
    if (!guest.isCapoFamiglia) {
      return this.padRight("", 9); // 9 spazi per membri famiglia
    }

    // Per italiani: codice comune, per stranieri: codice stato
    if (guest.isItaliano) {
      const comune = getComuneByNome(guest.luogoRilascio || "");
      const codice =
        comune?.codice ||
        ALLOGGIATI_CODES.comuni[guest.luogoRilascio?.toUpperCase() || ""];
      return this.padRight(codice || "000000000", 9);
    } else {
      const codice =
        ALLOGGIATI_CODES.stati[guest.luogoRilascio?.toUpperCase() || ""];
      return this.padRight(codice || "100000100", 9);
    }
  }

  /**
   * Aggiunge padding a sinistra
   */
  private static padLeft(
    str: string,
    length: number,
    char: string = " "
  ): string {
    return str.padStart(length, char);
  }

  /**
   * Aggiunge padding a destra
   */
  private static padRight(
    str: string,
    length: number,
    char: string = " "
  ): string {
    return str.padEnd(length, char);
  }

  /**
   * Genera il nome del file per la schedina
   */
  static generateFileName(idAppartamento: string): string {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "_").slice(0, -5);
    return `questura_${idAppartamento}_${timestamp}.txt`;
  }

  /**
   * Scarica la schedina come file
   */
  static downloadSchedina(content: string, fileName: string): void {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /**
   * Valida i dati prima della generazione
   */
  static validateFormData(formData: AlloggiatiFormData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!formData.idAppartamento.trim()) {
      errors.push("ID Appartamento è obbligatorio");
    }

    if (formData.ospiti.length === 0) {
      errors.push("Deve esserci almeno un ospite");
    }

    if (formData.ospiti.length > 1000) {
      errors.push("Massimo 1000 ospiti per file");
    }

    for (const [index, guest] of formData.ospiti.entries()) {
      const guestNum = index + 1;

      if (!guest.cognome.trim()) {
        errors.push(`Ospite ${guestNum}: Cognome obbligatorio`);
      }

      if (guest.cognome.length > 50) {
        errors.push(
          `Ospite ${guestNum}: Cognome troppo lungo (max 50 caratteri)`
        );
      }

      if (!guest.nome.trim()) {
        errors.push(`Ospite ${guestNum}: Nome obbligatorio`);
      }

      if (guest.nome.length > 30) {
        errors.push(`Ospite ${guestNum}: Nome troppo lungo (max 30 caratteri)`);
      }

      if (!guest.dataNascita) {
        errors.push(`Ospite ${guestNum}: Data di nascita obbligatoria`);
      }

      if (!guest.dataArrivo) {
        errors.push(`Ospite ${guestNum}: Data di arrivo obbligatoria`);
      }

      if (guest.giorniPermanenza < 1) {
        errors.push(
          `Ospite ${guestNum}: Giorni permanenza deve essere almeno di 1 giorno`
        );
      }

      if (guest.isCapoFamiglia) {
        if (!guest.numeroDocumento?.trim()) {
          errors.push(
            `Ospite ${guestNum}: Numero documento obbligatorio per capo famiglia/gruppo`
          );
        }

        if (guest.numeroDocumento && guest.numeroDocumento.length > 20) {
          errors.push(
            `Ospite ${guestNum}: Numero documento troppo lungo (max 20 caratteri)`
          );
        }
      }

      // Validazione data arrivo (solo oggi o ieri)
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const arrivalDate = new Date(guest.dataArrivo);
      if (arrivalDate < today) {
        errors.push(
          `Ospite ${guestNum}: Data arrivo deve essere da oggi in poi`
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
