import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ICalService } from "@/services/icalService";
import { localStorageService } from "@/services/localStorageService";
import { Booking, Apartment } from "@/types/calendar";
import { Upload, FileText, Calendar, CheckCircle } from "lucide-react";

interface ICalImporterProps {
  isOpen: boolean;
  onClose: () => void;
  apartments: Apartment[];
  onImportComplete: (bookings: Booking[]) => void;
}

const ICalImporter: React.FC<ICalImporterProps> = ({
  isOpen,
  onClose,
  apartments,
  onImportComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewBookings, setPreviewBookings] = useState<Booking[]>([]);
  const [step, setStep] = useState<"upload" | "preview" | "complete">("upload");
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".ics") || file.name.endsWith(".ical")) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Formato file non valido",
          description: "Seleziona un file .ics o .ical",
          variant: "destructive",
        });
      }
    }
  };

  const handlePreview = async () => {
    if (!selectedFile || !selectedApartment) {
      toast({
        title: "Dati mancanti",
        description: "Seleziona un file e un appartamento",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const fileContent = await ICalService.readFileAsText(selectedFile);
      const events = ICalService.parseICalFile(fileContent);
      const bookings = ICalService.convertEventsToBookings(
        events,
        selectedApartment
      );

      setPreviewBookings(bookings);
      setStep("preview");

      toast({
        title: "File elaborato",
        description: `Trovate ${bookings.length} prenotazioni`,
      });
    } catch (error) {
      console.error("Error processing iCal file:", error);
      toast({
        title: "Errore",
        description: "Errore nell'elaborazione del file iCal",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = () => {
    setIsProcessing(true);
    try {
      // Save bookings to local storage
      previewBookings.forEach((booking) => {
        localStorageService.addBooking(booking);
      });

      onImportComplete(previewBookings);
      setStep("complete");

      toast({
        title: "Importazione completata",
        description: `${previewBookings.length} prenotazioni importate con successo`,
      });
    } catch (error) {
      console.error("Error importing bookings:", error);
      toast({
        title: "Errore",
        description: "Errore nell'importazione delle prenotazioni",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setSelectedApartment("");
    setPreviewBookings([]);
    setStep("upload");
    onClose();
  };

  const renderUploadStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importa Calendario iCal
        </DialogTitle>
        <DialogDescription>
          Carica un file .ics o .ical per importare le prenotazioni
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="apartment">Appartamento di destinazione</Label>
          <Select
            value={selectedApartment}
            onValueChange={setSelectedApartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona appartamento" />
            </SelectTrigger>
            <SelectContent>
              {apartments.map((apartment) => (
                <SelectItem key={apartment.id} value={apartment.id}>
                  {apartment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="ical-file">File iCal</Label>
          <Input
            id="ical-file"
            type="file"
            accept=".ics,.ical"
            onChange={handleFileSelect}
            className="cursor-pointer"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>
          Annulla
        </Button>
        <Button
          onClick={handlePreview}
          disabled={!selectedFile || !selectedApartment || isProcessing}
        >
          {isProcessing ? "Elaborazione..." : "Anteprima"}
        </Button>
      </DialogFooter>
    </>
  );

  const renderPreviewStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Anteprima Prenotazioni
        </DialogTitle>
        <DialogDescription>
          Verifica le prenotazioni prima dell'importazione
        </DialogDescription>
      </DialogHeader>

      <div className="max-h-96 overflow-y-auto space-y-3">
        {previewBookings.map((booking, index) => (
          <div key={index} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{booking.Nome}</h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {booking.OTA}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                {booking.CheckIn} → {booking.CheckOut} ({booking.Notti} notti)
              </p>
              {booking.Note && <p className="mt-1 text-xs">{booking.Note}</p>}
            </div>
          </div>
        ))}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setStep("upload")}>
          Indietro
        </Button>
        <Button onClick={handleImport} disabled={isProcessing}>
          {isProcessing
            ? "Importazione..."
            : `Importa ${previewBookings.length} prenotazioni`}
        </Button>
      </DialogFooter>
    </>
  );

  const renderCompleteStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Importazione Completata
        </DialogTitle>
        <DialogDescription>
          Le prenotazioni sono state importate con successo
        </DialogDescription>
      </DialogHeader>

      <div className="text-center py-6">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <p className="text-lg font-semibold mb-2">
          {previewBookings.length} prenotazioni importate
        </p>
        <p className="text-muted-foreground">
          Le prenotazioni sono ora disponibili nel calendario
        </p>
      </div>

      <DialogFooter>
        <Button onClick={handleClose} className="w-full">
          Chiudi
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "upload" && renderUploadStep()}
        {step === "preview" && renderPreviewStep()}
        {step === "complete" && renderCompleteStep()}
      </DialogContent>
    </Dialog>
  );
};

export default ICalImporter;
