import React, { useEffect } from "react";
import {
  CheckCircle,
  Euro,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";
import { useAccommodation } from "@/contexts/AccommodationContext";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CONTACT_INFO } from "@/lib/contactConfig";
import BookingForm from "@/components/BookingForm";

const Book = () => {
  const { accommodation } = useAccommodation();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-pine-light/10 to-white">
      <MetaTags
        title="Prenota Appartamento a Pinarella di Cervia | Immerso nella Pineta"
        description="Prenota il tuo soggiorno estivo nel nostro appartamento immerso nella pineta a Pinarella di Cervia. Contattaci per verificare la disponibilità e i prezzi per la tua vacanza al mare. Immerso nella Pineta."
        canonicalUrl="/book"
        keywords="immerso nella pineta, prenotazione appartamento pinarella, affittare casa pinarella cervia, disponibilità alloggio cervia, prenota vacanza pinarella"
      />
      <SEOSchema />
      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative py-2 md:py-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pine-light/20 via-transparent to-sea-light/20"></div>
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-pine-dark/10 backdrop-blur-sm text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-6 border border-pine-light/50">
                <Sparkles className="h-4 w-4" />
                <span>Prenotazione Diretta • Miglior Prezzo Garantito</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-pine-dark">
                Prenota il tuo soggiorno
              </h1>

              <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Salta le commissioni delle piattaforme e prenota direttamente
                con noi.
                <span className="block mt-2 font-semibold text-pine-dark">
                  Risparmia fino al 20% e goditi un servizio personalizzato.
                </span>
              </p>

              {/* Vantaggi */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-sm text-gray-800">
                    Nessuna Commissione
                  </div>
                  <div className="text-xs text-gray-600">
                    Risparmio garantito
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                  <Users className="h-8 w-8 text-pine-dark mx-auto mb-2" />
                  <div className="font-semibold text-sm text-gray-800">
                    Assistenza Diretta
                  </div>
                  <div className="text-xs text-gray-600">
                    Sempre disponibili
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                  <Calendar className="h-8 w-8 text-sea-dark mx-auto mb-2" />
                  <div className="font-semibold text-sm text-gray-800">
                    Check-in Flessibile
                  </div>
                  <div className="text-xs text-gray-600">Orari adattabili</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-4 md:py-6">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-pine-dark">
                Contattaci per prenotare
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Scegli il metodo che preferisci per richiedere disponibilità e
                prezzi
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {/* WhatsApp - Featured */}
                <div className="md:col-span-2 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle className="h-8 w-8" />
                      <h3 className="text-2xl font-bold">WhatsApp</h3>
                      <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                        Consigliato
                      </span>
                    </div>
                    <p className="mb-6 text-white/90">
                      Risposta rapida e diretta. Ricevi foto, info dettagliate e
                      conferma immediata della disponibilità.
                    </p>
                    <a
                      href="https://wa.me/393938932793"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl hover:bg-white/90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Apri Chat WhatsApp
                    </a>
                  </div>
                </div>

                {/* Telefono */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-pine-dark transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-pine-light/50 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-pine-dark" />
                    </div>
                    <h3 className="text-xl font-bold text-pine-dark">
                      Telefono
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    Chiamaci per parlare direttamente con noi
                  </p>
                  <a
                    href="tel:+393938932793"
                    className="inline-flex items-center gap-2 bg-pine-dark text-white px-5 py-2.5 rounded-lg hover:bg-pine-dark/90 transition-colors font-semibold w-full justify-center"
                  >
                    <Phone className="h-4 w-4" />
                    +39 393 893 2793
                  </a>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-sea-dark transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-sea-light/50 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-sea-dark" />
                    </div>
                    <h3 className="text-xl font-bold text-sea-dark">Email</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">
                    Scrivici per informazioni dettagliate
                  </p>
                  <a
                    href="mailto:zavattaelia@gmail.com"
                    className="inline-flex items-center gap-2 bg-sea-dark text-white px-5 py-2.5 rounded-lg hover:bg-sea-dark/90 transition-colors font-semibold w-full justify-center text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    zavattaelia@gmail.com
                  </a>
                </div>
              </div>

              {/* Info aggiuntive */}
              <div className="bg-gradient-to-br mt-6 from-blue-50 to-pine-light/20 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                      {accommodation.shortName} - Pinarella di Cervia
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      CIN: {accommodation.cin}
                    </p>
                    <a
                      href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <MapPin className="h-4 w-4" />
                      Visualizza su Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        {/* <section className="py-8 md:py-12 bg-gradient-to-b from-white to-pine-light/10">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-pine-dark">
                  Oppure compila il form di richiesta
                </h2>
                <p className="text-gray-600">
                  Inserisci i tuoi dati e ti ricontatteremo al più presto con
                  disponibilità e prezzi
                </p>
              </div>

              <BookingForm className="shadow-xl" />
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default Book;
