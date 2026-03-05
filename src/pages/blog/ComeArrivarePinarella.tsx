import React from "react";
import { Link } from "react-router-dom";
import { Car, Train, Plane, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const ComeArrivarePinarella = () => {
  const transportOptions = [
    {
      title: "In Auto",
      icon: Car,
      distance: "Autostrada A14",
      time: "Variabile",
      description:
        "Il modo più comodo per raggiungere Pinarella è in auto tramite l'autostrada A14 Adriatica.",
    },
    {
      title: "In Treno",
      icon: Train,
      distance: "Stazione Cervia-Milano Marittima",
      time: "3 km da Pinarella",
      description:
        "La stazione ferroviaria più vicina dista circa 3 km dal centro di Pinarella.",
    },
    {
      title: "In Aereo",
      icon: Plane,
      distance: "Bologna o Rimini",
      time: "30-90 km",
      description:
        "Gli aeroporti più vicini sono Bologna Marconi (90 km) e Rimini Fellini (30 km).",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Come Arrivare a Pinarella: Auto, Treno e Aereo",
    description:
      "Guida completa su come raggiungere Pinarella di Cervia in auto, treno o aereo. Indicazioni stradali, stazioni ferroviarie e aeroporti più vicini.",
    image: "https://immerso.eliazavatta.it/images/logo.nobg.png",
    datePublished: "2026-02-01",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Come Arrivare a Pinarella di Cervia: Auto, Treno, Aereo"
      description="Scopri come raggiungere Pinarella di Cervia in auto, treno o aereo. Indicazioni stradali autostradali, stazioni ferroviarie e aeroporti più vicini. Guida completa."
      heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
      publishDate="1 Febbraio 2026"
      readingTime="4 min di lettura"
      category="Viaggi"
      canonicalUrl={getCanonicalUrl("/blog/come-arrivare-pinarella")}
      keywords="come arrivare pinarella, raggiungere pinarella auto, treno cervia, aeroporto rimini pinarella, autostrada pinarella, stazione cervia, da bologna a pinarella, da milano a pinarella"
      jsonLd={jsonLd}
    >
      <p className="text-xl text-gray-700 leading-relaxed mb-8">
        Pinarella di Cervia è facilmente raggiungibile da tutta Italia grazie
        alla sua posizione strategica sulla costa adriatica. Che tu preferisca
        viaggiare in auto, treno o aereo, ecco tutte le informazioni per
        pianificare il tuo viaggio.
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-12 not-prose">
        {transportOptions.map((option, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-pine-100 rounded-full mb-3">
                  <option.icon className="w-8 h-8 text-pine-600" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold text-pine-700 mb-2">
                {option.distance}
              </p>
              <p className="text-sm text-gray-600 mb-3">{option.time}</p>
              <p className="text-gray-700">{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
        In Auto: Autostrada A14
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        L'auto è il mezzo più comodo per raggiungere Pinarella, specialmente se
        porti con te famiglie o attrezzatura da spiaggia. Pinarella si trova
        lungo l'autostrada A14 Adriatica che collega Bologna a Bari.
      </p>

      <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
        Da Nord (Milano, Venezia, Bologna)
      </h3>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          Prendi l'autostrada A14 direzione Ancona/Bari
        </li>
        <li className="text-gray-700">
          Esci al casello <strong>Cesena Nord</strong>
        </li>
        <li className="text-gray-700">
          Segui le indicazioni per Cervia/Milano Marittima sulla SS71-bis
        </li>
        <li className="text-gray-700">
          Dopo circa 20 km, segui le indicazioni per Pinarella
        </li>
        <li className="text-gray-700">
          <strong>Tempo di percorrenza:</strong> Bologna 90 minuti, Milano 3 ore
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
        Da Sud (Ancona, Pescara, Bari)
      </h3>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          Prendi l'autostrada A14 direzione Bologna/Venezia
        </li>
        <li className="text-gray-700">
          Esci al casello <strong>Cesena Nord</strong>
        </li>
        <li className="text-gray-700">
          Segui le stesse indicazioni di cui sopra
        </li>
        <li className="text-gray-700">
          <strong>Tempo di percorrenza:</strong> Ancona 90 minuti, Rimini 40
          minuti
        </li>
      </ul>

      <div className="not-prose my-8">
        <Card className="bg-pine-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Navigation className="w-6 h-6 text-pine-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-pine-800 mb-2">Coordinate GPS</h4>
                <p className="text-gray-700">
                  Per navigatore satellitare:{" "}
                  <strong>44.261434, 12.339165</strong>
                  <br />
                  Indirizzo: Via Jelenia Gora, Pinarella di Cervia (RA)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
        In Treno: Stazione di Cervia-Milano Marittima
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        La stazione ferroviaria più vicina è{" "}
        <strong>Cervia-Milano Marittima</strong>, situata a circa 3 km dal
        centro di Pinarella. La stazione è servita da treni regionali e
        Intercity sulla linea Bologna-Ancona.
      </p>

      <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
        Collegamenti Principali
      </h3>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          <strong>Da Bologna:</strong> Treni regionali ogni ora (circa 90
          minuti)
        </li>
        <li className="text-gray-700">
          <strong>Da Rimini:</strong> Treni regionali frequenti (circa 30
          minuti)
        </li>
        <li className="text-gray-700">
          <strong>Da Ravenna:</strong> Treni regionali ogni 30-60 minuti (circa
          20 minuti)
        </li>
        <li className="text-gray-700">
          <strong>Da Milano:</strong> Cambio a Bologna (totale 3-3.5 ore)
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
        Dalla Stazione a Pinarella
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        Una volta arrivato alla stazione di Cervia, hai diverse opzioni:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          <strong>Taxi:</strong> Disponibili fuori dalla stazione (circa 10€, 10
          minuti)
        </li>
        <li className="text-gray-700">
          <strong>Autobus urbano:</strong> Linea 176 verso Pinarella (fermate
          ogni 20 minuti)
        </li>
        <li className="text-gray-700">
          <strong>Transfer privato:</strong> Possiamo organizzare un transfer
          per te
        </li>
        <li className="text-gray-700">
          <strong>Noleggio bici:</strong> Piste ciclabili collegano la stazione
          a Pinarella
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
        In Aereo: Aeroporti Più Vicini
      </h2>

      <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
        Aeroporto di Rimini "Federico Fellini" (30 km)
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        L'aeroporto più vicino, ideale per voli low-cost e collegamenti con le
        principali città italiane ed europee. Tempo di trasferimento: circa 30
        minuti in auto.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          <strong>Transfer:</strong> Taxi (circa 40-50€), noleggio auto, navetta
          condivisa
        </li>
        <li className="text-gray-700">
          <strong>Collegamenti:</strong> Milano, Roma, Londra, Mosca
          (stagionali)
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
        Aeroporto di Bologna "Guglielmo Marconi" (90 km)
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        L'aeroporto principale della regione, con voli nazionali e
        internazionali. Tempo di trasferimento: circa 90 minuti in auto.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          <strong>Transfer:</strong> Navetta aeroporto + treno, noleggio auto,
          taxi (80-100€)
        </li>
        <li className="text-gray-700">
          <strong>Collegamenti:</strong> Tutte le principali città europee e
          internazionali
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
        Parcheggio a Pinarella
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Se arrivi in auto, non preoccuparti del parcheggio: il nostro
        appartamento include un <strong>posto auto privato gratuito</strong>.
        Inoltre, a Pinarella trovi:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          Parcheggi pubblici gratuiti nel centro
        </li>
        <li className="text-gray-700">
          Parcheggi lungo il lungomare (alcuni a pagamento in estate)
        </li>
        <li className="text-gray-700">Zone blu per residenti e ospiti</li>
      </ul>

      <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
        Guide specifiche sulle indicazioni più cercate
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Se parti da una città specifica, abbiamo preparato guide dedicate con
        tempi reali, costi indicativi e consigli anti-traffico:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          <Link
            to="/blog/come-arrivare-pinarella-da-bologna"
            className="text-pine-700 font-semibold hover:underline"
          >
            Come arrivare a Pinarella da Bologna
          </Link>
        </li>
        <li className="text-gray-700">
          <Link
            to="/blog/come-arrivare-pinarella-da-milano"
            className="text-pine-700 font-semibold hover:underline"
          >
            Come arrivare a Pinarella da Milano
          </Link>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
        Muoversi a Pinarella
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Una volta arrivato, Pinarella è piccola e si gira facilmente:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className="text-gray-700">
          <strong>A piedi:</strong> Tutto è raggiungibile in 10-15 minuti
        </li>
        <li className="text-gray-700">
          <strong>In bicicletta:</strong> Il mezzo preferito dai locali,
          noleggio economico ovunque
        </li>
        <li className="text-gray-700">
          <strong>Autobus:</strong> Collegamenti con Cervia, Milano Marittima e
          Ravenna
        </li>
      </ul>

      <div className="bg-slate-100 p-8 rounded-2xl my-8 not-prose">
        <h3 className="text-xl font-bold text-pine-900 mb-4">
          Guide specifiche per città
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/blog/come-arrivare-pinarella-da-bologna"
              className="text-pine-600 hover:underline font-medium"
            >
              → Da Bologna a Pinarella: guida completa
            </Link>
          </li>
          <li>
            <Link
              to="/blog/come-arrivare-pinarella-da-milano"
              className="text-pine-600 hover:underline font-medium"
            >
              → Da Milano a Pinarella: guida completa
            </Link>
          </li>
          <li>
            <Link
              to="/blog/dove-dormire-pinarella-cervia-bambini"
              className="text-pine-600 hover:underline font-medium"
            >
              → Dove dormire a Pinarella con bambini
            </Link>
          </li>
        </ul>
      </div>
    </BlogPostLayout>
  );
};

export default ComeArrivarePinarella;
