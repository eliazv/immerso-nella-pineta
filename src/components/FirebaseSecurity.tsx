import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Globe,
  Database,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
} from "lucide-react";

/**
 * Componente per monitorare e configurare la sicurezza Firebase
 */
const FirebaseSecurity: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<
    "setup" | "basic" | "advanced"
  >("setup");
  const [region, setRegion] = useState<string>("");
  const [securityIssues, setSecurityIssues] = useState<string[]>([]);

  // Simula controllo sicurezza (in produzione useresti Firebase Admin SDK)
  useEffect(() => {
    const checkSecurity = () => {
      const issues: string[] = [];

      // Controlla se siamo ancora in modalità test
      // Questo dovrebbe essere sostituito con un controllo reale delle regole
      if (currentPhase === "setup") {
        issues.push(
          "Database in modalità test - Regole di sicurezza disabilitate"
        );
      }

      setSecurityIssues(issues);
    };

    checkSecurity();
  }, [currentPhase]);

  const regionOptions = [
    { value: "europe-west1", label: "Europa (Belgio)", recommended: true },
    { value: "europe-west3", label: "Europa (Frankfurt)", recommended: false },
    { value: "europe-west2", label: "Europa (Londra)", recommended: false },
    { value: "us-central1", label: "USA (Iowa)", recommended: false },
  ];

  const securityPhases = [
    {
      id: "setup",
      name: "Setup/Test",
      level: "danger",
      description: "Accesso completo - Solo per sviluppo",
      rules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`,
    },
    {
      id: "basic",
      name: "Produzione Base",
      level: "warning",
      description: "Protezione base con autenticazione",
      rules: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}`,
    },
    {
      id: "advanced",
      name: "Sicurezza Avanzata",
      level: "success",
      description: "Controlli granulari e validazioni",
      rules: `// Regole complete con ruoli e validazioni
// Vedi FIRESTORE_SECURITY.md per dettagli`,
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCurrentPhaseConfig = () => {
    return securityPhases.find((phase) => phase.id === currentPhase);
  };

  const getSecurityBadge = (level: string) => {
    const configs = {
      danger: { color: "bg-red-100 text-red-800", icon: ShieldAlert },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: Shield },
      success: { color: "bg-green-100 text-green-800", icon: ShieldCheck },
    };
    const config = configs[level as keyof typeof configs];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {level === "danger"
          ? "Pericoloso"
          : level === "warning"
          ? "Base"
          : "Sicuro"}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stato Sicurezza Attuale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Stato Sicurezza Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Fase Sicurezza Attuale:</span>
            {getSecurityBadge(getCurrentPhaseConfig()?.level || "danger")}
          </div>

          {securityIssues.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Problemi di Sicurezza Rilevati:</strong>
                <ul className="list-disc list-inside mt-2">
                  {securityIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Configurazione Località */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Località Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Scegli la regione più vicina ai tuoi utenti.{" "}
              <strong>Non puoi cambiarla dopo la creazione!</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {regionOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    region === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setRegion(option.value)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {option.recommended && (
                      <Badge className="bg-green-100 text-green-800">
                        Consigliata
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{option.value}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fasi di Sicurezza */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Configurazione Regole di Sicurezza
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityPhases.map((phase) => (
              <div
                key={phase.id}
                className={`p-4 border rounded-lg ${
                  currentPhase === phase.id ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{phase.name}</h3>
                    {getSecurityBadge(phase.level)}
                  </div>
                  <Button
                    size="sm"
                    variant={currentPhase === phase.id ? "default" : "outline"}
                    onClick={() =>
                      setCurrentPhase(
                        phase.id as "setup" | "basic" | "advanced"
                      )
                    }
                  >
                    {currentPhase === phase.id ? "Attiva" : "Seleziona"}
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {phase.description}
                </p>

                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">firestore.rules</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(phase.rules)}
                      className="text-gray-400 hover:text-white h-6 px-2"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <pre className="whitespace-pre-wrap">{phase.rules}</pre>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Azioni Rapide */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Console Firebase
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://firebase.google.com/docs/firestore/security/get-started"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentazione Sicurezza
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a
                href="https://firebase.google.com/docs/rules/simulator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Simulatore Regole
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Finale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Checklist Produzione
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              "Località database selezionata (europe-west1)",
              "Regole di sicurezza FASE 2 implementate",
              "Autenticazione PIN configurata",
              "Backup automatico abilitato",
              "Monitoraggio errori attivo",
              "Test di sicurezza completati",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirebaseSecurity;
