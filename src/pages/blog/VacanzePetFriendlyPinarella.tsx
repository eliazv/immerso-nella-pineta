import React from "react";
import {
  Dog,
  Umbrella,
  TreePine,
  Stethoscope,
  Bed,
  Utensils,
  MapPin,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const VacanzePetFriendlyPinarella = () => {
  const dogBeaches = [
    {
      name: "Bagno 2008 La Meridiana",
      location: "Cervia, Viale Torino",
      features: ["Spiaggia attrezzata per cani", "Ombrellone e lettini", "Acqua sempre disponibile"],
      price: "€8-12 al giorno",
    },
    {
      name: "Spiaggia Libera Lido di Classe",
      location: "Lido di Classe (RA)",
      features: ["Spiaggia libera", "Zona cani demarcata", "Accesso gratuito"],
      price: "Gratuito",
    },
    {
      name: "Bagno Daniele",
      location: "Cervia, Viale Volturno",
      features: ["Area dedicata", "Docce per cani", "Ciotole acqua"],
      price: "€10 al giorno",
    },
  ];

  const services = [
    {
      title: "Veterinari",
      icon: Stethoscope,
      items: [
        "Clinica Veterinaria Città di Cervia - Via IV Novembre 12",
        "Ambulatorio Veterinario Dott. Tosi - Via Garibaldi 45",
        "Servizio emergenze 24h disponibile",
      ],
    },
    {
      title: "Passeggiate nella Pineta",
      icon: TreePine,
      items: [
        "Percorso nella pineta di Pinarella (accessibile ai cani)",
        "Sentiero costiero verso Milano Marittima",
        "Parco urbano di Cervia",
      ],
    },
    {
      title: "Dove Mangiare",
      icon: Utensils,
      items: [
        "Molti ristoranti accettano cani in terrazza",
        "Bar con area esterna pet-friendly",
        "Bosticco Gelaterie - gelato per cani disponibile",
      ],
    },
  ];

  const tips = [
    {
      title: "Documenti Necessari",
      content:
        "Porta sempre con te il libretto sanitario del cane e il microchip. In spiaggia potrebbero chiedere la vaccinazione antirabbica aggiornata.",
    },
    {
      title: "Orari Spiaggia",
      content:
        "Le spiagge per cani a Cervia sono solitamente aperte dalle 6:00 alle 10:00 e dalle 18:00 al tramonto nei mesi estivi. Verifica sempre gli orari prima di recarti.",
    },
    {
      title: "Estate e Caldo",
      content:
        "In estate, porta sempre acqua fresca per il tuo cane ed evita le ore più calde (12-17). La pineta offre ombra naturale perfetta per passeggiate nelle ore calde.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Vacanze Pet-Friendly a Pinarella: Spiaggie e Alloggi per Cani",
    description:
      "Guida completa alle vacanze con il tuo cane a Pinarella di Cervia: spiagge per cani, percorsi nella pineta, veterinari e alloggi pet-friendly.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Vacanze Pet-Friendly a Pinarella: Spiaggie e Alloggi per Cani"
      description="Guida completa alle vacanze con il tuo cane a Pinarella di Cervia: spiagge per cani, percorsi nella pineta, veterinari e alloggi pet-friendly 2026."
      heroImage="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80"
      publishDate="8 Marzo 2026"
      readingTime="5 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/vacanze-pet-friendly-pinarella")}
      keywords="spiaggia cani Pinarella, vacanza con cane Pinarella, pet friendly Cervia, alloggi cani Pinarella"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Portare il tuo amico a quattro zampe in vacanza non è mai stato così
        facile a Pinarella di Cervia. Questa località romagnola offre spiagge
        attrezzate, percorsi nella pineta e servizi dedicati per rendere la
        vacanza piacevole sia per te che per il tuo cane.
      </p>

      <h2>Perché Scegliere Pinarella per le Vacanze con il Cane</h2>
      <p>
        Pinarella e l'intera area di Cervia sono sempre più gettonate dai
        proprietari di animali domestici. La combinazione di spiagge
        pet-friendly, la bellissima pineta secolare e l'atmosfera accogliente
        rendono questa località perfetta per chi non vuole separarsi dal proprio
        compagno peloso.
      </p>
      <p>
        Numerose strutture ricettive, compresa la nostra, accettano animali
        domestici. La nostra posizione "Immerso nella Pineta" offre ampi spazi
        all'aperto dove il tuo cane può muoversi liberamente, a pochi minuti
        dal mare.
      </p>

      <h2>Spiagge per Cani a Pinarella e Cervia</h2>
      <p>
        A differenza di molte località balnerari, Cervia e dintorni offrono
        diverse spiagge dedicate ai cani, sia libere che attrezzate. Ecco le
        migliori opzioni:
      </p>

      <div className="grid md:grid-cols-3 gap-6 not-prose my-12">
        {dogBeaches.map((beach, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Umbrella className="w-5 h-5 text-pine-600" />
                {beach.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {beach.location}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {beach.features.map((f, i) => (
                  <span
                    key={i}
                    className="text-xs bg-pine-100 text-pine-700 px-2 py-1 rounded"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold text-pine-700">
                {beach.price}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Servizi per Animali a Pinarella</h2>
      <div className="grid md:grid-cols-3 gap-6 not-prose my-12">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <service.icon className="w-5 h-5 text-pine-600" />
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <Dog className="w-4 h-4 text-pine-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Passeggiate nella Pineta con il Cane</h2>
      <p>
        La pineta di Pinarella rappresenta un paradiso per i cani e i loro
        padroni. Con i suoi 25 ettari di bosco di pini marittimi, offre infinite
        possibilità di passeggiate all'ombra, lontano dal caldo estivo.
      </p>
      <p>
        Il percorso più amato è quello che parte da Via Vallombrosa (dove si
        trova la nostra struttura) e si insinua nel cuore della pineta, con
        sentieri battuti perfetti anche per cani di tutte le taglie. La pineta
        è anche attraversata dalla pista ciclabile Giovanni Gerbi, dove i cani
        sono benvenuti (tenerli al guinzaglio).
      </p>

      <h2>Consigli Pratici per le Vacanze con il Cane</h2>

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

      <h2>I Nostri Alloggi Pet-Friendly</h2>
      <p>
        A "Immero nella Pineta" accogliamo con piacere i tuoi amici a quattro
        zampe! I nostri appartamenti offrono spazi esterni dove i cani possono
        giocare in sicurezza, e siamo situati a pochi passi dalla pineta,
        perfetta per passeggiate quotidiane.
      </p>
      <p>
        Per garantire il comfort di tutti i nostri ospiti (umani e animali),
        chiediamo di rispettare alcune semplici regole: tenere il cane al
        guinzaglio nelle aree comuni e portare con sé il gomitolo per le zampe.
      </p>

      <div className="bg-pine-50 p-8 rounded-2xl my-12">
        <h3 className="mt-0">Prenota la Tua Vacanza Pet-Friendly</h3>
        <p>
          Vuoi scoprire Pinarella con il tuo cane? Contattaci per verificare la
          disponibilità dei nostri appartamenti pet-friendly immersi nella
          pineta.
        </p>
      </div>
    </BlogPostLayout>
  );
};

export default VacanzePetFriendlyPinarella;
