import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Clock,
  Mail,
  Phone,
  CalendarDays,
  Contact,
  LogIn,
  Key,
  Lock,
  FileText,
  Video,
  Flame,
  PocketKnife,
  Sparkles,
  Info,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-select";

interface RulesListProps {
  className?: string;
}

const HouseRules = ({ className }: RulesListProps) => {
  const generalRules = [
    { rule: "Animali domestici ammessi", allowed: true },
    { rule: "Lenzuola e asciugamani forniti", allowed: true },
    { rule: "No feste o eventi", allowed: false },
    { rule: "Non è consentito fumare", allowed: false },
    {
      rule: "Non accendere molti elettrodomestici simultaneamente",
      allowed: false,
    },
  ];

  return (
    <div className={cn("max-w-4xl space-y-10", className)}>
      {/* 1. SEZIONE ARRIVO (Priorità Massima) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-pine-dark flex items-center gap-2">
          <LogIn className="h-6 w-6" /> Arrivo e Check-in
        </h2>

        <Card className="rounded-[2rem] border-sea-dark/20 bg-sea-soft/10 overflow-hidden shadow-lg border-2">
          <CardHeader className="bg-sea-soft/20 border-b border-sea-dark/10 pb-4">
            <CardTitle className="text-xl font-serif flex items-center gap-2 text-sea-dark">
              <Key className="h-6 w-6" /> Istruzioni per l'Ingresso
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-sea-dark text-white w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold shadow-md">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-sea-dark">
                      Parcheggio Riservato
                    </h4>
                    <p className="text-muted-foreground">
                      Posto auto <strong>N. 3</strong> nel cortile interno,
                      proprio di fronte all'ingresso.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-sea-dark text-white w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold shadow-md">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-sea-dark">
                      Cassetta Chiavi
                    </h4>
                    <p className="text-muted-foreground">
                      Si trova a sinistra del portone principale.
                    </p>
                  </div>
                </div>

                <div className="bg-white/80 p-5 rounded-3xl border border-sea-dark/20 shadow-inner">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-sea-dark mb-4 flex items-center gap-2">
                    <Lock className="h-3 w-3" /> Procedura di apertura:
                  </h5>
                  <ol className="space-y-3">
                    {[
                      "Inserire il codice ricevuto via chat",
                      "Abbassare la levetta nera",
                      "Prendere le chiavi e richiudere",
                      "Mischiare i numeri",
                    ].map((step, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-sea-dark shrink-0" />{" "}
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sea-dark/20 to-pine-dark/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="/images/pina3/cassetta-checkin.jpeg"
                    alt="Cassetta chiavi"
                    className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 2. INFORMAZIONI ESSENZIALI */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-[2.5rem] bg-card/50 border-2 border-pine-dark/5 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2 text-pine-dark">
              <Clock className="h-5 w-5" /> Orari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-2xl">
              <span className="text-sm font-medium">Check-in</span>
              <Badge
                variant="outline"
                className="rounded-full border-pine-dark/30 text-pine-dark px-4"
              >
                dalle 14:00
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-2xl">
              <span className="text-sm font-medium">Check-out</span>
              <Badge
                variant="outline"
                className="rounded-full border-destructive/30 text-destructive px-4"
              >
                entro le 10:00
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2.5rem] bg-card/50 border-2 border-pine-dark/5 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2 text-pine-dark">
              <Contact className="h-5 w-5" /> Contatti Rapidi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="https://wa.me/393938932793"
              target="_blank"
              className="flex items-center p-3 hover:bg-pine-light/10 rounded-2xl transition-colors group"
            >
              <div className="bg-green-100 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium">+39 393 893 2793</span>
            </a>
            <a
              href="mailto:zavattaelia@gmail.com"
              className="flex items-center p-3 hover:bg-pine-light/10 rounded-2xl transition-colors group"
            >
              <div className="bg-blue-100 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">zavattaelia@gmail.com</span>
            </a>
          </CardContent>
        </Card>
      </section>

      {/* 3. REGOLE E NOTE (Accordion per compattezza) */}
      <section className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-pine-dark flex items-center gap-2">
          <FileText className="h-6 w-6" /> Regole e Note Importanti
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-[2.5rem] border-2 border-pine-dark/5 shadow-md">
            <CardContent>
              <ul className="space-y-3 pt-6">
                {generalRules.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <div
                      className={cn(
                        "p-1 rounded-full shrink-0",
                        item.allowed ? "bg-green-100" : "bg-red-100",
                      )}
                    >
                      {item.allowed ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                    <span className="text-muted-foreground">{item.rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-2 border-pine-dark/5 shadow-md bg-pine-light/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-serif">
                Note Burocratiche
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-pine-dark">
                  Registrazione Documenti
                </h4>
                <p className="text-xs text-muted-foreground">
                  Entro il primo giorno è obbligatorio inviare i documenti di
                  tutti gli ospiti via WhatsApp o Email.
                </p>
              </div>
              <Separator className="bg-pine-dark/10" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-pine-dark">
                  Tassa di Soggiorno
                </h4>
                <p className="text-xs text-muted-foreground">
                  €1/notte per adulto (dai 15 anni) nel periodo estivo. Pagabile
                  via Satispay o PayPal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. GUIDE TECNICHE */}
      <section className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-pine-dark flex items-center gap-2">
          <Video className="h-6 w-6" /> Guide all'Appartamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Caffè */}
          <Card className="rounded-[2.5rem] border-2 border-pine-dark/5 shadow-md overflow-hidden hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-serif flex items-center gap-3">
                <Video className="h-5 w-5 text-pine-dark" />
                Macchina del Caffè
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-sm border border-black/5">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/qd90HdASCKc"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Card Clima */}
          <Card className="rounded-[2.5rem] border-2 border-pine-dark/5 shadow-md overflow-hidden hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-serif flex items-center gap-3 text-amber-900">
                <Flame className="h-5 w-5 text-amber-500" />
                Riscaldamento e Clima
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-pine-dark" />
                  <h4 className="font-bold text-sm">Consumo Elettrico</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Evita di usare <strong>forno, boiler e riscaldamento</strong>{" "}
                  contemporaneamente per non far saltare la corrente.
                </p>
              </div>
              <Separator />
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 space-y-2">
                <div className="flex items-center gap-2">
                  <PocketKnife className="h-4 w-4 text-red-600" />
                  <h4 className="font-bold text-xs text-red-700 uppercase tracking-wider">
                    Corrente Saltata?
                  </h4>
                </div>
                <p className="text-xs text-red-600 leading-relaxed">
                  Il salvavita è nel{" "}
                  <strong>quadro elettrico all'ingresso</strong>. Se non riesci
                  a ripristinare, chiamami subito.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. RIFIUTI (Priorità Minore) */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-pine-dark flex items-center gap-2">
          <CalendarDays className="h-6 w-6" /> Rifiuti
        </h2>
        <Card className="rounded-[2.5rem] border-2 border-pine-dark/5 bg-white shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center">
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">Raccolta Differenziata</p>
                <p className="text-xs text-muted-foreground">
                  Metti i sacchetti fuori dalla porta la sera prima dei giorni
                  indicati.
                </p>
              </div>
              <Badge
                variant="secondary"
                className="rounded-full px-4 py-1 text-xs"
              >
                Porta a Porta
              </Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Organico",
                  days: "Ma-Ve-Do",
                  icon: "🍏",
                  color: "bg-green-50 border-green-100 text-green-700",
                },
                {
                  label: "Indifferen.",
                  days: "Sabato",
                  icon: "🗑️",
                  color: "bg-gray-100 border-gray-200 text-gray-700",
                },
                {
                  label: "Carta/Plast.",
                  days: "Nel Bidone",
                  icon: "📦",
                  color: "bg-blue-50 border-blue-100 text-blue-700",
                },
                {
                  label: "Vetro",
                  days: "Campane",
                  icon: "🍼",
                  color: "bg-amber-50 border-amber-100 text-amber-900",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-3xl border shadow-sm transition-transform hover:scale-105",
                    item.color,
                  )}
                >
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold">{item.days}</p>
                </div>
              ))}
            </div>

            <Collapsible>
              <CollapsibleTrigger className="w-full py-4 text-xs font-bold text-pine-dark flex items-center justify-center gap-2 hover:opacity-70">
                <CalendarDays className="h-4 w-4" /> Vedi Calendario Completo
                Hera
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="rounded-[2rem] overflow-hidden border-4 border-white shadow-xl mt-2">
                  <img
                    src="/rifiuti_calendario.jpg"
                    alt="Calendario Hera"
                    className="w-full h-auto"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HouseRules;
