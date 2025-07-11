import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Euro, MapPin, Calendar, Star } from "lucide-react";
import { ApartmentIcon } from "@/utils/apartmentIcons";
import { Apartment } from "@/types/calendar";
import { localStorageService } from "@/services/localStorageService";

interface ApartmentViewModalProps {
  apartment: Apartment | null;
  isOpen: boolean;
  onClose: () => void;
}

const ApartmentViewModal: React.FC<ApartmentViewModalProps> = ({
  apartment,
  isOpen,
  onClose,
}) => {
  if (!apartment) return null;

  const bookings = localStorageService.getBookingsByApartment(apartment.id);
  const activeBookings = bookings.filter(booking => {
    const today = new Date();
    const checkIn = new Date(booking.CheckIn);
    const checkOut = new Date(booking.CheckOut);
    return checkIn <= today && today <= checkOut;
  });

  const upcomingBookings = bookings.filter(booking => {
    const today = new Date();
    const checkIn = new Date(booking.CheckIn);
    return checkIn > today;
  }).slice(0, 3);

  const totalRevenue = bookings.reduce((sum, booking) => {
    return sum + (parseFloat(booking.TotaleCliente) || 0);
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${apartment.color}20` }}
            >
              <ApartmentIcon
                iconName={apartment.icon}
                color={apartment.color}
                size={24}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {apartment.name}
                {activeBookings.length > 0 && (
                  <Badge className="bg-green-100 text-green-800">
                    Occupato
                  </Badge>
                )}
              </div>
              {apartment.description && (
                <DialogDescription className="mt-1">
                  {apartment.description}
                </DialogDescription>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informazioni Base */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informazioni Alloggio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Max {apartment.maxGuests} ospiti</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <span>€{apartment.basePrice}/notte</span>
                </div>
                {apartment.cleaningFee > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span>€{apartment.cleaningFee} pulizia</span>
                  </div>
                )}
                {apartment.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{apartment.address}</span>
                  </div>
                )}
              </div>
              
              {apartment.amenities && apartment.amenities.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Servizi</h4>
                  <div className="flex flex-wrap gap-2">
                    {apartment.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistiche */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-petrolio">
                    {bookings.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Prenotazioni Totali
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    €{totalRevenue.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ricavi Totali
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {activeBookings.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Attualmente Occupato
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prossime Prenotazioni */}
          {upcomingBookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Prossime Prenotazioni
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingBookings.map((booking, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{booking.Nome}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(booking.CheckIn).toLocaleDateString()} - {" "}
                          {new Date(booking.CheckOut).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">€{booking.TotaleCliente}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.OTA}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApartmentViewModal;
