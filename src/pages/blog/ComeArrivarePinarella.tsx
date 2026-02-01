import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import BreadcrumbSEO from "@/components/BreadcrumbSEO";
import { Car, Train, Plane, MapPin, Navigation, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComeArrivarePinarella = () => {
  const transportOptions = [
    {
      title: "In Auto",
      icon: Car,
      distance: "Autostrada A14",
      time: "Variabile",
      description: "Il modo più comodo per raggiungere Pinarella è in auto tramite l'autostrada A14 Adriatica."
    },
    {
      title: "In Treno",
      icon: Train,
      distance: "Stazione Cervia-Milano Marittima",
      time: "3 km da Pinarella",
      description: "La stazione ferroviaria più vicina dista circa 3 km dal centro di Pinarella."
    },
    {
      title: "In Aereo",
      icon: Plane,
      distance: "Bologna o Rimini",
      time: "30-90 km",
      description: "Gli aeroporti più vicini sono Bologna Marconi (90 km) e Rimini Fellini (30 km)."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Come Arrivare a Pinarella: Auto, Treno e Aereo",
    description: "Guida completa su come raggiungere Pinarella di Cervia in auto, treno o aereo. Indicazioni stradali, stazioni ferroviarie e aeroporti più vicini.",
    image: "https://immersonellapineta.it/placeholder.svg",
    datePublished: "2026-02-01",
    author: {
      "@type": "Person",
      name: "Elia Zavatta"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Come Arrivare a Pinarella di Cervia: Auto, Treno, Aereo | Guida 2026"
        description="Scopri come raggiungere Pinarella di Cervia in auto, treno o aereo. Indicazioni stradali autostradali, stazioni ferroviarie e aeroporti più vicini. Guida completa."
        keywords="come arrivare pinarella, raggiungere pinarella auto, treno cervia, aeroporto rimini pinarella, autostrada pinarella, stazione cervia"
        canonical="https://immersonellapineta.it/blog/come-arrivare-pinarella"
      />
      <BreadcrumbSEO
        items={[
          { name: "Home", url: "https://immersonellapineta.it" },
          { name: "Blog", url: "https://immersonellapineta.it/blog" },
          { name: "Come Arrivare", url: "https://immersonellapineta.it/blog/come-arrivare-pinarella" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12">
          <Link to="/blog" className="text-pine-600 hover:text-pine-700 font-medium mb-4 inline-block">
            ← Torna al Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-pine-800 mb-4">
            Come Arrivare a Pinarella di Cervia
          </h1>
          <p className="text-lg text-gray-700">
            Pubblicato il 1 Febbraio 2026 • Tempo di lettura: 4 minuti
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Pinarella di Cervia è facilmente raggiungibile da tutta Italia grazie alla sua 
            posizione strategica sulla costa adriatica. Che tu preferisca viaggiare in auto, 
            treno o aereo, ecco tutte le informazioni per pianificare il tuo viaggio.
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
                  <p className="font-semibold text-pine-700 mb-2">{option.distance}</p>
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
            L'auto è il mezzo più comodo per raggiungere Pinarella, specialmente se porti con te 
            famiglie o attrezzatura da spiaggia. Pinarella si trova lungo l'autostrada A14 Adriatica 
            che collega Bologna a Bari.
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
              <strong>Tempo di percorrenza:</strong> Ancona 90 minuti, Rimini 40 minuti
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
                      Per navigatore satellitare: <strong>44.261434, 12.339165</strong>
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
            La stazione ferroviaria più vicina è <strong>Cervia-Milano Marittima</strong>, 
            situata a circa 3 km dal centro di Pinarella. La stazione è servita da treni 
            regionali e Intercity sulla linea Bologna-Ancona.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Collegamenti Principali
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              <strong>Da Bologna:</strong> Treni regionali ogni ora (circa 90 minuti)
            </li>
            <li className="text-gray-700">
              <strong>Da Rimini:</strong> Treni regionali frequenti (circa 30 minuti)
            </li>
            <li className="text-gray-700">
              <strong>Da Ravenna:</strong> Treni regionali ogni 30-60 minuti (circa 20 minuti)
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
              <strong>Taxi:</strong> Disponibili fuori dalla stazione (circa 10€, 10 minuti)
            </li>
            <li className="text-gray-700">
              <strong>Autobus urbano:</strong> Linea 176 verso Pinarella (fermate ogni 20 minuti)
            </li>
            <li className="text-gray-700">
              <strong>Transfer privato:</strong> Possiamo organizzare un transfer per te
            </li>
            <li className="text-gray-700">
              <strong>Noleggio bici:</strong> Piste ciclabili collegano la stazione a Pinarella
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            In Aereo: Aeroporti Più Vicini
          </h2>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Aeroporto di Rimini "Federico Fellini" (30 km)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            L'aeroporto più vicino, ideale per voli low-cost e collegamenti con le principali 
            città italiane ed europee. Tempo di trasferimento: circa 30 minuti in auto.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              <strong>Transfer:</strong> Taxi (circa 40-50€), noleggio auto, navetta condivisa
            </li>
            <li className="text-gray-700">
              <strong>Collegamenti:</strong> Milano, Roma, Londra, Mosca (stagionali)
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Aeroporto di Bologna "Guglielmo Marconi" (90 km)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            L'aeroporto principale della regione, con voli nazionali e internazionali. 
            Tempo di trasferimento: circa 90 minuti in auto.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              <strong>Transfer:</strong> Navetta aeroporto + treno, noleggio auto, taxi (80-100€)
            </li>
            <li className="text-gray-700">
              <strong>Collegamenti:</strong> Tutte le principali città europee e internazionali
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Parcheggio a Pinarella
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Se arrivi in auto, non preoccuparti del parcheggio: il nostro appartamento include 
            un <strong>posto auto privato gratuito</strong>. Inoltre, a Pinarella trovi:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">Parcheggi pubblici gratuiti nel centro</li>
            <li className="text-gray-700">Parcheggi lungo il lungomare (alcuni a pagamento in estate)</li>
            <li className="text-gray-700">Zone blu per residenti e ospiti</li>
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
              <strong>In bicicletta:</strong> Il mezzo preferito dai locali, noleggio economico ovunque
            </li>
            <li className="text-gray-700">
              <strong>Autobus:</strong> Collegamenti con Cervia, Milano Marittima e Ravenna
            </li>
          </ul>
        </div>

        <div className="mt-16 bg-pine-50 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-pine-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-pine-800 mb-3">
                Appartamento con Parcheggio Privato Gratuito
              </h3>
              <p className="text-gray-700 mb-6">
                Prenota il nostro appartamento e avrai incluso un posto auto privato gratuito. 
                Niente stress, niente spese extra per il parcheggio. Prenotazione diretta senza 
                commissioni - contatta il proprietario!
              </p>
              <Link to="/pineta3/book">
                <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
                  Prenota Ora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ComeArrivarePinarella;
