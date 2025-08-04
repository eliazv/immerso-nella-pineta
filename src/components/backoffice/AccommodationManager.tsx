import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Home, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AccommodationService } from "@/services/accommodationService";
import { Accommodation } from "@/types/accommodation";
import { toast } from "@/components/ui/use-toast";

interface AccommodationFormData {
  name: string;
  shortName: string;
  description: string;
  color: string;
}

const PRESET_COLORS = [
  "#3498db",
  "#e74c3c",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
  "#34495e",
  "#e67e22",
  "#16a085",
  "#27ae60",
];

export const AccommodationManager: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] =
    useState<Accommodation | null>(null);
  const [accommodationToDelete, setAccommodationToDelete] =
    useState<Accommodation | null>(null);
  const [formData, setFormData] = useState<AccommodationFormData>({
    name: "",
    shortName: "",
    description: "",
    color: PRESET_COLORS[0],
  });

  // Load accommodations on component mount
  useEffect(() => {
    loadAccommodations();
  }, []);

  const loadAccommodations = () => {
    const data = AccommodationService.getAccommodations();
    setAccommodations(data);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      shortName: "",
      description: "",
      color: PRESET_COLORS[0],
    });
    setEditingAccommodation(null);
  };

  const openDialog = (accommodation?: Accommodation) => {
    if (accommodation) {
      setEditingAccommodation(accommodation);
      setFormData({
        name: accommodation.name,
        shortName: accommodation.shortName,
        description: accommodation.description || "",
        color: accommodation.color,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.shortName.trim()) {
      toast({
        title: "Errore",
        description: "Nome e nome breve sono obbligatori.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingAccommodation) {
        AccommodationService.updateAccommodation(
          editingAccommodation.id,
          formData
        );
        toast({
          title: "Successo",
          description: "Appartamento aggiornato con successo.",
        });
      } else {
        AccommodationService.addAccommodation(formData);
        toast({
          title: "Successo",
          description: "Nuovo appartamento aggiunto con successo.",
        });
      }

      loadAccommodations();
      closeDialog();
    } catch (error) {
      toast({
        title: "Errore",
        description:
          error instanceof Error
            ? error.message
            : "Errore durante il salvataggio.",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = (accommodation: Accommodation) => {
    try {
      AccommodationService.updateAccommodation(accommodation.id, {
        isActive: !accommodation.isActive,
      });
      loadAccommodations();
      toast({
        title: "Successo",
        description: `Appartamento ${
          accommodation.isActive ? "disattivato" : "attivato"
        } con successo.`,
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore durante la modifica dello stato.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (!accommodationToDelete) return;

    try {
      AccommodationService.deleteAccommodation(accommodationToDelete.id);
      loadAccommodations();
      toast({
        title: "Successo",
        description: "Appartamento disattivato con successo.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore durante la cancellazione.",
        variant: "destructive",
      });
    }

    setIsDeleteDialogOpen(false);
    setAccommodationToDelete(null);
  };

  const openDeleteDialog = (accommodation: Accommodation) => {
    setAccommodationToDelete(accommodation);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestione Appartamenti</h2>
          <p className="text-muted-foreground">
            Aggiungi, modifica o rimuovi appartamenti dalla tua struttura.
          </p>
        </div>
        <Button
          onClick={() => openDialog()}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nuovo Appartamento</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accommodations.map((accommodation) => (
          <Card
            key={accommodation.id}
            className={`${!accommodation.isActive ? "opacity-60" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: accommodation.color }}
                  />
                  <CardTitle className="text-lg">
                    {accommodation.name}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(accommodation)}
                  >
                    {accommodation.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDialog(accommodation)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteDialog(accommodation)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                <Badge variant="outline" className="mr-2">
                  {accommodation.shortName}
                </Badge>
                {accommodation.isActive ? (
                  <Badge variant="default">Attivo</Badge>
                ) : (
                  <Badge variant="secondary">Disattivato</Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {accommodation.description && (
                <p className="text-sm text-muted-foreground">
                  {accommodation.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Home className="w-3 h-3" />
                <span>ID: {accommodation.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingAccommodation
                ? "Modifica Appartamento"
                : "Nuovo Appartamento"}
            </DialogTitle>
            <DialogDescription>
              {editingAccommodation
                ? "Modifica i dettagli dell'appartamento."
                : "Aggiungi un nuovo appartamento alla tua struttura."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Appartamento *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="es. Appartamento 3"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortName">Nome Breve *</Label>
              <Input
                id="shortName"
                value={formData.shortName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shortName: e.target.value,
                  }))
                }
                placeholder="es. App.3"
                required
              />
              <p className="text-xs text-muted-foreground">
                Utilizzato nel calendario per risparmiare spazio
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descrizione opzionale dell'appartamento"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Colore</Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${
                      formData.color === color
                        ? "border-gray-900"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                  />
                ))}
              </div>
              <Input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-20 h-8"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Annulla
              </Button>
              <Button type="submit">
                {editingAccommodation ? "Aggiorna" : "Aggiungi"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma disattivazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler disattivare "{accommodationToDelete?.name}"?
              L'appartamento non sarà più visibile nei calendari, ma le
              prenotazioni esistenti rimarranno.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Annulla
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Disattiva
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
