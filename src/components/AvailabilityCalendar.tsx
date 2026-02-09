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
import { RefreshCw, Building } from "lucide-react";

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
        forceRefresh,
      );

      // Se stiamo visualizzando tutti gli appartamenti, dobbiamo modificare
      // il titolo degli eventi per includere il nome dell'appartamento
      const processedEvents =
        selectedCalendar === "all"
          ? events.map((event) => ({
              ...event,
              title: `${getApartmentShortName(
                event.extendedProps.apartment,
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
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 px-2 md:px-0">
      <style>{`
        .fc-header-toolbar {
          padding: 0.5rem 0 !important;
          margin-bottom: 1.5rem !important;
          flex-wrap: wrap;
          gap: 12px;
        }
        .fc-header-toolbar .fc-toolbar-title {
          font-size: 1.5rem !important;
          font-weight: 900 !important;
          color: #1e293b;
          text-transform: capitalize;
          letter-spacing: -0.025em;
        }
        .fc-button {
          background-color: #f8fafc !important;
          border: none !important;
          color: #64748b !important;
          font-weight: 800 !important;
          font-size: 0.875rem !important;
          padding: 0.6rem 1.2rem !important;
          border-radius: 1rem !important;
          box-shadow: none !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fc-button-active {
          background-color: #10b981 !important;
          color: white !important;
          box-shadow: 0 4px 12px -2px rgba(16, 185, 129, 0.3) !important;
        }
        .fc-button:hover:not(.fc-button-active) {
          background-color: #f1f5f9 !important;
          transform: translateY(-1px);
        }
        .fc-daygrid-day-number {
          padding: 10px !important;
          font-size: 0.8rem !important;
          font-weight: 600 !important;
          color: #94a3b8 !important;
        }
        .fc-day-today {
          background-color: #f0fdf4 !important;
        }
        .fc-day-today .fc-daygrid-day-number {
          color: #10b981 !important;
          font-weight: 900 !important;
          background: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .fc-col-header-cell {
          padding: 16px 0 !important;
          background-color: transparent;
          border-bottom: 2px solid #f1f5f9 !important;
        }
        .fc-col-header-cell-cushion {
          font-size: 0.75rem !important;
          font-weight: 800 !important;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          text-decoration: none !important;
        }
        .fc-daygrid-event {
          border: none !important;
          padding: 4px 6px !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          margin-top: 3px !important;
          margin-bottom: 3px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }
        .fc-daygrid-event.fc-event-start {
          border-top-left-radius: 12px !important;
          border-bottom-left-radius: 12px !important;
          margin-left: 2px !important;
        }
        .fc-daygrid-event.fc-event-end {
          border-top-right-radius: 12px !important;
          border-bottom-right-radius: 12px !important;
          margin-right: 2px !important;
        }
        .fc-daygrid-event.fc-event-start.fc-event-end {
          border-radius: 12px !important;
        }
        .calendar-card {
          overflow: hidden;
          border: none;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.04);
        }
      `}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Calendario
          </h1>
          <p className="text-muted-foreground text-sm font-semibold flex items-center gap-2">
            <Building className="h-3.5 w-3.5 text-primary" />
            {apartmentNames[selectedCalendar as keyof typeof apartmentNames]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-4 md:p-6 shadow-md border border-slate-100 dark:border-slate-800">
          <div className=" flex flex-wrap items-center justify-between gap-4">
            {/* <h3 className="text-xl font-black text-slate-800 dark:text-white">
              Disponibilità
            </h3> */}
            {renderColorLegend()}
          </div>

          {isLoading && !events.length ? (
            <div className="h-[500px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-sm font-bold text-slate-400">
                  Caricamento calendario...
                </p>
              </div>
            </div>
          ) : (
            <div className="dark:text-slate-200">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="it"
                events={events}
                firstDay={1}
                eventClick={(info) => {
                  const booking = info.event.extendedProps as Booking;
                  openBookingDetails(booking);
                }}
                height="auto"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "",
                }}
                buttonText={{
                  today: "Oggi",
                  month: "Mese",
                }}
                titleFormat={{
                  year: "numeric",
                  month: "long",
                }}
                eventContent={(arg) => {
                  const ota =
                    arg.event.extendedProps?.OTA ||
                    arg.event.extendedProps?.ota;
                  return (
                    <div className="flex items-center gap-1.5 overflow-hidden py-0.5">
                      {ota && (
                        <span className="shrink-0 scale-110">
                          {getOtaLogo(ota)}
                        </span>
                      )}
                      <span className="truncate">{arg.event.title}</span>
                    </div>
                  );
                }}
              />
            </div>
          )}
        </div>

        <div>
          <BookingsList
            bookings={bookings}
            onBookingClick={(booking) => openBookingDetails(booking)}
          />
        </div>
      </div>

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
