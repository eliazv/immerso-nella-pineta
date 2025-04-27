import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

import { Booking, CalendarEvent, CalendarType } from "@/types/calendar";
import { fetchBookings } from "@/services/bookingService";
import PinAuth from "@/components/calendar/PinAuth";
import BookingsList from "@/components/calendar/BookingsList";
import BookingModal from "@/components/calendar/BookingModal";

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Verifica se l'utente è già autenticato al caricamento del componente
  useEffect(() => {
    const authStatus = localStorage.getItem("calendarAuth");
    if (authStatus) {
      const { timestamp, authenticated } = JSON.parse(authStatus);
      // Controlla se l'autenticazione è ancora valida (24 ore)
      const now = new Date().getTime();
      if (authenticated && now - timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        // Autenticazione scaduta
        localStorage.removeItem("calendarAuth");
      }
    }
  }, []);

  // Carica i dati quando l'utente è autenticato o cambia calendario
  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated, selectedCalendar]);

  // Funzione per caricare le prenotazioni
  const loadBookings = async () => {
    const { events, bookings } = await fetchBookings(selectedCalendar);
    setEvents(events);
    setBookings(bookings);
  };

  // Apre il modale con i dettagli della prenotazione
  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Se l'utente non è autenticato, mostra il form di inserimento PIN
  if (!isAuthenticated) {
    return (
      <PinAuth
        onAuthenticate={() => setIsAuthenticated(true)}
        className={className}
      />
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md border ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-serif text-xl font-medium">
          Calendario Disponibilità
        </h2>
        <div className="flex items-center gap-3">
          <Select
            value={selectedCalendar}
            onValueChange={(value) => {
              // Reset eventi e prenotazioni prima di cambiare calendario
              setEvents([]);
              setBookings([]);
              setSelectedCalendar(value as CalendarType);
              // loadBookings verrà chiamato dall'useEffect quando selectedCalendar cambia
            }}
          >
            <SelectTrigger className="min-w-[100px] w-auto">
              <SelectValue placeholder="Seleziona calendario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="principale">N° 3</SelectItem>
              <SelectItem value="secondario">N° 4</SelectItem>
              <SelectItem value="terziario">N° 8</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem("calendarAuth");
              setIsAuthenticated(false);
            }}
          >
            Esci
          </Button>
        </div>
      </div>

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
      />

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">
          Calendario attivo:{" "}
          {selectedCalendar === "principale"
            ? "Appartamento 3"
            : selectedCalendar === "secondario"
            ? "Appartamento 4"
            : "Appartamento 8"}
        </h3>
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
