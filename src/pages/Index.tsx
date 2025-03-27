
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Waves, Bed, Car, ShowerHead, Wifi, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import HouseRules from '@/components/HouseRules';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Scroll animation
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.scroll-reveal');
      
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=1920&auto=format&fit=crop"
            alt="Pineta di Cervia" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-white mb-4 drop-shadow-md">
            Immerso nella Pineta
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            A soli 5 minuti a piedi dal mare di Pinarella
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-sea-dark hover:bg-sea-dark/90"
            >
              <Link to="/gallery">
                Esplora la casa
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
            >
              <Link to="/book">
                Prenota ora
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 overflow-x-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop" 
                    alt="Soggiorno" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-pine-light rounded-xl" />
              </div>
            </div>
            
            <div className="scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-pine-light/50 text-pine-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <TreePine className="h-4 w-4" />
                <span>Cervia, Italia</span>
              </div>
              
              <h2 className="font-serif text-3xl font-medium mb-6">
                Benvenuti nel nostro accogliente appartamento
              </h2>
              
              <p className="text-muted-foreground mb-6">
                A soli 200 metri dalla splendida pineta e dalle acque del mare di Pinarella.
                Situato al piano terra di una graziosa palazzina immersa nel verde, ombreggiata da alti pini, 
                questo è il rifugio perfetto per chi cerca relax e comfort. Godetevi la pace della zona, 
                a due passi dalla spiaggia, e lasciatevi coccolare dalla fresca brezza marina.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex items-start">
                  <Bed className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Fino a 4 ospiti</h3>
                    <p className="text-sm text-muted-foreground">Letto matrimoniale e letto a castello</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Parcheggio privato</h3>
                    <p className="text-sm text-muted-foreground">Posto auto riservato #3</p>
                  </div>
                </div>
              </div>
              
              <Button asChild>
                <Link to="/book">
                  Controlla disponibilità
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-pine-light/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-white text-pine-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <Waves className="h-4 w-4" />
              <span>Lo spazio</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-6">
              Tutto ciò di cui avete bisogno
            </h2>
            <p className="text-muted-foreground">
              L'appartamento è stato pensato per offrirvi il massimo comfort durante il vostro soggiorno, 
              con tutti i servizi essenziali per una vacanza senza pensieri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-border scroll-reveal">
              <div className="w-12 h-12 mb-4 rounded-full bg-sea-light flex items-center justify-center">
                <Bed className="h-6 w-6 text-sea-dark" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">Camera da letto</h3>
              <p className="text-muted-foreground text-sm">
                Include un confortevole letto matrimoniale e un letto a castello, entrambi forniti 
                di lenzuola e coperte fresche.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border scroll-reveal" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 mb-4 rounded-full bg-sea-light flex items-center justify-center">
                <ShowerHead className="h-6 w-6 text-sea-dark" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">Bagno</h3>
              <p className="text-muted-foreground text-sm">
                Dotato di doccia con tenda, bidet e lavatrice a vostra disposizione. 
                Un set completo di asciugamani è fornito per ogni ospite.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border scroll-reveal" style={{ animationDelay: "0.4s" }}>
              <div className="w-12 h-12 mb-4 rounded-full bg-sea-light flex items-center justify-center">
                <Wifi className="h-6 w-6 text-sea-dark" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">Soggiorno-Cucina</h3>
              <p className="text-muted-foreground text-sm">
                Uno spazio luminoso e accogliente, dotato di tavolo da pranzo, comodo divano a due posti, 
                aria condizionata e TV. La cucina è pratica e ben attrezzata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-sea-light text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <Waves className="h-4 w-4" />
              <span>Galleria</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-6">
              Dai un'occhiata agli spazi
            </h2>
            <p className="text-muted-foreground">
              Esplora il nostro appartamento attraverso le immagini e immagina 
              la tua prossima vacanza a Cervia.
            </p>
          </div>

          <PhotoGallery compact className="scroll-reveal" />
        </div>
      </section>
      
      {/* Rules Preview */}
      <section className="py-16 bg-sea-light/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-white text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <TreePine className="h-4 w-4" />
              <span>Regole della casa</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-6">
              Informazioni utili
            </h2>
            <p className="text-muted-foreground">
              Alcune informazioni importanti per rendere il vostro soggiorno piacevole e senza sorprese.
            </p>
          </div>

          <div className="max-w-3xl mx-auto scroll-reveal">
            <HouseRules />
            
            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/rules">
                  Vedi tutte le informazioni
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920&auto=format&fit=crop"
            alt="Mare di Pinarella" 
            className="object-cover w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-dark/80 to-sea-dark/80" />
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-white mb-6">
              Prenota ora la tua vacanza a Cervia
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Non perdere l'opportunità di soggiornare nel nostro accogliente appartamento, 
              a pochi passi dal mare e immerso nella pineta di Cervia.
            </p>
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-pine-dark hover:bg-white/90"
            >
              <Link to="/book">
                Verifica disponibilità
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
