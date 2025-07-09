import React, { useState } from "react";
import { Booking } from "@/types/calendar";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
import BookingCard from "@/components/calendar/BookingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Calendar } from "lucide-react";

// Funzione per ordinare le prenotazioni per data di check-in
const sortBookingsByCheckIn = (bookings: Booking[]): Booking[] => {
  return [...bookings].sort((a, b) => {
    // Converti le date di check-in da formato DD/MM/YYYY a Date per il confronto
    const [dayA, monthA, yearA] = a.CheckIn.split("/");
    const [dayB, monthB, yearB] = b.CheckIn.split("/");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

    return dateA.getTime() - dateB.getTime();
  });
};

interface BookingsListProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onNewBookingClick?: () => void;
  onICalImportClick?: () => void;
}

const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  onBookingClick,
  searchQuery = "",
  onSearchChange,
  onNewBookingClick,
  onICalImportClick,
}) => {
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState<boolean>(true);
  // Funzione per filtrare le prenotazioni future
  const getFilteredBookings = () => {
    if (!showOnlyUpcoming) return sortBookingsByCheckIn(bookings);

    const today = new Date();
    const filtered = bookings.filter((booking) => {
      // Converti la data di checkout da formato DD/MM/YYYY a Date
      const [checkoutDay, checkoutMonth, checkoutYear] =
        booking.CheckOut.split("/");
      const checkoutDate = new Date(
        `${checkoutYear}-${checkoutMonth}-${checkoutDay}`
      );

      // Mantieni la prenotazione se la data di checkout è oggi o successiva
      return checkoutDate >= today;
    });

    return sortBookingsByCheckIn(filtered);
  };

  // Funzione per raggruppare le prenotazioni per anno (solo quando si mostrano tutte)
  const getGroupedBookings = () => {
    const filtered = getFilteredBookings();

    // Se stiamo mostrando solo le prossime, non raggruppiamo
    if (showOnlyUpcoming) return { ungrouped: filtered };

    const grouped: Record<string, Booking[]> = {};

    filtered.forEach((booking) => {
      // Estrai l'anno dalla data di check-in
      const year = booking.CheckIn.split("/")[2];

      if (!grouped[year]) {
        grouped[year] = [];
      }

      grouped[year].push(booking);
    }); // Ordina le chiavi (anni) in ordine decrescente
    return Object.keys(grouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .reduce((result: Record<string, Booking[]>, year) => {
        // Ordina le prenotazioni all'interno di ogni anno per data di check-in
        result[year] = sortBookingsByCheckIn(grouped[year]);
        return result;
      }, {});
  };

  // Versione abbreviata dei nomi degli appartamenti
  const getApartmentShortName = (apartment?: string) => {
    switch (apartment) {
      case "principale":
        return "App.3";
      case "secondario":
        return "App.4";
      case "terziario":
        return "App.8";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h2 className="text-xl font-medium">Prenotazioni</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowOnlyUpcoming(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              showOnlyUpcoming
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Prossime
          </button>
          <button
            onClick={() => setShowOnlyUpcoming(false)}
            className={`px-3 py-1 text-sm rounded-md ${
              !showOnlyUpcoming
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Tutte
          </button>
        </div>
      </div>

      {/* Barra di ricerca con pulsanti azioni */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cerca per nome ospite..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {onICalImportClick && (
            <Button
              onClick={onICalImportClick}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <Calendar className="h-4 w-4" />
              iCal
            </Button>
          )}
          {onNewBookingClick && (
            <Button
              onClick={onNewBookingClick}
              size="sm"
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Nuova
            </Button>
          )}
        </div>
      </div>

      {/* Risultati ricerca */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground mb-4">
          {bookings.length} risultat{bookings.length !== 1 ? "i" : "o"} trovat
          {bookings.length !== 1 ? "i" : "o"}
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">Nessuna prenotazione trovata.</p>
      ) : (
        <div className="space-y-6">
          {showOnlyUpcoming ? (
            // Visualizzazione normale per le prenotazioni future
            <div className="space-y-4">
              {getFilteredBookings().map((booking, index) => (
                <BookingCard
                  key={index}
                  booking={booking}
                  onClick={onBookingClick}
                  getApartmentShortName={getApartmentShortName}
                />
              ))}
            </div>
          ) : (
            // Visualizzazione raggruppata per anno
            Object.entries(getGroupedBookings()).map(([year, yearBookings]) => (
              <div key={year} className="space-y-3">
                <h4 className="text-lg font-semibold sticky top-[56px] py-2 z-10 shadow-sm bg-[#fcfaf8] border-b">
                  {year}{" "}
                  <span className="text-sm text-muted-foreground">
                    ({yearBookings.length} prenotazioni)
                  </span>
                </h4>
                <div className="space-y-4">
                  {yearBookings.map((booking, index) => (
                    <BookingCard
                      key={`${year}-${index}`}
                      booking={booking}
                      onClick={onBookingClick}
                      getApartmentShortName={getApartmentShortName}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingsList;
