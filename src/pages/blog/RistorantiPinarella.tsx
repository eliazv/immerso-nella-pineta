import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import BreadcrumbSEO from "@/components/BreadcrumbSEO";
import { Utensils, Star, MapPin, Euro, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const RistorantiPinarella = () => {
  const restaurants = [
    {
      name: "Ristorante Da Gino",
      type: "Cucina Tradizionale Romagnola",
      description:
        "Trattoria storica famosa per i suoi passatelli, la piadina romagnola e il pesce fresco dell'Adriatico. Ambiente familiare e prezzi onesti.",
      specialty: "Passatelli, Piadina, Grigliata Mista",
      priceRange: "€€",
      location: "Centro Pinarella",
    },
    {
      name: "Pizzeria Il Brigante",
      type: "Pizzeria & Ristorante",
      description:
        "Pizza al taglio e al piatto con impasto fatto in casa. Ottima anche la cucina con primi piatti romagnoli e grigliate di carne.",
      specialty: "Pizza napoletana, Tagliatelle al ragù",
      priceRange: "€",
      location: "Viale Cadorna",
    },
    {
      name: "Bagno Milano",
      type: "Ristorante Fronte Mare",
      description:
        "Ristorante elegante direttamente sulla spiaggia. Specialità di pesce fresco, crudi di mare e vista panoramica sul tramonto.",
      specialty: "Crudi di mare, Risotto ai frutti di mare",
      priceRange: "€€€",
      location: "Lungomare Pinarella",
    },
    {
      name: "Osteria del Gran Fritto",
      type: "Specialità Pesce Fresco",
      description:
        "Come dice il nome, qui troverai il miglior fritto di pesce della zona. Anche gli antipasti di mare sono eccezionali.",
      specialty: "Fritto misto dell'Adriatico, Antipasti di mare",
      priceRange: "€€",
      location: "Via Jelenia Gora",
    },
    {
      name: "La Baia del Re",
      type: "Cucina Gourmet Vista Mare",
      description:
        "Ristorante di alta cucina con vista mare. Piatti creativi che uniscono tradizione e innovazione. Ideale per occasioni speciali.",
      specialty: "Menu degustazione, Astice alla catalana",
      priceRange: "€€€€",
      location: "Milano Marittima (5km)",
    },
    {
      name: "Piadineria Artigianale",
      type: "Piadina Romagnola",
      description:
        "Piccolo locale dove assaggiare l'autentica piadina romagnola fatta a mano. Ottima per un pranzo veloce o uno spuntino in spiaggia.",
      specialty: "Piadina con squacquerone e prosciutto",
      priceRange: "€",
      location: "Centro Pinarella",
    },
    {
      name: "Ristorante Zi Rosa",
      type: "Cucina Casalinga",
      description:
        "Cucina familiare con menù che cambia ogni giorno. Ottime le lasagne fatte in casa e i dolci della tradizione.",
      specialty: "Lasagne al forno, Tortellini in brodo",
      priceRange: "€€",
      location: "Cervia Centro (3km)",
    },
    {
      name: "Gelateria Riviera",
      type: "Gelateria Artigianale",
      description:
        "Gelato artigianale con ingredienti di prima qualità. Gusti classici e creativi, oltre a granite siciliane rinfrescanti.",
      specialty: "Gelato pistacchio, Stracciatella, Granite",
      priceRange: "€",
      location: "Lungomare",
    },
  ];

  const tips = [
    "Prenota con anticipo nei weekend e ad agosto per assicurarti un tavolo",
    "Prova i passatelli in brodo, un primo piatto tipico romagnolo",
    "La piadina con squacquerone e rucola è un must assoluto",
    "Il fritto misto dell'Adriatico include paranza, calamari e gamberoni",
    "Molti ristoranti offrono menù turistici fissi a prezzi convenienti",
    "Chiedi sempre il pesce del giorno per gustare prodotti freschissimi",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "I Migliori Ristoranti a Pinarella e Cervia: Dove Mangiare",
    description:
      "Guida completa ai migliori ristoranti di Pinarella e Cervia. Cucina romagnola tradizionale, pesce fresco, pizzerie e gelaterie artigianali.",
    image: "https://immerso-nella-pineta.vercel.app/images/logo.nobg.png",
    datePublished: "2026-02-01",
    dateModified: "2026-02-01",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Migliori Ristoranti a Pinarella e Cervia 2026 | Dove Mangiare"
        description="Scopri i migliori ristoranti a Pinarella e Cervia: cucina romagnola tradizionale, pesce fresco, pizzerie e gelaterie. Guida gastronomica completa 2026."
        keywords="ristoranti pinarella, dove mangiare cervia, cucina romagnola, pesce fresco pinarella, pizzeria cervia, trattoria pinarella"
        canonical="https://immerso-nella-pineta.vercel.app/blog/migliori-ristoranti-pinarella-cervia"
      />
      <BreadcrumbSEO
        items={[
          { name: "Home", url: "https://immerso-nella-pineta.vercel.app" },
          { name: "Blog", url: "https://immerso-nella-pineta.vercel.app/blog" },
          {
            name: "Ristoranti Pinarella",
            url: "https://immerso-nella-pineta.vercel.app/blog/migliori-ristoranti-pinarella-cervia",
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12">
          <Link
            to="/blog"
            className="text-pine-600 hover:text-pine-700 font-medium mb-4 inline-block"
          >
            ← Torna al Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-pine-800 mb-4">
            I Migliori Ristoranti a Pinarella e Cervia: Dove Mangiare
          </h1>
          <p className="text-lg text-gray-700">
            Pubblicato il 1 Febbraio 2026 • Tempo di lettura: 6 minuti
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            La Romagna è famosa per la sua tradizione gastronomica e Pinarella
            non fa eccezione. Qui troverai ristoranti per tutti i gusti: dalla
            trattoria familiare con cucina tradizionale romagnola, al ristorante
            gourmet vista mare, passando per pizzerie e piadinerie artigianali.
            Ecco la nostra guida completa ai migliori posti dove mangiare.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            I Migliori Ristoranti di Pinarella e Cervia
          </h2>

          <div className="grid gap-6 my-8 not-prose">
            {restaurants.map((restaurant, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-pine-800 mb-2">
                        {restaurant.name}
                      </CardTitle>
                      <CardDescription className="text-base font-semibold text-pine-600">
                        {restaurant.type}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      {restaurant.priceRange === "€€€€" && (
                        <Star className="w-5 h-5 fill-current" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{restaurant.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="w-4 h-4 text-pine-600" />
                    <span className="font-semibold">Specialità:</span>
                    <span className="text-gray-600">
                      {restaurant.specialty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-pine-600" />
                      <span className="text-gray-600">
                        {restaurant.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Euro className="w-4 h-4 text-pine-600" />
                      <span className="font-semibold text-gray-700">
                        {restaurant.priceRange}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Piatti Tipici da Non Perdere
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La cucina romagnola è una delle più ricche e saporite d'Italia. Ecco
            i piatti che devi assolutamente assaggiare durante la tua vacanza a
            Pinarella:
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Piadina Romagnola
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            La regina della cucina romagnola. Sottile o spessa, viene cotta su
            una piastra rovente e farcita con salumi, formaggi e verdure. La
            combinazione più classica è con prosciutto crudo e squacquerone, un
            formaggio fresco cremoso tipico della zona.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Passatelli in Brodo
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pasta fresca fatta con pane grattugiato, parmigiano, uova e noce
            moscata, servita in un ricco brodo di carne. Un primo piatto della
            tradizione contadina romagnola, perfetto nelle giornate più fresche.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Tagliatelle al Ragù
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pasta all'uovo tirata a mano condita con un ragù di carne cotto per
            ore. Ogni nonna romagnola ha la sua ricetta segreta, ma il risultato
            è sempre delizioso.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Pesce dell'Adriatico
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Essendo sul mare, il pesce fresco è protagonista. Prova il brodetto
            di pesce, il fritto misto dell'Adriatico con paranza (pesci
            piccoli), calamari e gamberoni, o i crudi di mare nei ristoranti più
            raffinati.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Crescione
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Simile alla piadina ma chiusa a mezzaluna e fritta, ripiena di
            verdure (erbette, zucca) o mozzarella. Uno street food irresistibile
            da mangiare caldo appena fritto.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Consigli Utili per Mangiare a Pinarella
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="text-gray-700">
                {tip}
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Fasce di Prezzo
          </h2>
          <div className="not-prose mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">€</span>
                    <span className="text-gray-700">
                      Economico: 10-20€ a persona
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">€€</span>
                    <span className="text-gray-700">
                      Medio: 20-35€ a persona
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">€€€</span>
                    <span className="text-gray-700">
                      Alto: 35-50€ a persona
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">€€€€</span>
                    <span className="text-gray-700">
                      Gourmet: oltre 50€ a persona
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Orari dei Pasti in Romagna
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In Romagna si pranza generalmente tra le 12:30 e le 14:00, mentre la
            cena inizia dalle 19:30-20:00. Molti ristoranti offrono anche
            servizio di mezza giornata con piadine e piatti veloci tra le 16:00
            e le 19:00.
          </p>
        </div>

        <div className="mt-16 bg-pine-50 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <Utensils className="w-8 h-8 text-pine-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-pine-800 mb-3">
                Soggiorna a Pinarella e Gusta la Vera Cucina Romagnola
              </h3>
              <p className="text-gray-700 mb-6">
                Prenota il nostro appartamento a Pinarella e avrai tutti questi
                ristoranti a pochi minuti a piedi. Prenotazione diretta senza
                commissioni - risparmia e goditi la migliore esperienza
                gastronomica romagnola!
              </p>
              <Link to="/pineta3/book">
                <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
                  Prenota Ora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default RistorantiPinarella;
