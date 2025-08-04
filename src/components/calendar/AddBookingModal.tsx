import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Booking, CalendarType } from "@/types/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { addBooking } from "@/services/newBookingService";

interface AddBookingModalProps {
  calendarType: CalendarType;
  onAdd: () => void;
}

const calculateSoggiornoTax = (booking: Partial<Booking>): string => {
  try {
    if (
      !booking.adulti ||
      booking.adulti.trim() === "" ||
      booking.adulti === "0"
    ) {
      return "";
    }

    if (!booking.CheckIn || !booking.Notti) {
      return "";
    }

    const checkInValue = booking.CheckIn.trim();
    const parts = checkInValue.split("/");

    if (parts.length !== 3) {
      return "";
    }

    const month = parseInt(parts[1], 10);

    if (month < 5 || month > 9) {
      return "";
    }

    const numAdulti = parseInt(booking.adulti, 10);
    if (isNaN(numAdulti) || numAdulti <= 0) {
      return "";
    }

    const nights = parseInt(booking.Notti, 10);
    if (isNaN(nights) || nights <= 0) {
      return "";
    }

    const taxableNights = Math.min(nights, 7);
    const tax = numAdulti * taxableNights;

    return tax.toString();
  } catch (error) {
    return "";
  }
};

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
  calendarType,
  onAdd,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Partial<Booking>>({
    defaultValues: {
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
      SoggiornoTaxRiscossa: "",
      OTATax: "",
      CedolareSecca: "",
      Totale: "",
      Note: "",
    },
  });

  const watchedBookingValues = form.watch([
    "CheckIn",
    "CheckOut",
    "adulti",
    "Notti",
  ]);

  useEffect(() => {
    const formData = form.getValues();
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
      form.setValue("SoggiornoTax", "");
    }
  }, [watchedBookingValues, form]);

  const onSubmit = async (formData: Partial<Booking>) => {
    setIsLoading(true);
    try {
      const success = await addBooking(formData, calendarType);
      if (success) {
        toast({
          title: "Prenotazione aggiunta",
          description: `La prenotazione per ${formData.Nome} è stata aggiunta con successo.`,
        });
        setOpen(false);
        form.reset();
        onAdd();
      } else {
        toast({
          title: "Errore",
          description:
            "Non è stato possibile aggiungere la prenotazione. Riprova più tardi.",
          variant: "destructive",
        });
      }
    } catch (error) {
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

  const availableOTAs = ["Booking", "Airbnb", "Extra", "Agenzia", "Diretta"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-2 ml-1">
          <Plus className="w-4 h-4" />
          Nuova Prenotazione
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white border-slate-200 px-2 sm:px-6 py-0">
        <div
          className="sticky z-30 bg-white border-b flex items-center justify-between"
          style={{ minHeight: "56px", top: "env(safe-area-inset-top, 0px)" }}
        >
          <div>
            <DialogTitle className="text-lg sm:text-xl font-serif text-slate-800">
              Aggiungi Nuova Prenotazione
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Compila i dettagli della nuova prenotazione
            </DialogDescription>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4 bg-slate-50/70 p-4 rounded-md">
              <div className="font-medium text-sm text-slate-500 uppercase tracking-wider mb-3">
                Dati generali
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="Nome">Nome *</Label>
                  <Input
                    id="Nome"
                    {...form.register("Nome", { required: true })}
                    className="bg-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="OTA">Piattaforma (OTA)</Label>
                  <Select
                    defaultValue="Diretta"
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
                  <Label htmlFor="CheckIn">Check-in (DD/MM/YYYY) *</Label>
                  <Input
                    id="CheckIn"
                    {...form.register("CheckIn", { required: true })}
                    className="bg-white"
                    placeholder="es. 15/06/2024"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="CheckOut">Check-out (DD/MM/YYYY) *</Label>
                  <Input
                    id="CheckOut"
                    {...form.register("CheckOut", { required: true })}
                    className="bg-white"
                    placeholder="es. 22/06/2024"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="Notti">Notti</Label>
                  <Input
                    id="Notti"
                    {...form.register("Notti")}
                    className="bg-white"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="adulti">Adulti</Label>
                    <Input
                      id="adulti"
                      {...form.register("adulti")}
                      className="bg-white"
                      type="number"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bambini">Bambini</Label>
                    <Input
                      id="bambini"
                      {...form.register("bambini")}
                      className="bg-white"
                      type="number"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="animali">Animali</Label>
                    <Input
                      id="animali"
                      {...form.register("animali")}
                      className="bg-white"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-slate-50/70 p-4 rounded-md">
              <div className="font-medium text-sm text-slate-500 uppercase tracking-wider mb-3">
                Importi
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="TotaleCliente">Totale Cliente</Label>
                  <Input
                    id="TotaleCliente"
                    {...form.register("TotaleCliente")}
                    className="bg-white"
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="FuoriOTA">Fuori OTA</Label>
                  <Input
                    id="FuoriOTA"
                    {...form.register("FuoriOTA")}
                    className="bg-white"
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="CostoNotti">Costo Notti</Label>
                  <Input
                    id="CostoNotti"
                    {...form.register("CostoNotti")}
                    className="bg-white"
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="MediaANotte">Media a Notte</Label>
                  <Input
                    id="MediaANotte"
                    {...form.register("MediaANotte")}
                    className="bg-white"
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="Pulizia">Pulizia</Label>
                  <Input
                    id="Pulizia"
                    {...form.register("Pulizia")}
                    className="bg-white"
                    type="number"
                    step="0.01"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="Sconti">Sconti</Label>
                  <Input
                    id="Sconti"
                    {...form.register("Sconti")}
                    className="bg-white"
                    type="number"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="SoggiornoTax">Tassa di Soggiorno</Label>
              <Input
                id="SoggiornoTax"
                {...form.register("SoggiornoTax")}
                className="bg-white"
                type="number"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                €1 per adulto per notte, maggio-settembre, max 7 notti.
              </p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="SoggiornoTaxRiscossa">Tassa Riscossa</Label>
              <Select
                onValueChange={(value) =>
                  form.setValue(
                    "SoggiornoTaxRiscossa",
                    value === "undefined" ? "" : value
                  )
                }
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undefined">Non specificato</SelectItem>
                  <SelectItem value="Sì">Sì - Riscossa</SelectItem>
                  <SelectItem value="No">No - Non riscossa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="OTATax">OTA Tax</Label>
              <Input
                id="OTATax"
                {...form.register("OTATax")}
                className="bg-white"
                type="number"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="CedolareSecca">Cedolare Secca (21%)</Label>
              <Input
                id="CedolareSecca"
                {...form.register("CedolareSecca")}
                className="bg-white"
                type="number"
                step="0.01"
              />
            </div>
          </div>

          <div className="py-2 bg-slate-50/70 p-4 rounded-md mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <Label htmlFor="Totale" className="text-md font-semibold">
                  Totale
                </Label>
                <Input
                  id="Totale"
                  {...form.register("Totale")}
                  className="bg-white text-lg font-semibold"
                  type="number"
                  step="0.01"
                />
              </div>

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
          </div>

          <DialogFooter>
            <div className="flex gap-2 justify-end w-full mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-white hover:bg-slate-100"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Aggiungendo..." : "Aggiungi Prenotazione"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookingModal;
