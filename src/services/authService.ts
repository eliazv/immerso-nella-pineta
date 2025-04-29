// Importa la configurazione pubblica
import { authConfig } from "@/lib/config";

// Configurazioni di autenticazione
const AUTH_PIN = authConfig.PIN || "2222"; // Usa il PIN dalla configurazione pubblica con fallback corretto
const AUTH_PIN_EXPIRY = authConfig.EXPIRY || 7 * 24 * 60 * 60 * 1000; // 7 giorni in ms come fallback
const AUTH_TOKEN_KEY = "auth_token";
const FAILED_ATTEMPTS_KEY = "failed_auth_attempts";
const BLOCK_UNTIL_KEY = "auth_blocked_until";
const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_DURATION = 300000; // 5 minuti (in ms)

/**
 * Esegue l'autenticazione usando un PIN
 * @param pin Il PIN inserito dall'utente
 * @returns Il risultato dell'autenticazione
 */
export const authenticateWithPin = (pin: string): boolean => {
  // Verifica se l'autenticazione è bloccata
  if (isAuthBlocked()) {
    return false;
  }

  // Verifica se il PIN è corretto
  if (pin !== AUTH_PIN) {
    logFailedAttempt();
    return false;
  }

  // Genera un token sicuro con timestamp di scadenza
  const token = generateAuthToken();

  // Salva il token
  storeAuthToken(token);

  // Resetta i tentativi falliti
  resetFailedAttempts();

  return true;
};

/**
 * Genera un token di autenticazione sicuro
 * @returns Il token generato con timestamp di scadenza
 */
const generateAuthToken = (): string => {
  const now = Date.now();
  const expiry = now + AUTH_PIN_EXPIRY;
  const randomPart = Math.random().toString(36).substring(2, 15);

  // Formato: timestamp di scadenza + parte casuale
  return `${expiry}:${randomPart}`;
};

/**
 * Salva il token nell'archiviazione locale
 * @param token Il token da salvare
 */
const storeAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Controlla se l'utente è autenticato
 * @returns true se l'utente è autenticato e il token non è scaduto
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) return false;

  // Estrai il timestamp di scadenza dal token
  const parts = token.split(":");
  if (parts.length !== 2) return false;

  const expiry = Number(parts[0]);
  const now = Date.now();

  return now < expiry;
};

/**
 * Esegue il logout dell'utente
 */
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Registra un tentativo di accesso fallito
 * Implementa un meccanismo di rate limiting per proteggere da attacchi di forza bruta
 */
const logFailedAttempt = (): void => {
  const failedAttempts = getFailedAttempts();
  localStorage.setItem(FAILED_ATTEMPTS_KEY, String(failedAttempts + 1));

  // Se ci sono troppi tentativi falliti, blocca temporaneamente l'autenticazione
  if (failedAttempts >= MAX_FAILED_ATTEMPTS - 1) {
    const blockUntil = Date.now() + BLOCK_DURATION;
    localStorage.setItem(BLOCK_UNTIL_KEY, String(blockUntil));
    console.warn(
      `Troppi tentativi falliti di accesso al: ${new Date().toISOString()}`
    );
  }
};

/**
 * Ottiene il numero di tentativi di accesso falliti
 */
const getFailedAttempts = (): number => {
  return Number(localStorage.getItem(FAILED_ATTEMPTS_KEY) || "0");
};

/**
 * Controlla se l'autenticazione è bloccata a causa di troppi tentativi falliti
 * @returns true se l'autenticazione è temporaneamente bloccata
 */
export const isAuthBlocked = (): boolean => {
  const blockedUntil = Number(localStorage.getItem(BLOCK_UNTIL_KEY) || "0");
  const now = Date.now();

  return blockedUntil > now;
};

/**
 * Ottiene il tempo rimanente (in secondi) prima che il blocco dell'autenticazione scada
 */
export const getBlockTimeRemaining = (): number => {
  const blockedUntil = Number(localStorage.getItem(BLOCK_UNTIL_KEY) || "0");
  const now = Date.now();

  return Math.max(0, Math.ceil((blockedUntil - now) / 1000));
};

/**
 * Reimposta il contatore dei tentativi falliti
 */
export const resetFailedAttempts = (): void => {
  localStorage.removeItem(FAILED_ATTEMPTS_KEY);
  localStorage.removeItem(BLOCK_UNTIL_KEY);
};

/**
 * Controlla quando scade la sessione corrente (in secondi)
 * @returns Il numero di secondi rimanenti prima della scadenza, o 0 se non è autenticato
 */
export const getSessionTimeRemaining = (): number => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) return 0;

  // Estrai il timestamp di scadenza dal token
  const parts = token.split(":");
  if (parts.length !== 2) return 0;

  const expiry = Number(parts[0]);
  const now = Date.now();

  return Math.max(0, Math.ceil((expiry - now) / 1000));
};

/**
 * Estende la durata della sessione corrente
 * @returns true se l'estensione è avvenuta con successo
 */
export const extendSession = (): boolean => {
  if (!isAuthenticated()) return false;

  const token = generateAuthToken();
  storeAuthToken(token);

  return true;
};
