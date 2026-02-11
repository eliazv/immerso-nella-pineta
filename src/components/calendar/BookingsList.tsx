import React, { useState } from "react";
import { Booking } from "@/types/calendar";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
import BookingCard from "@/components/calendar/BookingCard";
import { Calendar, Search, Filter } from "lucide-react";

// Funzione per ordinare le prenotazioni per data di check-in (crescente)
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

// Funzione per ordinare le prenotazioni per data di check-in (decrescente)
const sortBookingsByCheckInDesc = (bookings: Booking[]): Booking[] => {
  return [...bookings].sort((a, b) => {
    const [dayA, monthA, yearA] = a.CheckIn.split("/");
    const [dayB, monthB, yearB] = b.CheckIn.split("/");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

    return dateB.getTime() - dateA.getTime();
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
  const [visibleItems, setVisibleItems] = useState<number>(10);

  // Funzione per filtrare le prenotazioni future
  const getFilteredBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (showOnlyUpcoming) {
      const filtered = bookings.filter((booking) => {
        const [checkoutDay, checkoutMonth, checkoutYear] =
          booking.CheckOut.split("/");
        const checkoutDate = new Date(
          `${checkoutYear}-${checkoutMonth}-${checkoutDay}`,
        );
        return checkoutDate >= today;
      });
      // Ordiniamo per le più future in alto (anche nelle prossime)
      return sortBookingsByCheckInDesc(filtered);
    }

    // Per "Tutte", ordiniamo per le più future in alto
    return sortBookingsByCheckInDesc(bookings);
  };

  // Funzione per raggruppare le prenotazioni per anno (solo quando si mostrano tutte)
  const getGroupedBookings = () => {
    const filtered = getFilteredBookings().slice(0, visibleItems);

    // Se stiamo mostrando solo le prossime, non raggruppiamo
    if (showOnlyUpcoming) return [{ year: "ungrouped", bookings: filtered }];

    const groupedMap: Record<string, Booking[]> = {};

    filtered.forEach((booking) => {
      const year = booking.CheckIn.split("/")[2];
      if (!groupedMap[year]) {
        groupedMap[year] = [];
      }
      groupedMap[year].push(booking);
    });

    return Object.keys(groupedMap)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map((year) => ({
        year,
        bookings: sortBookingsByCheckInDesc(groupedMap[year]),
      }));
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const totalFiltered = getFilteredBookings().length;

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
        {getGroupedBookings().map(({ year, bookings: yearBookings }) => (
          <div key={year} className="space-y-4">
            {year !== "ungrouped" && (
              <div className="flex items-center gap-4">
                <h4 className="text-xl font-black text-slate-300 tracking-tighter">
                  {year}
                </h4>
                <div className="h-[1px] bg-slate-200 flex-1" />
                <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 uppercase">
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

        {totalFiltered > visibleItems && (
          <div className="flex justify-center pt-8 pb-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm text-primary shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Mostra altre prenotazioni
              <span className="bg-primary/10 px-2 py-0.5 rounded-lg text-xs">
                {totalFiltered - visibleItems}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
