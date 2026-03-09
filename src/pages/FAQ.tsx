import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HouseRules from "@/components/HouseRules";
import MetaTags from "@/components/MetaTags";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CONTACT_INFO } from "@/lib/contactConfig";
import { getCanonicalUrl } from "@/lib/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Clock, MapPin, Car, Coffee } from "lucide-react";

const FAQ = () => {
  const faqItems = [
    {
      question: "Come posso prenotare?",
      answer:
        "Puoi prenotare direttamente tramite il modulo sul nostro sito. Non utilizziamo piattaforme come Booking o Airbnb, quindi risparmi sulle commissioni e hai un contatto diretto.",
    },
    {
      question: "Come si effettua il pagamento?",
      answer:
        "Richiediamo una caparra tramite bonifico bancario. Il saldo può essere completato all'arrivo in contanti o con bonifico.",
    },
    {
      question: "Qual è la politica di cancellazione?",
      answer:
        "Con almeno 30 giorni di anticipo, la caparra viene restituita per intero. Per cancellazioni successive, applicheremo una trattenuta proporzionale.",
    },
    {
      question: "Quante persone possono alloggiare?",
      answer:
        "Due appartamenti: uno fino a 4 persone, l'altro fino a 8. Entrambi con tutti i comfort per famiglie e gruppi.",
    },
    {
      question: "Gli animali domestici sono ammessi?",
      answer:
        "Sì! Gli animali domestici sono ammessi.",
    },
    {
      question: "Quali attrazioni ci sono nelle vicine?",
      answer:
        "Spiaggia a 200m, Pineta di Cervia, centro storico di Cervia con le saline, Milano Marittima per shopping e vita notturna, Mirabilandia e Acquario di Cattolica.",
    },
    {
      question: "Come raggiungere Pinarella?",
      answer:
        "In auto: A14 uscita Cesena Nord. In treno: stazione Cervia-Milano Marittima (3km). Aerei: Bologna (90km) o Rimini (30km).",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Info e FAQ | Appartamenti Pinarella Prenotazione Diretta"
        description="Tutte le informazioni utili, regole della casa e risposte alle domande frequenti per il tuo soggiorno a Pinarella di Cervia."
        keywords="info appartamento pinarella, faq prenotazione diretta, regole casa pinarella, check-in cervia"
        canonicalUrl={getCanonicalUrl("/faq")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-pine-800 mb-4">
            Informazioni utili
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tutto quello che devi sapere per il tuo soggiorno a Pinarella di Cervia
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link to="#check-in" className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
            <Clock className="w-8 h-8 text-pine-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Check-in</p>
            <p className="text-xs text-gray-500">dalle 14:00</p>
          </Link>
          <Link to="#check-out" className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
            <Clock className="w-8 h-8 text-pine-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Check-out</p>
            <p className="text-xs text-gray-500">entro le 10:00</p>
          </Link>
          <Link to="#posizione" className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
            <MapPin className="w-8 h-8 text-pine-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Mare</p>
            <p className="text-xs text-gray-500">200 metri</p>
          </Link>
          <Link to="#parcheggio" className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-center">
            <Car className="w-8 h-8 text-pine-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Parcheggio</p>
            <p className="text-xs text-gray-500">Gratuito</p>
          </Link>
        </div>

        {/* House Rules Section */}
        <section id="check-in" className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-pine-600" />
            <h2 className="text-2xl font-serif font-medium text-pine-800">
              Regole della casa
            </h2>
          </div>
          <HouseRules />
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-6 h-6 text-pine-600" />
            <h2 className="text-2xl font-serif font-medium text-pine-800">
              Domande Frequenti
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium text-pine-800 hover:text-pine-600">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <div className="bg-pine-50 rounded-lg p-8 text-center">
          <MessageCircle className="w-10 h-10 text-pine-600 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-pine-800 mb-3">
            Non hai trovato la risposta?
          </h2>
          <p className="text-gray-600 mb-6">
            Contattaci direttamente per qualsiasi domanda
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pineta3/book">
              <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
                Prenota ora
              </Button>
            </Link>
            <a
              href={`https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-pine-600 text-pine-600">
                Scrivici su WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
