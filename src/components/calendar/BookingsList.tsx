import React, { useState } from "react";
import { Booking } from "@/types/calendar";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
import BookingCard from "@/components/calendar/BookingCard";
import { Calendar, Search, Filter } from "lucide-react";

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

const BookingsList: React.FC<BookingsListProps> = ({
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
        `${checkoutYear}-${checkoutMonth}-${checkoutDay}`,
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 my-6 px-2">
        <div>
          <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
            Prenotazioni
          </h3>
          <p className="text-sm font-bold text-slate-400">
            Dettagli e storico dei tuoi ospiti
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-[1.25rem] w-full sm:w-auto shadow-inner border border-slate-200/50 dark:border-slate-700/50">
          <button
            onClick={() => setShowOnlyUpcoming(true)}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-black rounded-2xl transition-all ${
              showOnlyUpcoming
                ? "bg-white dark:bg-slate-900 text-primary shadow-md"
                : "text-slate-500 hover:text-slate-700 font-bold"
            }`}
          >
            Prossime
          </button>
          <button
            onClick={() => setShowOnlyUpcoming(false)}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-black rounded-2xl transition-all ${
              !showOnlyUpcoming
                ? "bg-white dark:bg-slate-900 text-primary shadow-md"
                : "text-slate-500 hover:text-slate-700 font-bold"
            }`}
          >
            Tutte
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(getGroupedBookings()).map(([year, yearBookings]) => (
          <div key={year} className="space-y-4">
            {year !== "ungrouped" && (
              <div className="flex items-center gap-4">
                <h4 className="text-xl font-black text-slate-300 tracking-tighter">
                  {year}
                </h4>
                <div className="h-[1px] bg-slate-200 flex-1" />
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border uppercase">
                  {yearBookings.length} pren.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {yearBookings.map((booking, index) => (
                <div
                  key={`${year}-${index}`}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <BookingCard
                    booking={booking}
                    onClick={onBookingClick}
                    getApartmentShortName={getApartmentShortName}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {getFilteredBookings().length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Nessuna prenotazione
            </h4>
            <p className="text-slate-500">
              Non ci sono prenotazioni per questo periodo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
