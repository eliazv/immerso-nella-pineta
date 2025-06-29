import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isBefore, isWithinInterval } from "date-fns";
import { it } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

// emailjs.init("cL0t8BEEWVW6SEE86");

interface BookingFormProps {
  className?: string;
}

interface Booking {
  Nome: string;
  OTA: string;
  CheckIn: string;
  CheckOut: string;
  // altri campi non necessari per il calendario di disponibilità
}

const BookingForm = ({ className }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [pets, setPets] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [disabledDates, setDisabledDates] = useState<
    { from: Date; to: Date }[]
  >([]);
  const [isCalendarLoading, setIsCalendarLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const totalGuests = adults + children;

  // TODO: Sostituire la logica di fetch delle date con una query a Firestore
  // useEffect(() => {
  //   // Esempio: fetch delle date occupate da Firestore
  //   // setIsCalendarLoading(true);
  //   // ...
  //   // setDisabledDates([...]);
  //   // setIsCalendarLoading(false);
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !name || !phone) {
      toast({
        title: "Compila tutti i campi obbligatori",
        description:
          "Per favore, completa tutti i campi richiesti per procedere con la prenotazione.",
        variant: "destructive",
      });
      return;
    }

    if (totalGuests > 4) {
      toast({
        title: "Numero di ospiti eccessivo",
        description:
          "Il numero massimo di ospiti (adulti + bambini) consentito è 4.",
        variant: "destructive",
      });
      return;
    }

    const whatsappMessage = `Ciao, vorrei richiedere una prenotazione per l'appartamento Immerso nella Pineta 3 con i seguenti dettagli:
- Nome: ${name}
- Check-in: ${
      checkIn
        ? format(checkIn, "dd/MM/yyyy", { locale: it })
        : "Non specificato"
    }
- Check-out: ${
      checkOut
        ? format(checkOut, "dd/MM/yyyy", { locale: it })
        : "Non specificato"
    }
- Adulti: ${adults}
- Bambini: ${children}
- Animali: ${pets}
- Telefono: ${phone}
- Messaggio: ${message || "Nessun messaggio"}`;

    const whatsappUrl = `https://wa.me/393938932793?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  // Function to check if a date is in one of the disabled periods
  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (isBefore(date, new Date())) return true;

    // Check if date is in any of the disabled periods
    return disabledDates.some(({ from, to }) => {
      // La data è disabilitata se cade nel periodo di una prenotazione
      // (nota: il check-out è disponibile come data di check-in per nuove prenotazioni)
      const adjustedTo = new Date(to);
      adjustedTo.setDate(adjustedTo.getDate() - 1); // La disponibilità termina il giorno prima del checkout

      return isWithinInterval(date, { start: from, end: adjustedTo });
    });
  };

  // Funzione per verificare se c'è disponibilità per un intervallo di date
  const isRangeAvailable = (start: Date, end: Date) => {
    // Crea un array di date da controllare (dal giorno dopo il check-in fino al check-out escluso)
    const dateToCheck = new Date(start);
    dateToCheck.setDate(dateToCheck.getDate() + 1); // Inizia dal giorno dopo il check-in

    // Controlla ogni giorno tra start e end (escluso il giorno di end che è il check-out)
    while (dateToCheck < end) {
      if (isDateDisabled(dateToCheck)) {
        return false; // Se una qualsiasi data nell'intervallo è disabilitata, l'intero intervallo non è disponibile
      }
      dateToCheck.setDate(dateToCheck.getDate() + 1);
    }
    return true; // Tutte le date nell'intervallo sono disponibili
  };

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "p-8 bg-white rounded-xl border border-border flex flex-col items-center justify-center text-center",
          className
        )}
      >
        <div className="w-16 h-16 rounded-full bg-pine-light flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-pine-dark" />
        </div>
        <h3 className="font-serif text-xl font-medium mb-2">
          Richiesta inviata!
        </h3>
        <p className="text-muted-foreground mb-6">
          Grazie per la tua richiesta. Ti contatteremo al più presto per
          confermare la disponibilità e completare la prenotazione.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Invia un'altra richiesta
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("p-6 bg-white rounded-xl border border-border", className)}
    >
      <h3 className="font-serif text-xl font-medium mb-6">
        Richiedi prenotazione
      </h3>

      {/* Alert rimosso: ora la disponibilità è gestita solo tramite Firestore */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="check-in">Check-in (dalle 14:00) *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="check-in"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn
                  ? format(checkIn, "PPP", { locale: it })
                  : "Seleziona data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              {isCalendarLoading ? (
                <div className="p-6 flex flex-col items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Caricamento date...
                  </p>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date);
                    // Se il check-out è già selezionato e prima del nuovo check-in o se l'intervallo non è disponibile, resetta il check-out
                    if (
                      checkOut &&
                      (isBefore(checkOut, date) ||
                        !isRangeAvailable(date, checkOut))
                    ) {
                      setCheckOut(undefined);
                    }
                  }}
                  initialFocus
                  disabled={isDateDisabled}
                  locale={it}
                  className="rounded-md border pointer-events-auto"
                />
              )}
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-out">Check-out (entro le 10:00) *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="check-out"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut
                  ? format(checkOut, "PPP", { locale: it })
                  : "Seleziona data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              {isCalendarLoading ? (
                <div className="p-6 flex flex-col items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Caricamento date...
                  </p>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  disabled={(date) => {
                    if (!checkIn) return isDateDisabled(date);

                    // Non permettere date di check-out prima del check-in o date disabilitate
                    if (isBefore(date, checkIn) || isDateDisabled(date))
                      return true;

                    // Controlla che tutte le date tra check-in e check-out siano disponibili
                    return !isRangeAvailable(checkIn, date);
                  }}
                  locale={it}
                  className="rounded-md border pointer-events-auto"
                />
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* <div className="text-right mb-4">
        <a
          href="https://calendar.google.com/calendar/u/1?cid=MDhjMDg1ZTEyZWVkZTVmNTY4ZWQ4ZmViMDk5ZjlmZjA1NGFiMDc0N2UyYTgyMmZhZjE4ZmI3M2I5MGU0MTgzNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Verifica disponibilità completa
        </a>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="adults">Adulti *</Label>
          <Input
            id="adults"
            type="number"
            min={1}
            max={4}
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="children">Bambini</Label>
          <Input
            id="children"
            type="number"
            min={0}
            max={3}
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pets">Animali</Label>
          <Input
            id="pets"
            type="number"
            min={0}
            max={2}
            value={pets}
            onChange={(e) => setPets(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="space-y-2 text-right">
          <Label htmlFor="name">Massimo 4 ospiti (animali esclusi)</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefono *</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Messaggio</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Eventuali richieste speciali o informazioni aggiuntive..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      {totalGuests > 4 && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          Il numero massimo di ospiti consentito è 4 (adulti + bambini).
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || totalGuests > 4}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Invio in corso...
          </>
        ) : (
          "Richiedi disponibilità"
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        * Campi obbligatori. Inviando il modulo, accetti di essere contattato
        riguardo alla tua richiesta di prenotazione.
      </p>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Oppure contattaci direttamente ai recapiti qui sotto: siamo a
          disposizione per qualsiasi informazione aggiuntiva!
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            📧{" "}
            <a
              href="mailto:zavattaelia@gmail.com"
              className="text-primary hover:underline"
            >
              zavattaelia@gmail.com
            </a>
          </p>
          <p className="text-sm">
            📞{" "}
            <a
              href="tel:+393938932793"
              className="text-primary hover:underline"
            >
              +39 393 893 2793
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
