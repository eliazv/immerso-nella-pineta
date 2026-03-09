import React from "react";
import {
  Waves,
  Wind,
  Sailboat,
  Sun,
  MapPin,
  Clock,
  Euro,
  User,
  Anchor,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const SportAcquaticiPinarella = () => {
  const waterSports = [
    {
      name: "SUP - Stand Up Paddle",
      difficulty: "Facile",
      suitableFor: "Tutti",
      bestPeriod: "Giugno - Settembre",
      price: "€15-25/ora",
      description:
        "Il SUP è lo sport acquatico più accessibile e popolare a Pinarella. Le acque basse e calme della spiaggia di Pinarella sono perfette per principianti. Puoi noleggiare la tavola e iniziare subito, anche senza esperienza.",
      schools: [
        "Cervia Sup School - Lungomare",
        "Beach Planet - Pinarella",
      ],
      highlights: [
        "Adatto a tutti",
        "Acque basse e sicure",
        "Max 30 min per imparare",
        "Attività rilassante",
      ],
    },
    {
      name: "Windsurf",
      difficulty: "Medio",
      suitableFor: "Intermedi - Avanzati",
      bestPeriod: "Maggio - Ottobre",
      price: "€20-35/ora",
      description:
        "Pinarella offre condizioni ideali per il windsurf, con vento costante (ma non troppo forte) e acque poco profonde. Le spiagge libere sono perfette per lanciarsi. Corsi disponibili per chi vuole imparare.",
      schools: [
        "Windsurf Club Cervia",
        "Scuola Vela Milano Marittima",
      ],
      highlights: [
        "Vento costante",
        "Acque basse",
        "Scuole qualificate",
        "Adrenaline puro",
      ],
    },
    {
      name: "Kayak",
      difficulty: "Facile",
      suitableFor: "Tutti",
      bestPeriod: "Maggio - Settembre",
      price: "€12-20/ora",
      description:
        "Esplora la costa romagnola in kayak! Partendo dalla spiaggia di Pinarella, puoi paddle fino a Milano Marittima o verso le saline. Attività perfetta per coppie e famiglie, rilassante e green.",
      schools: [
        "Canoa Club Cervia",
        "Noleggio Kayak Pinarella",
      ],
      highlights: [
        "Esplorazione costiera",
        "Family-friendly",
        "Natura e relax",
        "Attività green",
      ],
    },
    {
      name: "Vela e Catamarán",
      difficulty: "Medio - Avanzato",
      suitablePer: "Adulti e ragazzi",
      bestPeriod: "Giugno - Settembre",
      price: "€40-80/uscita",
      description:
        "Impara a navigare con i corsi di vela offerti dalle scuole di Milano Marittima e Cervia. Catamarani e derive disponibili per tutti i livelli. Esperienza indimenticabile per gli appassionati del mare.",
      schools: [
        "Club Nautico Cervia",
        "Scuola Vela Mil Marittima",
        "Yacht Club Milano Marittima",
      ],
      highlights: [
        "Corso con istruttore",
        "Bella esperienza",
        "Tutti i livelli",
        "Certificazioni possibili",
      ],
    },
    {
      name: "Immersioni",
      difficulty: "Avanzato",
      suitableFor: "Certificati",
      bestPeriod: "Giugno - Settembre",
      price: "€50-100/immersione",
      description:
        "Per i subacquei certificati, la costa romagnola offre interessanti siti di immersione. Le acque dell'Adriatico nascondono relitti, secche e una fauna marina varia. Corsi anche per principianti.",
      schools: [
        "Diving Center Cervia",
        "Sub Cervia",
      ],
      highlights: [
        "Siti interessanti",
        "Istruttori esperti",
        "Corsi open water",
        "Attrezzatura inclusa",
      ],
    },
  ];

  const whyPinarella = [
    {
      title: "Acque Basse e Sicure",
      icon: Waves,
      description:
        "La spiaggia di Pinarella ha fondali molto bassi, ideali per famiglie con bambini e principianti. Puoi camminare per decine di metri senza perderti docchio.",
    },
    {
      title: "Vento Ideale",
      icon: Wind,
      description:
        "Il vento nella zona è costante ma mai eccessivo, creando condizioni perfette per windsurf e vela. Non serve essere esperti per godersi il mare.",
    },
    {
      title: "Clima Mild",
      icon: Sun,
      description:
        "Le temperature del mare raggiungono i 24-26 gradi in estate, permettendo di praticare sport acquatici per molte ore al giorno senza freddo.",
    },
    {
      title: "Strutture Qualificate",
      icon: Anchor,
      description:
        "Numerose scuole accredited offrono corsi per tutti i livelli, con istruttori qualificati e attrezzature a noleggio a prezzi accessibili.",
    },
  ];

  const tips = [
    {
      title: "Quando Andare",
      content:
        "Il periodo migliore per gli sport acquatici è da maggio a settembre. Giugno e settembre offrono meno folla e prezzi migliori. Luglio e agosto sono più affollati ma con più scuole e servizi attivi.",
    },
    {
      title: "Cosa Portare",
      content:
        "Costume da bagno, crema solare (resistente all'acqua), occhiali da sole con cordino, asciugamano. Per il SUP: maglietta uv, berretto. Tutte le attrezzature sono fornite dai noleggi.",
    },
    {
      title: "Prenotazione",
      content:
        "Consiglia prenotare in anticipo nei mesi di luglio e agosto, soprattutto per i corsi. Nei periodi di bassa stagione puoi presentarti direttamente al noleggio.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Sport Acquatici a Pinarella: SUP, Windsurf, Kayak e Vela 2026",
    description:
      "Scopri gli sport acquatici a Pinarella di Cervia: SUP, windsurf, kayak, vela e immersioni. Guida completa con scuole, prezzi e consigli pratici.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80",
    datePublished: "2026-03-09",
    dateModified: "2026-03-09",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Sport Acquatici a Pinarella: SUP, Windsurf, Kayak e Vela 2026"
      description="Scopri gli sport acquatici a Pinarella di Cervia: SUP, windsurf, kayak, vela e immersioni. Guida completa con scuole, prezzi e consigli per tutti i livelli."
      heroImage="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&q=80"
      publishDate="9 Marzo 2026"
      readingTime="6 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/sport-acquatici-pinarella")}
      keywords="sport acquatici Pinarella, SUP Cervia, windsurf Pinarella, kayak Romagna, vela Cervia"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Le acque calme e basse di Pinarella di Cervia sono il teatro perfetto
        per tantissimi sport acquatici. Dal rilassante Stand Up Paddle
        all'adrenalinico windsurf, passando per il kayak e la vela, le opzioni
        per gli amanti del mare sono tantissime.
      </p>

      <h2>Perché Scegliere Pinarella per gli Sport Acquatici</h2>
      <p>
        Pinarella offre condizioni uniche per gli sport acquatici: fondali bassi e
        sicuri, vento costante ma mai troppo forte, temperature del mare gradevoli
        da maggio a settembre e numerose scuole qualificate. È il posto ideale
        sia per chi vuole avvicinarsi al mare in modo attivo, sia per gli
        sportivi esperti.
      </p>
      <p>
        Soggiornando a "Immerso nella Pineta", potrai praticare sport acquatici
        ogni giorno: la spiaggia è a soli 5 minuti dalla nostra struttura, e
        diverse scuole si trovano proprio sul lungomare di Pinarella.
      </p>

      <h2>Gli Sport Acquatici a Pinarella</h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {waterSports.map((sport, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Waves className="w-5 h-5 text-pine-600" />
                  {sport.name}
                </CardTitle>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {sport.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {sport.suitableFor}
                </span>
                <span className="flex items-center gap-1">
                  <Sun className="w-4 h-4" /> {sport.bestPeriod}
                </span>
                <span className="flex items-center gap-1">
                  <Euro className="w-4 h-4" /> {sport.price}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{sport.description}</p>
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  Scuole:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sport.schools.map((school, i) => (
                    <span
                      key={i}
                      className="text-xs bg-pine-100 text-pine-700 px-2 py-1 rounded"
                    >
                      {school}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {sport.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Perché Pinarella è Ideale</h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {whyPinarella.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <item.icon className="w-5 h-5 text-pine-600" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Yoga sulla Spiaggia</h2>
      <p>
        Per chi cerca un'esperienza più rilassante, Pinarella offre anche sessioni
        di yoga sulla spiaggia. All'alba o al tramonto, con i piedi nella sabbia
        e il suono delle onde, praticare yoga diventa un'esperienza rigenerante.
        Diverse scuole di yoga organizzano sessioni daily durante l'estate.
      </p>

      <h2>Consigli Pratici</h2>

      <div className="grid md:grid-cols-3 gap-6 not-prose my-12">
        {tips.map((tip, index) => (
          <Card key={index} className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Dopo lo Sport: Relax nella Pineta</h2>
      <p>
        Dopo una mattinata di sport acquatici, cosa c'è di meglio di una
        passeggiata nella pineta di Pinarella? Il fresco degli alberi è
        perfetto per rilassarsi, e la nostra struttura "Immerso nella Pineta"
        offre proprio questo: la possibilità di passare dalla spiaggia alla
        quiete della pineta in pochi minuti.
      </p>

      <div className="bg-pine-50 p-8 rounded-2xl my-12">
        <h3 className="mt-0">Prenota e Pratica Sport Acquatici</h3>
        <p>
          Scegli "Immerso nella Pineta" per la tua vacanza attiva a Pinarella. A
          soli 5 minuti dalla spiaggia e dalle scuole di sport acquatici, potrai
          dedicarti al mare ogni giorno. Contattaci per disponibilità e
          suggerimenti sulle scuole!
        </p>
      </div>
    </BlogPostLayout>
  );
};

export default SportAcquaticiPinarella;
