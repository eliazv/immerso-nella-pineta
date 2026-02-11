import React, { useState, useEffect } from "react";
import { User, Coins, BadgeEuro, X } from "lucide-react";
import { Booking, CalendarType } from "@/types/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
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
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateBooking, deleteBooking } from "@/services/bookingService";
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
  const isMobile = useIsMobile();

  if (!booking) return null;

  const title = isEditing
    ? "Modifica Prenotazione"
    : "Prenotazione di " + booking.Nome;

  const description = isEditing
    ? "Modifica i dettagli della prenotazione e salva per aggiornare."
    : "";

  const renderHeader = () => (
    <div
      className={`border-b flex items-center justify-between ${
        isMobile ? "pt-2 pb-4" : "min-height-[56px] pt-2 pb-4"
      }`}
    >
      <div>
        {isMobile ? (
          <SheetTitle className="text-xl font-black text-slate-800 dark:text-white">
            {title}
          </SheetTitle>
        ) : (
          <DialogTitle className="text-xl font-black text-slate-800 dark:text-white">
            {title}
          </DialogTitle>
        )}
        {description && (
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        )}
      </div>
    </div>
  );

  const viewContent = (
    <>
      <div className="flex flex-col gap-4 py-2">
        {/* Dati generali */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="font-black text-xs text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            Dati generali
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <span className="text-slate-500 font-bold">Nome:</span>
            <span className="text-slate-800 dark:text-slate-200 font-bold">
              {booking.Nome || "-"}
            </span>

            <span className="text-slate-500 font-bold">OTA:</span>
            <div>
              <span
                className={`inline-block px-2 py-0.5 rounded-lg text-white text-xs font-black uppercase tracking-tight ${
                  booking.OTA?.toLowerCase().includes("booking")
                    ? "bg-blue-600"
                    : booking.OTA?.toLowerCase().includes("airbnb")
                      ? "bg-red-600"
                      : booking.OTA?.toLowerCase().includes("extra")
                        ? "bg-emerald-600"
                        : "bg-slate-600"
                }`}
              >
                {booking.OTA || "-"}
              </span>
            </div>

            <span className="text-slate-500 font-bold">Check-in:</span>
            <span className="text-slate-800 dark:text-slate-200">
              {booking.CheckIn || "-"}
            </span>

            <span className="text-slate-500 font-bold">Check-out:</span>
            <span className="text-slate-800 dark:text-slate-200">
              {booking.CheckOut || "-"}
            </span>

            <span className="text-slate-500 font-bold">Notti:</span>
            <span className="text-slate-800 dark:text-slate-200 font-black">
              {booking.Notti || "-"}
            </span>

            <span className="text-slate-500 font-bold">Ospiti:</span>
            <div className="flex flex-wrap gap-1.5 items-center">
              {booking.adulti && booking.adulti !== "0" && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-bold">
                  {booking.adulti} adulti
                </span>
              )}
              {booking.bambini && booking.bambini !== "0" && (
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded text-xs font-bold">
                  {booking.bambini} bambini
                </span>
              )}
              {booking.animali && booking.animali !== "0" && (
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-bold">
                  {booking.animali} animali
                </span>
              )}
            </div>
          </div>
          {booking.Note && (
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 italic text-slate-500 text-xs">
              <span className="font-bold not-italic text-slate-400 mr-1 uppercase tracking-tighter">
                Note:
              </span>
              {booking.Note}
            </div>
          )}
        </div>

        {/* Importi e Tasse */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="font-black text-xs text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 flex items-center gap-2">
            <BadgeEuro className="w-4 h-4" />
            Importi e Tasse
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {/* Funzione helper interna per il rendering condizionale degli importi */}
            {(() => {
              const renderEconomicalRow = (
                label: string,
                value: any,
                className = "text-slate-800 dark:text-slate-200 font-bold",
              ) => {
                // Se il valore è "-", vuoto, nullo o palesemente zero, non mostriamo la riga
                if (
                  !value ||
                  value === "-" ||
                  value === "0" ||
                  value === "€0" ||
                  value === "0€" ||
                  (typeof value === "string" && value.trim() === "")
                ) {
                  return null;
                }

                let displayValue = value.toString().trim();
                // Evita duplicazione del simbolo €
                if (
                  !displayValue.includes("€") &&
                  !displayValue.includes("%")
                ) {
                  displayValue = `€${displayValue}`;
                }

                return (
                  <React.Fragment key={label}>
                    <span className="text-slate-500 font-bold">{label}:</span>
                    <span className={className}>{displayValue}</span>
                  </React.Fragment>
                );
              };

              return (
                <>
                  {renderEconomicalRow(
                    "Totale Cliente",
                    booking.TotaleCliente,
                    "text-slate-800 dark:text-slate-200 font-black",
                  )}
                  {renderEconomicalRow("Fuori OTA", booking.FuoriOTA)}
                  {renderEconomicalRow("Costo Notti", booking.CostoNotti)}
                  {renderEconomicalRow("Media a Notte", booking.MediaANotte)}
                  {renderEconomicalRow("Pulizia", booking.Pulizia)}
                  {renderEconomicalRow(
                    "Sconti",
                    booking.Sconti,
                    "text-red-600 font-bold",
                  )}
                  {renderEconomicalRow(
                    "Tassa Soggiorno",
                    booking.SoggiornoTax && booking.SoggiornoTax.trim() !== ""
                      ? booking.SoggiornoTax
                      : calculateSoggiornoTax(booking),
                  )}
                  {renderEconomicalRow("OTA Tax", booking.OTATax)}
                  {renderEconomicalRow(
                    "Cedolare Secca (21%)",
                    booking.CedolareSecca,
                  )}

                  {/* Totale Netto è sempre mostrato se presente, altrimenti - */}
                  <span className="text-slate-500 font-bold border-t border-slate-200 dark:border-slate-700 pt-2 mt-1">
                    Totale Netto:
                  </span>
                  <span className="text-primary font-black text-lg border-t border-slate-200 dark:border-slate-700 pt-2 mt-1">
                    {booking.Total && booking.Total !== "0"
                      ? booking.Total.includes("€")
                        ? booking.Total
                        : `€${booking.Total}`
                      : booking.Totale && booking.Totale !== "0"
                        ? booking.Totale.includes("€")
                          ? booking.Totale
                          : `€${booking.Totale}`
                        : "-"}
                  </span>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end w-full mt-6 mb-2">
        <Button
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="rounded-xl font-bold"
        >
          Modifica
        </Button>
        <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
          <div className="inline-block">
            <Button
              variant="destructive"
              onClick={() => setIsDeleting(true)}
              className="rounded-xl font-bold"
            >
              Elimina
            </Button>
          </div>
          <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-black">
                Conferma eliminazione
              </AlertDialogTitle>
              <AlertDialogDescription>
                Sei sicuro di voler eliminare questa prenotazione? L'operazione
                non può essere annullata.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">
                Annulla
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 rounded-xl font-bold"
              >
                {isLoading ? "Eliminando..." : "Elimina"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );

  const editContent = (
    <form onSubmit={form.handleSubmit(onSubmit)} className="pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="font-black text-xs text-slate-400 uppercase tracking-widest mb-3">
            Dati generali
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="Nome"
                className="text-xs font-bold text-slate-500"
              >
                Nome
              </Label>
              <Input
                id="Nome"
                {...form.register("Nome")}
                className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="OTA" className="text-xs font-bold text-slate-500">
                Piattaforma (OTA)
              </Label>
              <Select
                defaultValue={booking.OTA}
                onValueChange={(value) => form.setValue("OTA", value)}
              >
                <SelectTrigger className="w-full bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 font-bold">
                  <SelectValue placeholder="Seleziona OTA" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-none shadow-xl">
                  {availableOTAs.map((ota) => (
                    <SelectItem key={ota} value={ota}>
                      {ota}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="CheckIn"
                  className="text-xs font-bold text-slate-500"
                >
                  Check-in
                </Label>
                <Input
                  id="CheckIn"
                  {...form.register("CheckIn")}
                  placeholder="DD/MM/YYYY"
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="CheckOut"
                  className="text-xs font-bold text-slate-500"
                >
                  Check-out
                </Label>
                <Input
                  id="CheckOut"
                  {...form.register("CheckOut")}
                  placeholder="DD/MM/YYYY"
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="space-y-1.5 col-span-1">
                <Label
                  htmlFor="Notti"
                  className="text-xs font-bold text-slate-500"
                >
                  Notti
                </Label>
                <Input
                  id="Notti"
                  {...form.register("Notti")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-center font-bold"
                />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label
                  htmlFor="adulti"
                  className="text-xs font-bold text-slate-500"
                >
                  Adulti
                </Label>
                <Input
                  id="adulti"
                  {...form.register("adulti")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-center"
                />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label
                  htmlFor="bambini"
                  className="text-xs font-bold text-slate-500"
                >
                  Bimbi
                </Label>
                <Input
                  id="bambini"
                  {...form.register("bambini")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-center"
                />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label
                  htmlFor="animali"
                  className="text-xs font-bold text-slate-500"
                >
                  Pet
                </Label>
                <Input
                  id="animali"
                  {...form.register("animali")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="font-black text-xs text-slate-400 uppercase tracking-widest mb-3">
            Dati economici
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="TotaleCliente"
                  className="text-xs font-bold text-slate-500"
                >
                  Tot. Cliente
                </Label>
                <Input
                  id="TotaleCliente"
                  {...form.register("TotaleCliente")}
                  placeholder="€"
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="Totale"
                  className="text-xs font-black text-primary"
                >
                  TOT. NETTO
                </Label>
                <Input
                  id="Totale"
                  {...form.register("Totale")}
                  placeholder="€"
                  className="bg-white dark:bg-slate-800 rounded-lg border-primary/20 dark:border-primary/40 font-black text-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="FuoriOTA"
                  className="text-[10px] font-bold text-slate-500 uppercase"
                >
                  Fuori OTA
                </Label>
                <Input
                  id="FuoriOTA"
                  {...form.register("FuoriOTA")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="CostoNotti"
                  className="text-[10px] font-bold text-slate-500 uppercase"
                >
                  Costo Notti
                </Label>
                <Input
                  id="CostoNotti"
                  {...form.register("CostoNotti")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="MediaANotte"
                  className="text-[10px] font-bold text-slate-500 uppercase"
                >
                  Media a Notte
                </Label>
                <Input
                  id="MediaANotte"
                  {...form.register("MediaANotte")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="Pulizia"
                  className="text-[10px] font-bold text-slate-500 uppercase"
                >
                  Pulizia
                </Label>
                <Input
                  id="Pulizia"
                  {...form.register("Pulizia")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="Sconti"
                  className="text-[10px] font-bold text-red-500 uppercase"
                >
                  Sconti
                </Label>
                <Input
                  id="Sconti"
                  {...form.register("Sconti")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm text-red-500 font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="SoggiornoTax"
                  className="text-[10px] font-bold text-slate-500 uppercase"
                >
                  Soggiorno
                </Label>
                <Input
                  id="SoggiornoTax"
                  {...form.register("SoggiornoTax")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="OTATax"
                  className="text-[10px] font-bold text-slate-500 uppercase"
                >
                  OTA Tax
                </Label>
                <Input
                  id="OTATax"
                  {...form.register("OTATax")}
                  className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="CedolareSecca"
                className="text-[10px] font-bold text-slate-500 uppercase"
              >
                Cedolare Secca (21%)
              </Label>
              <Input
                id="CedolareSecca"
                {...form.register("CedolareSecca")}
                className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="Note"
                className="text-xs font-bold text-slate-500"
              >
                Note
              </Label>
              <Textarea
                id="Note"
                {...form.register("Note")}
                placeholder="Note opzionali..."
                className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700 min-h-[80px] text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="ghost"
          onClick={cancelEditing}
          className="rounded-xl font-bold"
        >
          Annulla
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 rounded-xl font-black px-6"
        >
          {isLoading ? "Salvataggio..." : "Salva"}
        </Button>
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="rounded-t-[2.5rem] p-6 h-[92vh] overflow-y-auto border-none shadow-2xl"
        >
          {renderHeader()}
          <div className="mt-4">{isEditing ? editContent : viewContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-none rounded-[2rem] shadow-2xl p-0">
        <div className="p-6 md:p-8">
          {renderHeader()}
          <div className="mt-6">{isEditing ? editContent : viewContent}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
