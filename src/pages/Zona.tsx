import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Calendar,
  MapPin,
  ChevronRight,
  CalendarDays,
  Video,
  ShoppingCart,
  PartyPopper,
  Waves,
  Palmtree,
  ShoppingBag,
  Wind,
  Car,
  Info,
  BookOpen,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CONTACT_INFO } from "@/lib/contactConfig";

const Zona = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurants = [
    {
      name: "Ristorante Saretina 152",
      distance: "2 km",
      description:
        "Autentica cucina romagnola di mare, con pesce fresco dell'Adriatico.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Ristorante Damida",
      distance: "1.5 km",
      description:
        "Cucina a base di pesce con proposte creative e ingredienti di stagione.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c7/78/54/frittone-dello-sborone.jpg?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Bagno Andrea N.83",
      distance: "500m",
      description:
        "Ristorante in stabilimento balneare. Antipasti di pesce e piatti locali.",
      image:
        "https://www.ravennaedintorni.it/wp-content/uploads/2022/08/losco.jpg?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Gelateria Mezzanotte",
      distance: "200m",
      description:
        "Gelato artigianale di alta qualità a pochi passi dall'alloggio.",
      image:
        "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=400&auto=format&fit=crop",
    },
  ];

  const events = [
    {
      title: "Pinarella Summer Festival",
      date: "Giugno - Agosto",
      description: "Concerti, spettacoli e animazione serale sul lungomare.",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=400&auto=format&fit=crop",
      slug: "pinarella-summer-festival",
    },
    {
      title: "Festival Aquilone",
      date: "Aprile - Maggio",
      description: "Oltre 200 artisti da 50 paesi per il volo degli aquiloni.",
      image:
        "https://www.ravenna24ore.it/wp-content/uploads/sites/6/2023/04/36-ARTEVENTO-CERVIA-Davide-Baroni-scaled-1.jpg?q=80&w=400&auto=format&fit=crop",
      slug: "festival-aquilone-cervia",
    },
    {
      title: "Mercatino Artigianato",
      date: "Giovedì sera",
      description: "Mercatino artistico in via Mezzanotte.",
      image:
        "https://www.novaratoday.it/~media/horizontal-hi/49129561680332/mercatino-antiquariato-arona-1.jpg?q=80&w=400&auto=format&fit=crop",
      slug: "mercatino-artigianato-cervia",
    },
  ];

  const blogPosts = [
    {
      title: "Cosa Fare a Pinarella: Guida Completa",
      slug: "cosa-fare-pinarella-cervia",
      excerpt:
        "Attività, attrazioni e esperienze da vivere durante la tua vacanza",
      icon: Palmtree,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      color: "from-blue-500 to-cyan-500",
      date: "2026-02-01",
    },
    {
      title: "Dove Mangiare: Ristoranti e Locali",
      slug: "migliori-ristoranti-pinarella-cervia",
      excerpt:
        "Guida gastronomica completa ai ristoranti, trattorie e pizzerie",
      icon: Utensils,
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      color: "from-orange-500 to-red-500",
      date: "2026-02-01",
    },
    {
      title: "Come Arrivare: Auto, Treno e Aereo",
      slug: "come-arrivare-pinarella",
      excerpt: "Tutte le informazioni per raggiungere Pinarella di Cervia",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
      color: "from-green-500 to-emerald-500",
      date: "2026-02-01",
    },
    {
      title: "Eventi e Manifestazioni 2026",
      slug: "eventi-pinarella-cervia",
      excerpt: "Tutti gli eventi, sagre e concerti da non perdere",
      icon: PartyPopper,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      color: "from-purple-500 to-pink-500",
      date: "2026-02-01",
    },
    {
      title: "Spiagge Libere vs Stabilimenti",
      slug: "spiagge-libere-stabilimenti-pinarella",
      excerpt: "Dove sono le spiagge libere gratuite? Confronto completo",
      icon: Waves,
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      color: "from-cyan-500 to-blue-500",
      date: "2026-02-04",
    },
    {
      title: "Il Mare di Pinarella: Caratteristiche",
      slug: "mare-pinarella-cervia",
      excerpt: "Acque basse e sicure, Bandiera Blu, temperature ideali",
      icon: Wind,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      color: "from-sky-500 to-blue-500",
      date: "2026-02-04",
    },
    {
      title: "Mercato Serale: Date e Orari",
      slug: "mercato-serale-pinarella",
      excerpt: "Ogni martedì e venerdì dalle 18:00",
      icon: ShoppingBag,
      image:
        "https://images.unsplash.com/photo-1543168256-418811576931?w=800&q=80",
      color: "from-amber-500 to-orange-500",
      date: "2026-02-04",
    },
    {
      title: "Prezzi Appartamenti 2026",
      slug: "prezzi-appartamenti-pinarella-2026",
      excerpt: "Guida completa ai prezzi per affittare",
      icon: Calendar,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      color: "from-emerald-500 to-green-500",
      date: "2026-02-04",
    },
    {
      title: "Meteo e Clima: Quando Andare?",
      slug: "meteo-pinarella-quando-andare",
      excerpt: "Temperature, periodi migliori e cosa portare",
      icon: Wind,
      image:
        "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800&q=80",
      color: "from-orange-500 to-red-500",
      date: "2026-02-04",
    },
    {
      title: "Vacanza con Bambini",
      slug: "dove-dormire-pinarella-cervia-bambini",
      excerpt: "Zone migliori, servizi utili e spiagge sicure",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      color: "from-pink-500 to-rose-500",
      date: "2026-02-05",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Pinarella di Cervia: Attrazioni, Eventi e Guide | Immerso nella Pineta"
        description="Scopri Pinarella di Cervia: ristoranti, eventi, mercati, spiagge e guide turistiche. Tutto per la tua vacanza in Romagna."
        keywords="pinarella cervia attrazioni, eventi pinarella, cosa fare pinarella, ristoranti cervia, mercato serale pinarella, spiagge libere cervia"
        canonicalUrl="/zona"
      />
      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <main className="flex-1 pt-20 pb-16">
        {/* Hero */}
        <section className="relative py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pine-dark">
                La Zona di Pinarella di Cervia
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                Ristoranti, eventi, mercati e tutto quello che c'è da scoprire
                nella tua vacanza in Romagna
              </p>
            </div>
          </div>
        </section>

        <div className="container px-4 mx-auto space-y-16">
          {/* RISTORANTI */}
          <section id="ristoranti">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Utensils className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Dove Mangiare
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {restaurants.map((r, i) => (
                <Link
                  key={i}
                  to="/blog/migliori-ristoranti-pinarella-cervia"
                  className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-md transition"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-white/90 text-orange-600 text-[10px] px-2 py-0.5 rounded-full">
                      {r.distance}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {r.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* EVENTI */}
          <section id="eventi">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Eventi e Manifestazioni
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {events.map((e, i) => (
                <Link
                  key={i}
                  to={e.slug ? `/blog/${e.slug}` : "#"}
                  className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-md transition"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {e.title}
                    </h3>
                    <p className="text-xs text-purple-600 font-medium">
                      {e.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Link Esterni */}
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <a
                href="https://www.pinarellavillage.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-pine-light/20 p-3 rounded-lg border border-pine-light hover:border-pine-dark transition"
              >
                <Video className="h-5 w-5 text-pine-dark shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-pine-dark block">
                    Pinarella Village
                  </span>
                  <span className="text-xs text-gray-500">
                    Eventi, attività e attrazioni
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-pine-dark shrink-0" />
              </a>
              <a
                href="https://www.rivieradeipini.it/eventi-riviera-dei-pini/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg border border-purple-200 hover:border-purple-400 transition"
              >
                <Calendar className="h-5 w-5 text-purple-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-purple-700 block">
                    Riviera dei Pini
                  </span>
                  <span className="text-xs text-gray-500">
                    Calendario completo eventi estivi
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-purple-600 shrink-0" />
              </a>
            </div>
          </section>

          {/* INFO UTILI */}
          <section id="info">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">Info Utili</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-sea-soft/30 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-sea-dark flex items-center gap-2">
                  <Waves className="h-4 w-4" /> Spiagge
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bagno Andrea 83</span>
                    <span className="font-medium text-sea-dark">500m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spiaggia Libera</span>
                    <span className="font-medium text-sea-dark">700m</span>
                  </div>
                </div>
              </div>
              <div className="bg-pine-light/30 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-pine-dark flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Supermercati
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Svelto A&O</span>
                    <span className="font-medium">200m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conad</span>
                    <span className="font-medium">2km</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-amber-700 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> Mercati
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Serale Pinarella</span>
                    <span className="font-medium text-amber-700">Mar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cervia</span>
                    <span className="font-medium text-amber-700">Gio</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GUIDE E BLOG */}
          <section id="guide">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Guide e Consigli
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {blogPosts.map((post, index) => (
                <Link
                  key={index}
                  to={`/blog/${post.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 border border-gray-100">
                    {/* Immagine - più bassa e arrotondata */}
                    <div className="relative h-28 overflow-hidden rounded-t-lg">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                      ></div>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow">
                        <post.icon className="w-3.5 h-3.5 text-pine-dark" />
                      </div>
                    </div>

                    <CardHeader className="p-3">
                      <CardTitle className="text-sm text-pine-dark line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-pine-dark font-medium hover:underline text-sm"
              >
                Leggi tutti gli articoli <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Zona;
