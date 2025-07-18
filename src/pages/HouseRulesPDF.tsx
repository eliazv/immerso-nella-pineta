import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  FileText,
  ExternalLink,
  Contact,
  Sparkles,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HouseRulesPDF = () => {
  useEffect(() => {
    // Set title for printing
    document.title = "Regole della Casa - Immerso nella Pineta";

    // Add print trigger if accessed directly
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("print") === "true") {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, []);

  return (
    <div className="pdf-container bg-white text-black mx-auto max-w-[21cm] p-8 print:p-4 min-h-[29.7cm]">
      {/* Print controls (visible only on screen) */}
      <div className="print:hidden mb-6 flex justify-between items-center">
        <Link
          to="/rules"
          className="text-pine-dark hover:underline flex items-center gap-1"
        >
          <ExternalLink size={16} />
          Torna alle regole
        </Link>
        <Button
          onClick={() => window.print()}
          className="bg-pine-dark hover:bg-pine-dark/90"
        >
          Stampa documento
        </Button>
      </div>

      {/* Header */}
      <header className="text-center mb-6 print:mb-4 border-b pb-4 print:pb-2">
        <h1 className="font-serif text-3xl print:text-2xl font-medium mb-2">
          Immerso nella Pineta
        </h1>
        <p className="text-muted-foreground print:text-sm">
          Via Vallombrosa 10, Pinarella di Cervia (RA)
        </p>
      </header>

      {/* Main content - two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:gap-4">
        {/* Left column (2/3 width) */}
        <div className="md:col-span-2 space-y-6 print:space-y-3">
          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              <FileText className="h-5 w-5" />
              Regole della Casa
            </h2>
            <div className="space-y-4 print:space-y-2 print:text-sm">
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                <div className="p-3 print:p-2 border rounded-md">
                  <h3 className="font-medium mb-2 print:mb-1">Orari</h3>
                  <ul className="space-y-1 text-sm print:text-xs">
                    <li className="flex justify-between">
                      <span>Check-in</span>
                      <span className="font-medium">dalle 14:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Check-out</span>
                      <span className="font-medium">fino alle 10:00</span>
                    </li>
                  </ul>
                </div>
                <div className="p-3 print:p-2 border rounded-md">
                  <ul className="space-y-2 print:space-y-1 text-sm print:text-xs">
                    <li className="flex flex-col">
                      <span className="font-medium">Telefono:</span>
                      <span>+39 3938932793</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Email:</span>
                      <span>zavattaelia@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </div> */}

              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Regole principali
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm print:text-xs">
                  <li className="flex items-center gap-1">
                    <span className="text-pine-dark">✓</span>
                    <span>Animali domestici ammessi</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-destructive">✗</span>
                    <span>No feste o eventi</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-pine-dark">✓</span>
                    <span>Lenzuola e asciugamani forniti</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-destructive">✗</span>
                    <span>Non è consentito fumare</span>
                  </li>
                  <li className="flex items-center gap-1 md:col-span-2">
                    <span className="text-destructive">✗</span>
                    <span>
                      Non accendere molti elettrodomestici simultaneamente
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Check Out (entro le 10:00)
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
                  <li>Spegnete tutte le luci ed elettrodomestici accesi.</li>
                  <li>Chiudete a chiave la porta principale e le finestre.</li>
                  <li>Riponete le chiavi nella cassettina di sicurezza.</li>
                </ul>
              </div>
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">Parcheggio</h3>
                <p className="text-sm print:text-xs">
                  Gli ospiti possono parcheggiare unicamente nel parcheggio di
                  fronte all'appartamento, identificato dal numero 3.
                </p>
              </div>
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Tassa di soggiorno:
                </h3>
                <p className="text-sm print:text-xs">
                  €1 a notte per ogni ospite dai 15 anni in su, dal 1° maggio al
                  30 settembre (max 7 notti). Può essere inviata via PayPal,
                  Satispay (contatti sopra) o bonifico (IBAN:
                  IT92W0357601601010002973340).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              <Sparkles className="h-5 w-5" />
              Consigli utili
            </h2>
            <div className="space-y-4 print:space-y-2 print:text-sm">
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Supermercati vicini:
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm print:text-xs">
                  <li>
                    Svelto A&O: Via Mezzanotte, 1b, 48015 Cervia RA (200m,
                    aperto da giugno a settembre)
                  </li>
                  <li>Conad: Viale Europa Unita, 4, 48015 Cervia RA (2km)</li>
                </ul>
              </div>
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">Spiaggia:</h3>
                <p className="text-sm print:text-xs">
                  Le spiagge di Pinarella sono a 5 minuti a piedi. La prima
                  spiaggia libera vicino all'appartamento dista 700 metri (circa
                  9 minuti a piedi) ed è situata di fianco al Bagno 59 (Via
                  Arenile Demaniale, 59, 48015 Cervia RA).
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right column (1/3 width) */}
        <div className="space-y-6 print:space-y-3">
          <section className="flex flex-col items-center">
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              <QrCode className="h-5 w-5" />
              Visita il nostro sito
            </h2>
            <div className="p-4 print:p-2 border rounded-md bg-white">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                  "https://immerso-nella-pineta.lovable.app/"
                )}`}
                alt="QR Code"
                className="w-32 h-32 print:w-28 print:h-28"
              />
            </div>
            <p className="text-center text-sm print:text-xs mt-2">
              Scansiona per altre informazioni sull'appartamento e Pinarella.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              <Contact className="h-5 w-5" />
              Contatti
            </h2>
            <div className="p-3 print:p-2 border rounded-md">
              <ul className="space-y-2 print:space-y-1 text-sm print:text-xs">
                <li className="flex flex-col">
                  <span className="font-medium">Email:</span>
                  <span>zavattaelia@gmail.com</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Telefono:</span>
                  <span>+39 393 893 2793</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              <Info className="h-5 w-5" />
              Altre informazioni
            </h2>
            <div className="space-y-4 print:space-y-2 print:text-sm">
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Raccolta differenziata
                </h3>
                <p className="text-sm print:text-xs">
                  Organico: Martedì, Venerdì, Domenica. Indifferenziato: Sabato.
                  Per soggiorni brevi ci occuperemo noi dello smaltimento.
                </p>
              </div>
              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Lascia una recensione
                </h3>
                <p className="text-sm print:text-xs">
                  Se hai apprezzato il tuo soggiorno, ti invitiamo a lasciare
                  una <strong>recensione positiva</strong>: il tuo feedback è
                  prezioso per noi! E se stai pensando di tornare, contattaci
                  direttamente per prenotare e riceverai uno{" "}
                  <strong>sconto speciale</strong> riservato a te!
                </p>
              </div>
              {/* <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">
                  Tassa di soggiorno:
                </h3>
                <p className="text-sm print:text-xs">
                  Tassa di soggiorno: €1 a notte per ogni adulto (dai 15 anni in
                  su), applicabile dal 1° maggio al 30 settembre, fino a un
                  massimo di 7 notti. Può essere lasciata sul tavolo in contanti
                  al momento del check-out, inviata tramite PayPal, Satispay ai
                  contatti indicati sopra o bonifico bancario (IBAN:
                  IT92W0357601601010002973340).
                </p>
              </div> */}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 print:mt-4 pt-4 border-t text-center text-xs print:text-[9px] text-muted-foreground">
        <p>
          Immerso nella Pineta - Via Vallombrosa 10, Pinarella di Cervia (RA)
        </p>
        <p>CIN: IT039007C2RWYMLE52</p>
      </footer>
    </div>
  );
};

export default HouseRulesPDF;
