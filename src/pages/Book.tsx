
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, TreePine, ShowerHead, Car, Bed, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const Book = () => {
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
              <div className="inline-flex items-center gap-2 bg-sea-light text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <Calendar className="h-4 w-4" />
                <span>Prenotazione</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Prenota il tuo soggiorno
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Compila il modulo per richiedere la disponibilità e prenotare la tua vacanza 
                nel nostro accogliente appartamento a Cervia.
              </p>
            </div>
          </div>
        </section>
        
        {/* Booking Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in">
                <h2 className="font-serif text-2xl font-medium mb-6">Informazioni sull'alloggio</h2>
                
                <div className="bg-card/50 border border-border rounded-xl p-6 mb-8">
                  <h3 className="font-serif text-lg font-medium mb-4">Riepilogo</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="font-medium">Tipo di alloggio</span>
                      <span>Appartamento intero</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="font-medium">Ospiti</span>
                      <span>Fino a 4 persone</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="font-medium">Camera da letto</span>
                      <span>1 (letto matrimoniale + castello)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bagno</span>
                      <span>1</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <Bed className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                    <div>
                      <h3 className="font-medium">Camera da letto</h3>
                      <p className="text-sm text-muted-foreground">
                        Include un confortevole letto matrimoniale e un letto a castello, 
                        entrambi forniti di lenzuola e coperte fresche.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <ShowerHead className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                    <div>
                      <h3 className="font-medium">Bagno</h3>
                      <p className="text-sm text-muted-foreground">
                        Dotato di doccia con tenda, bidet e lavatrice a vostra disposizione. 
                        Un set completo di asciugamani è fornito per ogni ospite.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Car className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                    <div>
                      <h3 className="font-medium">Parcheggio privato</h3>
                      <p className="text-sm text-muted-foreground">
                        Gli ospiti possono accedere comodamente al cortile interno con l'auto 
                        e parcheggiare nel posto riservato, identificato dal numero 3.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <TreePine className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                    <div>
                      <h3 className="font-medium">Posizione</h3>
                      <p className="text-sm text-muted-foreground">
                        A soli 200 metri dalla pineta e a 5 minuti a piedi dal mare di Pinarella.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" asChild>
                  <Link to="/rules">
                    Vedi tutte le regole della casa
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="animate-scale-in">
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Book;
