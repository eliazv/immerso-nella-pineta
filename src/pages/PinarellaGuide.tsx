import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Car,
  Utensils,
  Calendar,
  Waves,
  TreePine,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CONTACT_INFO } from "@/lib/contactConfig";
import { getCanonicalUrl } from "@/lib/config";

const PinarellaGuide = () => {
  const localAttractions = [
    {
      name: "Spiaggia di Pinarella",
      description: "Spiaggia sabbiosa con stabilimenti balneari attrezzati",
      distance: "200m",
      icon: Waves,
    },
    {
      name: "Pineta di Cervia",
      description: "Parco naturale per passeggiate e relax all'ombra",
      distance: "200m",
      icon: TreePine,
    },
    {
      name: "Centro di Cervia",
      description: "Centro storico con ristoranti, negozi e mercatini",
      distance: "3km",
      icon: MapPin,
    },
    {
      name: "Milano Marittima",
      description: "Vita notturna, shopping e locali esclusivi",
      distance: "5km",
      icon: Car,
    },
  ];

  const restaurants = [
    "Ristorante Da Gino - Cucina tradizionale romagnola",
    "Pizzeria Il Brigante - Pizza al taglio e ristorante",
    "Bagno Milano - Ristorante fronte mare",
    "Osteria del Gran Fritto - Specialità pesce fresco",
    "La Baia del Re - Cucina gourmet vista mare",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Pinarella di Cervia - Guida Turistica",
    description:
      "Guida completa a Pinarella di Cervia: spiagge, attrazioni, ristoranti e alloggi per vacanze perfette in Emilia Romagna.",
    url: getCanonicalUrl("/pinarella-guida"),
    image:
      "https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pinarella di Cervia",
      addressRegion: "Emilia-Romagna",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.261434,
      longitude: 12.339165,
    },
    touristType: ["Families", "Couples", "Beach Lovers"],
    includesAttraction: localAttractions.map((attraction) => ({
      "@type": "TouristAttraction",
      name: attraction.name,
      description: attraction.description,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags
        title="Pinarella di Cervia: Guida Completa alle Vacanze | Appartamenti Prenotazione Diretta"
        description="Scopri tutto su Pinarella di Cervia: spiagge, attrazioni, ristoranti e i migliori appartamenti in affitto. Prenotazione diretta senza intermediari per risparmiare."
        keywords="Pinarella di Cervia guida, vacanze Pinarella, cosa fare Pinarella, appartamenti Pinarella prenotazione diretta, spiagge Cervia, ristoranti Pinarella, attrazioni Emilia Romagna"
        canonicalUrl="/pinarella-guida"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <main className="flex-1">
        <div className="container px-4 mx-auto py-8">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg"
                alt="Pinarella di Cervia panorama spiaggia e pineta - guida vacanze"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pine-dark/80 to-transparent flex items-center">
                <div className="p-8">
                  <h1 className="font-serif text-4xl font-bold text-white mb-4">
                    Pinarella di Cervia: La Tua Guida Completa
                  </h1>
                  <p className="text-white/90 text-lg">
                    Scopri tutto quello che c'è da sapere per le tue vacanze
                    perfette
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-12">
            <div className="prose prose-lg max-w-4xl mx-auto">
              <p className="lead">
                <strong>Pinarella di Cervia</strong> è una località balneare
                dell'Emilia Romagna perfetta per vacanze al mare in famiglia.
                Situata tra la splendida pineta e il mare Adriatico, offre
                spiagge sabbiose, ristoranti tipici e numerose attrazioni per
                tutti i gusti.
              </p>

              <p>
                Che tu stia cercando un{" "}
                <strong>appartamento in affitto a Pinarella</strong> per le
                vacanze estive o semplicemente pianificando una visita, questa
                guida ti aiuterà a scoprire il meglio di questa incantevole
                località romagnola.
              </p>
            </div>
          </section>

          {/* Attractions Grid */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Attrazioni Principali di Pinarella
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {localAttractions.map((attraction, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-sea-light rounded-full flex items-center justify-center mr-4">
                      <attraction.icon className="h-6 w-6 text-sea-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {attraction.name}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {attraction.description}
                      </p>
                      <span className="text-sm font-medium text-pine-dark">
                        📍 {attraction.distance} dal nostro appartamento
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Restaurants Section */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-8">
              I Migliori Ristoranti di Pinarella
            </h2>

            <div className="bg-pine-light/20 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Utensils className="h-6 w-6 text-pine-dark mr-2" />
                <h3 className="text-xl font-semibold">
                  Dove Mangiare a Pinarella di Cervia
                </h3>
              </div>

              <ul className="space-y-3">
                {restaurants.map((restaurant, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-pine-dark mr-2" />
                    <span>{restaurant}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Accommodation CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-sea-dark to-pine-dark p-8 rounded-xl text-white text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">
                Cerca Alloggio a Pinarella?
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Prenota direttamente il nostro appartamento e risparmia fino al
                20% rispetto alle commissioni di Booking.com e Airbnb.
                Parcheggio incluso e a soli 200m dal mare!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-pine-dark hover:bg-white/90"
                >
                  <Link to="/pineta3">Vedi Appartamento</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-pine-light hover:bg-pine-light/90 text-pine-dark"
                >
                  <Link to="/pineta3/book">Prenota Ora</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="prose prose-lg max-w-4xl mx-auto">
            <h2>Come Raggiungere Pinarella di Cervia</h2>

            <h3>In Auto</h3>
            <p>
              Pinarella di Cervia è facilmente raggiungibile dall'autostrada A14
              Bologna-Taranto, uscita Cervia. Da lì sono solo 5 minuti di auto
              per raggiungere il centro di Pinarella.
            </p>

            <h3>In Treno</h3>
            <p>
              La stazione ferroviaria più vicina è{" "}
              <strong>Cervia-Milano Marittima</strong>, a circa 3 km da
              Pinarella. Da qui potete prendere l'autobus locale o un taxi.
            </p>

            <h3>In Aereo</h3>
            <p>
              Gli aeroporti più vicini sono Forlì (35 km), Bologna (100 km) e
              Rimini (45 km). Tutti offrono collegamenti per Pinarella di
              Cervia.
            </p>

            <h2>Quando Visitare Pinarella</h2>
            <p>
              <strong>Alta stagione (Giugno-Agosto):</strong> Perfetta per le
              vacanze al mare, con temperature calde e tante attività. Prenotate
              per tempo gli alloggi.
            </p>
            <p>
              <strong>
                Bassa stagione (Aprile-Maggio, Settembre-Ottobre):
              </strong>{" "}
              Temperature miti, meno affollamento e prezzi più convenienti per
              appartamenti e ristoranti.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PinarellaGuide;
