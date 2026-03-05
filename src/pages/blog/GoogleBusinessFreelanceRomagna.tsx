import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, MessageSquare, Camera } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl, getSiteUrl } from "@/lib/config";

const GoogleBusinessFreelanceRomagna = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Google Business per freelance in Romagna: cosa conta davvero",
    description:
      "Guida pratica per freelance in Romagna: impatto dei post, recensioni, categorie, NAP e strategia concreta per clienti locali.",
    image: `${getSiteUrl()}/images/logo.nobg.png`,
    datePublished: "2026-02-15",
    author: { "@type": "Person", name: "Elia Zavatta" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      <MetaTags
        title="Google Business per Freelance in Romagna: guida pragmatica"
        description="Come usare Google Business Profile per trovare clienti locali in Romagna: recensioni, vicinanza, completezza profilo e piano operativo."
        keywords="google business freelance romagna, sviluppatore web cesena, local seo romagna, recensioni google business"
        canonicalUrl={getCanonicalUrl("/blog/google-business-freelance-romagna")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-pine-700 hover:text-pine-800">
          <ArrowLeft className="h-4 w-4" /> Torna al blog
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-pine-900">Google Business per freelance in Romagna: cosa conta davvero</h1>
        <p className="mb-10 text-gray-600">Aggiornato a Febbraio 2026 • Lettura 8 min</p>

        <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-gray-700">
          <p>
            I post su Google Business <strong>non sono il fattore principale di ranking</strong>, ma aiutano CTR, fiducia e interazioni.
            Se lavori con PMI e professionisti locali, il profilo ottimizzato è un canale ad alto intento.
          </p>
        </section>

        <h2 className="mb-4 text-2xl font-bold text-pine-800">1) Cosa incide davvero sul ranking locale</h2>
        <ul className="mb-8 list-disc space-y-2 pl-6 text-gray-700">
          <li><strong>Recensioni:</strong> numero, frequenza, qualità e risposte.</li>
          <li><strong>Vicinanza geografica:</strong> presenza reale in zona (es. Cesena/Romagna).</li>
          <li><strong>Completezza profilo:</strong> categorie corrette, servizi, descrizione, foto, NAP coerente.</li>
        </ul>

        <h2 className="mb-4 text-2xl font-bold text-pine-800">2) Post Google Business: come usarli bene (senza sprechi)</h2>
        <p className="mb-4 text-gray-700">
          Frequenza consigliata: <strong>2-3 post al mese</strong>, non per forza settimanali. Ogni post deve avere CTA chiara:
          richiesta preventivo, visita sito, contatto WhatsApp.
        </p>
        <ul className="mb-8 list-disc space-y-2 pl-6 text-gray-700">
          <li>Case study locale con risultato misurabile.</li>
          <li>Mini guida pratica (es. sito SEO per attività in Romagna).</li>
          <li>Automazioni utili per turismo/PMI locali.</li>
        </ul>

        <h2 className="mb-4 text-2xl font-bold text-pine-800">3) Checklist operativa (3-4 ore iniziali)</h2>
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-4 text-gray-700"><Star className="mb-2 h-5 w-5 text-amber-500" /> 10 recensioni solide in 2-3 mesi, con risposte puntuali.</div>
          <div className="rounded-xl border bg-white p-4 text-gray-700"><MapPin className="mb-2 h-5 w-5 text-red-500" /> Coerenza sito ↔ profilo (NAP, link, area servita).</div>
          <div className="rounded-xl border bg-white p-4 text-gray-700"><MessageSquare className="mb-2 h-5 w-5 text-blue-500" /> Q&A presidiate con domande reali dei clienti.</div>
          <div className="rounded-xl border bg-white p-4 text-gray-700"><Camera className="mb-2 h-5 w-5 text-emerald-500" /> Foto reali: setup, ufficio, screenshot progetti.</div>
        </div>

        <p className="text-gray-700">
          Approfondisci anche: <Link className="font-semibold text-pine-700" to="/blog/recensioni-google-business-freelance">strategia recensioni</Link> e <Link className="font-semibold text-pine-700" to="/blog/idee-post-google-business-romagna">idee post pronte</Link>.
        </p>
      </article>
      <Footer />
    </div>
  );
};

export default GoogleBusinessFreelanceRomagna;
