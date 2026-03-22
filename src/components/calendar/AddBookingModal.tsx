import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Booking, CalendarType } from "@/types/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addBooking } from "@/services/bookingService";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

// Formatta una data da YYYY-MM-DD a DD/MM/YYYY
const formatToItalianDate = (isoDate: string): string => {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

// Calcola il numero di notti tra due date DD/MM/YYYY
const calculateNights = (checkIn: string, checkOut: string): string => {
  try {
    const parseDate = (d: string) => {
      const p = d.split("/");
      if (p.length !== 3) return null;
      return new Date(parseInt(p[2]), parseInt(p[1]) - 1, parseInt(p[0]));
    };
    const start = parseDate(checkIn);
    const end = parseDate(checkOut);
    if (!start || !end) return "";
    const diff = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff.toString() : "";
  } catch {
    return "";
  }
};

interface AddBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Calendario selezionato. Se "all", l'utente deve scegliere esplicitamente l'appartamento. */
  calendarType: CalendarType;
  /** Data di check-in preimpostata nel formato YYYY-MM-DD (dal click sul calendario) */
  initialCheckIn?: string;
  onAdd: () => void;
}

const emptyBooking: Booking = {
  Nome: "",
  OTA: "Diretta",
  CheckIn: "",
  CheckOut: "",
  Notti: "",
  adulti: "",
  bambini: "",
  animali: "",
  TotaleCliente: "",
  FuoriOTA: "",
  CostoNotti: "",
  MediaANotte: "",
  Pulizia: "",
  Sconti: "",
  SoggiornoTax: "",
  OTATax: "",
  CedolareSecca: "",
  Totale: "",
  Note: "",
};

const availableOTAs = ["Booking", "Airbnb", "Extra", "Agenzia", "Diretta"];

const apartmentOptions: { value: CalendarType; label: string }[] = [
  { value: "principale", label: "Appartamento 3 (Principale)" },
  { value: "secondario", label: "Appartamento 4 (Secondario)" },
  { value: "terziario", label: "Appartamento 8 (Terziario)" },
];

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
  open,
  onOpenChange,
  calendarType,
  initialCheckIn,
  onAdd,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // Se la vista è "all", l'utente deve scegliere esplicitamente l'appartamento
  const [targetCalendar, setTargetCalendar] = useState<CalendarType>(
    calendarType !== "all" ? calendarType : "principale"
  );
  const isMobile = useIsMobile();

  const form = useForm<Booking>({
    defaultValues: { ...emptyBooking },
  });

  // Quando si apre il modal, imposta la data di check-in se fornita
  useEffect(() => {
    if (open) {
      form.reset({ ...emptyBooking });
      if (initialCheckIn) {
        form.setValue("CheckIn", formatToItalianDate(initialCheckIn));
      }
      // Reimposta il calendario target in base al tipo selezionato
      setTargetCalendar(calendarType !== "all" ? calendarType : "principale");
    }
  }, [open, initialCheckIn, calendarType, form]);

  // Aggiorna automaticamente il numero di notti quando cambiano le date
  const watchedCheckIn = form.watch("CheckIn");
  const watchedCheckOut = form.watch("CheckOut");

  useEffect(() => {
    if (watchedCheckIn && watchedCheckOut) {
      const nights = calculateNights(watchedCheckIn, watchedCheckOut);
      if (nights) form.setValue("Notti", nights);
    }
  }, [watchedCheckIn, watchedCheckOut, form]);

  const onSubmit = async (formData: Booking) => {
    if (!formData.Nome || !formData.CheckIn || !formData.CheckOut) {
      toast({
        title: "Campi obbligatori mancanti",
        description: "Compila almeno Nome, Check-in e Check-out.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await addBooking(formData, targetCalendar);
      if (success) {
        toast({
          title: "Prenotazione aggiunta",
          description: `La prenotazione per ${formData.Nome} è stata aggiunta con successo.`,
        });
        onOpenChange(false);
        onAdd();
      } else {
        toast({
          title: "Errore",
          description:
            "Non è stato possibile aggiungere la prenotazione. Riprova più tardi.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Errore",
        description:
          "Si è verificato un errore durante l'aggiunta della prenotazione.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const title = "Nuova Prenotazione";

  const renderHeader = () => (
    <div className="border-b flex items-center gap-3 pt-2 pb-4">
      <PlusCircle className="h-5 w-5 text-primary" />
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
        <p className="text-slate-500 text-sm mt-0.5">
          Inserisci i dati della nuova prenotazione
        </p>
      </div>
    </div>
  );

  const formContent = (
    <form onSubmit={form.handleSubmit(onSubmit)} className="pb-8">
      {/* Selezione appartamento: obbligatoria nella vista "tutti" */}
      {calendarType === "all" && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
          <Label className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
            Appartamento <span className="text-red-500">*</span>
          </Label>
          <Select
            value={targetCalendar}
            onValueChange={(v) => setTargetCalendar(v as CalendarType)}
          >
            <SelectTrigger className="mt-1.5 w-full bg-white dark:bg-slate-800 rounded-lg border-amber-200 dark:border-amber-700 font-bold">
              <SelectValue placeholder="Seleziona appartamento" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-xl">
              {apartmentOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        {/* Dati generali */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="font-black text-xs text-slate-400 uppercase tracking-widest mb-3">
            Dati generali
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="Nome" className="text-xs font-bold text-slate-500">
                Nome <span className="text-red-500">*</span>
              </Label>
              <Input
                id="Nome"
                {...form.register("Nome")}
                placeholder="Nome ospite"
                className="bg-white dark:bg-slate-800 rounded-lg border-slate-200 dark:border-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="OTA" className="text-xs font-bold text-slate-500">
                Piattaforma (OTA)
              </Label>
              <Select
                defaultValue="Diretta"
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
                  Check-in <span className="text-red-500">*</span>
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
                  Check-out <span className="text-red-500">*</span>
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

        {/* Dati economici */}
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
              <Label htmlFor="Note" className="text-xs font-bold text-slate-500">
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
          onClick={() => onOpenChange(false)}
          className="rounded-xl font-bold"
        >
          Annulla
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 rounded-xl font-black px-6"
        >
          {isLoading ? "Salvataggio..." : "Aggiungi Prenotazione"}
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
          <div className="mt-4">{formContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-none rounded-[2rem] shadow-2xl p-0">
        <div className="p-6 md:p-8">
          {renderHeader()}
          <div className="mt-6">{formContent}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookingModal;
