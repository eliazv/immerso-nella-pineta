import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl } from "@/lib/config";
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  MapPin,
  Clock,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MercatoSeralePinarella = () => {
  const mercati = [
    {
      nome: "Mercato Serale di Pinarella",
      giorni: "Ogni Martedì e Venerdì",
      orario: "18:00 - 24:00",
      luogo: "Lungomare di Pinarella",
      descrizione:
        "Il mercato serale più caratteristico della zona. Bancarelle di abbigliamento, accessori, oggettistica per la casa, giocattoli e prodotti tipici locali. Atmosfera festosa con luci, musica e street food.",
      icon: Moon,
      color: "from-purple-500 to-pink-500",
    },
    {
      nome: "Mercato Diurno di Cervia",
      giorni: "Ogni Giovedì",
      orario: "8:00 - 13:00",
      luogo: "Centro storico di Cervia",
      descrizione:
        "Grande mercato settimanale con centinaia di bancarelle: abbigliamento, scarpe, alimentari, fiori e piante. Ideale per la spesa e per trovare ottimi affari.",
      icon: Sun,
      color: "from-yellow-400 to-orange-400",
    },
    {
      nome: "Mercatino dell'Artigianato",
      giorni: "Luglio-Agosto (date variabili)",
      orario: "19:00 - 23:30",
      luogo: "Viale Italia - Milano Marittima",
      descrizione:
        "Mercatino serale di artigianato locale: ceramiche, gioielli, prodotti in legno, dipinti e creazioni uniche. Focus su prodotti di qualità fatti a mano.",
      icon: Star,
      color: "from-amber-500 to-red-500",
    },
  ];

  const prodotti = [
    {
      categoria: "Abbigliamento",
      descrizione:
        "Vestiti estivi, costumi da bagno, copricostumi, parei, sandali e accessori mare.",
    },
    {
      categoria: "Artigianato Locale",
      descrizione:
        "Ceramiche di Faenza, cestini di vimini, taglieri in legno d'ulivo, prodotti tipici romagnoli.",
    },
    {
      categoria: "Giocattoli",
      descrizione:
        "Gonfiabili, secchielli e palette, giochi da spiaggia, aquiloni, bambole e pupazzi.",
    },
    {
      categoria: "Casa e Giardinaggio",
      descrizione:
        "Tovaglie, decorazioni, piante, vasi, complementi d'arredo per la casa al mare.",
    },
    {
      categoria: "Prodotti Tipici",
      descrizione:
        "Piadina romagnola, salumi, formaggi, vini locali, miele, confetture artigianali.",
    },
    {
      categoria: "Street Food",
      descrizione:
        "Piadina calda, crescioni, olive ascolane, arrosticini, gelato artigianale, fritture di pesce.",
    },
  ];

  const consigli = [
    {
      titolo: "Arriva Presto",
      descrizione:
        "I mercati serali sono affollati. Arriva verso le 18:30-19:00 per evitare la folla e avere più scelta.",
    },
    {
      titolo: "Porta Contanti",
      descrizione:
        "Molti venditori non accettano carte. Porta sempre contanti in tagli piccoli per facilitare gli acquisti.",
    },
    {
      titolo: "Contratta con Garbo",
      descrizione:
        "È tradizione contrattare educatamente, soprattutto se acquisti più articoli. Spesso otterrai uno sconto!",
    },
    {
      titolo: "Assaggia lo Street Food",
      descrizione:
        "Non perdere l'occasione di assaggiare le specialità romagnole: piadina calda, crescioni e olive ascolane sono imperdibili.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Mercato Serale a Pinarella di Cervia: Date, Orari e Cosa Trovare",
    description:
      "Scopri quando c'è il mercato serale a Pinarella di Cervia: giorni, orari, location e cosa puoi trovare. Guida completa ai mercati della zona.",
    image:
      "https://images.unsplash.com/photo-1555529669-2269763671c6?w=1200&q=80",
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
        title="Mercato Serale a Pinarella di Cervia: Quando c'è? Date e Orari 2026"
        description="Scopri quando c'è il mercato serale a Pinarella: ogni martedì e venerdì dalle 18:00. Date, orari, location e cosa trovare nei mercati della zona."
        keywords="mercato serale pinarella, mercato cervia, bancarelle pinarella, mercatino pinarella, shopping cervia, mercato martedì venerdì"
        canonicalUrl={getCanonicalUrl("/blog/mercato-serale-pinarella")}
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
            src="https://www.viviromagna.it/archivio/eventi/7415/aghi-di-pino.jpg"
            alt="Mercato serale di Pinarella - bancarelle e shopping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-6 h-6" />
                <span className="text-sm font-medium">
                  4 febbraio 2026 • 5 min di lettura
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Quando c'è il Mercato Serale a Pinarella?
              </h1>
              <p className="text-xl text-white/90">
                Date, orari e guida completa ai mercati serali e diurni di
                Pinarella e Cervia
              </p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <article className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Uno dei momenti più caratteristici della vacanza a Pinarella è la
            passeggiata al <strong>mercato serale</strong>. Un'occasione per
            fare shopping, assaggiare specialità locali e immergersi
            nell'atmosfera festosa delle serate estive in Romagna.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Ma quando c'è esattamente il mercato serale a Pinarella? E quali
            altri mercati puoi visitare nella zona? Ecco la guida completa con
            tutti i giorni, gli orari e i consigli per vivere al meglio questa
            esperienza.
          </p>
        </article>

        {/* Risposta Diretta */}
        <section className="mb-12">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="w-12 h-12 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-900 mb-4">
                    Mercato Serale di Pinarella
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <strong>Giorni:</strong> Ogni <strong>Martedì</strong> e{" "}
                      <strong>Venerdì</strong> sera
                    </p>
                    <p className="flex items-center gap-2 text-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <strong>Orario:</strong> dalle 18:00 alle 24:00
                    </p>
                    <p className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <strong>Dove:</strong> Lungomare di Pinarella
                    </p>
                    <p className="mt-4 text-gray-600">
                      <strong>Periodo:</strong> Da giugno a inizio settembre
                      (verifica le date esatte per il 2026)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tutti i Mercati */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pine-dark mb-8">
            Tutti i Mercati della Zona
          </h2>

          <div className="space-y-6">
            {mercati.map((mercato, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-2"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mercato.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <mercato.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-pine-dark mb-3">
                        {mercato.nome}
                      </CardTitle>
                      <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{mercato.giorni}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{mercato.orario}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{mercato.luogo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {mercato.descrizione}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cosa Trovare */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pine-dark mb-6">
            Cosa Puoi Trovare ai Mercati
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {prodotti.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-lg text-pine-dark flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                    {item.categoria}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Consigli */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pine-dark mb-6">
            Consigli per Vivere al Meglio il Mercato
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {consigli.map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-sage-50 to-white"
              >
                <CardContent className="p-6">
                  <h3 className="font-bold text-pine-dark mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    {item.titolo}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Esperienza */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-pine-dark mb-4">
              L'Atmosfera del Mercato Serale
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Il mercato serale di Pinarella non è solo shopping: è un'
              <strong>esperienza autentica</strong> della vita romagnola. Le
              bancarelle illuminate, la musica di sottofondo, il profumo della
              piadina calda che si mescola all'aria di mare, le famiglie che
              passeggiano, i bambini che giocano...
            </p>
            <p className="text-gray-700 leading-relaxed">
              È il momento perfetto per fare acquisti, cenare con lo street food
              locale e vivere l'animazione serale di Pinarella. Un'esperienza da
              non perdere durante la tua vacanza!
            </p>
          </div>
        </section>

        {/* CTA Prenotazione */}
        <div className="bg-gradient-to-br from-pine-dark to-sea-dark rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vieni a Vivere le Serate di Pinarella
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Prenota il tuo soggiorno a pochi passi dal mercato serale e dal
            lungomare. Prenotazione diretta senza commissioni!
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

export default MercatoSeralePinarella;
