import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import {
  Waves,
  TreePine,
  Bike,
  IceCream,
  Music,
  Camera,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl, getSiteUrl } from "@/lib/config";

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
    image: `${getSiteUrl()}/images/logo.nobg.png`,
    datePublished: "2026-02-01",
    dateModified: "2026-02-01",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
    publisher: {
      "@type": "Organization",
      name: "Immerso nella Pineta",
      logo: {
        "@type": "ImageObject",
        url: `${getSiteUrl()}/images/logo.nobg.png`,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Cosa Fare a Pinarella di Cervia: Guida Completa 2026 | Attrazioni e Attività"
        description="Scopri le migliori attività e attrazioni a Pinarella di Cervia: spiagge, pineta, ciclismo, eventi estivi, escursioni e molto altro. Guida completa 2026."
        keywords="cosa fare pinarella, attrazioni pinarella cervia, spiaggia pinarella, pineta cervia, attività pinarella, vacanze pinarella"
        canonicalUrl={getCanonicalUrl("/blog/cosa-fare-pinarella-cervia")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12">
          <Link
            to="/blog"
            className="text-pine-600 hover:text-pine-700 font-medium mb-4 inline-block"
          >
            ← Torna al Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-pine-800 mb-4">
            Cosa Fare a Pinarella di Cervia: Guida Completa 2026
          </h1>
          <p className="text-lg text-gray-700">
            Pubblicato il 1 Febbraio 2026 • Tempo di lettura: 5 minuti
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Pinarella di Cervia è una località balneare perfetta per chi cerca
            una vacanza rilassante in Romagna, lontana dal caos delle località
            più affollate ma con tutti i servizi a portata di mano. Ecco una
            guida completa a tutte le attività e attrazioni da non perdere.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Attività Principali a Pinarella
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            {activities.map((activity, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pine-100 rounded-full">
                      <activity.icon className="w-6 h-6 text-pine-600" />
                    </div>
                    <CardTitle className="text-xl">{activity.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Spiaggia di Pinarella: Il Cuore della Vacanza
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La spiaggia di Pinarella si estende per chilometri con sabbia
            finissima e fondali bassi, perfetta per le famiglie con bambini
            piccoli. Gli stabilimenti balneari offrono ogni tipo di comfort:
            lettini e ombrelloni, docce calde, bar e ristoranti, zone giochi
            attrezzate e animazione per bambini.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Se preferisci la spiaggia libera, ci sono ampie zone dove stendere
            il tuo telo gratuitamente. La passeggiata sul lungomare è ideale per
            una camminata serale, con vista sul tramonto e tanti localini dove
            fermarsi per un aperitivo.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            La Pineta di Cervia: Oasi di Verde
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La Pineta di Cervia è un polmone verde di 260 ettari che separa il
            mare dalla città. Qui puoi fare passeggiate all'ombra dei pini
            marittimi, jogging su percorsi attrezzati, o semplicemente
            rilassarti su una panchina leggendo un libro.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            La pineta è perfetta per un picnic in famiglia e offre numerose aree
            attrezzate con tavoli e panchine. Durante l'estate, vengono
            organizzati eventi culturali e concerti all'aperto immersi nel
            verde.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Sport e Attività All'Aperto
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pinarella è il paradiso per gli amanti dello sport. Le piste
            ciclabili collegano tutta la riviera romagnola, permettendoti di
            esplorare la costa in bicicletta. Molti hotel e negozi offrono il
            noleggio bici a prezzi convenienti.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Gli sport acquatici sono molto popolari: puoi provare windsurf, SUP
            (stand up paddle), kayak o semplicemente nuotare nel mare Adriatico.
            Molti stabilimenti balneari offrono corsi e noleggio attrezzature.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Escursioni nei Dintorni
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pinarella è un'ottima base per esplorare la Romagna. Ecco le
            principali destinazioni raggiungibili facilmente:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            {dayTrips.map((trip, index) => (
              <li key={index} className="text-gray-700">
                {trip}
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Eventi e Manifestazioni
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Durante l'estate, Pinarella e Cervia si animano con numerosi eventi:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              Concerti gratuiti sulla spiaggia ogni settimana
            </li>
            <li className="text-gray-700">
              Sagre gastronomiche con specialità romagnole
            </li>
            <li className="text-gray-700">Mercatini dell'artigianato serali</li>
            <li className="text-gray-700">
              Spettacoli pirotecnici sul mare per Ferragosto
            </li>
            <li className="text-gray-700">
              Festival del pesce azzurro a settembre
            </li>
            <li className="text-gray-700">
              Gare sportive e tornei sulla spiaggia
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Consigli Pratici
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Quando visitare:</strong> I mesi migliori sono giugno e
            settembre per evitare l'alta stagione. Luglio e agosto sono perfetti
            per chi ama l'animazione e gli eventi, ma la spiaggia è più
            affollata.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Come muoversi:</strong> Pinarella è piccola e si gira
            facilmente a piedi o in bicicletta. L'auto è utile solo per le
            escursioni nei dintorni.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cosa portare:</strong> Crema solare, costume, scarpe comode
            per camminare, una giacca leggera per le serate estive e una
            macchina fotografica per immortalare i tramonti sul mare.
          </p>
        </div>

        <div className="mt-16 bg-pine-50 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-pine-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-pine-800 mb-3">
                Prenota il Tuo Soggiorno a Pinarella
              </h3>
              <p className="text-gray-700 mb-6">
                Dopo aver scoperto tutte le meraviglie di Pinarella, sei pronto
                per la tua vacanza? Prenota direttamente il nostro appartamento
                e risparmia sulle commissioni delle piattaforme online. Contatto
                diretto con il proprietario, prezzi trasparenti e massima
                flessibilità.
              </p>
              <Link to="/pineta3/book">
                <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
                  Prenota Ora Senza Intermediari
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

export default CosaFarePinarella;
