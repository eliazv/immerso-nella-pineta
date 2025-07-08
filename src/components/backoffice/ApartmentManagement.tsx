import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, Euro, Home } from "lucide-react";
import { Apartment } from "@/types/calendar";
import { 
  getAllApartments, 
  createApartment, 
  updateApartment, 
  deleteApartment,
  getApartmentStats,
  CreateApartmentData,
  UpdateApartmentData
} from "@/services/apartmentService";

const ApartmentManagement: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form state per creazione/modifica
  const [formData, setFormData] = useState<CreateApartmentData>({
    name: "",
    description: "",
    maxGuests: 4,
    address: "",
    amenities: [],
    basePrice: 0,
    cleaningFee: 0,
    isActive: true
  });

  // Carica gli appartamenti all'avvio
  useEffect(() => {
    loadApartments();
  }, []);

  const loadApartments = () => {
    try {
      const apartmentList = getAllApartments();
      setApartments(apartmentList);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare gli appartamenti",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      maxGuests: 4,
      address: "",
      amenities: [],
      basePrice: 0,
      cleaningFee: 0,
      isActive: true
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createApartment(formData);
      toast({
        title: "Successo",
        description: "Appartamento creato con successo"
      });
      loadApartments();
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore nella creazione",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setFormData({
      name: apartment.name,
      description: apartment.description || "",
      maxGuests: apartment.maxGuests,
      address: apartment.address || "",
      amenities: apartment.amenities || [],
      basePrice: apartment.basePrice || 0,
      cleaningFee: apartment.cleaningFee || 0,
      isActive: apartment.isActive
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingApartment) return;
    
    setIsLoading(true);
    try {
      const updateData: UpdateApartmentData = { ...formData };
      await updateApartment(editingApartment.id, updateData);
      toast({
        title: "Successo",
        description: "Appartamento aggiornato con successo"
      });
      loadApartments();
      setIsEditDialogOpen(false);
      setEditingApartment(null);
      resetForm();
    } catch (error) {
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore nell'aggiornamento",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (apartment: Apartment) => {
    if (!confirm(`Sei sicuro di voler eliminare l'appartamento "${apartment.name}"? Questa azione eliminerà anche tutte le prenotazioni associate.`)) {
      return;
    }

    try {
      await deleteApartment(apartment.id);
      toast({
        title: "Successo",
        description: "Appartamento eliminato con successo"
      });
      loadApartments();
    } catch (error) {
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore nell'eliminazione",
        variant: "destructive"
      });
    }
  };

  const stats = getApartmentStats();

  return (
    <div className="space-y-6">
      {/* Header con statistiche */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestione Alloggi</h2>
          <p className="text-muted-foreground">
            {stats.active} attivi di {stats.total} totali • Capacità: {stats.totalCapacity} ospiti
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Alloggio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crea Nuovo Alloggio</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli del nuovo alloggio
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="es. N° 3"
                  />
                </div>
                <div>
                  <Label htmlFor="maxGuests">Max Ospiti *</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({...formData, maxGuests: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descrizione dell'alloggio..."
                />
              </div>
              
              <div>
                <Label htmlFor="address">Indirizzo</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Indirizzo completo"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basePrice">Prezzo Base (€/notte)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="cleaningFee">Costo Pulizia (€)</Label>
                  <Input
                    id="cleaningFee"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.cleaningFee}
                    onChange={(e) => setFormData({...formData, cleaningFee: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                />
                <Label htmlFor="isActive">Alloggio attivo</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annulla
              </Button>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading ? "Creazione..." : "Crea Alloggio"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista appartamenti */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apartments.map((apartment) => (
          <Card key={apartment.id} className={!apartment.isActive ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    {apartment.name}
                  </CardTitle>
                  <CardDescription>{apartment.description}</CardDescription>
                </div>
                <Badge variant={apartment.isActive ? "default" : "secondary"}>
                  {apartment.isActive ? "Attivo" : "Inattivo"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {apartment.maxGuests} ospiti
                </div>
                {apartment.basePrice && apartment.basePrice > 0 && (
                  <div className="flex items-center gap-1">
                    <Euro className="h-4 w-4" />
                    {apartment.basePrice}/notte
                  </div>
                )}
              </div>
              
              {apartment.address && (
                <p className="text-sm text-muted-foreground">{apartment.address}</p>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(apartment)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifica
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(apartment)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Elimina
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog di modifica (simile a quello di creazione) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifica Alloggio</DialogTitle>
            <DialogDescription>
              Modifica i dettagli dell'alloggio
            </DialogDescription>
          </DialogHeader>
          
          {/* Stesso form del dialog di creazione */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nome *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="es. N° 3"
                />
              </div>
              <div>
                <Label htmlFor="edit-maxGuests">Max Ospiti *</Label>
                <Input
                  id="edit-maxGuests"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.maxGuests}
                  onChange={(e) => setFormData({...formData, maxGuests: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-description">Descrizione</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descrizione dell'alloggio..."
              />
            </div>
            
            <div>
              <Label htmlFor="edit-address">Indirizzo</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Indirizzo completo"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-basePrice">Prezzo Base (€/notte)</Label>
                <Input
                  id="edit-basePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="edit-cleaningFee">Costo Pulizia (€)</Label>
                <Input
                  id="edit-cleaningFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.cleaningFee}
                  onChange={(e) => setFormData({...formData, cleaningFee: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
              />
              <Label htmlFor="edit-isActive">Alloggio attivo</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Aggiornamento..." : "Aggiorna Alloggio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApartmentManagement;
