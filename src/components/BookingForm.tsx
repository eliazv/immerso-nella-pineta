
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  className?: string;
}

const BookingForm = ({ className }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [pets, setPets] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();

  const totalGuests = adults + children;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut || !name || !email) {
      toast({
        title: 'Compila tutti i campi obbligatori',
        description: 'Per favore, completa tutti i campi richiesti per procedere con la prenotazione.',
        variant: 'destructive',
      });
      return;
    }
    
    if (totalGuests > 4) {
      toast({
        title: 'Numero di ospiti eccessivo',
        description: 'Il numero massimo di ospiti (adulti + bambini) consentito è 4.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call - in a real scenario, send to the provided email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: 'Richiesta inviata con successo!',
        description: 'Ti contatteremo al più presto per confermare la tua prenotazione.',
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className={cn("p-8 bg-white rounded-xl border border-border flex flex-col items-center justify-center text-center", className)}>
        <div className="w-16 h-16 rounded-full bg-pine-light flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-pine-dark" />
        </div>
        <h3 className="font-serif text-xl font-medium mb-2">Richiesta inviata!</h3>
        <p className="text-muted-foreground mb-6">
          Grazie per la tua richiesta. Ti contatteremo al più presto per confermare la disponibilità e completare la prenotazione.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Invia un'altra richiesta
        </Button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("p-6 bg-white rounded-xl border border-border", className)}
    >
      <h3 className="font-serif text-xl font-medium mb-6">Richiedi prenotazione</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="check-in">Check-in (dalle 14:00)</Label>
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
                {checkIn ? format(checkIn, "PPP", { locale: it }) : "Seleziona data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
                locale={it}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="check-out">Check-out (entro le 10:00)</Label>
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
                {checkOut ? format(checkOut, "PPP", { locale: it }) : "Seleziona data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => !checkIn || date <= checkIn}
                locale={it}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="adults">Adulti (max 4 totali)</Label>
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
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefono</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          Per ulteriori informazioni:
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">📧 <a href="mailto:zavattaelia@gmail.com" className="text-primary hover:underline">zavattaelia@gmail.com</a></p>
          <p className="text-sm">📞 <a href="tel:+393938932793" className="text-primary hover:underline">+39 393 893 2793</a></p>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
