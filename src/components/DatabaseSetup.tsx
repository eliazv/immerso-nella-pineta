import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Rocket,
  CheckCircle,
  AlertTriangle,
  Settings,
  ExternalLink,
} from "lucide-react";
import { initializeDatabase } from "@/scripts/initializeDatabase";

/**
 * Componente per il setup iniziale del database Firebase
 * Mostra lo stato della configurazione e permette l'inizializzazione
 */
const DatabaseSetup: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initResult, setInitResult] = useState<{
    success: boolean;
    message: string;
    details?: {
      propertiesCreated: number;
      bookingsCreated: number;
      propertyIds: Record<string, string>;
    };
  } | null>(null);

  const handleInitialize = async () => {
    setIsInitializing(true);
    setInitResult(null);

    try {
      const result = await initializeDatabase();
      setInitResult({
        success: true,
        message: `Database inizializzato con successo! Creati ${result.propertiesCreated} appartamenti e ${result.bookingsCreated} prenotazioni di esempio.`,
        details: result,
      });
    } catch (error) {
      setInitResult({
        success: false,
        message: `Errore durante l'inizializzazione: ${
          error instanceof Error ? error.message : "Errore sconosciuto"
        }`,
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <Database className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Setup Database Firebase
          </h1>
          <p className="text-gray-600">
            Configura il tuo database cloud per gestire le prenotazioni
          </p>
        </div>

        {/* Checklist configurazione */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Checklist Configurazione
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>1. Progetto Firebase creato</span>
                <Badge variant="outline">Manuale</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>2. Firestore Database attivato</span>
                <Badge variant="outline">Manuale</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>3. Credenziali configurate in firebase.ts</span>
                <Badge variant="outline">Manuale</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>4. Dati di esempio inseriti</span>
                <Badge variant={initResult?.success ? "default" : "secondary"}>
                  {initResult?.success ? "Completato" : "Da fare"}
                </Badge>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Prima di iniziare:</strong> Assicurati di aver
                configurato Firebase seguendo la guida in{" "}
                <code>FIREBASE_SETUP.md</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Azioni */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Inizializzazione Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Questo creerà automaticamente:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>3 appartamenti di esempio (N° 3, N° 4, N° 8)</li>
              <li>Prenotazioni di esempio con diversi stati</li>
              <li>Dati per testare le funzionalità del sistema</li>
            </ul>

            <div className="flex gap-3">
              <Button
                onClick={handleInitialize}
                disabled={isInitializing}
                size="lg"
              >
                {isInitializing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Inizializzazione...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Inizializza Database
                  </>
                )}
              </Button>

              <Button variant="outline" asChild>
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Console Firebase
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Risultato */}
        {initResult && (
          <Alert
            className={
              initResult.success
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }
          >
            {initResult.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={initResult.success ? "text-green-800" : "text-red-800"}
            >
              {initResult.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Prossimi passi */}
        {initResult?.success && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Setup Completato! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Il tuo database è ora pronto. Ecco cosa puoi fare:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">
                    📅 Gestisci Prenotazioni
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Vai alla sezione Prenotazioni per vedere i dati di esempio
                  </p>
                  <Button size="sm" asChild>
                    <a href="/bookings">Vai alle Prenotazioni</a>
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">
                    📊 Visualizza Dashboard
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Controlla le statistiche e i grafici
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/dashboard">Vai alla Dashboard</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DatabaseSetup;
