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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState("restaurants");

  useEffect(() => {
    // Scroll to top on page load
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
    },
    {
      title: "Festival Internazionale dell'Aquilone",
      date: "Fine aprile - Inizio maggio",
      description:
        "Oltre 200 artisti da 50 paesi per celebrare il volo degli aquiloni sulla spiaggia di Cervia.",
      image:
        "https://www.ravenna24ore.it/wp-content/uploads/sites/6/2023/04/36-ARTEVENTO-CERVIA-Davide-Baroni-scaled-1.jpg?q=80&w=1000&auto=format&fit=crop",
      icon: Calendar,
    },
    {
      title: "Mercatino dell'Artigianato",
      date: "Ogni giovedì sera (Maggio-Settembre)",
      description:
        "Mercatino artistico e artigianale in via Mezzanotte. Opere uniche e creazioni artistiche locali.",
      image:
        "https://www.novaratoday.it/~media/horizontal-hi/49129561680332/mercatino-antiquariato-arona-1.jpg?q=80&w=1000&auto=format&fit=crop",
      icon: Store,
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

        {/* Tabs Section Migliorata */}
        <section className="container px-4 mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-6xl mx-auto"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8 md:mb-12 h-12 md:h-14 bg-white shadow-lg border-2 border-gray-200">
              <TabsTrigger
                value="restaurants"
                className="text-xs md:text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <Utensils className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
                <span className="hidden sm:inline">Ristoranti</span>
                <span className="sm:hidden">Cibo</span>
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="text-xs md:text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
                <span className="hidden sm:inline">Eventi</span>
                <span className="sm:hidden">Eventi</span>
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="text-xs md:text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
                <span className="hidden sm:inline">Consigli</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
            </TabsList>

            {/* Ristoranti Tab */}
            <TabsContent
              value="restaurants"
              className="animate-in fade-in-50 duration-300"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 md:mb-3 text-pine-dark">
                Dove Mangiare a Pinarella
              </h2>
              <p className="text-center text-gray-600 mb-6 md:mb-10 text-sm md:text-base">
                I nostri ristoranti preferiti, testati e consigliati
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-10">
                {restaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-44 md:h-56 overflow-hidden">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-sm text-orange-600 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                          {restaurant.distance}
                        </span>
                        <span className="bg-white/95 backdrop-blur-sm text-gray-700 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                          {restaurant.priceRange}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2 text-pine-dark group-hover:text-orange-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 md:mb-3">
                        <UtensilsCrossed className="h-3.5 w-3.5 md:h-4 md:w-4 text-orange-500" />
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                          {restaurant.type}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {restaurant.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link utili */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl md:rounded-2xl p-5 md:p-6 border border-orange-200 text-center">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-orange-600 mx-auto mb-2 md:mb-3" />
                <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                  Esplora la mappa per trovare altri ristoranti e attrazioni
                  nelle vicinanze
                </p>
                <a
                  href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-sm md:text-base"
                >
                  Apri Google Maps
                  <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
              </div>
            </TabsContent>

            {/* Eventi Tab */}
            <TabsContent
              value="events"
              className="animate-in fade-in-50 duration-300"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 md:mb-3 text-pine-dark">
                Eventi e Manifestazioni
              </h2>
              <p className="text-center text-gray-600 mb-6 md:mb-10 text-sm md:text-base">
                Non perdere gli appuntamenti più importanti dell'anno
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-lg">
                        <event.icon className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 text-pine-dark group-hover:text-purple-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 md:mb-3">
                        <CalendarDays className="h-3.5 w-3.5 md:h-4 md:w-4 text-purple-500" />
                        <p className="text-[10px] md:text-xs font-semibold text-purple-600">
                          {event.date}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link Eventi Esterni */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://www.pinarellavillage.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-pine-light/40 to-pine-light/20 rounded-2xl p-8 border-2 border-pine-light hover:border-pine-dark transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-pine-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3 text-pine-dark">
                    Pinarella Village
                  </h3>
                  <p className="text-center text-gray-600 mb-4 text-sm">
                    Eventi, attività e attrazioni di Pinarella
                  </p>
                  <div className="flex items-center justify-center gap-2 text-pine-dark font-semibold">
                    Visita il sito
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="https://www.rivieradeipini.it/eventi-riviera-dei-pini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-sea-light/40 to-sea-light/20 rounded-2xl p-8 border-2 border-sea-light hover:border-sea-dark transition-all hover:shadow-xl"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-sea-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3 text-sea-dark">
                    Riviera dei Pini
                  </h3>
                  <p className="text-center text-gray-600 mb-4 text-sm">
                    Calendario completo degli eventi estivi
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sea-dark font-semibold">
                    Scopri gli eventi
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Spiagge */}
                <div className="bg-gradient-to-br from-sea-light/20 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-sea-dark to-sea-light rounded-full flex items-center justify-center">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-center mb-4 text-sea-dark">
                    Spiagge
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🏖️</span>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            Bagno Settebello 76
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            La struttura balneare più vicina
                          </p>
                          <div className="flex items-center gap-1 text-xs text-sea-dark">
                            <MapPin className="h-3 w-3" />
                            <span>400m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🆓</span>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            Spiaggia Libera
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            Accanto al Bagno 59
                          </p>
                          <div className="flex items-center gap-1 text-xs text-sea-dark">
                            <MapPin className="h-3 w-3" />
                            <span>700m (9 min)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supermercati */}
                <div className="bg-gradient-to-br from-pine-light/20 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pine-dark to-pine-light rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-center mb-4 text-pine-dark">
                    Supermercati
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🏪</span>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            Svelto A&O
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            Alimentari stagionale (giu-set)
                          </p>
                          <div className="flex items-center gap-1 text-xs text-pine-dark">
                            <MapPin className="h-3 w-3" />
                            <span>200m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🛒</span>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Conad</h4>
                          <p className="text-xs text-gray-600 mb-2">
                            Grande supermercato
                          </p>
                          <div className="flex items-center gap-1 text-xs text-pine-dark">
                            <MapPin className="h-3 w-3" />
                            <span>2km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mercati */}
                <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-400 rounded-full flex items-center justify-center">
                      <CalendarDays className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-center mb-4 text-amber-700">
                    Mercati
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.turismo.comunecervia.it/it/eventi/mercati-cittadini/mercato-serale-a-pinarella-di-cervia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-lg p-3 block hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">🏖️</span>
                        <div>
                          <h4 className="font-semibold text-xs mb-1">
                            Pinarella
                          </h4>
                          <p className="text-xs text-gray-600">Mar • 17:00</p>
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://www.turismo.comunecervia.it/it/eventi/mercati-cittadini/mercato-annuale-di-cervia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-lg p-3 block hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">🏛️</span>
                        <div>
                          <h4 className="font-semibold text-xs mb-1">Cervia</h4>
                          <p className="text-xs text-gray-600">Gio • Mattina</p>
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://www.turismo.comunecervia.it/it/eventi/manifestazioni-e-iniziative/mercatini-mostre-mercato/mercatino-dell-artigianato-artistico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-lg p-3 block hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">🎨</span>
                        <div>
                          <h4 className="font-semibold text-xs mb-1">
                            Artigianato
                          </h4>
                          <p className="text-xs text-gray-600">Gio • Estate</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Map Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-medium mb-6 text-center">
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
