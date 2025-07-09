import React, { useState, useEffect } from "react";
import { User, BadgeEuro } from "lucide-react";
import { Booking, CalendarType } from "@/types/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { updateBooking, deleteBooking } from "@/services/localBookingService";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

// Funzione per calcolare la tassa di soggiorno
const calculateSoggiornoTax = (booking: Booking): string => {
  try {
    // Se non c'è il campo adulti esplicitamente compilato, non calcoliamo la tassa
    if (
      !booking.adulti ||
      booking.adulti.trim() === "" ||
      booking.adulti === "0"
    ) {
      return "";
    }

    // Verifica dati necessari
    if (!booking.CheckIn || !booking.Notti) {
      return "";
    }

    // Calcolo e validazione del periodo (maggio-settembre)
    const checkInValue = booking.CheckIn.trim();
    const parts = checkInValue.split("/");

    if (parts.length !== 3) {
      return "";
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10); // Mese nel formato umano (1-12)
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return "";
    }

    // Verifica se il mese è tra maggio (5) e settembre (9)
    if (month < 5 || month > 9) {
      return "";
    }

    // Utilizza solo il valore degli adulti esplicitamente specificato
    const numAdulti = parseInt(booking.adulti, 10);

    // Validazione finale del numero di adulti
    if (isNaN(numAdulti) || numAdulti <= 0) {
      return "";
    }

    // Calcola il numero di notti (massimo 7 per la tassa)
    const nights = parseInt(booking.Notti, 10);
    if (isNaN(nights) || nights <= 0) {
      return "";
    }

    const taxableNights = Math.min(nights, 7);

    // Calcola la tassa: €1 per adulto per notte
    const tax = numAdulti * taxableNights;

    return tax.toString();
  } catch (error) {
    return "";
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

      // Non impostiamo più valori predefiniti per gli adulti se non sono specificati
      // Questo impedisce di avere valori casuali quando non ci sono dati
    }
  }, [booking, form]);
  // Calcola automaticamente la tassa di soggiorno quando cambiano i dati rilevanti
  const watchedBookingValues = form.watch([
    "CheckIn",
    "CheckOut",
    "adulti",
    "Notti",
  ]);

  useEffect(() => {
    const formData = form.getValues();
    // Calcola la tassa di soggiorno solo se ci sono adulti specificati
    if (
      formData.adulti &&
      formData.adulti.trim() !== "" &&
      formData.adulti !== "0" &&
      formData.CheckIn &&
      formData.Notti
    ) {
      const soggiornoTax = calculateSoggiornoTax(formData);
      form.setValue("SoggiornoTax", soggiornoTax);
    } else {
      // Se manca il numero di adulti, imposta vuoto il campo della tassa
      form.setValue("SoggiornoTax", "");
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
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white border-slate-200 px-2 sm:px-6 py-0">
        <div
          className="sticky z-30 bg-white border-b flex items-center justify-between"
          style={{ minHeight: "56px", top: "env(safe-area-inset-top, 0px)" }}
        >
          <div>
            <DialogTitle className="text-lg sm:text-xl font-serif text-slate-800">
              {isEditing
                ? "Modifica Prenotazione"
                : "Prenotazione di " + booking.Nome}
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              {isEditing
                ? "Modifica i dettagli della prenotazione e salva per aggiornare."
                : ` `}
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Chiudi"
            className="ml-2 rounded-full p-2 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ lineHeight: 0 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-500 hover:text-red-600 transition-colors"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Vista di sola lettura */}
        {!isEditing ? (
          <>
            <div className="flex flex-col gap-4 py-2">
              {/* Dati generali */}
              <div className="bg-slate-50 p-3 rounded-md shadow-sm">
                <div className="font-semibold text-base text-slate-600 uppercase tracking-wider border-b pb-1 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-500 mr-1" />
                  Dati generali
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-base">
                  <span className="font-semibold">Nome:</span>
                  <span className="text-slate-800">{booking.Nome || "-"}</span>
                  <span className="font-semibold">OTA:</span>
                  <span
                    className={`inline-block max-w-[90px] sm:max-w-[120px] px-2 py-0.5 rounded text-white text-base break-words whitespace-pre-line text-center align-middle ${
                      booking.OTA?.toLowerCase().includes("booking")
                        ? "bg-blue-600"
                        : booking.OTA?.toLowerCase().includes("airbnb")
                        ? "bg-red-600"
                        : booking.OTA?.toLowerCase().includes("extra")
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                    style={{ wordBreak: "break-word", lineHeight: "1.1" }}
                  >
                    {booking.OTA || "-"}
                  </span>
                  <span className="font-semibold">Check-in:</span>
                  <span className="text-slate-800">
                    {booking.CheckIn || "-"}
                  </span>
                  <span className="font-semibold">Check-out:</span>
                  <span className="text-slate-800">
                    {booking.CheckOut || "-"}
                  </span>
                  <span className="font-semibold">Notti:</span>
                  <span className="text-slate-800">{booking.Notti || "-"}</span>
                  <span className="font-semibold">Ospiti:</span>
                  <span className="flex flex-wrap gap-2 items-center">
                    {booking.adulti && booking.adulti !== "0" && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-base">
                        {booking.adulti} adulti
                      </span>
                    )}
                    {booking.bambini && booking.bambini !== "0" && (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-base">
                        {booking.bambini} bambini
                      </span>
                    )}
                    {booking.animali && booking.animali !== "0" && (
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-base">
                        {booking.animali} animali
                      </span>
                    )}
                    {(!booking.adulti || booking.adulti === "0") &&
                      (!booking.bambini || booking.bambini === "0") &&
                      (!booking.animali || booking.animali === "0") &&
                      "-"}
                  </span>
                </div>
                {booking.Note && (
                  <div className="mt-2 pt-2 border-t">
                    <span className="font-semibold mb-1">! Note: </span>
                    {booking.Note}
                  </div>
                )}
              </div>
              {/* Importi, tasse e totale unificati */}
              <div className="bg-slate-50 p-3 rounded-md shadow-sm">
                <div className="font-semibold text-base text-slate-600 uppercase tracking-wider border-b pb-1 mb-2 flex items-center gap-2">
                  <BadgeEuro className="w-5 h-5 mr-1" />
                  Dettagli Importi
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-base">
                  {/* Mostra solo i campi compilati */}
                  {booking.TotalePagatoOspite &&
                    booking.TotalePagatoOspite.trim() !== "" && (
                      <>
                        <span className="font-semibold">
                          Totale Pagato dall'Ospite:
                        </span>
                        <span className="text-slate-800 font-mono font-bold">
                          €{booking.TotalePagatoOspite}
                        </span>
                      </>
                    )}

                  {booking.CostoPulizia &&
                    booking.CostoPulizia.trim() !== "" && (
                      <>
                        <span className="font-semibold">Costo Pulizia:</span>
                        <span className="text-slate-800 font-mono">
                          €{booking.CostoPulizia}
                        </span>
                      </>
                    )}

                  {booking.ScontiApplicati &&
                    booking.ScontiApplicati.trim() !== "" && (
                      <>
                        <span className="font-semibold">Sconti Applicati:</span>
                        <span className="text-slate-800 font-mono">
                          €{booking.ScontiApplicati}
                        </span>
                      </>
                    )}

                  {booking.Supplementi && booking.Supplementi.trim() !== "" && (
                    <>
                      <span className="font-semibold">Supplementi:</span>
                      <span className="text-slate-800 font-mono">
                        €{booking.Supplementi}
                      </span>
                    </>
                  )}

                  {booking.CommissioneOTA &&
                    booking.CommissioneOTA.trim() !== "" && (
                      <>
                        <span className="font-semibold">Commissione OTA:</span>
                        <span className="text-slate-800 font-mono">
                          €{booking.CommissioneOTA}
                        </span>
                      </>
                    )}

                  {booking.TassaSoggiorno &&
                    booking.TassaSoggiorno.trim() !== "" && (
                      <>
                        <span className="font-semibold">
                          Tassa di Soggiorno:
                        </span>
                        <span className="text-slate-800 font-mono">
                          €{booking.TassaSoggiorno}
                        </span>
                      </>
                    )}

                  {booking.CedolareSecca &&
                    booking.CedolareSecca.trim() !== "" && (
                      <>
                        <span className="font-semibold">Cedolare Secca:</span>
                        <span className="text-slate-800 font-mono">
                          €{booking.CedolareSecca}
                        </span>
                      </>
                    )}

                  {/* Totale Netto sempre visibile se presente */}
                  {booking.TotaleNetto && booking.TotaleNetto.trim() !== "" && (
                    <>
                      <span className="font-semibold text-lg text-primary">
                        Totale Netto:
                      </span>
                      <span className="text-primary font-mono font-bold text-lg">
                        €{booking.TotaleNetto}
                      </span>
                    </>
                  )}

                  {/* Fallback ai campi legacy se non ci sono nuovi campi */}
                  {(!booking.TotaleNetto ||
                    booking.TotaleNetto.trim() === "") &&
                    booking.Totale &&
                    booking.Totale.trim() !== "" && (
                      <>
                        <span className="font-semibold text-lg text-primary">
                          Totale:
                        </span>
                        <span className="text-primary font-mono font-bold text-lg">
                          {booking.Totale.includes("€")
                            ? booking.Totale
                            : `€${booking.Totale}`}
                        </span>
                      </>
                    )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-between w-full mt-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="bg-white hover:bg-slate-100"
                  >
                    Modifica
                  </Button>
                  <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Elimina
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Conferma eliminazione
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Sei sicuro di voler eliminare questa prenotazione?
                          L'operazione non può essere annullata.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annulla</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isLoading}
                        >
                          {isLoading ? "Eliminando..." : "Elimina"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-white hover:bg-slate-100"
                >
                  Chiudi
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          // Form di modifica
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4 bg-slate-50/70 p-4 rounded-md">
                <div className="font-medium text-sm text-slate-500 uppercase tracking-wider mb-3">
                  Dati generali
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="Nome">Nome</Label>
                    <Input
                      id="Nome"
                      {...form.register("Nome")}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="OTA">Piattaforma (OTA)</Label>
                    <Select
                      defaultValue={booking.OTA}
                      onValueChange={(value) => form.setValue("OTA", value)}
                    >
                      <SelectTrigger className="min-w-[120px] w-full text-left bg-white">
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
                    <Input
                      id="CheckIn"
                      {...form.register("CheckIn")}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="CheckOut">Check-out (DD/MM/YYYY)</Label>
                    <Input
                      id="CheckOut"
                      {...form.register("CheckOut")}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="Notti">Notti</Label>
                    <Input
                      id="Notti"
                      {...form.register("Notti")}
                      className="bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="adulti">Adulti</Label>
                      <Input
                        id="adulti"
                        {...form.register("adulti")}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="bambini">Bambini</Label>
                      <Input
                        id="bambini"
                        {...form.register("bambini")}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="animali">Animali</Label>
                      <Input
                        id="animali"
                        {...form.register("animali")}
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50/70 p-4 rounded-md">
                <div className="font-medium text-sm text-slate-500 uppercase tracking-wider mb-3">
                  Dettagli Importi
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="TotalePagatoOspite">
                      Totale Pagato dall'Ospite (€)
                    </Label>
                    <Input
                      id="TotalePagatoOspite"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("TotalePagatoOspite")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="CostoPulizia">Costo Pulizia (€)</Label>
                    <Input
                      id="CostoPulizia"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("CostoPulizia")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="ScontiApplicati">
                      Sconti Applicati (€)
                    </Label>
                    <Input
                      id="ScontiApplicati"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("ScontiApplicati")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="Supplementi">Supplementi (€)</Label>
                    <Input
                      id="Supplementi"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("Supplementi")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="CommissioneOTA">Commissione OTA (€)</Label>
                    <Input
                      id="CommissioneOTA"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("CommissioneOTA")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="TassaSoggiorno">
                      Tassa di Soggiorno (€)
                    </Label>
                    <Input
                      id="TassaSoggiorno"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("TassaSoggiorno")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="CedolareSecca">Cedolare Secca (€)</Label>
                    <Input
                      id="CedolareSecca"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("CedolareSecca")}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="TotaleNetto" className="font-semibold">
                      Totale Netto (€) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="TotaleNetto"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...form.register("TotaleNetto")}
                      className="bg-white font-semibold"
                    />
                    <p className="text-xs text-muted-foreground">
                      Questo importo apparirà nella lista prenotazioni
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="Note">Note</Label>
                <Textarea
                  id="Note"
                  {...form.register("Note")}
                  placeholder="Note opzionali sulla prenotazione"
                  className="bg-white min-h-[80px]"
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 justify-end w-full mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelEditing}
                  className="bg-white hover:bg-slate-100"
                >
                  Annulla
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
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
