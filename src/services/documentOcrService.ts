import type { GuestData } from "@/types/alloggiati";

export interface OCRExtractionResult {
  rawText: string;
  guest: Partial<GuestData>;
}

const MONTHS: Record<string, string> = {
  GEN: "01",
  FEB: "02",
  MAR: "03",
  APR: "04",
  MAG: "05",
  GIU: "06",
  LUG: "07",
  AGO: "08",
  SET: "09",
  OTT: "10",
  NOV: "11",
  DIC: "12",
};

export class DocumentOCRService {
  static async extractFromDocument(
    frontFile: File,
    backFile?: File,
  ): Promise<OCRExtractionResult> {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("ita+eng");

    try {
      const frontText = await this.recognizeFile(worker, frontFile);
      const backText = backFile
        ? await this.recognizeFile(worker, backFile)
        : "";

      const rawText = [frontText, backText].filter(Boolean).join("\n");
      const guest = this.parseGuestData(rawText);

      return { rawText, guest };
    } finally {
      await worker.terminate();
    }
  }

  private static async recognizeFile(worker: any, file: File): Promise<string> {
    const dataUrl = await this.fileToDataUrl(file);
    const {
      data: { text },
    } = await worker.recognize(dataUrl);
    return text || "";
  }

  private static fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Impossibile leggere il file"));
      reader.readAsDataURL(file);
    });
  }

  private static parseGuestData(rawText: string): Partial<GuestData> {
    const normalized = this.normalizeText(rawText);
    const lines = normalized
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const mrzNames = this.extractNamesFromMrz(lines);

    const cognome =
      this.extractWithPatterns(lines, [
        /COGNOME\s*[:\-]?\s*([A-Z'\s]+)/,
        /SURNAME\s*[:\-]?\s*([A-Z'\s]+)/,
      ]) || mrzNames.cognome;

    const nome =
      this.extractWithPatterns(lines, [
        /NOME\s*[:\-]?\s*([A-Z'\s]+)/,
        /GIVEN\s*NAMES?\s*[:\-]?\s*([A-Z'\s]+)/,
      ]) || mrzNames.nome;

    const dataNascita = this.extractDateOfBirth(lines);

    const sessoRaw = this.extractWithPatterns(lines, [
      /SESSO\s*[:\-]?\s*([MF])\b/,
      /SEX\s*[:\-]?\s*([MF])\b/,
    ]);

    const tipoDocumentoRaw = this.extractWithPatterns(lines, [
      /DOCUMENTO\s*[:\-]?\s*(CARTA\s*D'?IDENTITA|PASSAPORTO|PATENTE)/,
      /(IDENTITY\s*CARD|PASSPORT|DRIVING\s*LICENCE)/,
    ]);

    const numeroDocumento = this.extractWithPatterns(lines, [
      /NUMERO\s*DOCUMENTO\s*[:\-]?\s*([A-Z0-9\-]+)/,
      /DOCUMENT\s*NO\.?\s*[:\-]?\s*([A-Z0-9\-]+)/,
      /N\.\s*([A-Z0-9]{6,20})/,
    ]);

    const luogoNascita = this.extractWithPatterns(lines, [
      /LUOGO\s*DI\s*NASCITA\s*[:\-]?\s*([A-Z'\s]+)/,
      /NATO\s*A\s*[:\-]?\s*([A-Z'\s]+)/,
      /PLACE\s*OF\s*BIRTH\s*[:\-]?\s*([A-Z'\s]+)/,
    ]);

    const cittadinanza = this.extractWithPatterns(lines, [
      /CITTADINANZA\s*[:\-]?\s*([A-Z'\s]+)/,
      /NATIONALITY\s*[:\-]?\s*([A-Z'\s]+)/,
    ]);

    const luogoRilascio = this.extractWithPatterns(lines, [
      /RILASCIAT[OA]\s*A\s*[:\-]?\s*([A-Z'\s]+)/,
      /AUTORITA\s*[:\-]?\s*([A-Z'\s]+)/,
      /ISSUED\s*AT\s*[:\-]?\s*([A-Z'\s]+)/,
    ]);

    const sesso = sessoRaw === "F" ? "F" : "M";

    const tipoDocumento = this.mapDocumentType(tipoDocumentoRaw);

    const normalizedCountry = this.normalizeCountry(cittadinanza || "ITALIA");
    const statoNascita =
      normalizedCountry === "ITALIA" ? "ITALIA" : normalizedCountry;

    return {
      cognome: this.toTitleCase(cognome || ""),
      nome: this.toTitleCase(nome || ""),
      sesso,
      dataNascita,
      luogoNascita: this.toTitleCase(luogoNascita || ""),
      statoNascita,
      cittadinanza: normalizedCountry,
      tipoDocumento,
      numeroDocumento: (numeroDocumento || "")
        .replace(/\s+/g, "")
        .toUpperCase(),
      luogoRilascio: this.toTitleCase(luogoRilascio || ""),
      isItaliano: statoNascita === "ITALIA",
    };
  }

  private static extractNamesFromMrz(lines: string[]): {
    cognome?: string;
    nome?: string;
  } {
    const mrzLine = lines.find(
      (line) => line.includes("<<") && line.length >= 30,
    );
    if (!mrzLine) return {};

    const cleaned = mrzLine.replace(/</g, " ").replace(/\s+/g, " ").trim();
    const parts = cleaned.split(" ").filter(Boolean);
    if (parts.length < 2) return {};

    return {
      cognome: parts[0],
      nome: parts.slice(1).join(" "),
    };
  }

  private static extractDateOfBirth(lines: string[]): string {
    const direct = this.extractWithPatterns(lines, [
      /DATA\s*DI\s*NASCITA\s*[:\-]?\s*([0-9]{2}[\/\-.][0-9]{2}[\/\-.][0-9]{4})/,
      /DATE\s*OF\s*BIRTH\s*[:\-]?\s*([0-9]{2}[\/\-.][0-9]{2}[\/\-.][0-9]{4})/,
      /NASCITA\s*[:\-]?\s*([0-9]{2}[\/\-.][0-9]{2}[\/\-.][0-9]{4})/,
    ]);

    if (direct) {
      const date = this.toIsoDate(direct);
      if (date) return date;
    }

    const monthNamed = this.extractWithPatterns(lines, [
      /([0-9]{1,2})\s+([A-Z]{3})\s+([0-9]{4})/,
    ]);

    if (monthNamed) {
      const parts = monthNamed.split(/\s+/);
      if (parts.length === 3) {
        const day = parts[0].padStart(2, "0");
        const month = MONTHS[parts[1]];
        const year = parts[2];
        if (month) return `${year}-${month}-${day}`;
      }
    }

    return "";
  }

  private static toIsoDate(value: string): string {
    const match = value.match(/^([0-9]{2})[\/\-.]([0-9]{2})[\/\-.]([0-9]{4})$/);
    if (!match) return "";
    const day = match[1];
    const month = match[2];
    const year = match[3];
    return `${year}-${month}-${day}`;
  }

  private static extractWithPatterns(
    lines: string[],
    patterns: RegExp[],
  ): string {
    for (const line of lines) {
      for (const pattern of patterns) {
        const match = line.match(pattern);
        if (match && match[1]) {
          return match[1].trim();
        }
      }
    }
    return "";
  }

  private static mapDocumentType(value: string): "IDENT" | "PASSP" | "PATEN" {
    const v = (value || "").toUpperCase();
    if (v.includes("PASS") || v.includes("PASSPORT")) return "PASSP";
    if (v.includes("PATEN") || v.includes("DRIVING")) return "PATEN";
    return "IDENT";
  }

  private static normalizeCountry(value: string): string {
    const v = (value || "").trim().toUpperCase();
    if (!v) return "ITALIA";
    if (v === "ITALIANA" || v === "ITALIAN" || v === "ITA") return "ITALIA";
    return this.toTitleCase(v);
  }

  private static toTitleCase(value: string): string {
    return value
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  private static normalizeText(text: string): string {
    return (text || "")
      .replace(/[|]/g, "I")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .toUpperCase();
  }
}
