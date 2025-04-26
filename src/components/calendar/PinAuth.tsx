import React, { useState } from "react";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  // Funzione per verificare il PIN
  const handlePinSubmit = () => {
    if (pin === "2222") {
      setPinError("");
      // Salva lo stato di autenticazione nel localStorage con timestamp
      localStorage.setItem(
        "calendarAuth",
        JSON.stringify({
          authenticated: true,
          timestamp: new Date().getTime(),
        })
      );
      onAuthenticate();
    } else {
      setPinError("PIN non valido. Riprova.");
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
      </div>
    </div>
  );
};

export default PinAuth;
