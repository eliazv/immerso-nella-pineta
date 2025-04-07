
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
                Tutto ciò che c'è da sapere per un soggiorno perfetto: ristoranti, eventi e consigli di Pinarella.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="restaurants" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 w-full mb-8">
                <TabsTrigger value="restaurants">
                  <Utensils className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ristoranti</span>
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Eventi</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="restaurants" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">Ristoranti consigliati</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      name: "Ristorante Saretina 152",
                      type: "Cucina Romagnola e Pesce",
                      distance: "0.6 km",
                      description: "Autentica cucina romagnola di mare, con pesce fresco dell'Adriatico e piatti della tradizione locale. Da provare i primi piatti fatti in casa.",
                      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                      name: "Ristorante L'Orto",
                      type: "Pesce e Cucina Italiana",
                      distance: "0.5 km",
                      description: "Cucina a base di pesce con proposte creative e ingredienti di stagione. Ambiente elegante e raffinato, perfetto per una cena speciale.",
                      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                      name: "Pizzeria Il Veliero",
                      type: "Pizzeria",
                      distance: "0.3 km",
                      description: "Pizzeria con forno a legna, impasti ad alta digeribilità e ingredienti genuini. Propone anche piadine, piatti romagnoli e una selezione di birre artigianali.",
                      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                      name: "Gelateria La Pineta",
                      type: "Gelateria Artigianale",
                      distance: "0.4 km",
                      description: "Gelateria artigianale con gusti classici e innovativi. Produce quotidianamente gelato con materie prime fresche e di qualità, proprio nel cuore di Pinarella.",
                      image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=1000&auto=format&fit=crop"
                    }
                  ].map((restaurant, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-border">
                      <div className="aspect-video">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-lg font-medium">{restaurant.name}</h3>
                          <span className="bg-sea-light/30 text-sea-dark text-xs px-2 py-1 rounded-full">
                            {restaurant.distance}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{restaurant.type}</p>
                        <p className="text-sm">{restaurant.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Per altri consigli su ristoranti e locali nelle vicinanze non esitate a chiedere!
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">Eventi nelle vicinanze</h2>
                
                <Carousel className="max-w-3xl mx-auto mb-8">
                  <CarouselContent>
                    {[
                      {
                        title: "Pinarella Summer Festival",
                        date: "Giugno - Agosto 2024",
                        description: "Concerti, spettacoli e animazione serale sul lungomare di Pinarella. Programma completo sul sito ufficiale.",
                        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop"
                      },
                      {
                        title: "Cervia Sapore di Sale",
                        date: "Settembre 2024",
                        description: "Evento dedicato alla millenaria tradizione del sale di Cervia con dimostrazioni, degustazioni e spettacoli.",
                        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                      },
                      {
                        title: "Mercatino dell'Artigianato",
                        date: "Ogni martedì sera (Giugno-Settembre)",
                        description: "Mercatino serale sul lungomare con prodotti artigianali, specialità gastronomiche e intrattenimento per bambini.",
                        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
                      }
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
                            <h3 className="font-serif text-xl font-medium mb-2">{event.title}</h3>
                            <p className="text-sm text-pine-dark font-medium mb-2">{event.date}</p>
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
                    <h3 className="font-serif text-xl font-medium mb-3">Pinarella Village</h3>
                    <p className="text-muted-foreground mb-4">
                      Scopri tutti gli eventi, le attività e le attrazioni di Pinarella.
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
                    <h3 className="font-serif text-xl font-medium mb-3">Riviera dei Pini</h3>
                    <p className="text-muted-foreground mb-4">
                      Calendario completo degli eventi estivi della Riviera dei Pini.
                    </p>
                    <Button variant="outline" className="mt-auto">
                      Scopri gli eventi
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl font-medium mb-6 text-center">La nostra posizione</h2>
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
