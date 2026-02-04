import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import {
  ArrowLeft,
  Waves,
  Droplets,
  ThermometerSun,
  Baby,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
    datePublished: "2026-02-04",
    dateModified: "2026-02-04",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Come è il Mare a Pinarella di Cervia? | Caratteristiche e Temperature"
        description="Scopri com'è il mare di Pinarella: acque basse e sicure, temperature ideali, Bandiera Blu, fondali perfetti per bambini. Guida completa alle spiagge."
        keywords="mare pinarella, spiaggia pinarella, bandiera blu cervia, mare adriatico pinarella, acqua pulita cervia, fondali bassi pinarella"
        canonicalUrl={getCanonicalUrl("/blog/mare-pinarella-cervia")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 pt-24 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al Blog
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
            alt="Mare di Pinarella di Cervia - acque basse e cristalline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Waves className="w-6 h-6" />
                <span className="text-sm font-medium">
                  4 febbraio 2026 • 6 min di lettura
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Come è il Mare a Pinarella di Cervia?
              </h1>
              <p className="text-xl text-white/90">
                Scopri le caratteristiche uniche del mare adriatico di
                Pinarella: acque basse, pulite e sicure
              </p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <article className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Il <strong>mare di Pinarella</strong> è uno dei motivi principali
            per cui tante famiglie scelgono questa località per le loro vacanze.
            Ma cosa lo rende così speciale?
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            A differenza di molte altre spiagge italiane, Pinarella vanta un
            mare con <strong>fondali bassi e sabbiosi</strong>, acqua{" "}
            <strong>pulita e certificata</strong>, e temperature ideali per la
            balneazione da maggio a settembre. Scopriamo insieme tutte le
            caratteristiche che rendono il mare di Pinarella perfetto per ogni
            tipo di vacanza.
          </p>
        </article>

        {/* Caratteristiche del Mare */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pine-dark mb-8 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-cyan-500" />
            Caratteristiche del Mare di Pinarella
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {caratteristiche.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-2 hover:border-cyan-400"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-pine-dark">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Temperature dell'Acqua */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pine-dark mb-6">
            Temperature dell'Acqua per Periodo
          </h2>

          <div className="space-y-4">
            {periodi.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all border-l-4 border-l-cyan-500"
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-pine-dark">
                      {item.periodo}
                    </h3>
                    <span className="text-2xl font-bold text-cyan-600">
                      {item.temperatura}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bandiera Blu */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-pine-dark mb-3">
                  Bandiera Blu: Garanzia di Qualità
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le spiagge di Pinarella e Cervia sono premiate ogni anno con
                  la <strong>Bandiera Blu</strong>, il riconoscimento
                  internazionale che certifica:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Qualità delle acque</strong>: analisi costanti per
                    garantire balneazione sicura
                  </li>
                  <li>
                    <strong>Pulizia delle spiagge</strong>: manutenzione
                    quotidiana e gestione rifiuti
                  </li>
                  <li>
                    <strong>Servizi e sicurezza</strong>: presenza bagnini,
                    accessibilità, informazioni turistiche
                  </li>
                  <li>
                    <strong>Educazione ambientale</strong>: rispetto
                    dell'ecosistema marino e costiero
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Consigli */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pine-dark mb-6">
            Consigli per Goderti al Meglio il Mare
          </h2>

          <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
            <div>
              <h3 className="font-semibold text-pine-dark mb-2 flex items-center gap-2">
                <Baby className="w-5 h-5" />
                Per Famiglie con Bambini
              </h3>
              <p className="text-gray-600">
                Scegli gli stabilimenti balneari attrezzati con animazione,
                piscine gonfiabili e servizi dedicati. I bagnini sono sempre
                presenti e attenti alla sicurezza dei più piccoli.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-pine-dark mb-2 flex items-center gap-2">
                <Waves className="w-5 h-5" />
                Per Nuotatori e Sportivi
              </h3>
              <p className="text-gray-600">
                Il mare calmo di Pinarella è perfetto per nuoto libero, SUP,
                kayak e windsurf. Molti stabilimenti noleggiano attrezzature
                sportive.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-pine-dark mb-2 flex items-center gap-2">
                <ThermometerSun className="w-5 h-5" />
                Miglior Periodo per il Bagno
              </h3>
              <p className="text-gray-600">
                Da metà giugno a metà settembre le condizioni sono ottimali. Per
                evitare la folla, scegli settembre: mare ancora caldo e spiagge
                più tranquille.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Prenotazione */}
        <div className="bg-gradient-to-br from-pine-dark to-sea-dark rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vieni a Scoprire il Mare di Pinarella
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Prenota il tuo soggiorno a soli 200 metri dalla spiaggia.
            Prenotazione diretta senza commissioni!
          </p>
          <Link to="/pineta3/book">
            <Button
              size="lg"
              className="bg-white text-pine-dark hover:bg-white/90 font-semibold px-8"
            >
              Prenota Ora
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MarePinarella;
