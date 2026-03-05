import React from "react";
import { Link } from "react-router-dom";
import { getCanonicalUrl } from "@/lib/config";
import {
  Waves,
  Droplets,
  ThermometerSun,
  Baby,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const MarePinarella = () => {
  const caratteristiche = [
    {
      title: "Acque Basse e Sicure",
      icon: Waves,
      description:
        "Il mare di Pinarella è caratterizzato da fondali bassi che digradano dolcemente. Per i primi 30-40 metri l'acqua arriva al massimo alla vita, rendendo la balneazione perfetta e sicura per bambini e famiglie.",
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Acqua Pulita e Trasparente",
      icon: Droplets,
      description:
        "Le acque di Pinarella sono costantemente monitorate e premiate con la Bandiera Blu. Acqua cristallina, pulita e ben ossigenata grazie alle correnti dell'Adriatico che garantiscono un ricambio continuo.",
      color: "from-cyan-400 to-teal-400",
    },
    {
      title: "Temperatura Ideale",
      icon: ThermometerSun,
      description:
        "Da giugno a settembre la temperatura dell'acqua oscilla tra i 23°C e i 27°C, perfetta per lunghe nuotate. Anche a maggio e ottobre si può fare il bagno con temperature intorno ai 18-20°C.",
      color: "from-orange-400 to-red-400",
    },
    {
      title: "Perfetto per i Bambini",
      icon: Baby,
      description:
        "Grazie ai fondali bassi e sabbiosi, i bambini possono giocare in sicurezza vicino alla riva. Le spiagge di Pinarella sono attrezzate con servizi dedicati alle famiglie: animazione, giochi d'acqua e assistenza bagnini.",
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "Mare Calmo",
      icon: Heart,
      description:
        "L'Adriatico a Pinarella è generalmente calmo, con onde dolci e gestibili. Perfetto per chi cerca relax in acqua, per chi impara a nuotare o per chi pratica sport acquatici come SUP e kayak.",
      color: "from-purple-400 to-violet-400",
    },
    {
      title: "Spiagge Attrezzate",
      icon: Shield,
      description:
        "Gli stabilimenti balneari di Pinarella offrono servizi di qualità: lettini, ombrelloni, docce calde, cabine, bar e ristoranti. La sicurezza è garantita da bagnini professionisti sempre presenti.",
      color: "from-green-400 to-emerald-400",
    },
  ];

  const periodi = [
    {
      periodo: "Maggio",
      temperatura: "18-20°C",
      descrizione:
        "Acqua ancora fresca ma piacevole per i più coraggiosi. Spiagge poco affollate, ideale per chi cerca tranquillità.",
    },
    {
      periodo: "Giugno",
      temperatura: "22-24°C",
      descrizione:
        "Inizio dell'alta stagione. Temperatura perfetta per nuotate lunghe. Mare calmo e pulito.",
    },
    {
      periodo: "Luglio-Agosto",
      temperatura: "25-27°C",
      descrizione:
        "Periodo di punta con acqua caldissima. Spiagge animate con eventi e attività. Mare come una piscina naturale.",
    },
    {
      periodo: "Settembre",
      temperatura: "23-25°C",
      descrizione:
        "Ancora caldo e perfetto per il bagno. Meno affollamento, mare più tranquillo. Ideale per famiglie.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Come è il Mare a Pinarella di Cervia? Guida Completa",
    description:
      "Scopri le caratteristiche del mare di Pinarella: acque basse e sicure, temperature ideali, pulizia certificata Bandiera Blu e fondali perfetti per bambini.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
    datePublished: "2026-02-04",
    dateModified: "2026-02-04",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Come è il Mare a Pinarella di Cervia?"
      description="Scopri com'è il mare di Pinarella: acque basse e sicure, temperature ideali, Bandiera Blu, fondali perfetti per bambini. Guida completa alle spiagge."
      heroImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
      publishDate="4 Febbraio 2026"
      readingTime="6 min di lettura"
      canonicalUrl={getCanonicalUrl("/blog/mare-pinarella-cervia")}
      keywords="mare pinarella, spiaggia pinarella, bandiera blu cervia, mare adriatico pinarella, acqua pulita cervia, fondali bassi pinarella"
      jsonLd={jsonLd}
    >
      <p className="lead">
        Il <strong>mare di Pinarella</strong> è uno dei motivi principali per
        cui tante famiglie scelgono questa località per le loro vacanze. A
        differenza di molte altre spiagge italiane, Pinarella vanta un mare con{" "}
        <strong>fondali bassi e sabbiosi</strong>, acqua{" "}
        <strong>pulita e certificata</strong>, e temperature ideali per la
        balneazione da maggio a settembre.
      </p>

      <h2 className="flex items-center gap-3">
        <Sparkles className="h-8 w-8 text-cyan-500" />
        Caratteristiche del Mare
      </h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose my-12">
        {caratteristiche.map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-400 overflow-hidden"
          >
            <CardHeader className="pb-2">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Temperature dell'Acqua per Periodo</h2>
      <p>
        Pianifica il tuo tuffo perfetto conoscendo le medie stagionali delle
        temperature marine di Pinarella:
      </p>

      <div className="space-y-4 not-prose my-8">
        {periodi.map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all border-l-4 border-l-cyan-500"
          >
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-800">
                  {item.periodo}
                </h3>
                <span className="text-xl font-bold text-cyan-600">
                  {item.temperatura}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{item.descrizione}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-cyan-50 border-l-4 border-cyan-400 p-8 my-12 rounded-r-2xl">
        <h3 className="text-cyan-900 font-bold mb-4 flex items-center gap-2 mt-0">
          <Shield className="w-6 h-6" />
          Bandiera Blu: Garanzia di Qualità
        </h3>
        <p className="text-cyan-800 mb-4">
          Le spiagge di Pinarella e Cervia sono premiate ogni anno con la{" "}
          <strong>Bandiera Blu</strong>, il riconoscimento internazionale che
          certifica la qualità delle acque e dei servizi.
        </p>
        <p className="text-cyan-800">
          Scopri di più sulla differenza tra{" "}
          <Link
            to="/blog/spiagge-libere-stabilimenti-pinarella"
            className="text-cyan-600 underline font-bold"
          >
            spiagge libere e stabilimenti a Pinarella
          </Link>
          .
        </p>
      </div>

      <h2>Consigli per Goderti al Meglio il Mare</h2>
      <ul>
        <li>
          <strong>Per Famiglie con Bambini:</strong> Scegli gli stabilimenti con
          animazione e aree giochi. Leggi la guida su{" "}
          <Link to="/blog/dove-dormire-pinarella-cervia-bambini" className="font-bold underline">
            dove dormire a Pinarella con bambini
          </Link>
          .
        </li>
        <li>
          <strong>Per Nuotatori:</strong> Il mare calmo del primo mattino è
          perfetto per il nuoto libero.
        </li>
        <li>
          <strong>Miglior Periodo:</strong> Settembre è il mese d'oro: mare
          caldissimo e meno affollamento.
        </li>
      </ul>
    </BlogPostLayout>
  );
};

export default MarePinarella;
