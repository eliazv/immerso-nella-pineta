import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CalendarDays, Link } from "lucide-react";
import { addDays } from "date-fns";

interface AvailabilityCalendarProps {
  className?: string;
}

const AvailabilityCalendar = ({ className }: AvailabilityCalendarProps) => {
  // This is a simplified version - a full implementation would fetch data from
  // the Google Calendar API to determine availability
  const today = new Date();

  // Sample unavailable dates (in a real implementation, these would come from the Google Calendar)
  const disabledDates = [
    { from: new Date(2024, 6, 1), to: new Date(2024, 6, 15) }, // July 1-15
    { from: new Date(2024, 7, 10), to: new Date(2024, 7, 20) }, // August 10-20
  ];

  return (
    <div className={className}>
      <div className="bg-white rounded-xl p-6 shadow-md border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-serif text-xl font-medium">
            Calendario disponibilità
          </h3>
          <div className="inline-flex items-center text-sm text-muted-foreground">
            <span className="w-3 h-3 bg-primary rounded-full mr-2"></span> Date
            non disponibili
          </div>
        </div>

        <Calendar
          mode="range"
          disabled={[{ before: today }, ...disabledDates]}
          numberOfMonths={2}
          className="rounded-md border mx-auto"
        />

        <Alert className="mt-6">
          <CalendarDays className="h-4 w-4" />
          <AlertTitle>Sincronizzazione con Google Calendar</AlertTitle>
          <AlertDescription className="mt-2">
            Questo calendario mostra solo date di esempio. Per vedere la
            disponibilità aggiornata in tempo reale, consultare il nostro{" "}
            <a
              href="https://calendar.google.com/calendar/u/1?cid=MDhjMDg1ZTEyZWVkZTVmNTY4ZWQ4ZmViMDk5ZjlmZjA1NGFiMDc0N2UyYTgyMmZhZjE4ZmI3M2I5MGU0MTgzNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline inline-flex items-center"
            >
              Google Calendar
              <Link className="h-3 w-3 ml-1" />
            </a>
            .
          </AlertDescription>
        </Alert>

        {/* <div className="mt-6 flex justify-center">
          <Button asChild>
            <a 
              href="https://calendar.google.com/calendar/u/1?cid=MDhjMDg1ZTEyZWVkZTVmNTY4ZWQ4ZmViMDk5ZjlmZjA1NGFiMDc0N2UyYTgyMmZhZjE4ZmI3M2I5MGU0MTgzNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verifica disponibilità completa
            </a>
          </Button>
        </div> */}
      </div>

      <div className="mt-4 text-sm text-center text-muted-foreground">
        <p>
          Per un'integrazione completa con Google Calendar, contattaci per
          implementare un sistema di prenotazione sincronizzato.
        </p>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
