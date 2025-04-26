import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarDays, Lock } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AvailabilityCalendarProps {
  className?: string;
}

interface Booking {
  Nome: string;
  OTA: string;
  CheckIn: string;
  CheckOut: string;
  Notti: string;
  adulti: string;
  bambini: string;
  TotaleCliente: string;
  FuoriOTA: string;
  CostoNotti: string;
  MediaANotte: string;
  Pulizia: string;
  Sconti: string;
  SoggiornoTax: string;
  OTATax: string;
  CedolareSecca: string;
  Totale: string;
  Note?: string;
}

// Tipo di calendario selezionabile
type CalendarType = "principale" | "secondario" | "terziario";

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [events, setEvents] = useState<
    { title: string; start: string; end: string; extendedProps: Booking }[]
  >([]);
  const [showOnlyUpcoming, setShowOnlyUpcoming] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");

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

  // Funzione per verificare il PIN
  const handlePinSubmit = () => {
    if (pin === "2222") {
      setIsAuthenticated(true);
      setPinError("");
      // Salva lo stato di autenticazione nel localStorage con timestamp
      localStorage.setItem(
        "calendarAuth",
        JSON.stringify({
          authenticated: true,
          timestamp: new Date().getTime(),
        })
      );
    } else {
      setPinError("PIN non valido. Riprova.");
      setPin("");
    }
  };

  // Funzione per recuperare i dati dal foglio Google Sheets
  const fetchBookings = async () => {
    try {
      let url =
        "https://opensheet.elk.sh/156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc/";

      // Seleziona il foglio corretto in base al calendario selezionato
      switch (selectedCalendar) {
        case "principale":
          url += "Affitti3";
          break;
        case "secondario":
          url += "Affitti4";
          break;
        case "terziario":
          url += "Affitti8";
          break;
        default:
          url += "Affitti3";
      }

      const response = await axios.get(url);
      const data = response.data;

      // Mappa i dati dell'API ai nuovi nomi dei campi
      const validBookings: Booking[] = data
        .filter((row: Record<string, string>) => row["Nome"] !== "")
        .map((row: Record<string, string>) => ({
          Nome: row["Nome"],
          OTA: row["OTA"],
          CheckIn: row["Check-in"],
          CheckOut: row["Check-out"],
          Notti: row["Notti"],
          adulti: row["adulti"],
          bambini: row["bambini"],
          TotaleCliente: row["Totale cliente"],
          FuoriOTA: row["Fuori OTA"],
          CostoNotti: row["Costo notti"],
          MediaANotte: row["Media a notte"],
          Pulizia: row["Pulizia"],
          Sconti: row["Sconti "],
          SoggiornoTax: row["Soggiorno Tax"],
          OTATax: row["OTA tax"],
          CedolareSecca: row["Cedolare Secca (21%)"],
          Totale: row["Totale"],
          Note: row["Note"],
        }));

      // Funzione per convertire le date da DD/MM/YYYY a YYYY-MM-DD
      const formatDate = (date: string) => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
      };

      // Crea eventi per il calendario con colori basati sull'OTA
      const events = validBookings.map((booking) => {
        let backgroundColor = "#808080"; // Default: grigio
        if (booking.OTA.toLowerCase() === "booking")
          backgroundColor = "#0000FF"; // Blu
        if (booking.OTA.toLowerCase() === "airbnb") backgroundColor = "#FF0000"; // Rosso
        if (booking.OTA.toLowerCase() === "extra") backgroundColor = "#008000"; // Verde

        return {
          title: `${booking.Nome} (${booking.OTA})`,
          start: formatDate(booking.CheckIn), // Converti la data
          end: formatDate(booking.CheckOut), // Converti la data
          backgroundColor, // Colore basato sull'OTA
          borderColor: backgroundColor,
          extendedProps: booking,
        };
      });

      setEvents(events);
      setBookings(validBookings);
    } catch (error) {
      console.error("Errore durante il recupero delle prenotazioni:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated, selectedCalendar]);

  const getOtaLogo = (ota: string) => {
    if (ota.toLowerCase() === "booking") {
      return (
        <img
          src="https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg"
          alt="Booking"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "airbnb") {
      return (
        <img
          src="https://img.icons8.com/?size=512&id=103424&format=png"
          alt="Airbnb"
          className="inline-block h-5 w-auto"
        />
      );
    }
    if (ota.toLowerCase() === "extra") {
      return;
    }
    return <span>{ota}</span>; // Fallback per altri OTA
  };

  // Funzione per filtrare le prenotazioni future
  const getFilteredBookings = () => {
    if (!showOnlyUpcoming) return bookings;

    const today = new Date();
    return bookings.filter((booking) => {
      // Converti la data di checkout da formato DD/MM/YYYY a Date
      const [checkoutDay, checkoutMonth, checkoutYear] =
        booking.CheckOut.split("/");
      const checkoutDate = new Date(
        `${checkoutYear}-${checkoutMonth}-${checkoutDay}`
      );

      // Mantieni la prenotazione se la data di checkout è oggi o successiva
      return checkoutDate >= today;
    });
  };

  // Se l'utente non è autenticato, mostra il form di inserimento PIN
  if (!isAuthenticated) {
    return (
      <div
        className={`bg-white rounded-xl p-6 shadow-md border ${className} flex flex-col items-center justify-center`}
      >
        <Lock className="h-8 w-8 text-primary mb-4" />
        <h2 className="font-serif text-xl font-medium mb-4">
          Area Protetta - Calendario Prenotazioni
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Inserisci il codice PIN per accedere al calendario delle prenotazioni
        </p>
        <div className="flex flex-col items-center w-full max-w-xs gap-4">
          <Input
            type="password"
            placeholder="Inserisci il PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="text-center text-lg"
            maxLength={4}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePinSubmit();
              }
            }}
          />
          {pinError && <p className="text-sm text-red-500">{pinError}</p>}
          <Button onClick={handlePinSubmit} className="w-full">
            Accedi
          </Button>
        </div>
      </div>
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
              // fetchBookings verrà chiamato dall'useEffect quando selectedCalendar cambia
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona calendario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="principale">N° 3</SelectItem>
              <SelectItem value="secondario">N° 4</SelectItem>
              <SelectItem value="terziario">N° 8</SelectItem>
            </SelectContent>
          </Select>
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
        eventClick={(info) => {
          const booking = info.event.extendedProps as Booking;
          alert(
            `Dettagli Prenotazione:\nNumero di Ospiti: ${
              parseInt(booking.adulti || "0") + parseInt(booking.bambini || "0")
            } (Adulti: ${booking.adulti || "0"}; Bambini: ${
              booking.bambini || "0"
            })\nCheck-in: ${booking.CheckIn}\nCheck-out: ${
              booking.CheckOut
            }\nTotale: ${booking.Totale}${
              booking.Note ? `\nNote: ${booking.Note}` : ""
            }`
          );
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

      <div>
        <div className="flex justify-between items-center my-6">
          <h3 className="font-serif text-lg font-medium">Lista Prenotazioni</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOnlyUpcoming(true)}
              className={`px-3 py-1 text-sm rounded-md ${
                showOnlyUpcoming
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Prossime
            </button>
            <button
              onClick={() => setShowOnlyUpcoming(false)}
              className={`px-3 py-1 text-sm rounded-md ${
                !showOnlyUpcoming
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Tutte
            </button>
          </div>
        </div>

        {bookings.length === 0 ? (
          <p className="text-muted-foreground">Nessuna prenotazione trovata.</p>
        ) : (
          <div className="space-y-4">
            {getFilteredBookings().map((booking, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                >
                  <div>
                    <strong>
                      {getOtaLogo(booking.OTA)} {booking.Nome}
                    </strong>{" "}
                    -{" "}
                    <span>
                      {booking.CheckIn} → {booking.CheckOut} ({booking.Notti}{" "}
                      notti - {booking.Totale} )
                    </span>
                  </div>
                  <button className="text-primary">
                    {expandedIndex === index ? "Nascondi" : "Dettagli"}
                  </button>
                </div>
                {expandedIndex === index && (
                  <div className="mt-4 text-sm text-muted-foreground grid grid-cols-3 gap-4">
                    <div>
                      <p>
                        <strong>Nome:</strong> {booking.Nome}
                      </p>
                      <p>
                        <strong>OTA:</strong> {booking.OTA}
                      </p>
                      <p>
                        <strong>Check-in:</strong> {booking.CheckIn}
                      </p>
                      <p>
                        <strong>Check-out:</strong> {booking.CheckOut}
                      </p>
                      <p>
                        <strong>Notti:</strong> {booking.Notti}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Adulti:</strong> {booking.adulti || "0"}
                      </p>
                      <p>
                        <strong>Bambini:</strong> {booking.bambini || "0"}
                      </p>
                      <p>
                        <strong>Totale Cliente:</strong>{" "}
                        {booking.TotaleCliente || "N/A"}
                      </p>
                      <p>
                        <strong>Fuori OTA:</strong> {booking.FuoriOTA || "N/A"}
                      </p>
                      <p>
                        <strong>Costo Notti:</strong>{" "}
                        {booking.CostoNotti || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Media a Notte:</strong>{" "}
                        {booking.MediaANotte || "N/A"}
                      </p>
                      <p>
                        <strong>Pulizia:</strong> {booking.Pulizia || "N/A"}
                      </p>
                      <p>
                        <strong>Sconti:</strong> {booking.Sconti || "N/A"}
                      </p>
                      <p>
                        <strong>Soggiorno Tax:</strong>{" "}
                        {booking.SoggiornoTax || "N/A"}
                      </p>
                      <p>
                        <strong>OTA Tax:</strong> {booking.OTATax || "N/A"}
                      </p>
                      <p>
                        <strong>Cedolare Secca (21%):</strong>{" "}
                        {booking.CedolareSecca || "N/A"}
                      </p>
                      <p>
                        <strong>Totale:</strong> {booking.Totale || "N/A"}
                      </p>
                      {booking.Note && (
                        <p>
                          <strong>Note:</strong> {booking.Note}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
