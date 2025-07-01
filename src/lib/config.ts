/**
 * Configurazione pubblica dell'applicazione
 * Questo file contiene impostazioni non sensibili che possono essere incluse nel repository
 */

// Configurazione di autenticazione del backoffice
export const authConfig = {
  PIN: "2222", // PIN di accesso al backoffice
  EXPIRY: 21 * 24 * 60 * 60 * 1000, // 21 giorni in millisecondi (tre settimane)
};

// Altri valori di configurazione pubblica possono essere aggiunti qui
