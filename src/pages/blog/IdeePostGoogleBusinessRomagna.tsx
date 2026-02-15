import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Megaphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl, getSiteUrl } from "@/lib/config";

const IdeePostGoogleBusinessRomagna = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "5 idee post Google Business per freelance in Romagna",
    description:
      "Esempi pronti di post Google Business con CTA per freelance e consulenti che cercano clienti locali.",
    image: `${getSiteUrl()}/images/logo.nobg.png`,
    datePublished: "2026-02-15",
    author: { "@type": "Person", name: "Elia Zavatta" },
  };

  const ideas = [
    "Come aumentare richieste con un sito SEO locale in Romagna (CTA: richiedi audit)",
    "Caso studio: app React sviluppata per attività locale (CTA: prenota call)",
    "Automazione prenotazioni per B&B a Cervia (CTA: chiedi demo)",
    "Checklist profilo Google Business completo in 30 minuti (CTA: scarica checklist)",
    "FAQ costi sito web per PMI a Cesena (CTA: preventivo rapido)",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <MetaTags
        title="5 idee post Google Business per freelance in Romagna"
        description="Esempi concreti di post Google Business orientati a lead locali, con CTA e formato pronto da copiare."
        keywords="post google business esempi, google business romagna, idee post sviluppatore web cesena"
        canonicalUrl={getCanonicalUrl("/blog/idee-post-google-business-romagna")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />
      <article className="container mx-auto max-w-4xl px-4 py-12 text-gray-700">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-pine-700 hover:text-pine-800"><ArrowLeft className="h-4 w-4" /> Torna al blog</Link>
        <h1 className="mb-4 text-4xl font-bold text-pine-900">5 idee post Google Business per freelance in Romagna</h1>
        <p className="mb-8 text-gray-600">Aggiornato a Febbraio 2026 • Lettura 4 min</p>

        <p className="mb-4">Punta su <strong>2-3 post al mese</strong>, non quantità. Ogni post deve avere obiettivo e CTA.</p>
        <ul className="mb-8 list-disc space-y-3 pl-6">
          {ideas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>

        <div className="rounded-xl border bg-white p-5">
          <p className="mb-2 flex items-center gap-2 font-semibold text-pine-800"><Megaphone className="h-4 w-4" /> Formula veloce del post</p>
          <p className="text-sm">Problema locale → Soluzione pratica → Prova (numero/caso) → CTA.</p>
        </div>

        <p className="mt-6">
          Completa con: <Link to="/blog/recensioni-google-business-freelance" className="font-semibold text-pine-700">strategia recensioni</Link>.
        </p>
      </article>
      <Footer />
    </div>
  );
};

export default IdeePostGoogleBusinessRomagna;
