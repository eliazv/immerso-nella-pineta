import React, { useState, useEffect } from "react";
import { Lock, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  authenticateWithPin,
  isAuthBlocked,
  getBlockTimeRemaining,
  resetFailedAttempts,
  isAuthenticated,
} from "@/services/authService";

interface PinAuthProps {
  onAuthenticate: () => void;
  className?: string;
}

export const PinAuth: React.FC<PinAuthProps> = ({
  onAuthenticate,
  className,
}) => {
  const [pin, setPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [blocked, setBlocked] = useState<boolean>(false);
  const [blockTime, setBlockTime] = useState<number>(0);

  // Check se l'autenticazione è bloccata all'avvio del componente
  useEffect(() => {
    checkAuthBlockStatus();

    // Controlla se l'utente è già autenticato
    if (isAuthenticated()) {
      onAuthenticate();
    }

    // Aggiorna lo stato del blocco ogni secondo
    const timer = setInterval(checkAuthBlockStatus, 1000);
    return () => clearInterval(timer);
  }, []);

  // Controlla se l'autenticazione è bloccata e aggiorna lo stato
  const checkAuthBlockStatus = () => {
    const isBlocked = isAuthBlocked();
    setBlocked(isBlocked);

    if (isBlocked) {
      setBlockTime(getBlockTimeRemaining());
    } else if (blockTime !== 0) {
      setBlockTime(0);
      resetFailedAttempts();
    }
  };

  // Funzione per verificare il PIN in modo sicuro
  const handlePinSubmit = () => {
    if (blocked) {
      setPinError(
        `Troppi tentativi falliti. Riprova tra ${blockTime} secondi.`
      );
      return;
    }

    if (!pin.trim()) {
      setPinError("Inserisci un PIN");
      return;
    }

    const authenticated = authenticateWithPin(pin);

    if (authenticated) {
      setPinError("");
      onAuthenticate();
    } else {
      checkAuthBlockStatus(); // Controlla se siamo stati bloccati

      if (blocked) {
        setPinError(
          `Troppi tentativi falliti. Riprova tra ${blockTime} secondi.`
        );
      } else {
        setPinError("PIN non valido. Riprova.");
      }

      setPin("");
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-md border ${className} flex flex-col items-center justify-center`}
    >
      <Lock className="h-8 w-8 text-primary mb-4" />
      <h2 className="font-serif text-xl font-medium mb-4">
        Area Protetta - Calendario Prenotazioni
      </h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Inserisci il codice PIN per accedere al calendario delle prenotazioni
      </p>
      <div className="flex flex-col items-center w-full max-w-xs gap-4">
        {blocked ? (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              Troppi tentativi falliti. Per questioni di sicurezza, l'accesso è
              temporaneamente bloccato. Riprova tra {blockTime} secondi.
            </p>
          </div>
        ) : (
          <>
            <Input
              type="password"
              placeholder="Inserisci il PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-lg"
              maxLength={4}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePinSubmit();
                }
              }}
            />
            {pinError && <p className="text-sm text-red-500">{pinError}</p>}
            <Button onClick={handlePinSubmit} className="w-full">
              Accedi
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PinAuth;
