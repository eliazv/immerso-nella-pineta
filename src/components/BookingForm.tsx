import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, Check, Loader2, Link } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your service ID
emailjs.init("cL0t8BEEWVW6SEE86");

interface BookingFormProps {
  className?: string;
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

  useEffect(() => {
    // Fetch booking calendar data
    const fetchBookingData = async () => {
      setIsCalendarLoading(true);
      try {
        const urls = [
          "https://ical.booking.com/v1/export?t=7939dd36-fb7a-45a6-a2ae-7174518b66ec",
          "https://www.airbnb.it/calendar/ical/1170325824706403059.ics?s=0a303b3e94eb31f05a723c183ba7eb15",
        ];

        // For demo purposes, let's add some dates
        // In a real implementation, you would parse the iCal files to extract bookings
        const unavailableDates = [
          { from: new Date(2024, 6, 1), to: new Date(2024, 6, 15) }, // July 1-15
          { from: new Date(2024, 7, 10), to: new Date(2024, 7, 20) }, // August 10-20
          { from: new Date(2024, 5, 25), to: new Date(2024, 5, 30) }, // June 25-30
        ];

        setDisabledDates(unavailableDates);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        toast({
          title: "Errore nel caricamento del calendario",
          description:
            "Non è stato possibile caricare le date di disponibilità. Usa il link al Google Calendar per verificare.",
          variant: "destructive",
        });
      } finally {
        setIsCalendarLoading(false);
      }
    };

    fetchBookingData();
  }, [toast]);

  const sendEmail = async () => {
    try {
      const templateParams = {
        to_email: "zavattaelia@gmail.com",
        from_name: name,
        from_email: email,
        check_in: checkIn
          ? format(checkIn, "dd/MM/yyyy", { locale: it })
          : "Non specificato",
        check_out: checkOut
          ? format(checkOut, "dd/MM/yyyy", { locale: it })
          : "Non specificato",
        adults: adults,
        children: children,
        pets: pets,
        phone: phone || "Non specificato",
        message: message || "Nessun messaggio",
        reply_to: email,
      };

      const serviceId = "service_8vct8zl";
      const templateId = "template_rbva3vf";

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log("Email sent successfully:", response);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Errore nell'invio",
        description:
          "Si è verificato un problema nell'invio dell'email. Riprova più tardi o contattaci direttamente.",
        variant: "destructive",
      });
      return false;
    }
  };

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
    return disabledDates.some(({ from, to }) =>
      isWithinInterval(date, { start: from, end: to })
    );
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

      {/* <Alert className="mb-6">
        <CalendarIcon className="h-4 w-4" />
        <AlertTitle>Disponibilità</AlertTitle>
        <AlertDescription className="mt-2">
          Per vedere la disponibilità aggiornata in tempo reale, consultare il nostro <a 
            href="https://calendar.google.com/calendar/u/1?cid=MDhjMDg1ZTEyZWVkZTVmNTY4ZWQ4ZmViMDk5ZjlmZjA1NGFiMDc0N2UyYTgyMmZhZjE4ZmI3M2I5MGU0MTgzNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline inline-flex items-center"
          >
            Google Calendar
            <Link className="h-3 w-3 ml-1" />
          </a>.
        </AlertDescription>
      </Alert> */}

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
                  onSelect={setCheckIn}
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
                    return isBefore(date, checkIn) || isDateDisabled(date);
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
