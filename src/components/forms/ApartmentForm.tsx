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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/FormField";
import SelectField from "@/components/ui/SelectField";
import { ApartmentIcon } from "@/utils/apartmentIcons";
import { CreateApartmentData } from "@/services/apartmentService";
import { Apartment } from "@/types/calendar";

interface ApartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CreateApartmentData;
  onFormDataChange: (data: CreateApartmentData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  apartments: Apartment[];
}

const ApartmentForm: React.FC<ApartmentFormProps> = React.memo(
  ({
    isOpen,
    onClose,
    formData,
    onFormDataChange,
    onSubmit,
    isLoading,
    apartments,
  }) => {
    const availableIcons = [
      "Home",
      "Building",
      "Castle",
      "House",
      "Building2",
      "TreePine",
      "Waves",
      "Mountain",
      "Sun",
      "Star",
    ];

    const handleColorChange = (newColor: string) => {
      const combination = `${formData.icon}-${newColor}`;
      const usedCombinations = apartments.map(
        (apt) => `${apt.icon}-${apt.color}`
      );

      // Se la combinazione è già utilizzata, trova un'icona disponibile
      if (usedCombinations.includes(combination)) {
        const availableIcon = availableIcons.find(
          (icon) => !usedCombinations.includes(`${icon}-${newColor}`)
        );

        onFormDataChange({
          ...formData,
          color: newColor,
          icon: availableIcon || formData.icon,
        });
      } else {
        onFormDataChange({
          ...formData,
          color: newColor,
        });
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ApartmentIcon
                iconName={formData.icon}
                color={formData.color}
                size={20}
              />
              Crea Nuovo Alloggio
            </DialogTitle>
            <DialogDescription>
              Inserisci i dettagli del nuovo alloggio
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                id="name"
                label="Nome"
                value={formData.name}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    name: value as string,
                  })
                }
                placeholder="es. Appartamento A"
                required
              />
              <FormField
                id="maxGuests"
                label="Max Ospiti"
                type="number"
                value={formData.maxGuests}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    maxGuests: value as number,
                  })
                }
                min={1}
                max={20}
                required
              />
            </div>

            <FormField
              id="description"
              label="Descrizione"
              type="textarea"
              value={formData.description}
              onChange={(value) =>
                onFormDataChange({
                  ...formData,
                  description: value as string,
                })
              }
              placeholder="Descrizione dell'alloggio..."
            />

            {/* Icon and Color Selection */}
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                id="icon"
                label="Icona"
                value={formData.icon}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    icon: value,
                  })
                }
                options={availableIcons
                  .filter((iconName) => {
                    // Filtra le icone che non sono già utilizzate con il colore corrente
                    const combination = `${iconName}-${formData.color}`;
                    const usedCombinations = apartments.map(
                      (apt) => `${apt.icon}-${apt.color}`
                    );
                    return (
                      !usedCombinations.includes(combination) ||
                      iconName === formData.icon
                    );
                  })
                  .map((iconName) => ({
                    value: iconName,
                    label: iconName,
                    icon: (
                      <ApartmentIcon
                        iconName={iconName}
                        color={formData.color}
                        size={16}
                      />
                    ),
                  }))}
                placeholder="Seleziona icona"
              />
              <div>
                <Label htmlFor="color">Colore</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    placeholder="#3DA9A9"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                id="basePrice"
                label="Prezzo Base (€/notte)"
                type="number"
                value={formData.basePrice}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    basePrice: value as number,
                  })
                }
                min={0}
                step={0.01}
              />
              <FormField
                id="cleaningFee"
                label="Costo Pulizia (€)"
                type="number"
                value={formData.cleaningFee}
                onChange={(value) =>
                  onFormDataChange({
                    ...formData,
                    cleaningFee: value as number,
                  })
                }
                min={0}
                step={0.01}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Annulla
            </Button>
            <Button onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea Alloggio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default ApartmentForm;
