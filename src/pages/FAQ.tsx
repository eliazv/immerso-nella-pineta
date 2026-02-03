import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import BreadcrumbSEO from "@/components/BreadcrumbSEO";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { CONTACT_INFO } from "@/lib/contactConfig";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FAQ = () => {
  const faqItems = [
    {
      question: "Come posso prenotare direttamente senza intermediari?",
      answer:
        "Puoi prenotare direttamente contattandoci tramite il modulo di prenotazione sul nostro sito. Non utilizziamo piattaforme come Booking o Airbnb, quindi risparmierai sulle commissioni e avrai un contatto diretto con il proprietario.",
    },
    {
      question: "Qual è il check-in e il check-out?",
      answer:
        "Il check-in è previsto dalle ore 15:00, mentre il check-out entro le ore 10:00. Per esigenze particolari, contattaci in anticipo per verificare la disponibilità di orari flessibili.",
    },
    {
      question: "A che distanza si trova il mare?",
      answer:
        "L'appartamento si trova a soli 200 metri dalla spiaggia di Pinarella. Una breve passeggiata di 3-4 minuti a piedi ti porterà direttamente sulla sabbia.",
    },
    {
      question: "È disponibile il parcheggio?",
      answer:
        "Sì, ogni appartamento dispone di un posto auto privato gratuito. Ideale se arrivi in macchina senza doverti preoccupare di cercare parcheggio.",
    },
    {
      question: "Quante persone possono alloggiare?",
      answer:
        "Abbiamo due appartamenti: uno può ospitare fino a 4 persone e l'altro fino a 8 persone. Entrambi dispongono di tutti i comfort per famiglie e gruppi.",
    },
    {
      question: "Gli animali domestici sono ammessi?",
      answer:
        "Purtroppo non possiamo accettare animali domestici per garantire la pulizia e il comfort di tutti gli ospiti, inclusi quelli con allergie.",
    },
    {
      question: "Cosa include l'appartamento?",
      answer:
        "Ogni appartamento è completamente attrezzato con cucina, bagno, camere da letto, aria condizionata, Wi-Fi gratuito, TV e tutto il necessario per un soggiorno confortevole. Le lenzuola e gli asciugamani sono forniti.",
    },
    {
      question: "Come si effettua il pagamento?",
      answer:
        "Per confermare la prenotazione richiediamo una caparra tramite bonifico bancario. Il saldo può essere completato all'arrivo in contanti o con bonifico prima del check-in.",
    },
    {
      question: "Qual è la politica di cancellazione?",
      answer:
        "In caso di cancellazione con almeno 30 giorni di anticipo, la caparra viene restituita per intero. Per cancellazioni successive, applicheremo una trattenuta proporzionale ai giorni mancanti.",
    },
    {
      question: "Ci sono supermercati e negozi nelle vicinanze?",
      answer:
        "Sì, a Pinarella trovi supermercati, panifici, farmacia e altri negozi a pochi minuti a piedi. Anche il mercato settimanale di Cervia è facilmente raggiungibile.",
    },
    {
      question: "Quali sono le attrazioni vicine?",
      answer:
        "Oltre alla splendida spiaggia, puoi visitare la Pineta di Cervia per passeggiate, il centro storico di Cervia con le saline, Milano Marittima per lo shopping e la vita notturna, e numerosi parchi tematici come Mirabilandia e l'Acquario di Cattolica.",
    },
    {
      question: "È disponibile il Wi-Fi?",
      answer:
        "Sì, tutti i nostri appartamenti dispongono di connessione Wi-Fi gratuita ad alta velocità, perfetta per lavorare in smart working o intrattenersi.",
    },
    {
      question: "Perché prenotare direttamente invece che su Booking o Airbnb?",
      answer:
        "Prenotando direttamente risparmierai sulle commissioni delle piattaforme OTA (fino al 20-30%). Inoltre avrai un contatto diretto con il proprietario, maggiore flessibilità e un servizio personalizzato per rendere la tua vacanza perfetta.",
    },
    {
      question: "Come posso raggiungere Pinarella?",
      answer:
        "Pinarella è facilmente raggiungibile in auto tramite l'autostrada A14 (uscita Cesena Nord). Se arrivi in treno, la stazione di Cervia-Milano Marittima dista circa 3 km. L'aeroporto più vicino è Bologna Guglielmo Marconi (90 km) o Rimini Federico Fellini (30 km).",
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
        title="Domande Frequenti (FAQ) | Appartamenti Pinarella Prenotazione Diretta"
        description="Tutte le risposte alle tue domande su prenotazione diretta, check-in, parcheggio, distanza dal mare e servizi degli appartamenti a Pinarella di Cervia."
        keywords="faq appartamento pinarella, domande frequenti prenotazione diretta, check-in pinarella, parcheggio gratuito cervia, distanza mare pinarella"
        canonical="https://immerso-nella-pineta.vercel.app/faq"
      />
      <BreadcrumbSEO
        items={[
          { name: "Home", url: "https://immerso-nella-pineta.vercel.app" },
          { name: "FAQ", url: "https://immerso-nella-pineta.vercel.app/faq" },
        ]}
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

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pine-800 mb-4">
            Domande Frequenti (FAQ)
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Trova tutte le risposte sulle prenotazioni dirette, servizi e
            informazioni utili per il tuo soggiorno a Pinarella di Cervia
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-pine-800 hover:text-pine-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-pine-50 rounded-lg p-8 text-center">
          <MessageCircle className="w-12 h-12 text-pine-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-pine-800 mb-3">
            Non hai trovato la risposta?
          </h2>
          <p className="text-gray-700 mb-6">
            Contattaci direttamente per qualsiasi domanda o richiesta speciale
          </p>
          <Link to="/pineta3/book">
            <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
              Contattaci
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
