import React from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Clock,
  Calendar,
  Car,
  Sparkles,
  ChevronDown,
  Mail,
  Phone,
  CalendarDays,
  Video,
  ChevronRight,
  ExternalLink,
  Contact,
  LogOut,
  PocketKnife,
  Flame,
  FileText,
  Power,
  Thermometer,
  Fan,
  TimerIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RulesListProps {
  className?: string;
}

const HouseRules = ({ className }: RulesListProps) => {
  const generalRules = [
    { rule: "Animali domestici ammessi", allowed: true },
    // { rule: "Check-in autonomo con cassetta di sicurezza", allowed: true },
    // { rule: "Parcheggio privato incluso", allowed: true },
    { rule: "Lenzuola e asciugamani forniti", allowed: true },
    { rule: "No feste o eventi", allowed: false },
    { rule: "Non è consentito fumare", allowed: false },
    {
      rule: "Non accendere molti elettrodomestici simultaneamente",
      allowed: false,
    },
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
              <span className="text-sm font-medium">dalle 14:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-sm">Check-out</span>
              <span className="text-sm font-medium">fino alle 10:00</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
            <Contact className="mr-2 h-5 w-5 text-pine-dark" />
            Contatti
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Mail className="h-5 w-5 text-pine-dark shrink-0 mr-3" />
              <a
                href="mailto:zavattaelia@gmail.com"
                className="text-sm hover:underline"
              >
                zavattaelia@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 text-pine-dark shrink-0 mr-3" />
              <a
                href="https://wa.me/393938932793"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                +39 393 893 2793
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4">Regole generali</h3>
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
          <LogOut className="mr-2 h-5 w-5 text-pine-dark" />
          Check Out
        </h3>

        <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
          <li>Spegnete tutte le luci e gli elettrodomestici utilizzati.</li>
          <li>
            Chiudete a chiave la porta principale e assicuratevi di chiudere
            anche le finestre.
          </li>
          <li>Riponete le chiavi nella cassettina di sicurezza.</li>
        </ul>
      </div>{" "}
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
          <Car className="mr-2 h-5 w-5 text-pine-dark" />
          Parcheggio e Accesso
        </h3>
        <div className="space-y-3">
          <p className="text-sm">
            🚗 <strong>Parcheggio riservato:</strong> Gli ospiti possono
            accedere comodamente al cortile interno con l'auto e parcheggiare
            nel posto riservato, identificato dal numero 3 e situato di fronte
            all'ingresso.
          </p>
          <p className="text-sm">
            🔑 <strong>Accesso autonomo:</strong> L'appartamento dispone di un
            sistema di accesso autonomo tramite una cassetta di sicurezza con
            codice, rendendo l'arrivo e la partenza semplici e flessibili.
          </p>
          <p className="text-sm">
            📳 <strong>Assistenza durante il soggiorno:</strong> Se hai bisogno
            di supporto o hai domande, non esitare a contattarmi in qualsiasi
            momento. Sarò disponibile per aiutarti!
          </p>
        </div>
      </div>
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <h3 className="font-serif text-lg font-medium mb-4 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-pine-dark" />
          Note importanti
        </h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b">
            <AccordionTrigger className="text-base font-medium">
              Registrazione ospiti
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>
                Entro il primo giorno di soggiorno, sarà necessario fornire le
                copie dei documenti. Potete inviarli tramite{" "}
                <a
                  href="https://wa.me/393938932793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  WhatsApp
                </a>{" "}
                al numero +39 393 893 2793 o via email a zavattaelia@gmail.com .
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b">
            <AccordionTrigger className="text-base font-medium">
              Tassa di soggiorno
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p>
                Tassa di soggiorno: €1 a notte per ogni adulto (dai 15 anni in
                su), applicabile dal 1° maggio al 30 settembre, fino a un
                massimo di 7 notti. Può essere inviata tramite{" "}
                <a
                  href="https://web.satispay.com/download/qrcode/S6Y-CON--5446AE79-BEE5-47B2-9D2C-1512F17C8AF9?locale=it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Satispay
                </a>
                ,{" "}
                <a
                  href="https://www.paypal.com/paypalme/eliazavatta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  PayPal
                </a>{" "}
                ai contatti indicati sopra o bonifico bancario (IBAN:
                IT92W0357601601010002973340).
              </p>
            </AccordionContent>
          </AccordionItem>{" "}
          <AccordionItem value="item-3" className="border-b">
            <AccordionTrigger className="text-medium font-medium">
              Cosa è incluso nel soggiorno?
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-3">
                🍽️ <strong>Dotazioni e comfort disponibili:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Set completo di lenzuola, federe e asciugamani</li>
                <li>Stoviglie e utensili da cucina</li>
                <li>Prodotti per la pulizia della casa</li>
                <li>Deumidificatore</li>
                <li>Seggiolone per bambini (disponibile su richiesta)</li>
              </ul>

              <p className="mb-3">
                ❗ <strong>Nota bene:</strong> non vengono forniti articoli per
                l'igiene personale (es. saponi da bagno) né generi alimentari.
              </p>

              <p className="mb-3">
                🛒 <strong>Servizi e negozi vicini:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Estate (giugno-settembre): supermercato più vicino a 200 metri
                </li>
                <li>Tutto l'anno: Grande supermercato a 2 km</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b">
            <AccordionTrigger className="text-medium font-medium">
              Riscaldamento e climatizzazione
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-3">
                🔥 <strong>Riscaldamento:</strong> Nei mesi freddi,
                l'appartamento è riscaldato da uno split con pompa di calore
                situato nel soggiorno.
              </p>
              <p className="mb-3">
                In camera da letto è presente una stufetta elettrica portatile,
                facilmente spostabile anche in bagno.
              </p>
              <p className="text-amber-600">
                ⚡ <strong>Consumo elettrico:</strong> Si raccomanda di non
                accendere troppi elettrodomestici contemporaneamente, per
                evitare il sovraccarico dell'impianto elettrico.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h3 className="font-serif text-lg font-medium flex items-center">
              <Video className="mr-2 h-5 w-5 text-pine-dark" />
              Istruzioni Macchina Caffè
            </h3>
            <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/qd90HdASCKc"
                title="Istruzioni Macchina Caffè"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="mb-3">
                La nostra macchina per il caffè è facile da usare, ma ecco
                alcune istruzioni utili:
              </p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>
                  Assicuratevi che il serbatoio dell'acqua sia riempito almeno
                  fino al livello minimo.
                </li>
                <li>
                  Inserite la cialda nell'apposito vano dopo aver sollevato la
                  leva.
                </li>
                <li>
                  Abbassate la leva e premete il pulsante per il tipo di caffè
                  desiderato.
                </li>
                <li>Attendete che l'erogazione sia completata.</li>
                <li>
                  Non dimenticate di rimuovere la cialda usata dopo aver
                  preparato il caffè.
                </li>
              </ol>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h3 className="font-serif text-lg font-medium flex items-center">
              <Flame className="mr-2 h-5 w-5 text-pine-dark" />
              Istruzioni per il Termoventilatore
            </h3>
            <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-3">
                Ecco le istruzioni per utilizzare correttamente il
                termoventilatore:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-base flex items-center mb-3">
                    <Power className="h-4 w-4 mr-2 text-pine-dark" />
                    Accensione e Spegnimento
                  </h4>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li>Inserire la spina nella presa di corrente.</li>
                    <li>
                      Toccare il pulsante sull'apparecchio per accendere il
                      termoventilatore. L'apparecchio emetterà un segnale
                      acustico.
                    </li>
                    <li>
                      Toccare nuovamente il pulsante per spegnere il
                      termoventilatore. L'apparecchio inizierà un conto alla
                      rovescia di 15 secondi prima di spegnersi.
                    </li>
                  </ol>
                  <p className="mt-3 text-amber-600">
                    <strong>Nota:</strong> Per sicurezza, il termoventilatore si
                    spegne automaticamente dopo 16 ore di funzionamento continuo
                    senza interazioni.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-base flex items-center mb-3">
                    <Fan className="h-4 w-4 mr-2 text-pine-dark" />
                    Modalità di Funzionamento
                  </h4>
                  <p className="mb-2">
                    Toccare il pulsante per cambiare tra le quattro modalità
                    disponibili:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <strong>Modalità automatica:</strong> Il dispositivo
                      funziona autonomamente regolando la potenza in base alla
                      temperatura ambiente.
                    </li>
                    <li>
                      <strong>Modalità alta:</strong> Velocità elevata per un
                      riscaldamento potente e rapido.
                    </li>
                    <li>
                      <strong>Modalità bassa:</strong> Offre una piacevole
                      brezza riscaldata a potenza ridotta.
                    </li>
                    <li>
                      <strong>Modalità ventilazione:</strong> Funziona solo come
                      ventilatore senza riscaldamento.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-base flex items-center mb-3">
                    <Thermometer className="h-4 w-4 mr-2 text-pine-dark" />
                    Regolazione della Temperatura
                  </h4>
                  <p>
                    In modalità automatica, è possibile regolare la temperatura
                    toccando i pulsanti + o -. L'intervallo di temperatura va da
                    1°C a 37°C.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium text-base flex items-center mb-3">
                    <TimerIcon className="h-4 w-4 mr-2 text-pine-dark" />
                    Timer
                  </h4>
                  <p>
                    Premere il pulsante timer per impostare le ore di
                    funzionamento (da 1 a 12 ore).
                  </p>
                  <p className="mt-2">
                    Per annullare il timer, tenere premuto il pulsante per 3
                    secondi.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                <h4 className="font-medium text-base mb-2">Altre funzioni</h4>
                <ul className="space-y-2">
                  <li>
                    <strong>Oscillazione:</strong> Toccare il pulsante
                    oscillazione per attivare il movimento del termoventilatore.
                  </li>
                  <li>
                    <strong>Riattivazione display:</strong> Dopo lo spegnimento
                    dello schermo, toccare qualsiasi pulsante per riattivarlo.
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-200">
                <p className="text-amber-700 font-medium">Attenzione:</p>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-amber-700">
                  <li>
                    Non collocare oggetti infiammabili vicino al
                    termoventilatore
                  </li>
                  <li>
                    Mantenere una distanza di sicurezza di almeno 1 metro da
                    mobili e tende
                  </li>
                  <li>Non coprire mai il termoventilatore durante l'uso</li>
                  <li>
                    In caso di malfunzionamento, scollegare immediatamente dalla
                    presa
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <a
                  href="https://www.documents.philips.com/assets/20230920/d6f6f430cdc74f2588eeb083006040af.pdf#page=9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Manuale completo del termoventilatore
                </a>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h3 className="font-serif text-lg font-medium flex items-center">
              <PocketKnife className="mr-2 h-5 w-5 text-pine-dark" />
              E' saltata la corrente?
            </h3>
            <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-3">Contattami</p>
              {/* <p className="mb-3">riavvia contatore e allega foto:</p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>prendere chiave in posto x</li>
                <li>uscire</li>
                <li>andare x</li>
                <li>aprire</li>
                <li>spegni accendi e metti aposto</li>
                <li>riaccendi salvavita?</li>
              </ol> */}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="p-6 rounded-xl border border-border bg-card/50">
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <h3 className="font-serif text-lg font-medium flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-pine-dark" />
              Calendario Raccolta Rifiuti
            </h3>
            <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-sm mb-4">
              A Pinarella è attivo il sistema di raccolta differenziata porta a
              porta. Vi preghiamo di rispettare il calendario della raccolta per
              contribuire a mantenere pulito e sostenibile il nostro ambiente.
              Per soggiorni brevi ci occuperemo noi dello smaltimento dei
              rifiuti al check-out.
            </p>
            <div className="aspect-auto w-full mb-6">
              <img
                src="public\rifiuti_calendario.jpg"
                alt="Calendario Raccolta Rifiuti"
                className="rounded-lg border border-border w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-pine-light/30 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Organico</h4>
                <p className="text-xs">Martedì, Venerdì, Domenica</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Carta e Cartone</h4>
                <p className="text-xs">Bidoni all'esterno</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Plastica e Lattine</h4>
                <p className="text-xs">Bidoni all'esterno</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <h4 className="font-medium text-sm mb-1">Indifferenziato</h4>
                <p className="text-xs">Sabato</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Nel nostro appartamento troverete i contenitori per la raccolta
              differenziata. Vi chiediamo gentilmente di buttare i rifiuti nei
              bidoni all'esterno la sera prima del giorno di raccolta.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default HouseRules;
