
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X, Clock, Calendar, Car, Sparkles, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RulesListProps {
  className?: string;
}

const HouseRules = ({ className }: RulesListProps) => {
  const generalRules = [
    { rule: "No feste o eventi", allowed: false },
    { rule: "Animali domestici non ammessi", allowed: false },
    { rule: "Non è consentito fumare", allowed: false },
    { rule: "Check-in autonomo con cassetta di sicurezza", allowed: true },
    { rule: "Parcheggio privato incluso", allowed: true },
    { rule: "Lenzuola e asciugamani forniti", allowed: true },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-pine-dark" />
            Orari
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-sm">Check-in</span>
              <span className="text-sm font-medium">15:00 - 20:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Check-out</span>
              <span className="text-sm font-medium">10:00</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-pine-dark" />
            Politica di cancellazione
          </h3>
          <p className="text-sm">
            Cancellazione gratuita fino a 7 giorni prima del check-in.
            In caso di cancellazione tra 7 giorni e 24 ore prima dell'arrivo, 
            si applica una penale del 50%. Nessun rimborso per cancellazioni 
            effettuate meno di 24 ore prima dell'arrivo.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4">Regole della casa</h3>
        <ul className="space-y-3">
          {generalRules.map((item, index) => (
            <li key={index} className="flex items-start">
              {item.allowed ? (
                <Check className="h-5 w-5 text-pine-dark shrink-0 mr-3 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-destructive shrink-0 mr-3 mt-0.5" />
              )}
              <span className="text-sm">{item.rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
          <Car className="mr-2 h-5 w-5 text-pine-dark" />
          Parcheggio
        </h3>
        <p className="text-sm mb-2">
          Gli ospiti possono accedere comodamente al cortile interno con l'auto 
          e parcheggiare nel posto riservato, identificato dal numero 3.
        </p>
      </div>
      
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-pine-dark" />
          Pulizia e Servizi
        </h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b">
            <AccordionTrigger className="text-sm font-medium">
              Cosa è incluso nel soggiorno?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>
                Durante il soggiorno verrà fornito un set completo di lenzuola, 
                federe e asciugamani. Inoltre, avrete a disposizione delle stoviglie 
                e tutto il necessario per la pulizia della casa.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b">
            <AccordionTrigger className="text-sm font-medium">
              Cosa non è incluso?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>
                Non vengono forniti articoli per l'igiene personale, come saponi 
                da bagno, né generi alimentari.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-medium">
              Tassa di soggiorno
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>
                La tassa di soggiorno, pari a €1 per notte per adulto (dai 15 anni in su), 
                è applicabile dal 1° maggio al 30 settembre per un massimo di 7 pernottamenti 
                consecutivi. Il pagamento può essere effettuato separatamente tramite Pay Pal, 
                Satispay o bonifico bancario.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HouseRules;
