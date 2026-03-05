import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Euro, Waves, Users, Info, Sparkles, CheckCircle2 } from "lucide-react";
import { getCanonicalUrl } from "@/lib/config";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const SpiaggeLibereStabilimenti = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Spiagge Libere o Stabilimenti a Pinarella? Guida Completa 2026",
    description:
      "Dove andare al mare a Pinarella: spiagge libere gratuite o stabilimenti balneari? Mappa, prezzi, servizi e consigli per scegliere.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    datePublished: "2026-02-04",
    dateModified: "2026-02-04",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Dove sono le spiagge libere a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Pinarella ci sono 3 spiagge libere principali: Bagno 90 (nord), zona centrale tra bagno 95-97, e zona sud vicino confine Cervia. Tutte accessibili gratuitamente con docce pubbliche.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto costa uno stabilimento balneare a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I prezzi 2026 variano: Giugno €12-15/giorno. Luglio €18-22/giorno. Agosto €25-35/giorno. Settembre €10-15/giorno.",
        },
      },
      {
        "@type": "Question",
        name: "Meglio spiaggia libera o stabilimento a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dipende dalle esigenze. Per famiglie con bambini piccoli meglio stabilimento per i servizi. Per coppie o chi cerca risparmio va benissimo la spiaggia libera.",
        },
      },
    ],
  };

  return (
    <BlogPostLayout
      title="Spiagge Libere o Stabilimenti a Pinarella?"
      description="Guida completa alle spiagge di Pinarella 2026: dove sono le spiagge libere gratuite, quanto costano gli stabilimenti, e quale scegliere."
      heroImage="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80"
      publishDate="4 Febbraio 2026"
      readingTime="8 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/spiagge-libere-stabilimenti-pinarella")}
      keywords="spiagge libere pinarella, stabilimenti balneari pinarella, prezzi spiaggia pinarella, mappa spiagge cervia"
      jsonLd={[jsonLd, faqJsonLd]}
    >
      <p className="lead">
        Una delle domande più frequenti per chi pianifica una vacanza a Pinarella è:{" "}
        <strong>"Conviene andare in spiaggia libera o affittare ombrellone e lettini in uno stabilimento?"</strong>. 
        In questa guida scopriamo dove si trovano le zone gratuite, i costi medi dei bagni e i consigli per scegliere la soluzione perfetta.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-8 my-12 rounded-r-2xl">
        <h3 className="text-blue-900 font-bold mb-4 flex items-center gap-2 mt-0">
          <Sparkles className="h-6 w-6" />
          In Breve
        </h3>
        <p className="text-blue-800 mb-0">
          A Pinarella trovi <strong>3 ampie spiagge libere</strong> completamente gratuite con docce pubbliche, 
          alternate a oltre <strong>50 stabilimenti balneari</strong> (i famosi "bagni") che offrono ogni comfort per la famiglia.
        </p>
      </div>

      <h2>Confronto: Spiaggia Libera vs Stabilimento</h2>
      
      <div className="overflow-x-auto my-8 border rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 font-bold border-b">Servizio</th>
              <th className="p-4 font-bold border-b text-blue-600 font-bold">Libera 🏜️</th>
              <th className="p-4 font-bold border-b text-pine-600 font-bold">Stabilimento 🏖️</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-4 font-medium">Costo</td>
              <td className="p-4 text-green-600 font-bold">Gratis</td>
              <td className="p-4">€10 - €35 / giorno</td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Attrezzatura</td>
              <td className="p-4">Devi portare la tua</td>
              <td className="p-4 text-blue-600">✅ Inclusa</td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Docce / Bagni</td>
              <td className="p-4">Pubblici (essenziali)</td>
              <td className="p-4 text-blue-600">✅ Privati e puliti</td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Animazione</td>
              <td className="p-4">No</td>
              <td className="p-4 text-blue-600">✅ Per bambini</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Dove sono le Spiagge Libere a Pinarella</h2>
      <p>
        Le zone di spiaggia libera a Pinarella sono ben segnalate e curate. Ecco le tre principali:
      </p>

      <div className="space-y-6 my-10 not-prose">
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-blue-200 transition-all">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Zona Nord (Bagno 90)
          </h3>
          <p className="text-slate-600 text-sm">
            Situata all'altezza di Viale dei Mille. È solitamente la più tranquilla, ideale per chi cerca relax lontano dal centro.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-green-200 transition-all">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Zona Centrale (Bagno 95-97)
          </h3>
          <p className="text-slate-600 text-sm">
            La più ampia e popolare. Si trova vicino a Via Platani ed è comodissima se alloggi in centro. Molto frequentata dalle famiglie.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-yellow-200 transition-all">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-500" />
            Zona Sud (Confine Tagliata)
          </h3>
          <p className="text-slate-600 text-sm">
            All'estremità sud del lungomare. Spesso meno affollata e molto vicina a zone della pineta ideali per passeggiate.
          </p>
        </div>
      </div>

      <h2>Prezzi dei Bagni a Pinarella (Stagione 2026)</h2>
      <p>
        I prezzi variano in base al periodo e alla fila scelta (la prima fila costa di più). Ecco le medie per 
        <strong>1 ombrellone + 2 lettini</strong>:
      </p>
      <ul>
        <li><strong>Giugno:</strong> €12 - €18 al giorno</li>
        <li><strong>Luglio:</strong> €18 - €25 al giorno</li>
        <li><strong>Agosto:</strong> €25 - €35 al giorno</li>
        <li><strong>Settembre:</strong> €10 - €15 al giorno</li>
      </ul>
      <p>
        <em>Tip:</em> Molti stabilimenti offrono abbonamenti settimanali o mensili che permettono di risparmiare sensibilmente.
      </p>

      <div className="p-8 bg-slate-900 text-white rounded-3xl my-16">
        <h2 className="text-white mt-0 mb-6">Il nostro consiglio</h2>
        <div className="space-y-4">
          <p className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-pine-400 mt-1 flex-shrink-0" />
            <span><strong>Se sei in famiglia:</strong> scegli lo stabilimento. La comodità di avere bagni, docce calde e animazione per i bimbi non ha prezzo.</span>
          </p>
          <p className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-pine-400 mt-1 flex-shrink-0" />
            <span><strong>Se cerchi risparmio:</strong> alterna! Vai in spiaggia libera nei weekend e magari affitta un ombrellone per i giorni infrasettimanali.</span>
          </p>
        </div>
        <div className="mt-8">
           <p>
             Qualunque sia la tua scelta, i nostri appartamenti 
             <Link to="/attractions" className="text-cyan-400 font-bold ml-1">Immerso nella Pineta</Link> 
             si trovano a soli 200 metri da entrambi i tipi di spiaggia.
           </p>
        </div>
      </div>

      <h2>Domande Frequenti (FAQ)</h2>
      <div className="prose-h3:text-lg prose-h3:font-bold">
        <h3>Le spiagge libere sono pulite?</h3>
        <p>Assolutamente sì. Il comune di Cervia effettua regolarmente la pulizia della sabbia e svuota i cestini dei rifiuti.</p>
        
        <h3>C'è il bagnino nelle spiagge libere?</h3>
        <p>Sì, il servizio di salvataggio è garantito anche nelle zone libere durante gli orari di balneazione.</p>

        <h3>Posso portare il cane in spiaggia?</h3>
        <p>A Pinarella ci sono stabilimenti attrezzati per i cani (Bau Beach). Sulla spiaggia libera è consentito l'accesso solo in determinate fasce orarie e zone specifiche, solitamente al mattino presto o alla sera.</p>
        <p>Scopri anche <Link to="/blog/dove-dormire-pinarella-cervia-bambini" className="font-bold underline">dove dormire a Pinarella con la tua famiglia</Link>.</p>
      </div>
    </BlogPostLayout>
  );
};

export default SpiaggeLibereStabilimenti;
