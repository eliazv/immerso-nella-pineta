import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarDays } from "lucide-react";
import axios from "axios";

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Funzione per recuperare i dati dal foglio Google Sheets
  const fetchBookings = async () => {
    try {
      const url =
        "https://opensheet.elk.sh/156gOCNUFzwT4hmpxn2_9GE9Ionzlng3Rw0rAzoaktuc/Affitti3";
      const response = await axios.get(url);
      const data = response.data;

      // Filtra le prenotazioni valide
      const validBookings = data.filter((row: any) => row["Nome"] !== "");

      // Converte i dati in un array di date prenotate
      const dates: Date[] = [];
      validBookings.forEach((row: any) => {
        const startDate = new Date(row["Check-in"]);
        const endDate = new Date(row["Check-out"]);
        for (
          let date = new Date(startDate);
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          dates.push(new Date(date));
        }
      });

      setBookedDates(dates);
      setBookings(validBookings);
    } catch (error) {
      console.error("Errore durante il recupero delle prenotazioni:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Funzione per aggiungere un indicatore visivo alle date prenotate
  const tileContent = ({ date }: { date: Date }) => {
    const isBooked = bookedDates.some(
      (bookedDate) =>
        bookedDate.getFullYear() === date.getFullYear() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getDate() === date.getDate()
    );

    return isBooked ? (
      <div className="flex justify-center items-center">
        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
      </div>
    ) : null;
  };

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

  return (
    <div className={`bg-white rounded-xl p-6 shadow-md border ${className}`}>
      <h3 className="font-serif text-xl font-medium mb-4">
        Calendario Disponibilità
      </h3>
      <div className="mb-6">
        <Calendar
          tileClassName={({ date }) =>
            bookedDates.some(
              (bookedDate) =>
                bookedDate.getFullYear() === date.getFullYear() &&
                bookedDate.getMonth() === date.getMonth() &&
                bookedDate.getDate() === date.getDate()
            )
              ? "bg-red-100"
              : ""
          }
          tileContent={tileContent}
          className="mx-auto"
          locale="it-IT"
        />
      </div>

      <Alert className="mb-6">
        <CalendarDays className="h-4 w-4" />
        <AlertTitle>Sincronizzazione con Google Sheets</AlertTitle>
        <AlertDescription className="mt-2">
          Questo calendario mostra le date di prenotazione sincronizzate con il
          nostro foglio Google Sheets.
        </AlertDescription>
      </Alert>

      <div>
        <h4 className="font-serif text-lg font-medium mb-4">
          Lista Prenotazioni
        </h4>
        {bookings.length === 0 ? (
          <p className="text-muted-foreground">Nessuna prenotazione trovata.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
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
                      {booking["Check-in"]} → {booking["Check-out"]} (
                      {booking.Notti} notti - {booking["Totale"]} )
                    </span>
                  </div>
                  <button className="text-primary">
                    {expandedIndex === index ? "Nascondi" : "Dettagli"}
                  </button>
                </div>
                {expandedIndex === index && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    {booking.Note && <p>Note: {booking.Note}</p>}
                    <p>Adulti: {booking.adulti || "0"}</p>
                    <p>Bambini: {booking.bambini || "0"}</p>
                    <p>Totale Cliente: {booking["Totale cliente"] || "N/A"}</p>
                    <p>Totale: {booking["Totale"] || "N/A"}</p>
                    <p>Costo Notti: {booking["Costo notti"] || "N/A"}</p>
                    <p>Pulizia: {booking["Pulizia"] || "N/A"}</p>
                    <p>Media a Notte: {booking["Media a notte"] || "N/A"}</p>
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
