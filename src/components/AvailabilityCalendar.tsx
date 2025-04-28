import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { useOutletContext } from "react-router-dom";

import { Booking, CalendarEvent, CalendarType } from "@/types/calendar";
import { fetchBookings } from "@/services/bookingService";
import BookingsList from "@/components/calendar/BookingsList";
import BookingModal from "@/components/calendar/BookingModal";

interface AvailabilityCalendarProps {
  className?: string;
}

// Interfaccia per il contesto condiviso dal layout
interface BackofficeContext {
  selectedCalendar: CalendarType;
}

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Ottiene il calendario selezionato dal contesto del layout
  const { selectedCalendar } = useOutletContext<BackofficeContext>();

  // Carica i dati quando il componente viene montato o cambia calendario
  useEffect(() => {
    loadBookings();
  }, [selectedCalendar]);

  // Funzione per caricare le prenotazioni
  const loadBookings = async () => {
    try {
      const { events, bookings } = await fetchBookings(selectedCalendar);
      setEvents(events);
      setBookings(bookings);
    } catch (error) {
      console.error("Errore durante il caricamento delle prenotazioni:", error);
    }
  };

  // Apre il modale con i dettagli della prenotazione
  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Mappa tra codici calendario e nomi degli appartamenti
  const apartmentNames = {
    principale: "Appartamento 3",
    secondario: "Appartamento 4",
    terziario: "Appartamento 8",
  };

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Calendario Disponibilità</h2>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-md border">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="it"
          events={events}
          firstDay={1} // Imposta lunedì come primo giorno della settimana
          eventClick={(info) => {
            const booking = info.event.extendedProps as Booking;
            openBookingDetails(booking);
          }}
          height="auto"
          titleFormat={{
            year: "numeric",
            month: "short", // Usa l'abbreviazione del mese per ridurre la lunghezza
          }}
          viewClassNames="calendar-view"
          contentHeight="auto"
          eventClassNames="text-sm"
          dayCellClassNames="text-xs"
        />
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        La data di check-out si riferisce alla mattina della partenza
        dell'ospite. Di conseguenza, nel calendario l'appartamento risulterà
        occupato fino alla notte del giorno precedente. Ad esempio, se il
        check-out è previsto per il 10, l'ultima notte prenotata sarà quella del
        9.
      </p>

      <BookingsList
        bookings={bookings}
        onBookingClick={(booking) => openBookingDetails(booking)}
      />

      {/* Modale per i dettagli della prenotazione */}
      <BookingModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        booking={selectedBooking}
        calendarType={selectedCalendar}
        onUpdate={loadBookings}
      />
    </div>
  );
};

export default AvailabilityCalendar;
