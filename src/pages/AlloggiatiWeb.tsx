import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  Shield,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import GuestForm from "@/components/alloggiati/GuestForm";
import { AlloggiatiFormData } from "@/types/alloggiati";
import { AlloggiatiService } from "@/services/alloggiatiService";
import { StorageService } from "@/services/storageService";
import { useToast } from "@/hooks/use-toast";
import MetaTags from "@/components/MetaTags";

const AlloggiatiWeb: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [currentFormData, setCurrentFormData] =
    useState<AlloggiatiFormData | null>(null);

  const downloadTxtFile = (name: string, content: string) => {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  // Carica dati da URL se presente parametro data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataId = urlParams.get("data");

    if (dataId) {
      const loadedData = StorageService.loadFromLocalStorage(dataId);
      if (loadedData) {
        setCurrentFormData(loadedData);
        toast({
          title: "Dati caricati",
          description: "I dati condivisi sono stati caricati automaticamente",
        });
      } else {
        toast({
          title: "Link scaduto",
          description: "Il link di condivisione è scaduto o non valido",
          variant: "destructive",
        });
      }
    }

    // Pulizia dati scaduti
    StorageService.cleanupExpiredData();
  }, [toast]);

  const handleFormSubmit = async (formData: AlloggiatiFormData) => {
    setIsGenerating(true);

    try {
      // Valida i dati
      const validation = AlloggiatiService.validateFormData(formData);

      if (!validation.isValid) {
        toast({
          title: "Errori di validazione",
          description: validation.errors.join(", "),
          variant: "destructive",
        });
        return;
      }

      // Genera la schedina
      const content = AlloggiatiService.generateSchedina(formData);
      const fileName = AlloggiatiService.generateFileName(
        formData.idAppartamento,
      );

      downloadTxtFile(fileName, content);

      // Salva i dati per mostrare la conferma
      setGeneratedContent(content);
      setFileName(fileName);
      setCurrentFormData(formData);

      toast({
        title: "File Alloggiati generato",
        description:
          "Download avviato. Puoi ora caricare il file sul portale Alloggiati Web.",
      });
    } catch (error) {
      console.error("Errore nella generazione:", error);
      toast({
        title: "Errore",
        description:
          "Si è verificato un errore durante la generazione del file",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setGeneratedContent(null);
    setFileName("");
    setCurrentFormData(null);

    // Rimuovi parametro data dall'URL
    const url = new URL(window.location.href);
    url.searchParams.delete("data");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags
        title="Alloggiati Web - Raccolta Dati Ospiti"
        description="Sistema per la raccolta dati ospiti e generazione schedine per Alloggiati Web - Comunicazione alla Questura"
      />

      <div className="container mx-auto px-2 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Raccolta Documenti - Immerso nella pineta
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            OCR documenti ospiti, compilazione multi-persona e file Alloggiati
            pronto da scaricare
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              GDPR Compliant
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Formato Ufficiale
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Multi-ospite
            </Badge>
          </div>
        </div>

        {/* Guida operativa */}
        {!generatedContent && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <strong className="text-blue-800">
                Informazioni importanti:
              </strong>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-blue-700">
                <li>
                  Carica il <strong>fronte</strong> del documento e, se utile,
                  anche il <strong>retro</strong> per estrarre i dati con OCR
                </li>
                <li>
                  Controlla i dati estratti, poi usa{" "}
                  <strong>Aggiungi ospite da OCR</strong>
                </li>
                <li>
                  Ripeti il passaggio per ogni persona e completa i campi
                  mancanti
                </li>
                <li>
                  Premi <strong>Genera file Alloggiati</strong> per scaricare il
                  `.txt` da caricare sul portale ufficiale
                </li>
              </ol>
            </AlertDescription>
          </Alert>
        )}

        {/* Risultato generazione */}
        {generatedContent && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                File Generato con Successo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="mb-4">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Generazione completata
                    </h3>
                    <p className="text-green-700 mb-2">
                      File creato per{" "}
                      <strong>
                        {generatedContent.split("\r\n").length} ospiti
                      </strong>{" "}
                      e scaricato automaticamente sul dispositivo.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>File generato:</strong> {fileName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Il file e conforme al formato importabile su Alloggiati
                      Web
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="bg-white hover:bg-gray-50"
                  >
                    Registra altri ospiti
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form principale */}
        {!generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Dati Ospiti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GuestForm
                onSubmit={handleFormSubmit}
                isLoading={isGenerating}
                initialData={currentFormData}
              />
            </CardContent>
          </Card>
        )}

        {/* Privacy e GDPR */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy e Trattamento Dati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                I dati raccolti tramite questo modulo sono utilizzati
                esclusivamente per:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Adempimento degli obblighi di legge per la comunicazione alla
                  Questura
                </li>
                <li>
                  Generazione delle schedine nel formato richiesto da Alloggiati
                  Web
                </li>
                <li>
                  Nessun invio email automatico: il file viene generato e
                  scaricato localmente
                </li>
              </ul>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Consenso GDPR:</strong> Compilando e inviando questo
                  modulo, autorizzi il trattamento dei dati personali secondo il
                  Regolamento UE 2016/679 (GDPR) per le finalità sopra indicate.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Link utili */}
        {/* <Card className="mt-6">
          <CardHeader>
            <CardTitle>Link Utili</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="https://alloggiatiweb.poliziadistato.it"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                Portale Alloggiati Web
              </a>
              <a
                href="https://alloggiatiweb.poliziadistato.it/portalealloggiati/Download/Manuali/MANUALEALBERGHI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4" />
                Manuale Ufficiale Alloggiati Web
              </a>
            </div>
          </CardContent>
        </Card> */}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Sistema conforme alle specifiche tecniche del Portale Alloggiati Web
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlloggiatiWeb;
