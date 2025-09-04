import React, { useEffect } from "react";
import {
  CheckCircle,
  Euro,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";
import { useAccommodation } from "@/contexts/AccommodationContext";

const Book = () => {
  const { accommodation } = useAccommodation();

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
              {/* <div className="inline-flex items-center gap-2 bg-pine-light text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Euro className="h-4 w-4" />
                <span>Prenotazione Diretta</span>
              </div> */}

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
                Contattaci direttamente per richiedere la disponibilità del
                nostro appartamento a Pinarella di Cervia.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="h-6 w-6 text-pine-dark" />
                    <h3 className="font-serif text-xl font-medium">Telefono</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Chiamaci direttamente per informazioni e prenotazioni
                  </p>
                  <a
                    href="tel:+393938932793"
                    className="inline-flex items-center gap-2 bg-pine text-pine-foreground px-4 py-2 rounded-lg hover:bg-pine/90 transition-colors font-medium"
                  >
                    <Phone className="h-4 w-4" />
                    +39 393 893 2793
                  </a>
                </div>

                <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6 text-pine-dark" />
                    <h3 className="font-serif text-xl font-medium">Email</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Scrivici per ricevere informazioni dettagliate
                  </p>
                  <a
                    href="mailto:zavattaelia@gmail.com"
                    className="inline-flex items-center gap-2 bg-pine text-pine-foreground px-4 py-2 rounded-lg hover:bg-pine/90 transition-colors font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    zavattaelia@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-6 shadow-sm mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-pine-dark" />
                  <h3 className="font-serif text-xl font-medium">WhatsApp</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Contattaci su WhatsApp per una risposta rapida
                </p>
                <a
                  href="https://wa.me/393938932793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  Scrivi su WhatsApp
                </a>
              </div>

              {/* <div className="bg-white border border-border rounded-lg p-6 shadow-sm mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-pine-dark" />
                  <h3 className="font-serif text-xl font-medium">Posizione</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {accommodation.shortName} - Appartamento a Pinarella di Cervia
                  <br />
                  CIN: {accommodation.cin}
                </p>
                <a
                  href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <MapPin className="h-4 w-4" />
                  Visualizza su Google Maps
                </a>
              </div> */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Book;
