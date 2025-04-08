
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HouseRulesPDF = () => {
  useEffect(() => {
    // Set title for printing
    document.title = "Regole della Casa - Immerso nella Pineta";

    // Add print trigger if accessed directly
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('print') === 'true') {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, []);

  return (
    <div className="pdf-container bg-white text-black mx-auto max-w-[21cm] p-8 print:p-4 min-h-[29.7cm]">
      {/* Print controls (visible only on screen) */}
      <div className="print:hidden mb-6 flex justify-between items-center">
        <Link to="/rules" className="text-pine-dark hover:underline flex items-center gap-1">
          <ExternalLink size={16} />
          Torna alle regole
        </Link>
        <Button onClick={() => window.print()} className="bg-pine-dark hover:bg-pine-dark/90">
          Stampa documento
        </Button>
      </div>

      {/* Header */}
      <header className="text-center mb-6 print:mb-4 border-b pb-4 print:pb-2">
        <h1 className="font-serif text-3xl print:text-2xl font-medium mb-2">Immerso nella Pineta</h1>
        <p className="text-muted-foreground print:text-sm">Via Vallombrosa 10, Pinarella di Cervia (RA)</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
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
                  <h3 className="font-medium mb-2 print:mb-1">Politica di cancellazione</h3>
                  <p className="text-sm print:text-xs">Cancellazione gratuita fino a 7 giorni prima del check-in.</p>
                </div>
              </div>

              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">Regole principali</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm print:text-xs">
                  <li className="flex items-center gap-1">
                    <span className="text-pine-dark">✓</span>
                    <span>Animali domestici ammessi</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-pine-dark">✓</span>
                    <span>Check-in autonomo con cassetta di sicurezza</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-pine-dark">✓</span>
                    <span>Parcheggio privato incluso</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-pine-dark">✓</span>
                    <span>Lenzuola e asciugamani forniti</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-destructive">✗</span>
                    <span>No feste o eventi</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="text-destructive">✗</span>
                    <span>Non è consentito fumare</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">Parcheggio</h3>
                <p className="text-sm print:text-xs">
                  Gli ospiti possono accedere comodamente al cortile interno con l'auto
                  e parcheggiare nel posto riservato, identificato dal numero 3.
                </p>
              </div>

              <div className="p-3 print:p-2 border rounded-md">
                <h3 className="font-medium mb-2 print:mb-1">Pulizia e Servizi</h3>
                <ul className="space-y-1 text-sm print:text-xs">
                  <li>
                    <span className="font-medium">Incluso:</span> Set completo di lenzuola,
                    federe, asciugamani, stoviglie e prodotti per la pulizia.
                  </li>
                  <li>
                    <span className="font-medium">Non incluso:</span> Articoli per l'igiene
                    personale (saponi, shampoo) e generi alimentari.
                  </li>
                  <li>
                    <span className="font-medium">Tassa di soggiorno:</span> €1 per notte per adulto 
                    (dai 15 anni in su), applicabile dal 1° maggio al 30 settembre.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              Accessibilità
            </h2>
            <div className="p-3 print:p-2 border rounded-md">
              <p className="text-sm print:text-xs">
                L'alloggio non è completamente accessibile per persone in sedia a rotelle.
                L'ingresso principale ha una larghezza di 81 cm, mentre le porte interne della camera e
                del bagno misurano rispettivamente 76 cm e 68 cm. Il bagno presenta uno scalino di 6 cm.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
              Consigli utili
            </h2>
            <div className="p-3 print:p-2 border rounded-md">
              <ul className="space-y-1 text-sm print:text-xs">
                <li>
                  <span className="font-medium">Supermercati:</span> Da giugno a settembre, il supermercato 
                  più vicino si trova a soli 200 metri. In inverno, il più vicino dista 2 km.
                </li>
                <li>
                  <span className="font-medium">Spiaggia:</span> Le spiagge di Pinarella sono a 5 minuti a piedi.
                </li>
                <li>
                  <span className="font-medium">Pineta:</span> L'ingresso alla pineta è a soli 200 metri.
                </li>
                <li>
                  <span className="font-medium">Raccolta differenziata:</span> Rispettare il calendario della raccolta 
                  porta a porta. Per soggiorni brevi ci occuperemo noi dello smaltimento.
                </li>
              </ul>
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
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin)}`} 
                alt="QR Code" 
                className="w-32 h-32 print:w-28 print:h-28" 
              />
            </div>
            <p className="text-center text-sm print:text-xs mt-2">
              Scansiona per visitare il nostro sito web
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium mb-3 print:mb-2 flex items-center gap-2 text-pine-dark">
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
              Note importanti
            </h2>
            <div className="p-3 print:p-2 border rounded-md">
              <ul className="space-y-1 text-sm print:text-xs">
                <li className="flex flex-col">
                  <span className="font-medium">Registrazione ospiti:</span>
                  <span>Entro il primo giorno di soggiorno, sarà necessario fornire le copie dei documenti.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">WiFi:</span>
                  <span>Rete: ImmersoNellaPineta</span>
                  <span>Password: inserita nel manuale cartaceo</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Codice Identificativo Nazionale:</span>
                  <span>IT039007C2RWYMLE52</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 print:mt-4 pt-4 border-t text-center text-xs print:text-[9px] text-muted-foreground">
        <p>Immerso nella Pineta - Via Vallombrosa 10, Pinarella di Cervia (RA)</p>
        <p>CIN: IT039007C2RWYMLE52</p>
      </footer>

      {/* Print-specific styles */}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}} />
    </div>
  );
};

export default HouseRulesPDF;
