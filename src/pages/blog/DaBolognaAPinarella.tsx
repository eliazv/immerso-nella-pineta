import React from "react";
import { Link } from "react-router-dom";
import { Car, Train, Clock, MapPin } from "lucide-react";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getCanonicalUrl } from "@/lib/config";

const DaBolognaAPinarella = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Come Arrivare a Pinarella da Bologna: Auto e Treno",
    description:
      "Guida pratica aggiornata per raggiungere Pinarella da Bologna in auto o in treno con tempi, costi e consigli utili.",
    image: "https://immerso.eliazavatta.it/images/logo.nobg.png",
    datePublished: "2026-02-05",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Come Arrivare a Pinarella da Bologna | Auto e Treno"
      description="Indicazioni complete da Bologna a Pinarella di Cervia: percorso in auto, pedaggi, treno con cambio, tempi medi e consigli pratici."
      heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
      publishDate="5 Febbraio 2026"
      readingTime="4 min di lettura"
      category="Viaggi"
      canonicalUrl={getCanonicalUrl("/blog/come-arrivare-pinarella-da-bologna")}
      keywords="da bologna a pinarella, bologna pinarella auto, treno bologna cervia, quanto si impiega bologna pinarella, autostrada bologna pinarella"
      jsonLd={jsonLd}
    >
      <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="mb-3 text-2xl font-semibold text-emerald-900">
          In sintesi
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Auto:</strong> circa 1h10-1h30 via A14 (uscita Cesena Nord).
          </li>
          <li>
            <strong>Treno:</strong> circa 1h45-2h15 con cambio a Ravenna o
            Rimini.
          </li>
          <li>
            <strong>Ultimo tratto:</strong> da stazione Cervia-Milano Marittima
            a Pinarella sono circa 10 minuti in taxi.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-pine-800">
          <Car className="h-6 w-6" /> Percorso in Auto da Bologna
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-gray-700">
          <li>Prendi l'autostrada A14 direzione Ancona.</li>
          <li>Esci a Cesena Nord e prosegui verso Cervia/Pinarella.</li>
          <li>Segui indicazioni per Pinarella centro e lungomare.</li>
        </ol>
        <p className="mt-4 text-gray-700">
          Nei weekend estivi conviene partire prima delle 8:00 o dopo le 16:00
          per evitare il traffico in uscita da Bologna.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-pine-800">
          <Train className="h-6 w-6" /> Treno da Bologna a Pinarella
        </h2>
        <p className="text-gray-700">
          Il collegamento più pratico è Bologna Centrale → Ravenna (o Rimini) →
          Cervia-Milano Marittima. Dalla stazione puoi usare taxi, bus locale o
          noleggio bici.
        </p>
      </section>

      <section className="mb-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-2 flex items-center gap-2 font-semibold text-pine-800">
            <Clock className="h-4 w-4" /> Tempi medi reali
          </p>
          <p className="text-sm text-gray-700">
            Auto: 70-90 min • Treno + transfer: 110-135 min
          </p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="mb-2 flex items-center gap-2 font-semibold text-pine-800">
            <MapPin className="h-4 w-4" /> Coordinate utili
          </p>
          <p className="text-sm text-gray-700">
            Pinarella: 44.261434, 12.339165
          </p>
        </div>
      </section>

      <p className="text-gray-700">
        Se stai organizzando il soggiorno, leggi anche la guida su{" "}
        <Link
          className="font-semibold text-pine-700"
          to="/blog/come-arrivare-pinarella-da-milano"
        >
          come arrivare da Milano
        </Link>{" "}
        e quella generale su{" "}
        <Link
          className="font-semibold text-pine-700"
          to="/blog/come-arrivare-pinarella"
        >
          come arrivare a Pinarella
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
              to="/blog/come-arrivare-pinarella-da-milano"
              className="text-pine-600 hover:underline font-medium"
            >
              → Come arrivare a Pinarella da Milano
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

export default DaBolognaAPinarella;
