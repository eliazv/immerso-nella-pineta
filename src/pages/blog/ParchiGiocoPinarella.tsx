import React from "react";
import {
  Baby,
  MapPin,
  Clock,
  Ticket,
  TreePine,
  Palmtree,
  Joystick,
  Coffee,
  Umbrella,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const ParchiGiocoPinarella = () => {
  const playgrounds = [
    {
      name: "Parco dei Pirati",
      location: "Pinarella, Lungomare",
      type: "Parco divertimenti",
      ages: "3-12 anni",
      opening: "Giugno - Settembre",
      hours: "10:00 - 24:00",
      price: "Ingresso gratuito, attrazioni a pagamento",
      highlights: [
        "Mini car",
        "Veliero dei pirati",
        "Sala giochi",
        "Bar e ristorante",
      ],
      description:
        "Il parco divertimenti per eccellenza a Pinarella. Situato sul lungomare, offre attrazioni per grandi e piccini. Il veliero dei pirati è l'attrazione star, mentre la sala giochi intrattiene i più grandi.",
    },
    {
      name: "Parco Lento",
      location: "Pinarella, Via d'Annunzio",
      type: "Parco pubblico",
      ages: "Tutte le età",
      opening: "Tutto l'anno",
      hours: "Sempre aperto",
      price: "Gratuito",
      highlights: [
        "Aree verdi",
        "Percorso skate",
        "Panchine ombreggiate",
        "Vicino alla spiaggia",
      ],
      description:
        "Il parco verde per famiglie di Pinarella. Ideale per picnic, corse e relax. Presente un percorso skate per i più temerari e ampie zone ombreggiate per i genitori.",
    },
    {
      name: "Pineta Baby",
      location: "Pinarella, within Pineta",
      type: "Area naturale",
      ages: "0-10 anni",
      opening: "Tutto l'anno",
      hours: "Sempre aperto",
      price: "Gratuito",
      highlights: [
        "Ombra naturale",
        "Giochi in legno",
        "Sentieri pedalabili",
        "Aria fresca",
      ],
      description:
        "Area dedicata ai più piccoli all'interno della pineta. Giochi in legno naturali, sentieri sicuri per passeggiate con il passeggino e tanto verde. Perfetto per sfuggire al caldo estivo.",
    },
    {
      name: "Bimbobell Show",
      location: "Pinarella, Lungomare",
      type: "Spettacolo",
      ages: "2-10 anni",
      opening: "Estate (date variabili)",
      hours: "18:00 - 21:00",
      price: "Gratuito",
      highlights: [
        "Spettacoli per bambini",
        "Animazione",
        "Laboratori creativi",
        " Musica e balli",
      ],
      description:
        "Rassegna di spettacoli di animazione per bambini organizzata dal Comune di Cervia. Ogni estate animatori professionisti intrattengono i più piccoli con giochi, balli e spettacoli divertenti.",
    },
  ];

  const beachServices = [
    {
      name: "Bagno Anna 95",
      location: "Pinarella",
      service: "Mini Club",
      description: "Animazione e giochi in spiaggia per bambini 4-10 anni",
    },
    {
      name: "Hotel Levante",
      location: "Pinarella",
      service: "Mini Club",
      description: "Attività ludiche e sportive con animatori",
    },
    {
      name: "Fabbri Family Village",
      location: "Cervia",
      service: "Baby Club e Mini Club",
      description: "Animazione completa per tutte le fasce d'età",
    },
    {
      name: "Club Family Hotel Costa dei Pini",
      location: "Pinarella",
      service: "Junior Club",
      description: "Attività per ragazzi 10-14 anni",
    },
  ];

  const tips = [
    {
      title: "Orari Consigliati",
      content:
        "Parco dei Pirati: mattina presto (10-13) per evitare folla. Pomeriggio dopo le 17 quando il caldo diminuisce. Nei fine settimana può essere molto affollato.",
    },
    {
      title: "Cosa Portare",
      content:
        "Crema solare, cappellino, acqua. Per il Parco Lento e la Pineta: cambi di vestiti, pallone, giochi da spiaggia. Per la spiaggia: ombrellone personale o prenota stabilimento con servizi baby.",
    },
    {
      title: "Parco Lento",
      content:
        "Il Parco Lento è perfetto nelle ore calde: ombra naturale dei pini, fresco garantito. Vicinissimo alla spiaggia, ideale per alternare mare e verde.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Guida ai Parchi Gioco per Bambini a Pinarella e Cervia 2026",
    description:
      "Scopri i migliori parchi gioco per bambini a Pinarella di Cervia: Parco dei Pirati, Parco Lento, Pineta Baby. Guida completa con orari, prezzi e attrazioni.",
    image: "https://images.unsplash.com/photo-1596464716127-f9a0859d4b54?w=1200&q=80",
    datePublished: "2026-03-09",
    dateModified: "2026-03-09",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Guida ai Parchi Gioco per Bambini a Pinarella e Cervia 2026"
      description="Scopri i migliori parchi gioco per bambini a Pinarella di Cervia: Parco dei Pirati, Parco Lento, Pineta Baby e spettacoli estivi. Guida completa con orari e prezzi."
      heroImage="https://images.unsplash.com/photo-1596464716127-f9a0859d4b54?w=1200&q=80"
      publishDate="9 Marzo 2026"
      readingTime="6 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/parchi-gioco-bambini-pinarella")}
      keywords="parco giochi Pinarella, bambini Pinarella, Parco dei Pirati, attrazioni bambini Cervia, family Pinarella"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Pinarella di Cervia è una delle destinazioni più family-friendly della
        Riviera Romagnola. Con i suoi parchi gioco, le aree verdi nella pineta e
        i servizi dedicati ai più piccoli, è la meta perfetta per famiglie con
        bambini di tutte le età.
      </p>

      <h2>Perché Pinarella è Ideale per le Famiglie</h2>
      <p>
        Pinarella deve il suo nome alla bellissima pineta che la circonda, un
        polmone verde di 25 ettari che offre refrigerio nelle giornate estive e
        spazi sicuri per giocare. La località è stata riconosciuta con la
        Bandiera Verde di Legambiente, che certifica la qualità delle spiagge e
        dei servizi per le famiglie.
      </p>
      <p>
        A "Immerso nella Pineta" accogliamo famiglie con bambini di tutte le
        età. La nostra posizione, immersa nella pineta e a pochi minuti dal mare,
        permette ai genitori di alternare momenti al mare con passeggiate nel
        verde, in totale sicurezza.
      </p>

      <h2>I Migliori Parchi Gioco a Pinarella</h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {playgrounds.map((park, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Joystick className="w-5 h-5 text-pine-600" />
                  {park.name}
                </CardTitle>
                <span className="text-xs bg-pine-100 text-pine-700 px-2 py-1 rounded-full">
                  {park.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {park.location}
              </p>
              <div className="flex gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Baby className="w-4 h-4" /> {park.ages}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {park.hours}
                </span>
                <span className="flex items-center gap-1">
                  <Ticket className="w-4 h-4" /> {park.price}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{park.description}</p>
              <div className="flex flex-wrap gap-2">
                {park.highlights.map((h, i) => (
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

      <h2>Parco dei Pirati: Il Re dei Divertimenti</h2>
      <p>
        Il Parco dei Pirati è l'attrazione più famosa di Pinarella per le
        famiglie. Situato sul lungomare, è un parco divertimenti a tema che
        offre attrazioni adatte a bambini dai 3 ai 12 anni. L'attrazione
        principale è il veliero dei pirati, una struttura ispirata alle navi
        corsare che permette ai bambini di sentirsi veri lupi di mare.
      </p>
      <p>
        La mini car è un'altra attrazione molto amata, dove i più piccoli possono
        guidare le loro prime automobili in sicurezza. La sala giochi, infine,
        offre intrattenimento anche nelle giornate più calde o nelle serate
        quando le attrazioni all'aperto chiudono.
      </p>

      <h2>Spiagge con Servizi per Bambini</h2>
      <p>
        Numerosi stabilimenti balneari a Pinarella offrono servizi dedicati ai
        più piccoli: mini club con animazione, aree giochi sulla sabbia,
        lettini con ombrelloni family e servizi baby (docce, fasciatoi).
      </p>

      <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
        {beachServices.map((service, index) => (
          <Card key={index} className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Umbrella className="w-5 h-5 text-blue-600" />
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold text-blue-700 mb-1">
                {service.service}
              </p>
              <p className="text-sm text-gray-700">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>La Pineta: Il Parco Naturale per Bambini</h2>
      <p>
        Non solo parchi attrezzati: la pineta di Pinarella è essa stessa un
        immenso parco giochi naturale. I sentieri ombreggiati sono perfetti per
        passeggiate con il passeggino, mentre le aree verdi permettono di
        organizzare picnic, cacce al tesoro e giochi all'aria aperta.
      </p>
      <p>
        Il percorso ciclabile che attraversa la pineta (Pista Giovanni Gerbi) è
        anche praticabile con biciclette con seggiolini per bambini, offrendo
        un'esperienza indimenticabile in famiglia.
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

      <div className="bg-pine-50 p-8 rounded-2xl my-12">
        <h3 className="mt-0">Prenota la Tua Vacanza in Famiglia</h3>
        <p>
          Cerchi un alloggio perfetto per la tua famiglia? "Immerso nella Pineta"
          offre appartamenti spaziosi con cucina, a pochi minuti dal mare e dai
          parchi gioco di Pinarella. Contattaci per disponibilità e offerte
          speciali per famiglie!
        </p>
      </div>
    </BlogPostLayout>
  );
};

export default ParchiGiocoPinarella;
