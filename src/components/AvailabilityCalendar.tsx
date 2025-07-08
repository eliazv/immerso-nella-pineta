import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { useOutletContext } from "react-router-dom";
import {
  Booking,
  CalendarEvent,
  CalendarType,
  Apartment,
} from "@/types/calendar";
import {
  fetchBookings,
  createBooking,
  CreateBookingData,
  searchBookingsByName,
} from "@/services/localBookingService";
import { getActiveApartments } from "@/services/apartmentService";
import BookingsList from "@/components/calendar/BookingsList";
import { getOtaLogo } from "@/components/calendar/getOtaLogo";
import BookingModal from "@/components/calendar/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AvailabilityCalendarProps {
  className?: string;
}

// Interfaccia per il contesto condiviso dal layout
interface BackofficeContext {
  selectedCalendar: CalendarType;
}

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]); // Tutte le prenotazioni per la ricerca
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Form state per nuova prenotazione
  const [formData, setFormData] = useState<CreateBookingData>({
    Nome: "",
    OTA: "",
    CheckIn: "",
    CheckOut: "",
    Notti: "1",
    adulti: "2",
    bambini: "0",
    animali: "0",
    TotaleCliente: "0",
    FuoriOTA: "0",
    CostoNotti: "0",
    MediaANotte: "0",
    Pulizia: "0",
    Sconti: "0",
    SoggiornoTax: "0",
    OTATax: "0",
    CedolareSecca: "0",
    Totale: "0",
    Note: "",
    apartment: "",
  });

  // Ottiene il calendario selezionato dal contesto del layout
  const { selectedCalendar } = useOutletContext<BackofficeContext>();

  // Carica gli appartamenti all'avvio
  useEffect(() => {
    const apartmentList = getActiveApartments();
    setApartments(apartmentList);
  }, []);

  // Carica i dati quando il componente viene montato o cambia calendario
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const { events, bookings } = await fetchBookings(selectedCalendar);

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

        setEvents(processedEvents);
        setBookings(bookings);
        setAllBookings(bookings); // Salva tutte le prenotazioni per la ricerca
      } catch (error) {
        console.error(
          "Errore durante il caricamento delle prenotazioni:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedCalendar]);

  // Gestisce la ricerca
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setBookings(allBookings);
    } else {
      const filtered = searchBookingsByName(searchQuery, selectedCalendar);
      setBookings(filtered);
    }
  }, [searchQuery, allBookings, selectedCalendar]);

  // Inizializza il form quando si apre la modale di creazione
  useEffect(() => {
    if (isCreateModalOpen) {
      resetForm();
    }
  }, [isCreateModalOpen, selectedCalendar]);

  // Funzione per resettare il form
  const resetForm = () => {
    setFormData({
      Nome: "",
      OTA: "",
      CheckIn: "",
      CheckOut: "",
      Notti: "1",
      adulti: "2",
      bambini: "0",
      animali: "0",
      TotaleCliente: "0",
      FuoriOTA: "0",
      CostoNotti: "0",
      MediaANotte: "0",
      Pulizia: "0",
      Sconti: "0",
      SoggiornoTax: "0",
      OTATax: "0",
      CedolareSecca: "0",
      Totale: "0",
      Note: "",
      apartment: selectedCalendar !== "all" ? getDefaultApartmentId() : "",
    });
  };

  // Ottiene l'ID dell'appartamento di default basato sul calendario selezionato
  const getDefaultApartmentId = (): string => {
    if (selectedCalendar === "all") return "";

    const apartment = apartments.find((apt) => {
      switch (selectedCalendar) {
        case "principale":
          return apt.name === "N° 3";
        case "secondario":
          return apt.name === "N° 4";
        case "terziario":
          return apt.name === "N° 8";
        default:
          return false;
      }
    });

    return apartment ? apartment.id : apartments[0]?.id || "";
  };

  // Gestisce la creazione di una nuova prenotazione
  const handleCreateBooking = async () => {
    try {
      setIsLoading(true);

      // Assicurati che l'appartamento sia selezionato
      if (!formData.apartment) {
        toast({
          title: "Errore",
          description: "Seleziona un appartamento",
          variant: "destructive",
        });
        return;
      }

      await createBooking(formData);

      toast({
        title: "Successo",
        description: "Prenotazione creata con successo",
      });

      // Ricarica i dati
      const { events, bookings } = await fetchBookings(selectedCalendar);
      setEvents(events);
      setBookings(bookings);
      setAllBookings(bookings);

      // Chiudi la modale e resetta il form
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Errore",
        description:
          error instanceof Error ? error.message : "Errore nella creazione",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Funzione per caricare le prenotazioni
  const loadBookings = async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      const { events, bookings } = await fetchBookings(
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

      setEvents(processedEvents);
      setBookings(bookings);
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
      {/* Header con titolo e bottone */}

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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewBookingClick={() => setIsCreateModalOpen(true)}
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

      {/* Modale per creare nuova prenotazione */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crea Nuova Prenotazione</DialogTitle>
            <DialogDescription>
              Inserisci i dettagli della nuova prenotazione
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Cliente *</Label>
                <Input
                  id="nome"
                  value={formData.Nome}
                  onChange={(e) =>
                    setFormData({ ...formData, Nome: e.target.value })
                  }
                  placeholder="Nome del cliente"
                />
              </div>
              <div>
                <Label htmlFor="ota">OTA/Canale</Label>
                <Select
                  value={formData.OTA}
                  onValueChange={(value) =>
                    setFormData({ ...formData, OTA: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona canale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Airbnb">Airbnb</SelectItem>
                    <SelectItem value="Booking.com">Booking.com</SelectItem>
                    <SelectItem value="Diretto">Diretto</SelectItem>
                    <SelectItem value="Altro">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="apartment">Appartamento *</Label>
              <Select
                value={formData.apartment}
                onValueChange={(value) =>
                  setFormData({ ...formData, apartment: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona appartamento" />
                </SelectTrigger>
                <SelectContent>
                  {apartments.map((apartment) => (
                    <SelectItem key={apartment.id} value={apartment.id}>
                      {apartment.name} - {apartment.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkin">Check-in *</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={formData.CheckIn}
                  onChange={(e) => {
                    const newCheckIn = e.target.value;
                    setFormData({
                      ...formData,
                      CheckIn: newCheckIn,
                      // Se il check-out è prima o uguale al check-in, resettalo
                      CheckOut:
                        formData.CheckOut && formData.CheckOut <= newCheckIn
                          ? ""
                          : formData.CheckOut,
                    });
                  }}
                />
              </div>
              <div>
                <Label htmlFor="checkout">Check-out *</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={formData.CheckOut}
                  min={
                    formData.CheckIn
                      ? new Date(
                          new Date(formData.CheckIn).getTime() +
                            24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0]
                      : undefined
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, CheckOut: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="adulti">Adulti</Label>
                <Input
                  id="adulti"
                  type="number"
                  min="1"
                  value={formData.adulti}
                  onChange={(e) =>
                    setFormData({ ...formData, adulti: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="bambini">Bambini</Label>
                <Input
                  id="bambini"
                  type="number"
                  min="0"
                  value={formData.bambini}
                  onChange={(e) =>
                    setFormData({ ...formData, bambini: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="animali">Animali</Label>
                <Input
                  id="animali"
                  type="number"
                  min="0"
                  value={formData.animali}
                  onChange={(e) =>
                    setFormData({ ...formData, animali: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totaleCliente">Totale Cliente (€)</Label>
                <Input
                  id="totaleCliente"
                  type="number"
                  step="0.01"
                  value={formData.TotaleCliente}
                  onChange={(e) =>
                    setFormData({ ...formData, TotaleCliente: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="pulizia">Pulizia (€)</Label>
                <Input
                  id="pulizia"
                  type="number"
                  step="0.01"
                  value={formData.Pulizia}
                  onChange={(e) =>
                    setFormData({ ...formData, Pulizia: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="soggiornoTax">Tassa di Soggiorno (€)</Label>
                <Input
                  id="soggiornoTax"
                  type="number"
                  step="0.01"
                  value={formData.SoggiornoTax}
                  onChange={(e) =>
                    setFormData({ ...formData, SoggiornoTax: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="otaTax">OTA Tax (€)</Label>
                <Input
                  id="otaTax"
                  type="number"
                  step="0.01"
                  value={formData.OTATax}
                  onChange={(e) =>
                    setFormData({ ...formData, OTATax: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="sconti">Sconti (€)</Label>
                <Input
                  id="sconti"
                  type="number"
                  step="0.01"
                  value={formData.Sconti}
                  onChange={(e) =>
                    setFormData({ ...formData, Sconti: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-lg font-semibold">Totale Netto</Label>
              <div className="text-2xl font-bold text-green-600">
                €
                {(
                  parseFloat(formData.TotaleCliente || "0") -
                  parseFloat(formData.SoggiornoTax || "0") -
                  parseFloat(formData.OTATax || "0") -
                  parseFloat(formData.Sconti || "0")
                ).toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Totale Cliente - Tasse - Sconti
              </p>
            </div>

            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                value={formData.Note}
                onChange={(e) =>
                  setFormData({ ...formData, Note: e.target.value })
                }
                placeholder="Note aggiuntive..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Annulla
            </Button>
            <Button onClick={handleCreateBooking} disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea Prenotazione"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvailabilityCalendar;
