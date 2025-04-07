
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, CalendarDays, MapPin, Video, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
                Tutto ciò che c'è da sapere per un soggiorno perfetto: ristoranti, eventi, servizi utili e consigli.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="restaurants" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-4 w-full mb-8">
                <TabsTrigger value="restaurants">
                  <Utensils className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ristoranti</span>
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Eventi</span>
                </TabsTrigger>
                <TabsTrigger value="waste">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Raccolta Rifiuti</span>
                </TabsTrigger>
                <TabsTrigger value="tips">
                  <Video className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Consigli Utili</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="restaurants" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">Ristoranti consigliati</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      name: "Osteria del Pino",
                      type: "Cucina Romagnola",
                      distance: "0.5 km",
                      description: "Autentica cucina romagnola con specialità di pesce fresco dell'Adriatico. Rinomata per le sue tagliatelle al ragù e la piadina farcita.",
                      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                      name: "La Pineta Verde",
                      type: "Pizzeria",
                      distance: "0.3 km",
                      description: "Pizzeria con forno a legna che offre una vasta scelta di pizze tradizionali e innovative. Ottima anche per le famiglie con bambini.",
                      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                      name: "Mare Blu",
                      type: "Pesce",
                      distance: "0.8 km",
                      description: "Ristorante di pesce con vista sul mare. Specializzato in crudi di mare e grigliate di pesce fresco. Prenotazione consigliata.",
                      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                      name: "Gelateria Delizia",
                      type: "Gelateria",
                      distance: "0.4 km",
                      description: "Gelateria artigianale con gusti stagionali e tradizionali. Da non perdere i loro gusti alla frutta e il gelato al sale dolce di Cervia.",
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
                        title: "Festival del Mare",
                        date: "Giugno - Agosto",
                        description: "Serie di eventi serali sul lungomare con musica dal vivo, spettacoli e mercatini artigianali.",
                        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop"
                      },
                      {
                        title: "Sagra del Pesce",
                        date: "Luglio",
                        description: "Tradizionale sagra con specialità di pesce locale, vini romagnoli e intrattenimento per tutta la famiglia.",
                        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                      },
                      {
                        title: "Sport in Pineta",
                        date: "Giugno - Settembre",
                        description: "Attività sportive gratuite nella pineta: yoga, pilates, nordic walking e attività per bambini.",
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
              
              <TabsContent value="waste" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">Calendario Raccolta Rifiuti</h2>
                
                <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md border border-border">
                  <p className="mb-6">
                    A Pinarella è attivo il sistema di raccolta differenziata porta a porta. Vi preghiamo di rispettare il calendario della raccolta per contribuire a mantenere pulito e sostenibile il nostro ambiente.
                  </p>
                  
                  <div className="aspect-auto w-full mb-6">
                    <object
                      data="https://drive.google.com/file/d/1N8HQg5BPYv9BtOivz9wr526nfutmxKu9/preview"
                      type="application/pdf"
                      width="100%"
                      height="500px"
                      className="rounded-lg border border-border"
                    >
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p>Impossibile visualizzare il PDF direttamente.</p>
                        <a
                          href="https://drive.google.com/file/d/1N8HQg5BPYv9BtOivz9wr526nfutmxKu9/view"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Clicca qui per visualizzare il calendario
                        </a>
                      </div>
                    </object>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-pine-light/30 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Organico</h3>
                      <p className="text-sm">Lunedì, Mercoledì, Venerdì, Sabato</p>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Carta e Cartone</h3>
                      <p className="text-sm">Martedì</p>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Plastica e Lattine</h3>
                      <p className="text-sm">Giovedì</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Indifferenziato</h3>
                      <p className="text-sm">Sabato</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Nel nostro appartamento troverete i contenitori per la raccolta differenziata. Vi chiediamo gentilmente di buttare i rifiuti nei bidoni all'esterno la sera prima del giorno di raccolta.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="tips" className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6 text-center">Consigli Utili</h2>
                
                <div className="max-w-3xl mx-auto">
                  <Collapsible className="bg-white rounded-xl overflow-hidden shadow-md border border-border mb-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center">
                        <Video className="h-5 w-5 mr-3 text-sea-dark" />
                        <span className="font-medium">Istruzioni Macchina Caffè</span>
                      </div>
                      <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pb-5">
                      <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/qd90HdASCKc"
                          title="Istruzioni Macchina Caffè"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-3">La nostra macchina per il caffè è facile da usare, ma ecco alcune istruzioni utili:</p>
                        <ol className="list-decimal pl-4 space-y-2">
                          <li>Assicuratevi che il serbatoio dell'acqua sia riempito almeno fino al livello minimo.</li>
                          <li>Inserite la cialda nell'apposito vano dopo aver sollevato la leva.</li>
                          <li>Abbassate la leva e premete il pulsante per il tipo di caffè desiderato.</li>
                          <li>Attendete che l'erogazione sia completata.</li>
                          <li>Non dimenticate di rimuovere la cialda usata dopo aver preparato il caffè.</li>
                        </ol>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="bg-white rounded-xl overflow-hidden shadow-md border border-border mb-6">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-sea-dark" />
                        <span className="font-medium">Spiagge consigliate</span>
                      </div>
                      <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pb-5">
                      <p className="mb-4">
                        A 5 minuti a piedi dall'appartamento troverete diverse spiagge ben attrezzate con tutti i servizi:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-sea-light text-sea-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">1</span>
                          <div>
                            <h4 className="font-medium">Bagno 125 - La Pineta</h4>
                            <p className="text-sm text-muted-foreground">Spiaggia tranquilla e familiare con giochi per bambini e ristorante.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-sea-light text-sea-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">2</span>
                          <div>
                            <h4 className="font-medium">Bagno 130 - Sole e Mare</h4>
                            <p className="text-sm text-muted-foreground">Ottimo per gli sportivi, con campi da beach volley e beach tennis.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-sea-light text-sea-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">3</span>
                          <div>
                            <h4 className="font-medium">Bagno 135 - Delfino</h4>
                            <p className="text-sm text-muted-foreground">Ideale per famiglie con bambini piccoli, con area giochi e acqua bassa.</p>
                          </div>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="bg-white rounded-xl overflow-hidden shadow-md border border-border">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-5 text-left">
                      <div className="flex items-center">
                        <CalendarDays className="h-5 w-5 mr-3 text-sea-dark" />
                        <span className="font-medium">Mercati locali</span>
                      </div>
                      <ChevronRight className="h-5 w-5 transform transition-transform ui-open:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-5 pb-5">
                      <p className="mb-4">
                        Durante il vostro soggiorno potrete visitare i mercati locali nelle vicinanze:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            L
                          </span>
                          <div>
                            <h4 className="font-medium">Mercato di Pinarella</h4>
                            <p className="text-sm text-muted-foreground">Lunedì mattina in Piazza della Repubblica.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            G
                          </span>
                          <div>
                            <h4 className="font-medium">Mercato di Cervia</h4>
                            <p className="text-sm text-muted-foreground">Giovedì mattina nel centro storico.</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-pine-light text-pine-dark w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                            S
                          </span>
                          <div>
                            <h4 className="font-medium">Mercatino dell'Artigianato</h4>
                            <p className="text-sm text-muted-foreground">Sabato sera sul lungomare (solo in estate).</p>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Attractions;
