import React from "react";
import {
  MapPin,
  Clock,
  Euro,
  Train,
  Car,
  Landmark,
  Palmtree,
  Church,
  Castle,
  UtensilsCrossed,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const EscursioniGiornalierePinarella = () => {
  const excursions = [
    {
      destination: "Ravenna",
      distance: "25 km",
      time: "30-40 min",
      cost: "€15-20 (carburante)",
      type: "Cultura",
      highlights: ["Mosaici UNESCO", "Basilica di San Vitale", "Tomba di Dante", "Centro storico"],
      description:
        "Città d'arte mundiale, Ravenna custodisce gli straordinari mosaici bizantini dichiarati Patrimonio UNESCO. La Basilica di San Vitale e la Basilica di Sant'Apollinare Nuovo sono imperdibili.",
      transport: "In auto: SS16 direzione Ravenna. In treno: linea Cervia-Ravenna (30 min)",
    },
    {
      destination: "Milano Marittima",
      distance: "5 km",
      time: "10 min",
      cost: "Gratuito",
      type: "Svago",
      highlights: ["Lungomare elegante", "Pineta storica", "Discoteche", "Ristoranti"],
      description:
        "La località più mondana della riviera romagnola. Passeggiata sul lungomare, immersione nella pineta secolare e serata nei locali più famigerati della Romagna.",
      transport: "In bici: pista ciclabile (15 min). In auto: Viale 2 Giugno",
    },
    {
      destination: "Saline di Cervia",
      distance: "4 km",
      time: "15 min",
      cost: "€8-10",
      type: "Natura",
      highlights: ["Museo del Sale", "Veduta sulle vasche", "Prodotti artigianali", "Osservazione volatili"],
      description:
        "Scopri la storia della produzione del sale a Cervia, una tradizione millenaria. Il museo offre un viaggio affascinante nel mondo del sale marino, con vista sulle vasche di evaporazione.",
      transport: "In bici: pista ciclabile (15 min). In auto: SS16 verso Milano Marittima",
    },
    {
      destination: "Cesenatico",
      distance: "15 km",
      time: "20 min",
      cost: "€10-15",
      type: "Mare e storia",
      highlights: ["Porto canale", "Museo della Marineria", "Spiaggia", "Gelato artigianale"],
      description:
        "Caratteristico borgo marinaro con il celebre porto canale progettato da Leonardo da Vinci. Il Museo della Marineria espone barche storiche e reperti della tradizione pescatrice.",
      transport: "In auto: SS16 verso sud. In treno: linea Adriatica (15 min)",
    },
    {
      destination: "Bertinoro",
      distance: "20 km",
      time: "25 min",
      cost: "€15",
      type: "Enogastronomia",
      highlights: ["Terrazza sulla Romagna", "Vini locali", "Cucina romagnola", "Vista panoramica"],
      description:
        "Il "balcone della Romagna": da qui si gode una vista mozzafiato su tutta la costa. Famoso per la sua tradizione vinicola e i ristoranti di cucina tipica romagnola.",
      transport: "In auto: SP254 verso Bertinoro",
    },
    {
      destination: "San Marino",
      distance: "60 km",
      time: "1h 15 min",
      cost: "€25-30",
      type: "Storia e shopping",
      highlights: ["Castelli medievali", "Il Palazzo Pubblico", "Duty free", "Panorama"],
      description:
        "Il più antico stato ancora esistente. Tre castelli arroccati, il centro storico medievale e il celebre Palazzo Pubblico. Ideale per shopping (duty free) e percorsi storici.",
      transport: "In auto: A14 uscita Rimini Sud, poi SS72. Pedaggi: circa €8",
    },
    {
      destination: "Bologna",
      distance: "90 km",
      time: "1h 30 min",
      cost: "€30-40",
      type: "Cultura",
      highlights: ["Torre degli Asinelli", "Basilica di San Petronio", "Mercato di Mezzo", "Portici"],
      description:
        "La dotta, la rossa, la grassa. Piazza Maggiore, le due torri medievali, i portici più lunghi del mondo e la sua celebre cucina (ragù, tortellini).",
      transport: "In auto: A14 poi A13. In treno: Freccia Rossa da Cesena (1h)",
    },
    {
      destination: "Parco della Salina di Cervia",
      distance: "5 km",
      time: "20 min",
      cost: "€5-8",
      type: "Natura",
      highlights: ["Birdwatching", "Percorsi didattici", "Flora e fauna", "Tranquillità"],
      description:
        "Area naturale protetta nella zona delle saline. Ideale per appassionati di birdwatching: fenicotteri, aironi e numerose specie di uccelli migratori. Percorsi attrezzati per tutte le età.",
      transport: "In bici: pista ciclabile (20 min). In auto: Viale dell'800",
    },
  ];

  const transportTips = [
    {
      title: "In Bicicletta",
      content:
        "Per le destinazioni vicine (Milano Marittima, Saline, Cesenatico), la bicicletta è ideale. Pedalando sulla pista costiera puoi raggiungere Cesenatico in circa 45 minuti. Noleggi disponibili in zona.",
    },
    {
      title: "In Auto",
      content:
        "L'auto è consigliata per destinazioni più lontane come San Marino, Bologna o Ravenna. Attenzione in estate: le strade costiere possono essere trafficate. Meglio partire presto la mattina.",
    },
    {
      title: "In Treno",
      content:
        "La stazione di Cervia è ben collegata. Treni per Ravenna (30 min), Cesenatico (15 min), Rimini (25 min) e Bologna (1h). Comodo e sostiene il turismo ecologico.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Escursioni Giornaliere da Pinarella: Guida alle Gite nei Dintorni 2026",
    description:
      "Scopri le migliori escursioni giornaliere da Pinarella di Cervia: Ravenna, Milano Marittima, saline, Cesenatico e altre destinazioni. Guida completa con km, tempi e costi.",
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1200&q=80",
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Escursioni Giornaliere da Pinarella: Guida alle Gite nei Dintorni 2026"
      description="Scopri le migliori escursioni giornaliere da Pinarella di Cervia: Ravenna, Milano Marittima, saline, Cesenatico. Guida completa con distanze, tempi e costi."
      heroImage="https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1200&q=80"
      publishDate="8 Marzo 2026"
      readingTime="7 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/escursioni-giornaliere-pinarella")}
      keywords="escursioni da Pinarella, gita Ravenna, cosa vedere vicino Pinarella, escursioni Romagna, gite giornaliere Cervia"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Pinarella di Cervia non è solo una fantastica località balneare, ma
        anche una base perfetta per esplorare alcune delle destinazioni più
        affascinanti dell'Emilia-Romagna. Dai mosaici UNESCO di Ravenna ai
        borghi medievali, dalle saline storiche alle discoteche di Milano
        Marittima, le opzioni per gite giornaliere sono tantissime.
      </p>

      <h2>Perché Scegliere Pinarella come Base</h2>
      <p>
        La posizione strategica di Pinarella, al centro della Riviera Romagnola,
        la rende ideale per chi vuole combinare giornate al mare con
        escursioni culturali, enogastronomiche o di svago. In meno di un'ora di
        auto puoi raggiungere città d'arte, parchi tematici, borghi
        caratteristici e persino uno stato straniero (San Marino).
      </p>
      <p>
        Soggiornando a "Immerso nella Pineta" potrai goderti il relax della
        vacanza al mare e, quando vorrai, partire alla scoperta del territorio
        romagnolo. La nostra posizione ti permette di raggiungere le principali
        destinazioni in pochi minuti.
      </p>

      <h2>Le Migliori Escursioni da Pinarella</h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {excursions.map((excursion, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-pine-600" />
                  {excursion.destination}
                </CardTitle>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {excursion.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Car className="w-4 h-4" /> {excursion.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {excursion.time}
                </span>
                <span className="flex items-center gap-1">
                  <Euro className="w-4 h-4" /> {excursion.cost}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{excursion.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {excursion.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic flex items-start gap-1">
                <Train className="w-3 h-3 mt-0.5" />
                {excursion.transport}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Ravenna: La Perla dei Mosaici</h2>
      <p>
        Non si può parlare di escursioni da Pinarella senza dedicare uno spazio
        speciale a Ravenna. A soli 25 km, questa città è un gioiello dell'arte
        bizantina. Otto monumenti ravennati sono patrimonio UNESCO, con i loro
        mosaici che lasciano senza parole.
      </p>
      <p>
        <strong>Da non perdere:</strong> la Basilica di San Vitale (VI secolo),
        la Basilica di Sant'Apollinare Nuovo, la Tomba di Dante Alighieri e il
        Battistero Neoniano. Il centro storico è compatto e si visita comodamente
        a piedi in mezza giornata.
      </p>

      <h2>Come Raggiungere le Destinazioni</h2>

      <div className="grid md:grid-cols-3 gap-6 not-prose my-12">
        {transportTips.map((tip, index) => (
          <Card key={index} className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="w-5 h-5 text-pine-600" />
                {tip.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Consigli per le Tue Escursioni</h2>
      <ul>
        <li>
          <strong>Partire presto:</strong> nei mesi estivi (giugno-agosto), le
          strade costiere si riempiono.Parti la mattina presto per evitare il
          traffico e goderti le destinazioni prima del caldo intenso.
        </li>
        <li>
          <strong>Prenota in anticipo:</strong> per Ravenna e San Marino nei
          weekend estivi, i parcheggi possono essere pieni. Considera il treno
          per Ravenna e Cesenatico.
        </li>
        <li>
          <strong>Combina più destinazioni:</strong> puoi facilmente abbinare
          una mattina alle Saline di Cervia con un pomeriggio a Milano Marittima
          in un'unica giornata.
        </li>
      </ul>

      <div className="bg-pine-50 p-8 rounded-2xl my-12">
        <h3 className="mt-0">Prenota e Scopri la Romagna</h3>
        <p>
          Scegli "Immerso nella Pineta" come base per le tue escursioni
          giornaliere. La nostra posizione ti permette di raggiungere le
          principali destinazioni in breve tempo, mentre la sera potrai
          rilassarti nella pineta a pochi minuti dal mare. Contattaci per
          disponibilità e suggerimenti personalizzati!
        </p>
      </div>
    </BlogPostLayout>
  );
};

export default EscursioniGiornalierePinarella;
