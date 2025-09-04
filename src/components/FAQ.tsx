import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Come posso prenotare direttamente senza intermediari?",
      answer:
        "Puoi prenotare direttamente contattandoci tramite il modulo di contatto sul sito o chiamando il +39 393 893 2793. Prenotando direttamente risparmi sulle commissioni di Booking.com e Airbnb (fino al 20% in meno).",
    },
    {
      question: "Dove si trova l'appartamento a Pinarella di Cervia?",
      answer:
        "L'appartamento si trova in Via Vallombrosa 10, Pinarella di Cervia, a soli 200 metri dal mare e dalla pineta. È facilmente raggiungibile in auto con parcheggio privato incluso.",
    },
    {
      question: "Quanto costa affittare l'appartamento per una settimana?",
      answer:
        "Il costo varia a seconda del periodo e della durata del soggiorno. Contattaci direttamente per un preventivo personalizzato. Prenotando direttamente eviti le commissioni delle OTA e ottieni il miglior prezzo.",
    },
    {
      question: "Quante persone può ospitare l'appartamento?",
      answer:
        "L'appartamento  può ospitare fino a 4 persone con 1 letto matrimoniale e 2 letti singoli. È perfetto per famiglie o gruppi di amici che visitano Pinarella di Cervia.",
    },
    {
      question: "È incluso il parcheggio nell'affitto?",
      answer:
        "Sì, l'appartamento include un posto auto privato riservato senza costi aggiuntivi. Non dovrai preoccuparti di cercare parcheggio durante le tue vacanze a Pinarella.",
    },
    {
      question: "Quali sono gli orari di check-in e check-out?",
      answer:
        "Il check-in è dalle ore 14:00 e il check-out entro le ore 10:00. L'accesso è autonomo tramite cassetta di sicurezza, quindi puoi arrivare quando preferisci dopo le 14:00.",
    },
    {
      question: "Cosa c'è vicino all'appartamento a Pinarella?",
      answer:
        "A 200 metri trovi il mare e la pineta di Pinarella. Nelle vicinanze ci sono ristoranti, pizzerie, bar, supermercati e noleggi bici. Il centro di Cervia è a 10 minuti in auto.",
    },
    {
      question: "L'appartamento ha aria condizionata?",
      answer:
        "Sì, l'appartamento è dotato di aria condizionata e riscaldamento per il massimo comfort durante tutto l'anno. Include anche lavatrice, cucina completamente attrezzata e TV.",
    },
    {
      question: "Posso portare animali domestici?",
      answer:
        "Sì! L'appartamento accetta fino a 2 animali domestici gratuitamente.",
    },
    {
      question: "Come raggiungo Pinarella di Cervia?",
      answer:
        "Pinarella di Cervia è facilmente raggiungibile in auto dall'A14 (uscita Cervia). La stazione ferroviaria più vicina è Cervia-Milano Marittima, a 5 km dall'appartamento. L'aeroporto di Forlì è a 35 km.",
    },
  ];

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-medium mb-4">
            Domande Frequenti
          </h2>
          <p className="text-muted-foreground">
            Tutto quello che devi sapere per prenotare direttamente il tuo
            appartamento a Pinarella di Cervia
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-base">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default FAQ;
