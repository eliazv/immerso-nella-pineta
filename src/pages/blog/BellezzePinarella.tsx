import React from "react";
import { Link } from "react-router-dom";
import { getCanonicalUrl } from "@/lib/config";
import {
  Waves,
  Sun,
  TreePine,
  Heart,
  Camera,
  Bike,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const BellezzePinarella = () => {
  const bellezze = [
    {
      title: "La Spiaggia Dorata",
      icon: Waves,
      description:
        "Pinarella vanta una delle spiagge più belle della Riviera Romagnola: sabbia fine e dorata che si estende per chilometri, acque basse e sicure perfette per le famiglie con bambini. Gli stabilimenti balneari sono moderni e attrezzati, con tutti i comfort.",
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "La Pineta Secolare",
      icon: TreePine,
      description:
        "Il vero gioiello di Pinarella è la pineta storica che dà il nome alla località. Oltre 200 ettari di pini marittimi e pini domestici che creano un'oasi di fresco e relax. Perfetta per passeggiate, jogging e pic-nic all'ombra.",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Il Clima Perfetto",
      icon: Sun,
      description:
        "Grazie alla posizione privilegiata sulla costa adriatica, Pinarella gode di un clima mite tutto l'anno. Estati calde ma ventilate grazie alla brezza marina, primavere e autunni dolci ideali per chi cerca tranquillità.",
      color: "from-orange-400 to-yellow-400",
    },
    {
      title: "Tramonti Mozzafiato",
      icon: Camera,
      description:
        "Ogni sera Pinarella regala tramonti spettacolari sul mare. Il lungomare si tinge di rosa e arancione, creando un'atmosfera romantica e magica. Un momento perfetto per una passeggiata o un aperitivo vista mare.",
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "Percorsi Ciclabili",
      icon: Bike,
      description:
        "Pinarella è il paradiso dei ciclisti: chilometri di piste ciclabili sicure che attraversano la pineta e collegano tutte le località della riviera. Puoi noleggiare bici ovunque e pedalare immerso nella natura.",
      color: "from-purple-400 to-violet-400",
    },
    {
      title: "Atmosfera Autentica",
      icon: Heart,
      description:
        "A differenza di altre località più caotiche, Pinarella ha mantenuto un'anima autentica e accogliente. Qui trovi ancora la vera ospitalità romagnola, i negozi storici, le tradizioni locali e un ritmo di vita rilassato.",
      color: "from-red-400 to-pink-400",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Cosa c'è di Bello a Pinarella di Cervia? Scopri le Bellezze",
    description:
      "Scopri cosa rende Pinarella di Cervia una destinazione speciale: spiagge dorate, pineta secolare, tramonti mozzafiato e atmosfera autentica. Guida completa.",
    image:
      "https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg",
    datePublished: "2026-02-04",
    dateModified: "2026-02-04",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <BlogPostLayout
      title="Cosa c'è di Bello a Pinarella di Cervia? Le Bellezze da Scoprire"
      description="Scopri cosa rende Pinarella di Cervia una destinazione speciale: spiagge dorate, pineta secolare, tramonti mozzafiato, percorsi ciclabili e atmosfera autentica."
      heroImage="https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg"
      publishDate="4 Febbraio 2026"
      readingTime="5 min di lettura"
      category="Destinazione"
      canonicalUrl={getCanonicalUrl("/blog/bellezze-pinarella-cervia")}
      keywords="bellezze pinarella, cosa vedere pinarella, pineta cervia, spiaggia pinarella, tramonti pinarella, vacanze pinarella"
      jsonLd={jsonLd}
    >
      {/* Intro */}
      <p className="text-xl text-gray-700 leading-relaxed mb-6">
        <strong>Pinarella di Cervia</strong> è una delle perle nascoste
        della Riviera Romagnola. A differenza delle località più turistiche
        e affollate, Pinarella ha saputo mantenere un'
        <strong>anima autentica</strong> e un{" "}
        <strong>contatto genuino con la natura</strong>.
      </p>

      <p className="text-gray-700 leading-relaxed mb-6">
        Ma cosa rende Pinarella così speciale? Cosa c'è di bello in questa
        località che attira famiglie, coppie e amanti della natura?
        Scopriamolo insieme in questa guida completa.
      </p>

      {/* Bellezze di Pinarella */}
      <h2 className="text-3xl font-bold text-pine-dark mb-8 flex items-center gap-3">
        <Heart className="h-8 w-8 text-red-500" />
        Le Bellezze di Pinarella
      </h2>

      <div className="grid md:grid-cols-2 gap-6 not-prose">
        {bellezze.map((item, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-all duration-300 border-2 hover:border-pine-light"
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

      {/* Perché Scegliere Pinarella */}
      <h2 className="text-3xl font-bold text-pine-dark mb-6">
        Perché Scegliere Pinarella per le Tue Vacanze
      </h2>

      <div className="bg-gradient-to-br from-pine-light/10 to-sage-light/10 rounded-xl p-8 mb-6 not-prose">
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Pinarella non è la solita località balneare.</strong> È un
          luogo dove il mare incontra la pineta, dove il turismo convive
          armoniosamente con la natura, dove puoi trovare sia il relax che
          cerchi sia l'animazione quando lo desideri.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          La <strong>posizione strategica</strong> ti permette di
          raggiungere facilmente:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>
            <strong>Cervia centro</strong> con le sue saline storiche (3 km)
          </li>
          <li>
            <strong>Milano Marittima</strong> per shopping e vita notturna
            (5 km)
          </li>
          <li>
            <strong>Ravenna</strong> e i suoi mosaici UNESCO (25 km)
          </li>
          <li>
            <strong>Parchi divertimento</strong> come Mirabilandia (30 km)
          </li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          Tutto questo mantenendo la{" "}
          <strong>tranquillità e l'autenticità</strong>
          che rendono Pinarella un luogo perfetto per famiglie con bambini,
          coppie in cerca di romanticismo e chiunque voglia staccare davvero
          dalla routine quotidiana.
        </p>
      </div>

      {/* Consigli Pratici */}
      <h2 className="text-3xl font-bold text-pine-dark mb-6">
        Consigli per Vivere al Meglio Pinarella
      </h2>

      <div className="bg-white rounded-xl p-6 shadow-md space-y-4 not-prose">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Bike className="w-6 h-6 text-pine-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-pine-dark mb-2">
              Noleggia una Bici
            </h3>
            <p className="text-gray-600">
              Il modo migliore per esplorare Pinarella e dintorni. Le piste
              ciclabili sono sicure e ben segnalate, perfette anche per i
              bambini.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <TreePine className="w-6 h-6 text-pine-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-pine-dark mb-2">
              Esplora la Pineta
            </h3>
            <p className="text-gray-600">
              Dedica almeno un pomeriggio a passeggiare nella pineta. Porta
              un telo e un libro: è il posto perfetto per rilassarsi
              all'ombra nelle ore più calde.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Camera className="w-6 h-6 text-pine-dark" />
          </div>
          <div>
            <h3 className="font-semibold text-pine-dark mb-2">
              Non Perdere i Tramonti
            </h3>
            <p className="text-gray-600">
              Ogni sera, verso le 19:30-20:00, fai una passeggiata sul
              lungomare. I tramonti di Pinarella sono uno spettacolo
              imperdibile.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-8 rounded-2xl my-8 not-prose">
        <h3 className="text-xl font-bold text-pine-900 mb-4">Approfondisci Pinarella</h3>
        <ul className="space-y-2">
          <li><Link to="/blog/mare-pinarella-cervia" className="text-pine-600 hover:underline font-medium">→ Com'è il mare a Pinarella? Acque basse e Bandiera Blu</Link></li>
          <li><Link to="/blog/cosa-fare-pinarella-cervia" className="text-pine-600 hover:underline font-medium">→ Cosa fare a Pinarella: 10 attività imperdibili</Link></li>
          <li><Link to="/blog/pinarella-o-milano-marittima" className="text-pine-600 hover:underline font-medium">→ Pinarella o Milano Marittima? Confronto completo</Link></li>
        </ul>
      </div>
    </BlogPostLayout>
  );
};

export default BellezzePinarella;
