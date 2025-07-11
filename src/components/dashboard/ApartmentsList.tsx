import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home as HomeIcon, Users, Euro, Calendar } from "lucide-react";
import { ApartmentIcon } from "@/utils/apartmentIcons";
import { Apartment } from "@/types/calendar";
import { localStorageService } from "@/services/localStorageService";

interface ApartmentsListProps {
  apartments: Apartment[];
  onApartmentClick?: (apartment: Apartment) => void;
}

const ApartmentsList: React.FC<ApartmentsListProps> = ({
  apartments,
  onApartmentClick,
}) => {
  const navigate = useNavigate();

  if (apartments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5" />I Tuoi Alloggi
          </CardTitle>
          <CardDescription>
            Panoramica degli appartamenti gestiti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <HomeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessun alloggio configurato</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/apartments")}
            >
              Aggiungi Primo Alloggio
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5" />I Tuoi Alloggi
        </CardTitle>
        <CardDescription>Panoramica degli appartamenti gestiti</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apartment) => {
            const bookingsCount = localStorageService.getBookingsByApartment(
              apartment.id
            ).length;
            const activeBookings = localStorageService
              .getBookingsByApartment(apartment.id)
              .filter((booking) => {
                const today = new Date();
                const checkIn = new Date(booking.CheckIn);
                const checkOut = new Date(booking.CheckOut);
                return checkIn <= today && today <= checkOut;
              }).length;

            return (
              <Card
                key={apartment.id}
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
                style={{ borderLeftColor: apartment.color }}
                onClick={() =>
                  onApartmentClick
                    ? onApartmentClick(apartment)
                    : navigate("/apartments")
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${apartment.color}20` }}
                      >
                        <ApartmentIcon
                          iconName={apartment.icon}
                          color={apartment.color}
                          size={20}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {apartment.name}
                        </CardTitle>
                        {apartment.description && (
                          <CardDescription className="text-sm">
                            {apartment.description}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    {activeBookings > 0 && (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        Occupato
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">
                        {apartment.maxGuests} ospiti
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">
                        {bookingsCount} prenotazioni
                      </span>
                    </div>
                    {apartment.basePrice && apartment.basePrice > 0 && (
                      <div className="flex items-center gap-1">
                        <Euro className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">
                          €{apartment.basePrice}/notte
                        </span>
                      </div>
                    )}
                  </div>
                  {apartment.address && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      📍 {apartment.address}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/apartments")}
          >
            Gestisci Tutti gli Alloggi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApartmentsList;
