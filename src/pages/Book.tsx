import React, { useEffect } from "react";
import { CheckCircle, Euro, MessageCircle, Clock } from "lucide-react";
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
        description="Prenota il tuo soggiorno estivo nel nostro appartamento immerso nella pineta a Pinarella di Cervia. Contattaci per verificare la disponibilità e i prezzi per la tua vacanza al mare. Immerso nella Pineta."
        canonicalUrl="/book"
        keywords="immerso nella pineta, prenotazione appartamento pinarella, affittare casa pinarella cervia, disponibilità alloggio cervia, prenota vacanza pinarella"
      />
      <SEOSchema />
      <Header />

      <main className="flex-1 pt-20">
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-pine-light text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Euro className="h-4 w-4" />
                <span>Prenotazione Diretta</span>
              </div>

              <h1 className="font-serif text-4xl font-medium mb-6">
                Prenota il tuo soggiorno
              </h1>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 shrink-0" />
                  <div className="text-left">
                    <h2 className="text-green-800 font-semibold text-lg mb-2">
                      Miglior Prezzo Garantito
                    </h2>
                    <p className="text-green-700 mb-3">
                      Salta le commissioni di Airbnb e Booking.com prenotando
                      direttamente con noi. Risparmia fino al 20% e ricevi un
                      servizio più personalizzato.
                    </p>
                    <p className="text-green-600 font-medium text-sm">
                      ✓ Nessuna commissione aggiuntiva &nbsp;&nbsp; ✓ Assistenza
                      diretta &nbsp;&nbsp; ✓ Check-in flessibile
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-lg">
                Compila il modulo sottostante per richiedere la disponibilità
                del nostro appartamento a Pinarella di Cervia.
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
