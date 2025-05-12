import React, { useState } from "react";
import { Booking } from "@/types/calendar";

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
}

export const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  onBookingClick,
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

  const getOtaLogo = (ota: string) => {
    if (ota.toLowerCase() === "booking") {
      return (
        <img
          src="https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg"
          alt="Booking"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "airbnb") {
      return (
        <img
          src="https://img.icons8.com/?size=512&id=103424&format=png"
          alt="Airbnb"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "extra") {
      return (
        <img
          src="https://cdn-icons-png.freepik.com/512/5361/5361038.png?size=512&id=103424&format=png"
          alt="Extra"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "agenzia") {
      return (
        <img
          src="https://cdn-icons-png.freepik.com/256/6522/6522039.png?size=512&id=103424&format=png"
          alt="Agenzia"
          className="inline-block h-5 w-auto"
        />
      );
    }

    return <span>{ota}</span>; // Fallback per altri OTA
  };

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h3 className="font-serif text-lg font-medium">Lista Prenotazioni</h3>
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

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">Nessuna prenotazione trovata.</p>
      ) : (
        <div className="space-y-6">
          {showOnlyUpcoming ? (
            // Visualizzazione normale per le prenotazioni future
            <div className="space-y-4">
              {getFilteredBookings().map((booking, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => onBookingClick(booking)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <strong>
                        {getOtaLogo(booking.OTA)} {booking.Nome}
                      </strong>{" "}
                      -{" "}
                      <span>
                        {booking.CheckIn} → {booking.CheckOut} ({booking.Notti}{" "}
                        notti - {booking.Totale})
                      </span>
                    </div>
                    <button className="text-primary">Dettagli</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Visualizzazione raggruppata per anno
            Object.entries(getGroupedBookings()).map(([year, yearBookings]) => (
              <div key={year} className="space-y-3">
                {" "}
                <h4 className="text-lg font-semibold sticky top-[56px] py-2 z-10 shadow-sm bg-[#fcfaf8] border-b">
                  {year}{" "}
                  <span className="text-sm text-muted-foreground">
                    ({yearBookings.length} prenotazioni)
                  </span>
                </h4>
                <div className="space-y-4">
                  {yearBookings.map((booking, index) => (
                    <div
                      key={`${year}-${index}`}
                      className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => onBookingClick(booking)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <strong>
                            {getOtaLogo(booking.OTA)} {booking.Nome}
                          </strong>{" "}
                          -{" "}
                          <span>
                            {booking.CheckIn} → {booking.CheckOut} (
                            {booking.Notti} notti - {booking.Totale})
                          </span>
                        </div>
                        <button className="text-primary">Dettagli</button>
                      </div>
                    </div>
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
