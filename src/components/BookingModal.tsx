import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Booking, Property } from "@/types/firebase";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Booking>) => Promise<void>;
  initialData?: Partial<Booking>;
  properties: Property[];
}

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  onSave,
  initialData = {},
  properties,
}) => {
  const { toast } = useToast();
  const [form, setForm] = useState<Partial<Booking>>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialData);
  }, [initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form);
      toast({ title: "Prenotazione salvata!", variant: "default" });
      onClose();
    } catch (err) {
      toast({
        title: "Errore salvataggio",
        description: String(err),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 md:max-w-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Modifica Prenotazione" : "Nuova Prenotazione"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Ospite *</Label>
            <Input
              name="guestName"
              value={form.guestName || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="guestEmail"
              value={form.guestEmail || ""}
              onChange={handleChange}
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Appartamento *</Label>
            <select
              name="propertyId"
              value={form.propertyId || ""}
              onChange={handleChange}
              required
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Seleziona...</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label>Check-in *</Label>
              <Input
                name="checkInDate"
                value={
                  typeof form.checkInDate === "string"
                    ? form.checkInDate
                    : form.checkInDate && form.checkInDate.toDate
                    ? form.checkInDate.toDate().toISOString().slice(0, 10)
                    : ""
                }
                onChange={handleChange}
                type="date"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>Check-out *</Label>
              <Input
                name="checkOutDate"
                value={
                  typeof form.checkOutDate === "string"
                    ? form.checkOutDate
                    : form.checkOutDate && form.checkOutDate.toDate
                    ? form.checkOutDate.toDate().toISOString().slice(0, 10)
                    : ""
                }
                onChange={handleChange}
                type="date"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Totale (€)</Label>
            <Input
              name="totalAmount"
              value={form.totalAmount || ""}
              onChange={handleChange}
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvataggio..." : "Salva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
