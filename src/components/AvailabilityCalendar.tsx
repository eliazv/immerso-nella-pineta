import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { useOutletContext } from "react-router-dom";
import { Booking, CalendarEvent, CalendarType } from "@/types/calendar";
import { fetchBookings } from "@/services/bookingService";
import BookingsList from "@/components/calendar/BookingsList";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
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

      // Se stiamo visualizzando tutti gli appartamenti, dobbiamo modificare
      // il titolo degli eventi per includere il nome dell'appartamento
      const processedEvents =
        selectedCalendar === "all"
          ? events.map((event) => ({
              ...event,
              title: `${getApartmentShortName(
                event.extendedProps.apartment
              )} - ${event.title}`,
            }))
          : events;

      // Controlla se i dati sono stati caricati dalla cache in base al tempo di risposta
      // e al flag restituito dal servizio
      setIsCached(isCachedData);
      setEvents(processedEvents);
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
    all: "Tutti gli appartamenti",
  };

  // Versione abbreviata dei nomi degli appartamenti per i titoli degli eventi
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

  // Funzione per ottenere il titolo del calendario in base al tipo selezionato
  const getCalendarTitle = () => {
    return apartmentNames[selectedCalendar] || "Calendario Disponibilità";
  };

  // Legenda dei colori per la vista "all"
  const renderColorLegend = () => {
    if (selectedCalendar !== "all") return null;

    return (
      <div className="flex items-center gap-4 text-sm mt-2 justify-end">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#3498db]"></div>
          <span>App. 3</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#e74c3c]"></div>
          <span>App. 4</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#2ecc71]"></div>
          <span>App. 8</span>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      <style>{`
        .fc-header-toolbar {
          padding: 0.1rem 0 !important;
          min-height: 2rem !important;
          margin-bottom: 0.5rem !important;
        }
        .fc-header-toolbar .fc-toolbar-title {
          font-size: 1.4rem !important;
          font-weight: 500 !important;
          margin: 0 !important;
          line-height: 1.2 !important;
        }
        .fc-header-toolbar .fc-button {
          font-size: 1rem !important;
          padding: 0.1rem 0.3rem !important;
          height: 2.3rem !important;
          line-height: 1 !important;
        }
        .fc-header-toolbar .fc-toolbar-chunk {
          display: flex !important;
          align-items: center !important;
          height: 2.5rem !important;
        }
        /* Eventi calendario con bordi arrotondati intelligenti e posizione a metà giornata */
        .fc-daygrid-event-harness {
          overflow: visible !important;
        }
        .fc-daygrid-event {
          border-radius: 0 !important;
        }
        /* Solo l'inizio della prenotazione ha il bordo sinistro arrotondato e inizia a metà */
        .fc-daygrid-event.fc-event-start {
          border-top-left-radius: 8px !important;
          border-bottom-left-radius: 8px !important;
          margin-left: 10% !important;
        }
        /* Solo la fine della prenotazione ha il bordo destro arrotondato e finisce a metà */
        .fc-daygrid-event.fc-event-end {
          border-top-right-radius: 8px !important;
          border-bottom-right-radius: 8px !important;
          margin-right: 10% !important;
        }
        /* Eventi che continuano da una settimana all'altra (né inizio né fine) */
        .fc-daygrid-event:not(.fc-event-start):not(.fc-event-end) {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        /* Se la prenotazione è di un solo giorno, ha tutti i bordi arrotondati e centrata */
        .fc-daygrid-event.fc-event-start.fc-event-end {
          border-radius: 8px !important;
          margin-left: 3.57% !important;
          margin-right: 3.57% !important;
        }
      `}</style>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium">Calendario e Prenotazioni</h2>
          <p className="text-muted-foreground">
            {apartmentNames[selectedCalendar]}
          </p>
        </div>

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

      {renderColorLegend()}

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
          viewClassNames="calendar-view "
          contentHeight="auto"
          eventClassNames="text-sm"
          dayCellClassNames="text-xs"
          eventContent={(arg) => {
            // Mostra il logo OTA accanto al titolo della prenotazione, se disponibile
            const ota =
              arg.event.extendedProps?.OTA || arg.event.extendedProps?.ota;
            // Rimuove la dicitura tra parentesi (es. (airbnb), (booking), ecc.) dal titolo

            return (
              <div className="flex items-center gap-1">
                {ota && getOtaLogo(ota)}
                <span>{arg.event.title}</span>
              </div>
            );
          }}
        />
      </div>

      {/* <p className="text-xs text-muted-foreground mt-4">
        La data di check-out si riferisce alla mattina della partenza
        dell'ospite. Di conseguenza, nel calendario l'appartamento risulterà
        occupato fino alla notte del giorno precedente. Ad esempio, se il
        check-out è previsto per il 10, l'ultima notte prenotata sarà quella del
        9.
      </p> */}

      <BookingsList
        bookings={bookings}
        onBookingClick={(booking) => openBookingDetails(booking)}
      />

      {/* Modale per i dettagli della prenotazione */}
      <BookingModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        booking={selectedBooking}
        calendarType={
          selectedCalendar === "all" && selectedBooking?.apartment
            ? (selectedBooking.apartment as CalendarType)
            : selectedCalendar
        }
        onUpdate={loadBookings}
      />
    </div>
  );
};

export default AvailabilityCalendar;
