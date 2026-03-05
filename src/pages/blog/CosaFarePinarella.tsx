import React from "react";
import {
  Waves,
  TreePine,
  Bike,
  IceCream,
  Music,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const CosaFarePinarella = () => {
  const activities = [
    {
      title: "Spiaggia e Mare",
      icon: Waves,
      description:
        "La spiaggia di Pinarella è perfetta per famiglie con bambini grazie ai fondali bassi e la sabbia fine. Gli stabilimenti balneari offrono ogni comfort: lettini, ombrelloni, zone giochi per bambini e animazione.",
    },
    {
      title: "Pineta di Cervia",
      icon: TreePine,
      description:
        "Una meravigliosa area verde di 260 ettari ideale per passeggiate, jogging e picnic. La pineta offre refrigerio nelle giornate estive e percorsi naturalistici per tutta la famiglia.",
    },
    {
      title: "Ciclismo",
      icon: Bike,
      description:
        "Pinarella è dotata di piste ciclabili che collegano tutti i centri della riviera. Puoi noleggiare biciclette e scoprire la costa romagnola pedalando tra mare e pineta.",
    },
    {
      title: "Gelaterie",
      icon: IceCream,
      description:
        "La Romagna è famosa per i suoi gelati artigianali. A Pinarella trovi gelaterie storiche che preparano ogni giorno gelati con ingredienti freschi e ricette tradizionali.",
    },
    {
      title: "Eventi Estivi",
      icon: Music,
      description:
        "Durante l'estate, Pinarella e Cervia ospitano numerosi eventi: concerti sulla spiaggia, sagre gastronomiche, mercatini notturni e spettacoli pirotecnici sul mare.",
    },
    {
      title: "Escursioni",
      icon: Camera,
      description:
        "Visita le Saline di Cervia, il borgo marinaro, il centro storico di Ravenna con i suoi mosaici UNESCO, e i parchi tematici come Mirabilandia e l'Acquario di Cattolica.",
    },
  ];

  const dayTrips = [
    "Centro Storico di Cervia - 3 km",
    "Saline di Cervia - 4 km",
    "Milano Marittima - 5 km",
    "Ravenna (Mosaici UNESCO) - 25 km",
    "Mirabilandia - 30 km",
    "San Marino - 60 km",
    "Bologna - 90 km",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Cosa Fare a Pinarella di Cervia: Guida Completa 2026",
    description:
      "Scopri le migliori attività, attrazioni e esperienze da vivere durante la tua vacanza a Pinarella: spiagge, escursioni, eventi e molto altro.",
    image: "https://images.unsplash.com/photo-1544411047-c491784021ff?w=1200&q=80",
    datePublished: "2026-02-01",
    dateModified: "2026-02-01",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Cosa Fare a Pinarella di Cervia: Guida Completa 2026"
      description="Scopri le migliori attività e attrazioni a Pinarella di Cervia: spiagge, pineta, ciclismo, eventi estivi, escursioni e molto altro. Guida completa 2026."
      heroImage="https://images.unsplash.com/photo-1544411047-c491784021ff?w=1200&q=80"
      publishDate="1 Febbraio 2026"
      readingTime="5 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/cosa-fare-pinarella-cervia")}
      keywords="cosa fare pinarella, attrazioni pinarella cervia, spiaggia pinarella, pineta cervia, attività pinarella, vacanze pinarella"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Pinarella di Cervia è una località balneare perfetta per chi cerca una
        vacanza rilassante in Romagna, lontana dal caos delle località più
        affollate ma con tutti i servizi a portata di mano.
      </p>

      <h2>Attività Principali a Pinarella</h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {activities.map((activity, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pine-100 rounded-full">
                  <activity.icon className="w-5 h-5 text-pine-600" />
                </div>
                <CardTitle className="text-xl">{activity.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{activity.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Spiaggia di Pinarella: Il Cuore della Vacanza</h2>
      <p>
        La spiaggia si estende per chilometri con sabbia finissima e fondali
        bassi. Gli stabilimenti balneari offrono ogni tipo di comfort, ma se
        preferisci la libertà, ci sono ampie zone dove stendere il tuo telo
        gratuitamente.
      </p>

      <h2>La Pineta di Cervia: Oasi di Verde</h2>
      <p>
        Un polmone verde di 260 ettari che separa il mare dalla città. Qui puoi
        fare jogging, picnic o semplicemente rilassarti all'ombra dei pini
        marittimi nelle ore più calde della giornata.
      </p>

      <h2>Escursioni nei Dintorni</h2>
      <p>
        Pinarella è un'ottima base per esplorare la Romagna. Ecco le principali
        destinazioni raggiungibili facilmente:
      </p>
      <ul>
        {dayTrips.map((trip, index) => (
          <li key={index}>{trip}</li>
        ))}
      </ul>

      <div className="bg-slate-100 p-8 rounded-2xl my-12">
        <h3 className="mt-0">Consigli Pratici</h3>
        <p>
          <strong>Quando visitare:</strong> Giugno e settembre sono i mesi d'oro
          per chi cerca pace e temperature ideali.
        </p>
        <p>
          <strong>Come muoversi:</strong> Pinarella è fatta per essere vissuta a
          piedi o in bicicletta. Lascia l'auto nel parcheggio e dimenticatene per
          tutta la vacanza!
        </p>
      </div>
    </BlogPostLayout>
  );
};

export default CosaFarePinarella;
