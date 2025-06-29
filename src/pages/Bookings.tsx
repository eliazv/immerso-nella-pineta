import React from "react";
import { useOutletContext } from "react-router-dom";
import BookingManager from "@/components/BookingManager";
import { CalendarType } from "@/types/calendar";

interface BookingsContext {
  selectedCalendar: CalendarType;
}

/**
 * Pagina per la gestione delle prenotazioni
 * Integra il nuovo sistema Firebase al posto dell'Excel
 */
const Bookings: React.FC = () => {
  const { selectedCalendar } = useOutletContext<BookingsContext>();

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Gestione Prenotazioni
        </h1>
        <p className="text-gray-600">
          Sistema avanzato per la gestione delle prenotazioni con database cloud
        </p>
      </div>

      <BookingManager
        selectedProperty={
          selectedCalendar === "all" ? undefined : selectedCalendar
        }
      />
    </div>
  );
};

export default Bookings;
