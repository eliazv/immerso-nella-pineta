import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Calendar,
  MapPin,
  ChevronRight,
  CalendarDays,
  Video,
  ShoppingCart,
  UtensilsCrossed,
  PartyPopper,
  Waves,
  Store,
  Palmtree,
  Music,
  ShoppingBag,
  Wind,
  Car,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CONTACT_INFO } from "@/lib/contactConfig";

const Attractions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurants = [
    {
      name: "Ristorante Saretina 152",
      type: "Cucina Romagnola e Pesce",
      distance: "2 km",
      description:
        "Autentica cucina romagnola di mare, con pesce fresco dell'Adriatico e piatti della tradizione locale. Da provare i primi piatti fatti in casa.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
      priceRange: "€€€",
    },
    {
      name: "Ristorante Damida",
      type: "Pesce e Cucina Italiana",
      distance: "1.5 km",
      description:
        "Cucina a base di pesce con proposte creative e ingredienti di stagione. Ambiente elegante e raffinato, perfetto per una cena speciale.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c7/78/54/frittone-dello-sborone.jpg?q=80&w=1000&auto=format&fit=crop",
      priceRange: "€€€",
    },
    {
      name: "Bagno Andrea N.83",
      type: "Pranzo in riva al mare",
      distance: "0.5 km",
      description:
        "Ristorante in stabilimento balneare. Antipasti di pesce, primi e secondi sia pesce che carne, insalatone fresche e brioches cervesi.",
      image:
        "https://www.ravennaedintorni.it/wp-content/uploads/2022/08/losco.jpg?q=80&w=1000&auto=format&fit=crop",
      priceRange: "€€",
    },
    {
      name: "Gelateria Mezzanotte",
      type: "Gelateria Artigianale",
      distance: "0.2 km",
      description:
        "Gelato artigianale di alta qualità a pochi passi dall'alloggio. Gusti tradizionali e innovativi.",
      image:
        "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=1000&auto=format&fit=crop",
      priceRange: "€",
    },
  ];

  const events = [
    {
      title: "Pinarella Summer Festival",
      date: "Giugno - Agosto",
      description:
        "Concerti, spettacoli e animazione serale sul lungomare di Pinarella. Programma completo nei siti indicati.",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop",
      icon: PartyPopper,
      blogSlug: "pinarella-summer-festival",
    },
    {
      title: "Festival Internazionale dell'Aquilone",
      date: "Fine aprile - Inizio maggio",
      description:
        "Oltre 200 artisti da 50 paesi per celebrare il volo degli aquiloni sulla spiaggia di Cervia.",
      image:
        "https://www.ravenna24ore.it/wp-content/uploads/sites/6/2023/04/36-ARTEVENTO-CERVIA-Davide-Baroni-scaled-1.jpg?q=80&w=1000&auto=format&fit=crop",
      icon: Calendar,
      blogSlug: "festival-aquilone-cervia",
    },
    {
      title: "Mercatino dell'Artigianato",
      date: "Ogni giovedì sera (Maggio-Settembre)",
      description:
        "Mercatino artistico e artigianale in via Mezzanotte. Opere uniche e creazioni artistiche locali.",
      image:
        "https://www.novaratoday.it/~media/horizontal-hi/49129561680332/mercatino-antiquariato-arona-1.jpg?q=80&w=1000&auto=format&fit=crop",
      icon: Store,
      blogSlug: "mercatino-artigianato-cervia",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Attrazioni e Luoghi da Visitare a Pinarella di Cervia | Immerso nella Pineta"
        description="Scopri le migliori attrazioni vicino al nostro appartamento immerso nella pineta a Pinarella di Cervia: spiaggia, parchi tematici, musei e ristoranti a pochi minuti di distanza. Immerso nella Pineta."
        canonicalUrl="/attractions"
        keywords="immerso nella pineta, attrazioni pinarella di cervia, cosa fare a cervia, luoghi interesse cervia, parchi divertimento vicino pinarella"
      />
      <SEOSchema />
      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <main className="flex-1 pt-20 pb-16">
        {/* Hero Section Migliorata */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sea-light/20 via-transparent to-pine-light/20"></div>
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-sea-dark/10 backdrop-blur-sm text-sea-dark px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 border border-sea-light/50">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Scopri Pinarella di Cervia</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-pine-dark">
                Attrazioni e Servizi Locali
              </h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                Tutto ciò che ti serve sapere per un soggiorno perfetto: i
                migliori ristoranti, eventi imperdibili e consigli utili.
              </p>
            </div>
          </div>
        </section>

        {/* Sezioni Attrazioni - Tutto in una pagina */}
        <section className="container px-4 mx-auto">
          
          {/* Ristoranti */}
          <div id="ristoranti" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Utensils className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Dove Mangiare
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {restaurants.map((restaurant, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className="bg-white/90 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {restaurant.distance}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 text-pine-dark line-clamp-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {restaurant.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eventi */}
          <div id="eventi" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Eventi
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {events.map((event, index) => (
                <Link
                  key={index}
                  to={event.blogSlug ? `/blog/${event.blogSlug}` : "#"}
                  className="group bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="relative h-28 md:h-36 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-full">
                      <event.icon className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 text-pine-dark line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-purple-600 font-medium">
                      {event.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Info Utili */}
          <div id="info" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Info Utili
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Spiagge */}
              <div className="bg-sea-soft/30 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-sea-dark flex items-center gap-2">
                  <Waves className="h-4 w-4" /> Spiagge
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bagno Andrea 83</span>
                    <span className="text-sea-dark font-medium">500m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spiaggia Libera</span>
                    <span className="text-sea-dark font-medium">700m</span>
                  </div>
                </div>
              </div>

              {/* Supermercati */}
              <div className="bg-pine-light/30 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-pine-dark flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Supermercati
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Svelto A&O</span>
                    <span className="text-pine-dark font-medium">200m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conad</span>
                    <span className="text-pine-dark font-medium">2km</span>
                  </div>
                </div>
              </div>

              {/* Mercati */}
              <div className="bg-amber-50 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-amber-700 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> Mercati
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Serale Pinarella</span>
                    <span className="text-amber-700 font-medium">Mar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cervia</span>
                    <span className="text-amber-700 font-medium">Gio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link Esterni Eventi */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <a
              href="https://www.pinarellavillage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-pine-light/20 rounded-xl p-4 border border-pine-light hover:border-pine-dark transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-pine-dark rounded-full flex items-center justify-center shrink-0">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-pine-dark">Pinarella Village</h3>
                <p className="text-xs text-gray-600">Eventi e attività</p>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-pine-dark group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.rivieradeipini.it/eventi-riviera-dei-pini/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-sea-light/20 rounded-xl p-4 border border-sea-light hover:border-sea-dark transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-sea-dark rounded-full flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sea-dark">Riviera dei Pini</h3>
                <p className="text-xs text-gray-600">Calendario eventi</p>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-sea-dark group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Blog Articoli */}
          <div id="blog" className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-pine-dark">
                Guide e Consigli
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { title: "Cosa Fare", slug: "cosa-fare-pinarella-cervia", icon: Palmtree, color: "from-blue-500 to-cyan-500" },
                { title: "Ristoranti", slug: "migliori-ristoranti-pinarella-cervia", icon: Utensils, color: "from-orange-500 to-red-500" },
                { title: "Come Arrivare", slug: "come-arrivare-pinarella", icon: Car, color: "from-green-500 to-emerald-500" },
                { title: "Eventi", slug: "eventi-pinarella-cervia", icon: PartyPopper, color: "from-purple-500 to-pink-500" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={`/blog/${item.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className={`h-24 bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-pine-dark">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-medium my-6 text-center">
                La nostra posizione
              </h2>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2855.5175857991725!2d12.336976126126825!3d44.26143457117975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb6ec48c3e64f%3A0xe2e57ac4f1dda518!2sVia%20Vallombrosa%2C%2010%2C%2048015%20Cervia%20RA!5e0!3m2!1sit!2sit!4v1712597348639!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa dell'appartamento"
                />
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm inline-flex items-center"
                >
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  Via Vallombrosa 10, Pinarella di Cervia (RA)
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Attractions;
