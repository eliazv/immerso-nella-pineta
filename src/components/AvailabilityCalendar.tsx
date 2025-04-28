import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { useOutletContext } from "react-router-dom";

import { Booking, CalendarEvent, CalendarType } from "@/types/calendar";
import { fetchBookings, refreshBookingsCache } from "@/services/bookingService";
import BookingsList from "@/components/calendar/BookingsList";
import BookingModal from "@/components/calendar/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const isMobile = useIsMobile();

  // Ottiene il calendario selezionato dal contesto del layout
  const { selectedCalendar } = useOutletContext<BackofficeContext>();

  // Carica i dati quando il componente viene montato o cambia calendario
  useEffect(() => {
    loadBookings();
  }, [selectedCalendar]);

  // Funzione per caricare le prenotazioni
  const loadBookings = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      const { events, bookings, isCachedData } = await fetchBookings(
        selectedCalendar,
        forceRefresh
      );

      // Controlla se i dati sono stati caricati dalla cache in base al tempo di risposta
      // e al flag restituito dal servizio
      setIsCached(isCachedData);
      setEvents(events);
      setBookings(bookings);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Errore durante il caricamento delle prenotazioni:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Funzione per forzare un aggiornamento dei dati
  const handleRefresh = async () => {
    await loadBookings(true);
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
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {!isMobile && <span>Caricamento...</span>}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
                </svg>
                {!isMobile && <span>Aggiorna dati</span>}
              </>
            )}
          </button>
        </div>
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
