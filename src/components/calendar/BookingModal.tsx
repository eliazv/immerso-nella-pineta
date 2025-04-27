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
import { updateBooking, deleteBooking } from "@/services/bookingService";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

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
  });

  // Aggiorna il form quando cambia la prenotazione
  useEffect(() => {
    if (booking) {
      Object.keys(booking).forEach((key) => {
        form.setValue(key as keyof Booking, booking[key as keyof Booking]);
      });
    }
  }, [booking, form]);

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
      console.error("Errore durante l'aggiornamento:", error);
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
      console.error("Errore durante la cancellazione:", error);
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
                  <span className="font-semibold">Nome:</span> {booking.Nome}
                </div>
                <div>
                  <span className="font-semibold">OTA:</span> {booking.OTA}
                </div>
                <div>
                  <span className="font-semibold">Check-in:</span>{" "}
                  {booking.CheckIn}
                </div>
                <div>
                  <span className="font-semibold">Check-out:</span>{" "}
                  {booking.CheckOut}
                </div>
                <div>
                  <span className="font-semibold">Notti:</span> {booking.Notti}
                </div>
                <div>
                  <span className="font-semibold">Ospiti:</span>{" "}
                  {parseInt(booking.adulti || "0") +
                    parseInt(booking.bambini || "0")}
                  (Adulti: {booking.adulti || "0"}; Bambini:{" "}
                  {booking.bambini || "0"})
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Totale Cliente:</span>{" "}
                  {booking.TotaleCliente || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Fuori OTA:</span>{" "}
                  {booking.FuoriOTA || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Costo Notti:</span>{" "}
                  {booking.CostoNotti || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Media a Notte:</span>{" "}
                  {booking.MediaANotte || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Pulizia:</span>{" "}
                  {booking.Pulizia || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Sconti:</span>{" "}
                  {booking.Sconti || "N/A"}
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Soggiorno Tax:</span>{" "}
                  {booking.SoggiornoTax || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">OTA Tax:</span>{" "}
                  {booking.OTATax || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Cedolare Secca (21%):</span>{" "}
                  {booking.CedolareSecca || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Totale:</span>{" "}
                  {booking.Totale || "N/A"}
                </div>
                {booking.Note && (
                  <div className="col-span-3">
                    <span className="font-semibold">Note:</span> {booking.Note}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-end w-full">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Chiudi
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  disabled={true} // Disabilitato temporaneamente
                  title="Funzionalità temporaneamente non disponibile"
                >
                  Modifica
                </Button>
                <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={true} // Disabilitato temporaneamente
                      title="Funzionalità temporaneamente non disponibile"
                    >
                      Elimina
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Stai per eliminare la prenotazione di {booking.Nome} dal{" "}
                        {booking.CheckIn} al {booking.CheckOut}. Questa
                        operazione non può essere annullata.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annulla</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Eliminando..." : "Elimina"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="adulti">Adulti</Label>
                    <Input id="adulti" {...form.register("adulti")} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bambini">Bambini</Label>
                    <Input id="bambini" {...form.register("bambini")} />
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
              <div className="space-y-1">
                <Label htmlFor="SoggiornoTax">Soggiorno Tax</Label>
                <Input id="SoggiornoTax" {...form.register("SoggiornoTax")} />
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
