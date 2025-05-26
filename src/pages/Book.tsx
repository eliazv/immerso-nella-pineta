import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";

const Book = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags
        title="Prenota Appartamento a Pinarella di Cervia | Immerso nella Pineta"
        description="Prenota il tuo soggiorno estivo nel nostro appartamento a Pinarella di Cervia. Contattaci per verificare la disponibilità e i prezzi per la tua vacanza al mare."
        canonicalUrl="/book"
        keywords="prenotazione appartamento pinarella, affittare casa pinarella cervia, disponibilità alloggio cervia, prenota vacanza pinarella"
      />
      <SEOSchema />
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-serif text-4xl font-medium mb-4">
                Prenota il tuo soggiorno
              </h1>
              <p className="text-muted-foreground text-lg">
                Compila il modulo sottostante per richiedere la disponibilità e
                prenotare il tuo soggiorno nel nostro appartamento.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
