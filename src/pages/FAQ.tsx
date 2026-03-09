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
import {
  MessageCircle,
  FileText,
  Clock,
  MapPin,
  Car,
  Coffee,
} from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Prenotazioni & Pagamenti",
      icon: <FileText className="w-5 h-5 text-pine-600" />,
      items: [
        {
          question: "Come posso prenotare?",
          answer:
            "È semplicissimo! Puoi prenotare direttamente tramite il modulo sul nostro sito. Non utilizziamo piattaforme come Booking o Airbnb, il che significa che risparmi sulle commissioni e hai un filo diretto con noi per ogni esigenza.",
        },
        {
          question: "Come si effettua il pagamento?",
          answer:
            "Per confermare la prenotazione richiediamo una caparra tramite bonifico bancario. Il saldo può essere completato comodamente all'arrivo, sia in contanti che tramite bonifico.",
        },
        {
          question: "Qual è la politica di cancellazione?",
          answer:
            "Comprendiamo che gli imprevisti possano capitare. Se cancelli con almeno 30 giorni di anticipo, ti restituiamo la caparra per intero. Per cancellazioni successive, applicheremo una trattenuta proporzionale al preavviso dato.",
        },
        {
          question: "È prevista una tassa di soggiorno?",
          answer:
            "Sì, come in tutto il comune di Cervia. La tassa è di €1 a notte per ogni adulto (dai 15 anni in su), applicabile dal 1° maggio al 30 settembre per un massimo di 7 notti.",
        },
      ],
    },
    {
      title: "L'Appartamento & Servizi",
      icon: <Coffee className="w-5 h-5 text-pine-600" />,
      items: [
        {
          question: "Cosa troverò in appartamento?",
          answer:
            "Troverai tutto il necessario per sentirti a casa: set completo di lenzuola e asciugamani, stoviglie e utensili da cucina, prodotti per la pulizia e deumidificatore. Se viaggi con un bimbo piccolo, su richiesta ti mettiamo a disposizione anche il seggiolone.",
        },
        {
          question: "C'è il Wi-Fi?",
          answer: "No, al moemnto non offriamo wi-fi negli alloggi",
        },
        {
          question: "Quante persone possono alloggiare?",
          answer:
            "Abbiamo due soluzioni: un appartamento che ospita fino a 4 persone e uno più grande che ne accoglie fino a 8. Entrambi sono pensati per offrire il massimo comfort a famiglie e gruppi.",
        },
        {
          question: "Gli animali domestici sono ammessi?",
          answer:
            "Assolutamente sì! I vostri amici a quattro zampe sono i benvenuti nella nostra struttura.",
        },
        {
          question: "C'è l'aria condizionata o il riscaldamento?",
          answer:
            "Sì, in estate potrete godervi il fresco e in inverno starete al caldo grazie al sistema di climatizzazione con pompa di calore (split) e termoventilatori aggiuntivi per i mesi più freddi.",
        },
      ],
    },
    {
      title: "Posizione & Dintorni",
      icon: <MapPin className="w-5 h-5 text-pine-600" />,
      items: [
        {
          question: "Quanto dista la spiaggia?",
          answer:
            "Siamo a soli 200 metri dalla spiaggia libera e dagli stabilimenti balneari. Una breve passeggiata all'ombra dei pini e sarai subito con i piedi nella sabbia!",
        },
        {
          question: "Ci sono negozi o supermercati vicini?",
          answer:
            "In estate (giugno-settembre) c'è un supermercato a soli 200 metri. Durante tutto l'anno, un grande supermercato è disponibile a circa 2 km. In zona troverai anche farmacie, ristoranti e piccoli negozi di artigianato.",
        },
        {
          question: "Quali attrazioni ci sono nelle vicinanze?",
          answer:
            "Oltre alla spiaggia e alla splendida Pineta di Cervia, potrai visitare le Saline di Cervia, Milano Marittima per lo shopping, Mirabilandia (a 15 min), l'Acquario di Cattolica e lo splendido centro storico di Cervia.",
        },
        {
          question: "Come raggiungervi?",
          answer:
            "In auto: A14 uscita Cesena Nord. In treno: stazione Cervia-Milano Marittima (3km). In aereo: gli aeroporti più vicini sono Rimini (30km) e Bologna (90km).",
        },
      ],
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories
      .flatMap((cat) => cat.items)
      .map((item) => ({
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
            Tutto quello che devi sapere per il tuo soggiorno a Pinarella di
            Cervia
          </p>
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
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="w-6 h-6 text-pine-600" />
            <h2 className="text-2xl font-serif font-medium text-pine-800">
              Domande Frequenti
            </h2>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="bg-pine-50/50 px-6 py-4 border-b flex items-center gap-3">
                  {category.icon}
                  <h3 className="font-serif text-xl text-pine-900">
                    {category.title}
                  </h3>
                </div>
                <div className="p-2 md:p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${catIndex}-${index}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="text-left py-4 px-4 text-base font-medium text-pine-800 hover:text-pine-600 hover:no-underline transition-colors">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-gray-600 leading-relaxed text-base">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
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
              <Button
                size="lg"
                variant="outline"
                className="border-pine-600 text-pine-600"
              >
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
