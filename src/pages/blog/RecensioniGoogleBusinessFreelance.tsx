import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl, getSiteUrl } from "@/lib/config";

const RecensioniGoogleBusinessFreelance = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Recensioni Google Business per freelance: strategia semplice",
    description:
      "Come ottenere recensioni autentiche che aiutano davvero il posizionamento locale e la conversione del profilo.",
    image: `${getSiteUrl()}/images/logo.nobg.png`,
    datePublished: "2026-02-15",
    author: { "@type": "Person", name: "Elia Zavatta" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <MetaTags
        title="Recensioni Google Business per freelance: modello operativo"
        description="Metodo pratico per ottenere 8-12 recensioni di qualità con keyword locali senza forzature."
        keywords="recensioni google business freelance, recensioni sviluppatore web cesena, local ranking google"
        canonicalUrl={getCanonicalUrl("/blog/recensioni-google-business-freelance")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />
      <article className="container mx-auto max-w-4xl px-4 py-12 text-gray-700">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-pine-700 hover:text-pine-800"><ArrowLeft className="h-4 w-4" /> Torna al blog</Link>
        <h1 className="mb-4 text-4xl font-bold text-pine-900">Recensioni Google Business per freelance: strategia semplice</h1>
        <p className="mb-8 text-gray-600">Aggiornato a Febbraio 2026 • Lettura 5 min</p>

        <p className="mb-4">Le recensioni sono il fattore più forte per il local ranking. Obiettivo concreto: <strong>8-12 recensioni</strong> in 2-3 mesi.</p>
        <h2 className="mb-3 text-2xl font-bold text-pine-800">Workflow consigliato</h2>
        <ol className="mb-6 list-decimal space-y-2 pl-6">
          <li>Invia il link recensione subito dopo una consegna riuscita.</li>
          <li>Dai uno spunto chiaro (servizio svolto + zona cliente).</li>
          <li>Rispondi entro 48h con tono professionale e parole chiave naturali.</li>
        </ol>

        <div className="mb-6 rounded-xl border bg-white p-5">
          <p className="mb-2 flex items-center gap-2 font-semibold text-pine-800"><Star className="h-4 w-4 text-amber-500" /> Template messaggio</p>
          <p className="text-sm">"Grazie per il progetto! Se ti va, puoi lasciare una recensione menzionando il tipo di lavoro svolto e la tua zona (es. Cesena)?"</p>
        </div>

        <p>
          Vedi anche la guida principale: <Link to="/blog/google-business-freelance-romagna" className="font-semibold text-pine-700">Google Business per freelance in Romagna</Link>.
        </p>
      </article>
      <Footer />
    </div>
  );
};

export default RecensioniGoogleBusinessFreelance;
