import React from "react";
import {
  Bike,
  MapPin,
  TreePine,
  Waves,
  Coffee,
  Sun,
  Route,
  Anchor,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const ItinerariBiciclettaPinarella = () => {
  const itineraries = [
    {
      title: "Pista Ciclabile Lungomare Sud",
      difficulty: "Facile",
      length: "5,3 km",
      duration: "20-25 min",
      description:
        "Il percorso più iconico: parte da Pinarella e arriva fino a Cesenatico lungo la costa. Totalmente pianeggiante, adatto a famiglie con bambini. Asfalto liscio e parzialmente ombreggiato.",
      highlights: ["Vista mare", "Accessibile a tutti", "Adatto a pattini"],
    },
    {
      title: "Anello Pinarella - Milano Marittima",
      difficulty: "Facile",
      length: "14,7 km",
      duration: "50-60 min",
      description:
        "Il classico percorso che collega Pinarella a Milano Marittima passando per la pineta. Si parte dal lungomare di Pinarella, si attraversa la pineta di Cervia e si raggiunge la elegante Milano Marittima.",
      highlights: ["Pineta ombreggiata", "Ideale al tramonto", "Tratto commemorativo ciclisti"],
    },
    {
      title: "Cervia Verde - Percorso nella Pineta",
      difficulty: "Facile",
      length: "8 km",
      duration: "35-45 min",
      description:
        "Il percorso che attraversa le pinete litoranee di Milano Marittima e Pinarella, porta sud del Parco del Delta del Po. Fondo sterrato battuto, ombreggiato e fresco anche in estate.",
      highlights: ["Ombra garantita", "Natura", "Fauna locale"],
    },
    {
      title: "Cervia - Ravenna Cicloturistica",
      difficulty: "Medio",
      length: "30 km",
      duration: "1,5-2 ore",
      description:
        "Per i più allenati: un percorso che collega Cervia a Ravenna attraverso la campagna romagnola. Si passa vicino alle saline e si arriva fino alla città dei mosaici.",
      highlights: ["Mosaici UNESCO", "Saline", "Campagna romagnola"],
    },
    {
      title: "Traghetto Cervia - Milano Marittima",
      difficulty: "Facile",
      length: "2 km",
      duration: "15 min",
      description:
        "Un percorso unico nel suo genere: si prende il traghetto che attraversa il canale per passare da Cervia a Milano Marittima in bicicletta. Solo pedoni e cicli ammessi!",
      highlights: ["Esperienza unica", "Foto imperdibili", "Gratuito"],
    },
  ];

  const tips = [
    {
      title: "Noleggio Bici",
      content:
        "A Pinarella e Cervia trovi numerosi noleggi biciclette. I prezzi partono da circa €5/ora per una city bike, €8/ora per una bicicletta elettrica. Consigliati: Bici Barca a Cervia (Viale 2 Giugno) e Bike Point Milano Marittima.",
    },
    {
      title: "Quando Andare",
      content:
        "Le piste ciclabili di Pinarella sono fruibili tutto l'anno. I periodi migliori sono la primavera (aprile-giugno) e l'autunno (settembre-ottobre) per evitare il caldo intenso. In estate, partire presto al mattino o tardi la sera.",
    },
    {
      title: "Attrezzatura Consigliata",
      content:
        "Porta sempre casco, acqua (almeno 500ml per percorsi brevi), crema solare e occhiali da sole. Per i percorsi sterrati, sono consigliate biciclette con pneumatici più larghi.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Itinerari in Bicicletta a Pinarella: Guida alle Piste Ciclabili 2026",
    description:
      "Scopri i migliori percorsi ciclabili a Pinarella di Cervia: itinerari na lungomare, nella pineta, verso Milano Marittima e Ravenna. Guida completa 2026.",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80",
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Itinerari in Bicicletta a Pinarella: Guida alle Piste Ciclabili 2026"
      description="Scopri i migliori percorsi ciclabili a Pinarella di Cervia: dalla pista lungomare agli itinerari nella pineta. Guida completa con km, difficoltà e consigli pratici."
      heroImage="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80"
      publishDate="8 Marzo 2026"
      readingTime="6 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/itinerari-bicicletta-pinarella")}
      keywords="pista ciclabile Pinarella, bicicletta Cervia, itinerari bike Romagna, piste ciclabili Pinarella, cicloturismo Cervia"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Pinarella di Cervia è una delle destinazioni più amate dai ciclisti in
        Romagna. Con oltre 60 km di piste ciclabili, molte delle quali ombreggiate
        nella pineta, è il posto ideale per chi vuole esplorare la costa romagnola
        in modo ecologico e sano.
      </p>

      <h2>Perché Scegliere la Bicicletta a Pinarella</h2>
      <p>
        Pinarella e l'intera zona di Cervia offrono una rete ciclabile eccellente,
        perfetta per famiglie, coppie e cicloturisti. I percorsi sono quasi
        completamente pianeggianti, adatti a tutti i livelli, e attraversano i
        luoghi più belli del territorio: dal lungomare alle pinete secolari, fino
        alle saline e ai borghi caratteristici.
      </p>
      <p>
        Il nome stesso della nostra struttura, "Immerso nella Pineta", richiama
        proprio questa esperienza unica: alloggiare in un posto dove la bicicletta
        è il modo migliore per scoprire ogni angolo del territorio, tra mare e
        verde.
      </p>

      <h2>I Migliori Itinerari in Bicicletta</h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {itineraries.map((route, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Route className="w-5 h-5 text-pine-600" />
                  {route.title}
                </CardTitle>
                <span className="text-xs bg-pine-100 text-pine-700 px-2 py-1 rounded-full">
                  {route.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {route.length}
                </span>
                <span className="flex items-center gap-1">
                  <Sun className="w-4 h-4" /> {route.duration}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{route.description}</p>
              <div className="flex flex-wrap gap-2">
                {route.highlights.map((h, i) => (
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

      <h2>Pista Ciclabile Giovanni Gerbi</h2>
      <p>
        Un tratto particolare merita una menzione speciale: la pista ciclabile
        intitolata a Giovanni Gerbi, uno dei più grandi ciclisti italiani del
        passato. Questo percorso si snoda nella pineta di Pinarella, seguendo un
        fondo sterrato battuto che garantisce freshness anche nelle giornate
        più calde. Il percorso è ombreggiato e pianeggiante, ideale per chi
        cerca refrigerio dal sole estivo.
      </p>
      <p>
        Lungo questo tratti trovi anche i nomi di altri grandi campioni del
        ciclismo come Fausto Coppi e Gino Bartali, in un percorso che è un
        vero e proprio omaggio alla storia del ciclismo italiano.
      </p>

      <h2>Consigli Pratici per il Cicloturismo</h2>

      <div className="grid md:grid-cols-3 gap-6 not-prose my-12">
        {tips.map((tip, index) => (
          <Card key={index} className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Collegamento con i Nostri Alloggi</h2>
      <p>
        Soggiornare a "Immerso nella Pineta" significa avere la pineta a pochi
        passi, con la possibilità di partire in bicicletta direttamente dalla
        nostra struttura. Offriamo anche alcune biciclette a disposizione dei
        nostri ospiti. Chiedici informazioni al momento della prenotazione!
      </p>

      <div className="bg-pine-50 p-8 rounded-2xl my-12">
        <h3 className="mt-0">Prenota la Tua Vacanza in Bicicletta</h3>
        <p>
          Vuoi scoprire Pinarella in bicicletta? Contattaci per verificare la
          disponibilità dei nostri appartamenti immersi nella pineta, a pochi
          minuti dal mare e dalle piste ciclabili.
        </p>
      </div>
    </BlogPostLayout>
  );
};

export default ItinerariBiciclettaPinarella;
