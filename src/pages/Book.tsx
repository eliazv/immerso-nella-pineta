
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

const Book = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-serif text-4xl font-medium mb-4">Prenota il tuo soggiorno</h1>
              <p className="text-muted-foreground text-lg">
                Compila il modulo sottostante per richiedere la disponibilità e prenotare il tuo soggiorno 
                nel nostro appartamento.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="order-2 lg:order-1">
                <AvailabilityCalendar className="animate-scale-in" />
              </div>
              
              <div className="order-1 lg:order-2">
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
