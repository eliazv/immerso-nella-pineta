import React from "react";
import { Link } from "react-router-dom";
import { Car, Train, Euro, Clock } from "lucide-react";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getCanonicalUrl } from "@/lib/config";

const DaMilanoAPinarella = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Come Arrivare a Pinarella da Milano: Guida Completa",
    description:
      "Tutte le opzioni pratiche per raggiungere Pinarella da Milano: auto, treno con cambio, tempi medi e costi indicativi.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    datePublished: "2026-02-05",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Come Arrivare a Pinarella da Milano | Auto, Treno e Costi"
      description="Guida pratica Milano-Pinarella: percorso in auto, opzione treno con cambio a Bologna, tempi di viaggio e costi medi aggiornati."
      heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
      publishDate="5 Febbraio 2026"
      readingTime="4 min di lettura"
      category="Viaggi"
      canonicalUrl={getCanonicalUrl("/blog/come-arrivare-pinarella-da-milano")}
      keywords="da milano a pinarella, milano pinarella auto, treno milano cervia, quanto si impiega milano pinarella, autostrada milano pinarella"
      jsonLd={jsonLd}
    >
      <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="mb-3 text-2xl font-semibold text-blue-900">
          Qual è l'opzione migliore?
        </h2>
        <p className="text-gray-700">
          Se viaggi in famiglia o per più giorni, l'auto è spesso la scelta più
          comoda. Se vuoi evitare il traffico estivo, il treno con cambio a
          Bologna è la soluzione più rilassante.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-pine-800">
          <Car className="h-6 w-6" /> Da Milano in Auto
        </h2>
        <p className="mb-3 text-gray-700">
          Percorso consigliato: A1 verso Bologna, poi A14 direzione Ancona con
          uscita Cesena Nord.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Tempo medio: 3h15-4h (in base al traffico).</li>
          <li>Distanza indicativa: circa 320 km.</li>
          <li>Ideale se hai bagagli voluminosi o attrezzatura da spiaggia.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-pine-800">
          <Train className="h-6 w-6" /> Da Milano in Treno
        </h2>
        <p className="text-gray-700">
          L'itinerario più comune è Milano Centrale → Bologna AV →
          Ravenna/Rimini → Cervia-Milano Marittima. In estate conviene prenotare
          i treni AV in anticipo per risparmiare.
        </p>
      </section>

      <section className="mb-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-2 flex items-center gap-2 font-semibold text-pine-800">
            <Clock className="h-4 w-4" /> Tempi medi
          </p>
          <p className="text-sm text-gray-700">
            Auto: 3h15-4h • Treno + transfer: 3h45-4h30
          </p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-2 flex items-center gap-2 font-semibold text-pine-800">
            <Euro className="h-4 w-4" /> Costi indicativi
          </p>
          <p className="text-sm text-gray-700">
            Auto: 55-80€ (carburante+pedaggi) • Treno: 35-90€ a persona
          </p>
        </div>
      </section>

      <p className="text-gray-700">
        Per una panoramica completa consulta anche la guida su{" "}
        <Link
          className="font-semibold text-pine-700"
          to="/blog/come-arrivare-pinarella"
        >
          come arrivare a Pinarella
        </Link>{" "}
        e l'articolo dedicato a{" "}
        <Link
          className="font-semibold text-pine-700"
          to="/blog/come-arrivare-pinarella-da-bologna"
        >
          chi parte da Bologna
        </Link>
        .
      </p>

      <div className="bg-slate-100 p-8 rounded-2xl my-8 not-prose">
        <h3 className="text-xl font-bold text-pine-900 mb-4">
          Guide correlate
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/blog/come-arrivare-pinarella"
              className="text-pine-600 hover:underline font-medium"
            >
              → Come arrivare a Pinarella: guida generale
            </Link>
          </li>
          <li>
            <Link
              to="/blog/come-arrivare-pinarella-da-bologna"
              className="text-pine-600 hover:underline font-medium"
            >
              → Come arrivare a Pinarella da Bologna
            </Link>
          </li>
          <li>
            <Link
              to="/blog/dove-dormire-pinarella-cervia-bambini"
              className="text-pine-600 hover:underline font-medium"
            >
              → Dove dormire a Pinarella
            </Link>
          </li>
        </ul>
      </div>
    </BlogPostLayout>
  );
};

export default DaMilanoAPinarella;
