import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  initPocketBase,
  isPocketBaseAvailable,
  collectionExists,
  fetchBookings,
} from "@/services/pocketbaseService";
import { CalendarType } from "@/types/calendar";
import { Check, X, RefreshCw, Database, AlertTriangle } from "lucide-react";

const PocketBaseManager = () => {
  const [isServerRunning, setIsServerRunning] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [collections, setCollections] = useState<{
    principale: boolean;
    secondario: boolean;
    terziario: boolean;
  }>({
    principale: false,
    secondario: false,
    terziario: false,
  });
  const [recordCounts, setRecordCounts] = useState<{
    principale: number;
    secondario: number;
    terziario: number;
  }>({
    principale: 0,
    secondario: 0,
    terziario: 0,
  });

  // Controlla lo stato del server PocketBase
  const checkPocketBaseServer = async () => {
    setIsChecking(true);
    try {
      const isAvailable = await isPocketBaseAvailable();
      setIsServerRunning(isAvailable);

      if (isAvailable) {
        // Controlla l'esistenza delle collezioni
        const principaleExists = await collectionExists("bookings_principale");
        const secondarioExists = await collectionExists("bookings_secondario");
        const terziarioExists = await collectionExists("bookings_terziario");

        setCollections({
          principale: principaleExists,
          secondario: secondarioExists,
          terziario: terziarioExists,
        });

        // Conta i record nelle collezioni
        if (principaleExists) {
          const { bookings } = await fetchBookings("principale");
          setRecordCounts((prev) => ({ ...prev, principale: bookings.length }));
        }

        if (secondarioExists) {
          const { bookings } = await fetchBookings("secondario");
          setRecordCounts((prev) => ({ ...prev, secondario: bookings.length }));
        }

        if (terziarioExists) {
          const { bookings } = await fetchBookings("terziario");
          setRecordCounts((prev) => ({ ...prev, terziario: bookings.length }));
        }
      }
    } catch (error) {
      console.error(
        "Errore durante il controllo del server PocketBase:",
        error
      );
      setIsServerRunning(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkPocketBaseServer();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione PocketBase</CardTitle>
        <CardDescription>
          Gestisci il database PocketBase per le prenotazioni
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Stato Server</h3>
              <p className="text-sm text-muted-foreground">
                Verifica se il server PocketBase è in esecuzione
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isServerRunning === null ? (
                <span className="text-muted-foreground">
                  Controllo in corso...
                </span>
              ) : isServerRunning ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-5 w-5 mr-1" />
                  <span>Attivo</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <X className="h-5 w-5 mr-1" />
                  <span>Non attivo</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={checkPocketBaseServer}
                disabled={isChecking}
              >
                {isChecking ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {!isServerRunning && isServerRunning !== null && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Server PocketBase non disponibile</AlertTitle>
              <AlertDescription>
                Il server PocketBase non è attivo. Esegui il file
                start-pocketbase.bat o avvia manualmente PocketBase prima di
                continuare.
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          <h3 className="text-lg font-medium">Collezioni Database</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Stato delle collezioni per ogni appartamento
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Appartamento 3</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Collezione:</span>
                    {collections.principale ? (
                      <span className="text-green-600 text-sm flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Presente
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Mancante
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prenotazioni:</span>
                    <span className="text-sm">{recordCounts.principale}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Appartamento 4</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Collezione:</span>
                    {collections.secondario ? (
                      <span className="text-green-600 text-sm flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Presente
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Mancante
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prenotazioni:</span>
                    <span className="text-sm">{recordCounts.secondario}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Appartamento 8</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Collezione:</span>
                    {collections.terziario ? (
                      <span className="text-green-600 text-sm flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Presente
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Mancante
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Prenotazioni:</span>
                    <span className="text-sm">{recordCounts.terziario}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Strumenti</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() =>
                  window.open(
                    `${
                      process.env.POCKETBASE_URL || "http://127.0.0.1:8090"
                    }/_/`,
                    "_blank"
                  )
                }
              >
                <Database className="h-4 w-4 mr-2" />
                Apri Admin PocketBase
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() =>
                  window.open("scripts/migrateToDatabase.js", "_blank")
                }
              >
                <Database className="h-4 w-4 mr-2" />
                Esegui migrazione dati
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PocketBaseManager;
