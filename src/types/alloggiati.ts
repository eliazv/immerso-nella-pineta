export interface GuestData {
  // Dati anagrafici
  cognome: string;
  nome: string;
  sesso: "M" | "F";
  dataNascita: string; // formato YYYY-MM-DD
  luogoNascita: string;
  provinciaNascita?: string; // solo per italiani
  statoNascita: string;
  cittadinanza: string;

  // Documento (solo per capo famiglia/gruppo)
  tipoDocumento?: "IDENT" | "PASSP" | "PATEN";
  numeroDocumento?: string;
  luogoRilascio?: string;

  // Soggiorno
  dataArrivo: string; // formato YYYY-MM-DD
  dataPartenza: string; // formato YYYY-MM-DD
  giorniPermanenza: number; // calcolato automaticamente
  tipoAlloggiato: "singolo" | "capo_famiglia" | "membro_famiglia";

  // Metadati
  isCapoFamiglia?: boolean;
  isItaliano?: boolean;
}

export interface AlloggiatiFormData {
  ospiti: GuestData[];
  idAppartamento: string;
  emailContatto?: string;
  note?: string;
  // Dettagli soggiorno comuni
  dataArrivo: string;
  dataPartenza: string;
  giorniPermanenza: number;
}

export interface AlloggiatiWebCodes {
  tipoAlloggiato: {
    singolo: "18";
    capo_famiglia: "16";
    membro_famiglia: "17";
  };
  sesso: {
    M: "1";
    F: "2";
  };
  tipoDocumento: {
    IDENT: "IDENT";
    PASSP: "PASSP";
    PATEN: "PATEN";
  };
  // Codici comuni italiani (esempi - da completare con tabella ufficiale)
  comuni: Record<string, string>;
  // Codici stati (esempi - da completare con tabella ufficiale)
  stati: Record<string, string>;
}

export const ALLOGGIATI_CODES: AlloggiatiWebCodes = {
  tipoAlloggiato: {
    singolo: "18",
    capo_famiglia: "16",
    membro_famiglia: "17",
  },
  sesso: {
    M: "1",
    F: "2",
  },
  tipoDocumento: {
    IDENT: "IDENT",
    PASSP: "PASSP",
    PATEN: "PATEN",
  },
  comuni: {
    // Esempi - da completare
    BOLOGNA: "408037006",
    FIRENZE: "409048017",
    ROMA: "458100001",
    MILANO: "415146001",
  },
  stati: {
    ITALIA: "100000100",
    FRANCIA: "100000110",
    GERMANIA: "100000112",
    SPAGNA: "100000134",
    "REGNO UNITO": "100000135",
  },
};

export interface AlloggiatiWebRecord {
  tipoAlloggiato: string; // 2 caratteri
  dataArrivo: string; // 10 caratteri gg/mm/aaaa
  giorniPermanenza: string; // 2 caratteri
  cognome: string; // 50 caratteri
  nome: string; // 30 caratteri
  sesso: string; // 1 carattere
  dataNascita: string; // 10 caratteri gg/mm/aaaa
  comuneNascita: string; // 9 caratteri
  provinciaNascita: string; // 2 caratteri
  statoNascita: string; // 9 caratteri
  cittadinanza: string; // 9 caratteri
  tipoDocumento: string; // 5 caratteri
  numeroDocumento: string; // 20 caratteri
  luogoRilascio: string; // 9 caratteri
  idAppartamento: string; // 6 caratteri
}
