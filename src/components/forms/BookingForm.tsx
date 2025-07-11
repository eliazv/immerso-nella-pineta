import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormField from "@/components/ui/FormField";
import SelectField from "@/components/ui/SelectField";
import DatePicker from "@/components/ui/DatePicker";
import { CreateBookingData } from "@/services/localBookingService";
import { Apartment } from "@/types/calendar";
import { validateBookingData } from "@/utils/componentValidator";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CreateBookingData;
  onFormDataChange: (data: CreateBookingData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  apartments: Apartment[];
}

const BookingForm: React.FC<BookingFormProps> = React.memo(
  ({
    isOpen,
    onClose,
    formData,
    onFormDataChange,
    onSubmit,
    isLoading,
    apartments,
  }) => {
    const availableOTAs = ["Booking", "Airbnb", "Extra", "Agenzia", "Diretta"];

    const handleSubmit = () => {
      const validation = validateBookingData(formData);
      if (!validation.valid) {
        console.error("Errori di validazione:", validation.errors);
        return;
      }
      onSubmit();
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuova Prenotazione</DialogTitle>
            <DialogDescription>
              Inserisci i dettagli della nuova prenotazione
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                id="nome"
                label="Nome Ospite"
                value={formData.Nome}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    Nome: value as string,
                  })
                }
                placeholder="Nome dell'ospite"
                required
              />
              <SelectField
                id="ota"
                label="OTA/Canale"
                value={formData.OTA}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    OTA: value,
                  })
                }
                options={availableOTAs.map((ota) => ({
                  value: ota,
                  label: ota,
                }))}
                placeholder="Seleziona canale"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                id="checkin"
                label="Check-in"
                value={formData.CheckIn}
                onChange={(value) => {
                  onFormDataChange({
                    ...formData,
                    CheckIn: value,
                    // Se il check-out è prima o uguale al check-in, resettalo
                    CheckOut:
                      formData.CheckOut && formData.CheckOut <= value
                        ? ""
                        : formData.CheckOut,
                  });
                }}
                required
              />
              <DatePicker
                id="checkout"
                label="Check-out"
                value={formData.CheckOut}
                onChange={(value) =>
                  onFormDataChange({ ...formData, CheckOut: value })
                }
                min={
                  formData.CheckIn
                    ? new Date(
                        new Date(formData.CheckIn).getTime() +
                          24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0]
                    : undefined
                }
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                id="adulti"
                label="Adulti"
                type="number"
                value={formData.adulti}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    adulti: value as string,
                  })
                }
                min={0}
              />
              <FormField
                id="bambini"
                label="Bambini"
                type="number"
                value={formData.bambini}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    bambini: value as string,
                  })
                }
                min={0}
              />
              <FormField
                id="animali"
                label="Animali"
                type="number"
                value={formData.animali}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    animali: value as string,
                  })
                }
                min={0}
              />
            </div>

            <SelectField
              id="apartment"
              label="Appartamento"
              value={formData.apartment}
              onChange={(value) =>
                onFormDataChange({
                  ...formData,
                  apartment: value,
                })
              }
              options={apartments.map((apartment) => ({
                value: apartment.id,
                label: apartment.name,
              }))}
              placeholder="Seleziona appartamento"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                id="totaleCliente"
                label="Totale Cliente (€)"
                type="number"
                value={formData.TotaleCliente}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    TotaleCliente: value as string,
                  })
                }
                step={0.01}
              />
              <FormField
                id="pulizia"
                label="Costo Pulizia (€)"
                type="number"
                value={formData.Pulizia}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    Pulizia: value as string,
                  })
                }
                step={0.01}
              />
            </div>

            <FormField
              id="note"
              label="Note"
              type="textarea"
              value={formData.Note}
              onChange={(value) =>
                onFormDataChange({
                  ...formData,
                  Note: value as string,
                })
              }
              placeholder="Note opzionali sulla prenotazione"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Annulla
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea Prenotazione"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default BookingForm;
