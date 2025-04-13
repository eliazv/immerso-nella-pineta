import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Calendar,
  MapPin,
  ChevronRight,
  CalendarDays,
  Video,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
const Attractions = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center animate-page-in">
              <div className="inline-flex items-center gap-2 bg-pine-light text-pine-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                <span>Scopri la zona</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Attrazioni e servizi
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Tutto ciò che c'è da sapere per un soggiorno perfetto:
                ristoranti, eventi e consigli di Pinarella.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="restaurants" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="restaurants">
                  <Utensils className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ristoranti</span>
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Eventi</span>
                </TabsTrigger>
                <TabsTrigger value="tips">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Consigli Utili</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="restaurants" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">
                  Ristoranti consigliati
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      name: "Ristorante Saretina 152",
                      type: "Cucina Romagnola e Pesce",
                      distance: "0.6 km",
                      description:
                        "Autentica cucina romagnola di mare, con pesce fresco dell'Adriatico e piatti della tradizione locale. Da provare i primi piatti fatti in casa.",
                      image:
                        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
                    },
                    {
                      name: "Ristorante Damida",
                      type: "Pesce e Cucina Italiana",
                      distance: "1.5 km",
                      description:
                        "Cucina a base di pesce con proposte creative e ingredienti di stagione. Ambiente elegante e raffinato, perfetto per una cena speciale. Vle Titano, 106, 48015 Cervia RA",
                      image:
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c7/78/54/frittone-dello-sborone.jpg?q=80&w=1000&auto=format&fit=crop",
                    },
                    {
                      name: "Pizzeria Il Veliero",
                      type: "Pizzeria",
                      distance: "0.3 km",
                      description:
                        "Pizzeria con forno a legna, impasti ad alta digeribilità e ingredienti genuini. Propone anche piadine, piatti romagnoli e una selezione di birre artigianali.",
                      image:
                        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
                    },
                    {
                      name: "Gelateria La Pineta",
                      type: "Gelateria Artigianale",
                      distance: "0.4 km",
                      description:
                        "Gelateria artigianale con gusti classici e innovativi. Produce quotidianamente gelato con materie prime fresche e di qualità, proprio nel cuore di Pinarella.",
                      image:
                        "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=1000&auto=format&fit=crop",
                    },
                  ].map((restaurant, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl overflow-hidden shadow-md border border-border"
                    >
                      <div className="aspect-video">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-lg font-medium">
                            {restaurant.name}
                          </h3>
                          <span className="bg-sea-light/30 text-sea-dark text-xs px-2 py-1 rounded-full">
                            {restaurant.distance}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {restaurant.type}
                        </p>
                        <p className="text-sm">{restaurant.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Esplora la mappa per trovare altri ristoranti e attrazioni
                    nelle vicinanze.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="events" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">
                  Eventi nelle vicinanze
                </h2>

                <Carousel className="max-w-3xl mx-auto mb-8">
                  <CarouselContent>
                    {[
                      {
                        title: "Pinarella Summer Festival",
                        date: "Giugno - Agosto 2024",
                        description:
                          "Concerti, spettacoli e animazione serale sul lungomare di Pinarella. Programma completo nei siti qui sotto.",
                        image:
                          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop",
                      },
                      {
                        title: "Festival Internazionale dell'Aquilone",
                        date: "Fine aprile - Inizio maggio",
                        description:
                          "Gli aquiloni di tutto il mondo in volo sulla spiaggia di Pinarella, oltre 200 artisti del vento e campioni internazionali di volo acrobatico, 2000 appassionati in arrivo da 50 paesi si incontrano nella Capitale dell'Aquilone per celebrare il mondo unito da un progetto di pace. ",
                        image:
                          "https://www.ravenna24ore.it/wp-content/uploads/sites/6/2023/04/36-ARTEVENTO-CERVIA-Davide-Baroni-scaled-1.jpg?q=80&w=1000&auto=format&fit=crop",
                      },
                      {
                        title: "Mercatino dell'Artigianato",
                        date: "Ogni giovedì sera (Maggio-Settembre)",
                        description:
                          "A Pinarella, in via Mezzanotte, si svolge un incantevole mercatino artistico e artigianale da maggio a settembre. Ogni settimana, visitatori possono esplorare una selezione di opere uniche, prodotti artigianali e creazioni artistiche locali. L'atmosfera vivace e accogliente rende questo mercatino un luogo ideale per scoprire talenti locali e trovare pezzi unici da portare a casa. Altri mercatini locali nei consigli utili!",
                        image:
                          "https://www.novaratoday.it/~media/horizontal-hi/49129561680332/mercatino-antiquariato-arona-1.jpg?q=80&w=1000&auto=format&fit=crop",
                      },
                    ].map((event, index) => (
                      <CarouselItem key={index}>
                        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-border">
                          <div className="aspect-[16/9]">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <h3 className="font-serif text-xl font-medium mb-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-pine-dark font-medium mb-2">
                              {event.date}
                            </p>
                            <p>{event.description}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 lg:-left-12" />
                  <CarouselNext className="-right-4 lg:-right-12" />
                </Carousel>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <a
                    href="https://www.pinarellavillage.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pine-light/30 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
                  >
                    <h3 className="font-serif text-xl font-medium mb-3">
                      Pinarella Village
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Scopri tutti gli eventi, le attività e le attrazioni di
                      Pinarella.
                    </p>
                    <Button variant="outline" className="mt-auto">
                      Visita il sito
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </a>

                  <a
                    href="https://www.rivieradeipini.it/eventi-riviera-dei-pini/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sea-light/30 rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105"
                  >
                    <h3 className="font-serif text-xl font-medium mb-3">
                      Riviera dei Pini
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Calendario completo degli eventi estivi della Riviera dei
                      Pini.
                    </p>
                    <Button variant="outline" className="mt-auto">
                      Scopri gli eventi
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </TabsContent>
              <TabsContent value="tips" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">
                  Consigli Utili
                </h2>

                <div className="max-w-3xl mx-auto">
                  <Collapsible
                    defaultOpen={true}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-border mb-6"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-sea-dark" />
                        <span className="font-medium">Spiagge consigliate</span>
                      </div>
                      <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pb-5">
                      <p className="mb-4">
                        Alcuni consigli per le spiagge più vicine
                        all'appartamento:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-sea-light text-sea-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            🏖️
                          </span>
                          <div>
                            <h4 className="font-medium">
                              Bagno Settebello 76 - Il piu vicino
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Situata a 400 metri di distanza, è la struttura
                              balneare piu vicina all'appartamento
                            </p>
                          </div>
                        </li>

                        <li className="flex items-start">
                          <span className="bg-sea-light text-sea-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            🆓
                          </span>
                          <div>
                            <h4 className="font-medium">
                              Spiaggia libera - di fianco al Bagno 59
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Dista 700 metri (circa 9 minuti a piedi) ed è
                              situata di fianco al Bagno 59 (Via Arenile
                              Demaniale, 59, 48015 Cervia RA).
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible
                    defaultOpen={true}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-border mb-6"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 mr-3 text-sea-dark" />
                        <span className="font-medium">Supermercati</span>
                      </div>
                      <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pb-5">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            💈
                          </span>
                          <div>
                            <h4 className="font-medium">Svelto A&O</h4>
                            <p className="text-sm text-muted-foreground">
                              Piccolo alimentari a 200 metri, aperto da giugno a
                              settembre. Via Mezzanotte, 1b, 48015 Cervia RA
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            🏪
                          </span>
                          <div>
                            <h4 className="font-medium">Conad</h4>
                            <p className="text-sm text-muted-foreground">
                              Grande supermercato, a 2km di distanza. Viale
                              Europa Unita, 4, 48015 Cervia RA
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible
                    defaultOpen={true}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-border"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 mr-3 text-sea-dark" />
                        <span className="font-medium">Mercati locali</span>
                      </div>
                      <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pb-5">
                      <p className="mb-4">
                        Durante il vostro soggiorno potrete visitare i
                        <a
                          href="https://www.turismo.comunecervia.it/it/eventi/mercati-cittadini"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          mercati locali
                        </a>
                        nelle vicinanze:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            M
                          </span>
                          <div>
                            <h4 className="font-medium">
                              <a
                                href="https://www.turismo.comunecervia.it/it/eventi/mercati-cittadini/mercato-serale-a-pinarella-di-cervia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Mercato di Pinarella
                              </a>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Tutti i martedì sera, dal 15 maggio al 23
                              settembre, scopri le bancarelle del mercato serale
                              di Pinarella. 41 posteggi di ambulanti ti
                              aspettano dalle ore 17 in viale Italia, nel tratto
                              da viale De Amicis a viale Lucania.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            G
                          </span>
                          <div>
                            <h4 className="font-medium">
                              <a
                                href="https://www.turismo.comunecervia.it/it/eventi/mercati-cittadini/mercato-annuale-di-cervia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Mercato di Cervia
                              </a>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Durante tutto l'anno, scopri le bancarelle del
                              mercato di Cervia tutti i giovedì mattina in
                              piazza Andrea Costa.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            G
                          </span>
                          <div>
                            <h4 className="font-medium">
                              <a
                                href="https://www.turismo.comunecervia.it/it/eventi/manifestazioni-e-iniziative/mercatini-mostre-mercato/mercatino-dell-artigianato-artistico"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Mercatino dell'Artigianato
                              </a>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Nei giovedì estivi di Pinarella (fine maggio -
                              metà settembre), mercatino di originali oggetti
                              fatti a mano.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </TabsContent>
            </Tabs>
          </div>
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
