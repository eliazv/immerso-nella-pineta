import React, { useState, useEffect } from "react";
import { Booking, CalendarType } from "@/types/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateBooking, deleteBooking } from "@/services/pocketbaseService";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

// Funzione per calcolare la tassa di soggiorno
const calculateSoggiornoTax = (booking: Booking): string => {
  try {
    // Verifica dati necessari
    if (!booking.CheckIn || !booking.Notti) {
      return "0";
    }

    // Calcolo e validazione del periodo (maggio-settembre)
    const checkInValue = booking.CheckIn.trim();
    const parts = checkInValue.split("/");

    if (parts.length !== 3) {
      return "0";
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10); // Mese nel formato umano (1-12)
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return "0";
    }

    // Verifica se il mese è tra maggio (5) e settembre (9)
    if (month < 5 || month > 9) {
      return "0";
    } // Determina il numero di adulti con metodi più affidabili
    let numAdulti: number; // Metodo 1: Usa il valore adulti diretto se presente e valido
    if (
      booking.adulti &&
      booking.adulti.trim() !== "" &&
      booking.adulti !== "0"
    ) {
      numAdulti = parseInt(booking.adulti, 10);
    }
    // Metodo 2: Calcola gli adulti dalla differenza tra ospiti totali e bambini
    else if (booking.TotaleCliente) {
      // Assumiamo che TotaleCliente potrebbe contenere il numero totale di ospiti
      const totaleOspiti = parseInt(booking.TotaleCliente, 10);
      const bambini = parseInt(booking.bambini || "0", 10);

      if (!isNaN(totaleOspiti) && totaleOspiti > 0) {
        // Assumiamo che almeno un ospite sia adulto
        numAdulti = Math.max(1, totaleOspiti - bambini);
      } else {
        // Se non c'è un totale valido, usiamo 1 come valore minimo
        numAdulti = 2;
      }
    }
    // Metodo 3: Se non abbiamo altre informazioni, usiamo 1 adulto come minimo assoluto
    else {
      numAdulti = 1;
    } // Validazione finale del numero di adulti
    if (isNaN(numAdulti) || numAdulti <= 0) {
      numAdulti = 1; // Fallback a 1 adulto come valore minimo
    }

    // Calcola il numero di notti (massimo 7 per la tassa)
    const nights = parseInt(booking.Notti, 10);
    if (isNaN(nights) || nights <= 0) {
      return "0";
    }

    const taxableNights = Math.min(nights, 7);

    // Calcola la tassa: €1 per adulto per notte
    const tax = numAdulti * taxableNights;

    return tax.toString();
  } catch (error) {
    return "0";
  }
};

// Funzione helper per fare il parsing della data nel formato DD/MM/YYYY
const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  // Pulisce la stringa da eventuali spazi
  const cleanDateString = dateString.trim();

  // Verifica se la data è nel formato DD/MM/YYYY
  const parts = cleanDateString.split("/");
  if (parts.length !== 3) return null;

  // Converte in numeri e controlla la validità
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // I mesi in JavaScript vanno da 0 a 11
  const year = parseInt(parts[2], 10);

  // Verifica che i valori siano validi
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (day < 1 || day > 31 || month < 0 || month > 11 || year < 2000)
    return null;

  const date = new Date(year, month, day);

  // Verifica che la data sia valida
  if (isNaN(date.getTime())) return null;

  return date;
};

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
  calendarType: CalendarType;
  onUpdate: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onOpenChange,
  booking,
  calendarType,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Per gestire il form di modifica
  const form = useForm<Booking>({
    defaultValues: booking || {},
  }); // Aggiorna il form quando cambia la prenotazione
  useEffect(() => {
    if (booking) {
      Object.keys(booking).forEach((key) => {
        form.setValue(key as keyof Booking, booking[key as keyof Booking]);
      });

      // Se il campo adulti è vuoto o mancante, possiamo provare a dedurlo da altri campi
      if (!booking.adulti || booking.adulti.trim() === "") {
        // Verifica se possiamo determinare gli adulti in qualche modo
        if (
          booking.TotaleCliente &&
          !isNaN(parseInt(booking.TotaleCliente, 10))
        ) {
          // Se abbiamo un numero totale di ospiti, possiamo assumere che siano tutti adulti se mancano i bambini
          const totalOspiti = parseInt(booking.TotaleCliente, 10);
          const bambini = booking.bambini ? parseInt(booking.bambini, 10) : 0;

          if (!isNaN(totalOspiti) && totalOspiti > 0) {
            const adultiStimati = Math.max(1, totalOspiti - bambini);
            form.setValue("adulti", adultiStimati.toString());
          }
        } else {
          // Se non riusciamo a dedurlo, impostiamo un valore predefinito di 1 adulto
          form.setValue("adulti", "1");
        }
      }
    }
  }, [booking, form]);
  // Calcola automaticamente la tassa di soggiorno quando cambiano i dati rilevanti
  const watchedBookingValues = form.watch([
    "CheckIn",
    "CheckOut",
    "adulti",
    "Notti",
    "animali",
  ]);

  useEffect(() => {
    const formData = form.getValues();
    if (formData.CheckIn && formData.CheckOut && formData.Notti) {
      const soggiornoTax = calculateSoggiornoTax(formData);
      form.setValue("SoggiornoTax", soggiornoTax);
    }
  }, [watchedBookingValues, form]);

  // Gestisce la submission del form
  const onSubmit = async (formData: Booking) => {
    if (!booking) return;

    setIsLoading(true);
    try {
      const success = await updateBooking(formData, calendarType);
      if (success) {
        toast({
          title: "Prenotazione aggiornata",
          description: `La prenotazione per ${formData.Nome} è stata aggiornata con successo.`,
        });
        setIsEditing(false);
        onUpdate();
      } else {
        toast({
          title: "Errore",
          description:
            "Non è stato possibile aggiornare la prenotazione. Riprova più tardi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Errore",
        description:
          "Si è verificato un errore durante l'aggiornamento della prenotazione.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gestisce l'eliminazione della prenotazione
  const handleDelete = async () => {
    if (!booking) return;

    setIsLoading(true);
    try {
      const success = await deleteBooking(booking, calendarType);
      if (success) {
        toast({
          title: "Prenotazione cancellata",
          description: `La prenotazione per ${booking.Nome} è stata cancellata con successo.`,
        });
        onOpenChange(false);
        onUpdate();
      } else {
        toast({
          title: "Errore",
          description:
            "Non è stato possibile cancellare la prenotazione. Riprova più tardi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Errore",
        description:
          "Si è verificato un errore durante la cancellazione della prenotazione.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  // Funzione per cancellare le modifiche e tornare alla visualizzazione
  const cancelEditing = () => {
    setIsEditing(false);
    if (booking) {
      Object.keys(booking).forEach((key) => {
        form.setValue(key as keyof Booking, booking[key as keyof Booking]);
      });
    }
  };

  // Constante per riconoscere le piattaforme di prenotazione (OTA) disponibili
  const availableOTAs = ["Booking", "Airbnb", "Extra", "Agenzia", "Diretta"];

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">
            {isEditing ? "Modifica Prenotazione" : "Dettagli Prenotazione"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica i dettagli della prenotazione e salva per aggiornare."
              : `Prenotazione di ${booking.Nome} dal ${booking.CheckIn} al ${booking.CheckOut}`}
          </DialogDescription>
        </DialogHeader>

        {/* Vista di sola lettura */}
        {!isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Nome:</span>{" "}
                  {booking.Nome || "-"}
                </div>
                <div>
                  <span className="font-semibold">OTA:</span>{" "}
                  {booking.OTA || "-"}
                </div>
                <div>
                  <span className="font-semibold">Check-in:</span>{" "}
                  {booking.CheckIn || "-"}
                </div>
                <div>
                  <span className="font-semibold">Check-out:</span>{" "}
                  {booking.CheckOut || "-"}
                </div>
                <div>
                  <span className="font-semibold">Notti:</span>{" "}
                  {booking.Notti || "-"}
                </div>{" "}
                <div>
                  <span className="font-semibold">Ospiti:</span>{" "}
                  {parseInt(booking.adulti || "0") +
                    parseInt(booking.bambini || "0")}{" "}
                  {booking.adulti && `(Adulti: ${booking.adulti}`}
                  {booking.adulti && booking.bambini && "; "}
                  {booking.bambini && `Bambini: ${booking.bambini}`}
                  {(booking.adulti || booking.bambini) &&
                    booking.animali &&
                    "; "}
                  {booking.animali && `Animali: ${booking.animali}`}
                  {(booking.adulti || booking.bambini || booking.animali) &&
                    ")"}
                </div>
              </div>
              <div className="space-y-2">
                {" "}
                <div>
                  <span className="font-semibold">Totale Cliente:</span>{" "}
                  {booking.TotaleCliente || "-"}
                </div>
                {booking.FuoriOTA && (
                  <div>
                    <span className="font-semibold">Fuori OTA:</span>{" "}
                    {booking.FuoriOTA}
                  </div>
                )}
                {booking.CostoNotti && (
                  <div>
                    <span className="font-semibold">Costo Notti:</span>{" "}
                    {booking.CostoNotti}
                  </div>
                )}
                {booking.MediaANotte && (
                  <div>
                    <span className="font-semibold">Media a Notte:</span>{" "}
                    {booking.MediaANotte}
                  </div>
                )}
                {booking.Pulizia && (
                  <div>
                    <span className="font-semibold">Pulizia:</span>{" "}
                    {booking.Pulizia}
                  </div>
                )}
                {booking.Sconti && (
                  <div>
                    <span className="font-semibold">Sconti:</span>{" "}
                    {booking.Sconti}
                  </div>
                )}{" "}
              </div>{" "}
              <div className="space-y-2">
                {(booking.SoggiornoTax ||
                  calculateSoggiornoTax(booking) !== "0") && (
                  <div>
                    <span className="font-semibold">Tassa di Soggiorno:</span>
                    {booking.SoggiornoTax || "0"}
                    <span className="text-sm text-muted-foreground ml-1">
                      (calc: €{calculateSoggiornoTax(booking)}{" "}
                      {(!booking.adulti ||
                        booking.adulti.trim() === "" ||
                        booking.adulti === "0") &&
                        "- default adulti"}
                      )
                    </span>
                  </div>
                )}
                {booking.OTATax && (
                  <div>
                    <span className="font-semibold">OTA Tax:</span>{" "}
                    {booking.OTATax}
                  </div>
                )}
                {booking.CedolareSecca && (
                  <div>
                    <span className="font-semibold">Cedolare Secca (21%):</span>{" "}
                    {booking.CedolareSecca}
                  </div>
                )}
                {booking.Totale && (
                  <div>
                    <span className="font-semibold">Totale:</span>{" "}
                    {booking.Totale}
                  </div>
                )}
                {booking.Note && (
                  <div>
                    <span className="font-semibold">Note:</span> {booking.Note}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <div className="flex justify-end w-full">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Chiudi
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          // Form di modifica
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="Nome">Nome</Label>
                  <Input id="Nome" {...form.register("Nome")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="OTA">Piattaforma (OTA)</Label>
                  <Select
                    defaultValue={booking.OTA}
                    onValueChange={(value) => form.setValue("OTA", value)}
                  >
                    <SelectTrigger className="min-w-[120px] w-full text-left">
                      <SelectValue placeholder="Seleziona OTA" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[120px]">
                      {availableOTAs.map((ota) => (
                        <SelectItem key={ota} value={ota}>
                          {ota}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="CheckIn">Check-in (DD/MM/YYYY)</Label>
                  <Input id="CheckIn" {...form.register("CheckIn")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="CheckOut">Check-out (DD/MM/YYYY)</Label>
                  <Input id="CheckOut" {...form.register("CheckOut")} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="Notti">Notti</Label>
                  <Input id="Notti" {...form.register("Notti")} />
                </div>{" "}
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="adulti">Adulti</Label>
                    <Input id="adulti" {...form.register("adulti")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bambini">Bambini</Label>
                    <Input id="bambini" {...form.register("bambini")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="animali">Animali</Label>
                    <Input id="animali" {...form.register("animali")} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="TotaleCliente">Totale Cliente</Label>
                  <Input
                    id="TotaleCliente"
                    {...form.register("TotaleCliente")}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="FuoriOTA">Fuori OTA</Label>
                  <Input id="FuoriOTA" {...form.register("FuoriOTA")} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="CostoNotti">Costo Notti</Label>
                  <Input id="CostoNotti" {...form.register("CostoNotti")} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="MediaANotte">Media a Notte</Label>
                  <Input id="MediaANotte" {...form.register("MediaANotte")} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="Pulizia">Pulizia</Label>
                  <Input id="Pulizia" {...form.register("Pulizia")} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="Sconti">Sconti</Label>
                  <Input id="Sconti" {...form.register("Sconti")} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
              {" "}
              <div className="space-y-1">
                <Label htmlFor="SoggiornoTax">
                  Tassa di Soggiorno (calcolata automaticamente)
                </Label>
                <Input
                  id="SoggiornoTax"
                  {...form.register("SoggiornoTax")}
                  disabled
                  className="bg-muted/50"
                />{" "}
                <p className="text-xs text-muted-foreground">
                  €1 per adulto per notte, applicabile da maggio a settembre,
                  max 7 notti
                  {(!form.getValues("adulti") ||
                    form.getValues("adulti").trim() === "" ||
                    form.getValues("adulti") === "0") &&
                    " (default adulti)"}
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="OTATax">OTA Tax</Label>
                <Input id="OTATax" {...form.register("OTATax")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="CedolareSecca">Cedolare Secca (21%)</Label>
                <Input id="CedolareSecca" {...form.register("CedolareSecca")} />
              </div>
            </div>

            <div className="py-2">
              <div className="space-y-1">
                <Label htmlFor="Totale">Totale</Label>
                <Input id="Totale" {...form.register("Totale")} />
              </div>
            </div>

            <div className="py-2">
              <div className="space-y-1">
                <Label htmlFor="Note">Note</Label>
                <Textarea
                  id="Note"
                  {...form.register("Note")}
                  placeholder="Note opzionali sulla prenotazione"
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-end w-full mt-4">
                <Button type="button" variant="outline" onClick={cancelEditing}>
                  Annulla
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salva Modifiche"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
