import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { Booking, CalendarEvent, CalendarType } from "@/types/calendar";
import { fetchBookings } from "@/services/newBookingService";
import BookingsList from "@/components/calendar/BookingsList";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
import BookingModal from "@/components/calendar/BookingModal";
import { NewBookingDropdown } from "@/components/calendar/NewBookingDropdown";
import { MigrationButton } from "@/components/calendar/MigrationButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { AccommodationService } from "@/services/accommodationService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { House } from "lucide-react";

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");
  const isMobile = useIsMobile();

  // Load saved apartment selection
  useEffect(() => {
    const savedCalendar = localStorage.getItem("selectedApartment");
    if (savedCalendar) {
      setSelectedCalendar(savedCalendar as CalendarType);
    }
  }, []);

  // Save apartment selection
  const handleCalendarChange = (value: CalendarType) => {
    setSelectedCalendar(value);
    localStorage.setItem("selectedApartment", value);
  };

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

  // Apre il modale con i dettagli della prenotazione
  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Get dynamic apartment mappings from AccommodationService
  const apartmentNames = AccommodationService.getCalendarTypeMapping();
  const shortNameMapping = AccommodationService.getShortNameMapping();
  const colorMapping = AccommodationService.getColorMapping();

  // Versione abbreviata dei nomi degli appartamenti per i titoli degli eventi
  const getApartmentShortName = (apartment?: string) => {
    if (!apartment) return "";
    return shortNameMapping[apartment] || "";
  };

  // Funzione per ottenere il titolo del calendario in base al tipo selezionato
  const getCalendarTitle = () => {
    return apartmentNames[selectedCalendar] || "Calendario Disponibilità";
  };

  // Legenda dei colori per la vista "all"
  const renderColorLegend = () => {
    if (selectedCalendar !== "all") return null;

    const activeAccommodations = AccommodationService.getActiveAccommodations();

    return (
      <div className="flex items-center gap-4 text-sm mt-2 justify-end flex-wrap">
        {activeAccommodations.map((acc) => (
          <div key={acc.id} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: acc.color }}
            ></div>
            <span>{acc.shortName}</span>
          </div>
        ))}
      </div>
    );
  };

  // Get apartment options for selector
  const accommodations = AccommodationService.getActiveAccommodations();
  const apartmentOptions = [
    ...accommodations.map((acc) => ({
      value: acc.id,
      label: acc.name,
      shortLabel: acc.shortName,
    })),
    { value: "all", label: "Tutti gli appartamenti", shortLabel: "Tutti" },
  ];

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

      {/* Page Header */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Calendario e Prenotazioni</h1>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Select value={selectedCalendar} onValueChange={handleCalendarChange}>
            <SelectTrigger className="w-[180px] sm:w-[220px]">
              <div className="flex items-center gap-2">
                <House className="h-4 w-4" />
                <SelectValue placeholder="Seleziona appartamento" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {apartmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">{option.shortLabel}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCalendar !== "all" && (
            <NewBookingDropdown
              calendarType={selectedCalendar}
              onAdd={loadBookings}
              isMobile={isMobile}
            />
          )}
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
