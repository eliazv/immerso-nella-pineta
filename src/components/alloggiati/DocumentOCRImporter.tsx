import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileImage, ScanText, Loader2, Plus } from "lucide-react";
import type { GuestData } from "@/types/alloggiati";
import {
  DocumentOCRService,
  type OCRExtractionResult,
} from "@/services/documentOcrService";
import { useToast } from "@/hooks/use-toast";

interface DocumentOCRImporterProps {
  onImportGuest: (guest: Partial<GuestData>) => void;
}

const DocumentOCRImporter: React.FC<DocumentOCRImporterProps> = ({
  onImportGuest,
}) => {
  const { toast } = useToast();
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OCRExtractionResult | null>(null);

  const confidenceFields = useMemo(() => {
    if (!result) return 0;
    const candidate = result.guest;
    return [
      candidate.cognome,
      candidate.nome,
      candidate.dataNascita,
      candidate.numeroDocumento,
    ].filter(Boolean).length;
  }, [result]);

  const runOcr = async () => {
    if (!frontFile) {
      toast({
        title: "Documento fronte mancante",
        description: "Carica almeno la foto del fronte del documento",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const extraction = await DocumentOCRService.extractFromDocument(
        frontFile,
        backFile || undefined,
      );

      setResult(extraction);

      toast({
        title: "OCR completato",
        description:
          "Controlla i dati estratti e premi 'Aggiungi ospite da OCR' se sono corretti",
      });
    } catch (error) {
      console.error("Errore OCR:", error);
      toast({
        title: "Errore OCR",
        description:
          "Non sono riuscito a leggere il documento. Prova con una foto piu nitida e ben illuminata.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const importGuest = () => {
    if (!result) return;
    onImportGuest(result.guest);

    toast({
      title: "Ospite importato",
      description:
        "I campi sono stati compilati nel form e puoi rifinire manualmente",
    });

    setResult(null);
    setFrontFile(null);
    setBackFile(null);
  };

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <ScanText className="h-5 w-5" />
          Importa Documento con OCR
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ocr-front">Documento fronte *</Label>
            <Input
              id="ocr-front"
              type="file"
              accept="image/*"
              onChange={(e) => setFrontFile(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <Label htmlFor="ocr-back">Documento retro (opzionale)</Label>
            <Input
              id="ocr-back"
              type="file"
              accept="image/*"
              onChange={(e) => setBackFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={runOcr} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Lettura in corso...
              </>
            ) : (
              <>
                <FileImage className="mr-2 h-4 w-4" />
                Estrai dati dal documento
              </>
            )}
          </Button>

          {result && (
            <Button type="button" variant="secondary" onClick={importGuest}>
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi ospite da OCR
            </Button>
          )}

          {result && (
            <Badge variant="secondary">
              Campi riconosciuti: {confidenceFields}/4
            </Badge>
          )}
        </div>

        {result && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-white p-3 border">
                <p>
                  <strong>Cognome:</strong> {result.guest.cognome || "-"}
                </p>
                <p>
                  <strong>Nome:</strong> {result.guest.nome || "-"}
                </p>
                <p>
                  <strong>Data nascita:</strong>{" "}
                  {result.guest.dataNascita || "-"}
                </p>
                <p>
                  <strong>Sesso:</strong> {result.guest.sesso || "-"}
                </p>
              </div>
              <div className="rounded-md bg-white p-3 border">
                <p>
                  <strong>Documento:</strong>{" "}
                  {result.guest.tipoDocumento || "-"}
                </p>
                <p>
                  <strong>Numero:</strong> {result.guest.numeroDocumento || "-"}
                </p>
                <p>
                  <strong>Luogo rilascio:</strong>{" "}
                  {result.guest.luogoRilascio || "-"}
                </p>
                <p>
                  <strong>Cittadinanza:</strong>{" "}
                  {result.guest.cittadinanza || "-"}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-xs">Testo OCR (debug rapido)</Label>
              <Textarea
                readOnly
                className="h-32 text-xs bg-white"
                value={result.rawText}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentOCRImporter;
