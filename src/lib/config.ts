/**
 * Configurazione pubblica dell'applicazione
 * Questo file contiene impostazioni non sensibili che possono essere incluse nel repository
 */

// Configurazione di autenticazione del backoffice
export const authConfig = {
  PIN: "2222", // PIN di accesso al backoffice
  EXPIRY: 21 * 24 * 60 * 60 * 1000, // 21 giorni in millisecondi (tre settimane)
};

/**
 * Ottiene l'URL base del sito in modo dinamico
 * Supporta domini multipli: vercel, eliazavatta.it, localhost
 */
export const getSiteUrl = (): string => {
  // In ambiente browser
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Fallback per SSR/build - controlla variabili d'ambiente
  if (typeof process !== "undefined" && process.env) {
    // Vercel automaticamente setta VERCEL_URL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // Custom domain environment variable
    if (process.env.VITE_SITE_URL) {
      return process.env.VITE_SITE_URL;
    }
  }

  // Fallback finale
  return "https://immerso-nella-pineta.vercel.app";
};

/**
 * Genera URL canonico completo
 */
export const getCanonicalUrl = (path: string): string => {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Configurazione URL del sito
 */
export const siteConfig = {
  // URL base dinamico
  get baseUrl(): string {
    return getSiteUrl();
  },

  // Domini supportati
  domains: [
    "immerso-nella-pineta.vercel.app",
    "immerso.eliazavatta.it",
    "pinarella.eliazavatta.it",
  ],

  // Nome del sito
  name: "Appartamento Pinarella - Immerso nella Pineta",

  // Descrizione breve
  description:
    "Affitto appartamenti a Pinarella di Cervia - Gestione diretta proprietari, senza intermediari",
};

// Altri valori di configurazione pubblica possono essere aggiunti qui
