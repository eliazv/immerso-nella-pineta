import React, { useState } from 'react';
import { Upload, Link, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalendarType } from '@/types/calendar';
import { ICalImportService, ICalEvent } from '@/services/icalImportService';
import { addBooking } from '@/services/newBookingService';
import { toast } from '@/components/ui/use-toast';
import { AccommodationService } from '@/services/accommodationService';

interface ICalImportModalProps {
  calendarType: CalendarType;
  onImportComplete: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ICalImportModal: React.FC<ICalImportModalProps> = ({
  calendarType,
  onImportComplete,
  open,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use external control if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [selectedApartment, setSelectedApartment] = useState<CalendarType>(
    calendarType !== 'all' ? calendarType : ''
  );
  const [defaultOTA, setDefaultOTA] = useState('Imported');
  const [previewEvents, setPreviewEvents] = useState<ICalEvent[]>([]);
  const [validationError, setValidationError] = useState<string>('');

  const accommodations = AccommodationService.getActiveAccommodations();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.ics')) {
      setValidationError('Per favore seleziona un file .ics valido');
      return;
    }

    try {
      const content = await file.text();
      setFileContent(content);
      handlePreview(content);
    } catch (error) {
      setValidationError('Errore durante la lettura del file');
    }
  };

  const handleUrlImport = async () => {
    if (!importUrl.trim()) {
      setValidationError('Per favore inserisci un URL valido');
      return;
    }

    setIsLoading(true);
    try {
      // For demonstration - in a real app, you'd need a proxy or backend
      setValidationError('L\'importazione da URL richiede un proxy server. Per ora, scarica il file .ics e caricalo manualmente.');
    } catch (error) {
      setValidationError('Errore durante il download del calendario dall\'URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextImport = (content: string) => {
    setFileContent(content);
    handlePreview(content);
  };

  const handlePreview = (content: string) => {
    try {
      setValidationError('');
      
      const validation = ICalImportService.validateICalData(content);
      if (!validation.isValid) {
        setValidationError(validation.error || 'Dati iCal non validi');
        setPreviewEvents([]);
        return;
      }

      const events = ICalImportService.parseICalData(content);
      setPreviewEvents(events);
      
      if (events.length === 0) {
        setValidationError('Nessun evento trovato nel calendario');
      }
    } catch (error) {
      setValidationError('Errore durante l\'analisi dei dati iCal');
      setPreviewEvents([]);
    }
  };

  const handleImport = async () => {
    if (!selectedApartment) {
      setValidationError('Per favore seleziona un appartamento');
      return;
    }

    if (previewEvents.length === 0) {
      setValidationError('Nessun evento da importare');
      return;
    }

    setIsLoading(true);
    try {
      const bookings = ICalImportService.convertICalEventsToBookings(
        previewEvents,
        selectedApartment,
        defaultOTA
      );

      let successCount = 0;
      let errorCount = 0;

      for (const booking of bookings) {
        try {
          await addBooking(booking, selectedApartment);
          successCount++;
        } catch (error) {
          errorCount++;
          console.error('Error importing booking:', error);
        }
      }

      toast({
        title: 'Importazione completata',
        description: `${successCount} prenotazioni importate con successo${errorCount > 0 ? `, ${errorCount} errori` : ''}.`,
      });

      onImportComplete();
      resetModal();
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Errore durante l\'importazione delle prenotazioni.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setIsOpen(false);
    setImportUrl('');
    setFileContent('');
    setPreviewEvents([]);
    setValidationError('');
    setSelectedApartment(calendarType !== 'all' ? calendarType : '');
    setDefaultOTA('Imported');
  };

  const formatDate = (icalDate: string) => {
    return ICalImportService.convertICalDateToBookingFormat(icalDate);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Importa iCal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importa Calendario iCal</DialogTitle>
          <DialogDescription>
            Importa prenotazioni da un file iCal (.ics) o da un URL di calendario.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Apartment Selection */}
          <div className="space-y-2">
            <Label htmlFor="apartment">Appartamento di destinazione *</Label>
            <Select value={selectedApartment} onValueChange={setSelectedApartment}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona appartamento" />
              </SelectTrigger>
              <SelectContent>
                {accommodations.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Default OTA */}
          <div className="space-y-2">
            <Label htmlFor="defaultOTA">OTA predefinita</Label>
            <Select value={defaultOTA} onValueChange={setDefaultOTA}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Imported">Imported</SelectItem>
                <SelectItem value="Booking">Booking</SelectItem>
                <SelectItem value="Airbnb">Airbnb</SelectItem>
                <SelectItem value="VRBO">VRBO</SelectItem>
                <SelectItem value="Expedia">Expedia</SelectItem>
                <SelectItem value="Diretta">Diretta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Import Methods */}
          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="file">File Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="text">Testo</TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Carica file .ics</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".ics,.ical"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Seleziona un file calendario iCal (.ics) dal tuo computer.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL del calendario</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    type="url"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://calendar.google.com/calendar/ical/..."
                  />
                  <Button 
                    onClick={handleUrlImport} 
                    disabled={isLoading}
                    variant="outline"
                  >
                    <Link className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Inserisci l'URL pubblico del calendario iCal.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Dati iCal</Label>
                <Textarea
                  id="text"
                  value={fileContent}
                  onChange={(e) => handleTextImport(e.target.value)}
                  placeholder="Incolla qui i dati iCal..."
                  rows={8}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Incolla direttamente il contenuto di un file iCal.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Validation Error */}
          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {/* Preview */}
          {previewEvents.length > 0 && (
            <div className="space-y-2">
              <Label>Anteprima Eventi ({previewEvents.length})</Label>
              <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                {previewEvents.slice(0, 10).map((event, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 bg-muted rounded">
                    <div>
                      <div className="font-medium">{event.summary}</div>
                      <div className="text-muted-foreground">
                        {formatDate(event.dtstart)} - {formatDate(event.dtend)}
                      </div>
                    </div>
                  </div>
                ))}
                {previewEvents.length > 10 && (
                  <div className="text-center text-muted-foreground text-xs">
                    ... e altri {previewEvents.length - 10} eventi
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success indicator */}
          {previewEvents.length > 0 && !validationError && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                {previewEvents.length} eventi pronti per l'importazione.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetModal}>
            Annulla
          </Button>
          <Button
            onClick={handleImport}
            disabled={isLoading || previewEvents.length === 0 || !selectedApartment}
          >
            {isLoading && <Upload className="w-4 h-4 mr-2 animate-spin" />}
            Importa {previewEvents.length > 0 ? `(${previewEvents.length})` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};