import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  Euro,
  TrendingDown,
  TrendingUp,
  Info,
  CheckCircle,
} from "lucide-react";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl } from "@/lib/config";

const PrezziPinarella = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Prezzi Appartamenti a Pinarella 2026: Guida Completa",
    description:
      "Quanto costa affittare un appartamento a Pinarella di Cervia nel 2026? Prezzi reali, periodi migliori per risparmiare e consigli pratici per prenotare.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    datePublished: "2026-02-04",
    dateModified: "2026-02-04",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
    publisher: {
      "@type": "Organization",
      name: "Immerso nella Pineta",
      logo: {
        "@type": "ImageObject",
        url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl("/blog/prezzi-appartamenti-pinarella-2026"),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quanto costa un appartamento a Pinarella nel 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Pinarella i prezzi variano da €400 a €2.500 a settimana. Giugno: €400-800/sett. Luglio: €800-1.200/sett. Agosto: €1.200-2.500/sett. Settembre: €400-700/sett. I prezzi dipendono da periodo, distanza dal mare e servizi inclusi.",
        },
      },
      {
        "@type": "Question",
        name: "Qual è il periodo più economico per affittare a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I periodi più economici sono giugno e settembre, con prezzi fino al 60% inferiori rispetto ad agosto. La seconda metà di giugno e la prima di settembre offrono mare ancora caldo e servizi aperti a prezzi vantaggiosi.",
        },
      },
      {
        "@type": "Question",
        name: "Conviene prenotare in anticipo a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì. Prenotando 3-4 mesi prima si risparmia fino al 20%. Per agosto, prenotare entro marzo garantisce scelta migliore e prezzi più bassi. Le prenotazioni last minute (sotto 2 settimane) possono trovare occasioni ma con scelta limitata.",
        },
      },
    ],
  };

  return (
    <>
      <MetaTags
        title="Prezzi Appartamenti Pinarella 2026: Quanto Costa Affittare"
        description="Quanto costa un appartamento a Pinarella di Cervia nel 2026? Guida completa con prezzi reali per periodo, consigli per risparmiare e quando prenotare."
        canonicalUrl="/blog/prezzi-appartamenti-pinarella-2026"
        ogImage="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <article className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime="2026-02-04">4 Febbraio 2026</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prezzi Appartamenti a Pinarella 2026: Quanto Costa Affittare?
            </h1>
            <p className="text-xl text-gray-600">
              Guida completa e aggiornata con prezzi reali, periodi migliori per
              risparmiare e consigli pratici per prenotare la tua vacanza.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Appartamenti vista mare a Pinarella"
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-12"
          />

          {/* RISPOSTA DIRETTA - AI-FRIENDLY */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Euro className="h-6 w-6" />
              Risposta Rapida
            </h2>
            <p className="text-lg text-blue-900 leading-relaxed">
              <strong>A Pinarella di Cervia nel 2026</strong>, un appartamento
              per 4 persone costa mediamente:
            </p>
            <ul className="mt-4 space-y-2 text-lg text-blue-900">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  <strong>Giugno:</strong> €400-800 a settimana
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  <strong>Luglio:</strong> €800-1.200 a settimana
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  <strong>Agosto:</strong> €1.200-2.500 a settimana
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  <strong>Settembre:</strong> €400-700 a settimana
                </span>
              </li>
            </ul>
          </div>

          {/* TABELLA PREZZI DETTAGLIATA */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Tabella Prezzi Completa 2026
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Prezzi indicativi per appartamento bilocale (4 persone), 50-60 mq,
              a 200-300 metri dal mare.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Periodo
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      1 Settimana
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Weekend (3gg)
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Prima metà Giugno</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      €400-600
                    </td>
                    <td className="px-6 py-4">€200-280</td>
                    <td className="px-6 py-4 text-sm">
                      Miglior rapporto qualità/prezzo
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Seconda metà Giugno
                    </td>
                    <td className="px-6 py-4">€600-800</td>
                    <td className="px-6 py-4">€280-350</td>
                    <td className="px-6 py-4 text-sm">Mare già caldo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Prima settimana Luglio
                    </td>
                    <td className="px-6 py-4">€800-1.000</td>
                    <td className="px-6 py-4">€350-420</td>
                    <td className="px-6 py-4 text-sm">Clima perfetto</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Resto di Luglio</td>
                    <td className="px-6 py-4">€1.000-1.200</td>
                    <td className="px-6 py-4">€420-500</td>
                    <td className="px-6 py-4 text-sm">Alta stagione inizia</td>
                  </tr>
                  <tr className="bg-red-50 hover:bg-red-100">
                    <td className="px-6 py-4 font-bold">Prima metà Agosto</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      €1.500-2.000
                    </td>
                    <td className="px-6 py-4">Non disponibile</td>
                    <td className="px-6 py-4 text-sm">Solo settimana intera</td>
                  </tr>
                  <tr className="bg-red-50 hover:bg-red-100">
                    <td className="px-6 py-4 font-bold">
                      Ferragosto (10-20 Agosto)
                    </td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      €2.000-2.500
                    </td>
                    <td className="px-6 py-4">Non disponibile</td>
                    <td className="px-6 py-4 text-sm">Picco massimo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Fine Agosto</td>
                    <td className="px-6 py-4">€1.200-1.500</td>
                    <td className="px-6 py-4">€500-600</td>
                    <td className="px-6 py-4 text-sm">Prezzi calano</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Prima metà Settembre
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      €600-800
                    </td>
                    <td className="px-6 py-4">€280-350</td>
                    <td className="px-6 py-4 text-sm">Mare ancora caldo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Seconda metà Settembre
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      €400-600
                    </td>
                    <td className="px-6 py-4">€200-280</td>
                    <td className="px-6 py-4 text-sm">Ottimo per relax</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="flex items-start gap-2 text-sm text-yellow-900">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Nota:</strong> I prezzi variano in base a distanza dal
                  mare (prima/seconda fila), servizi inclusi (parcheggio, aria
                  condizionata, WiFi) e dimensione dell'appartamento.
                </span>
              </p>
            </div>
          </section>

          {/* FATTORI CHE INFLUENZANO IL PREZZO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Cosa Influenza il Prezzo?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Aumenta il Prezzo
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Prima fila mare</strong> (+30-50%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Aria condizionata</strong> (+€50-100/sett)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Parcheggio privato</strong> (+€50-80/sett)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Lavastoviglie</strong> (+€30/sett)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Balcone vista mare</strong> (+€100-200/sett)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>
                      <strong>Ristrutturato recente</strong> (+20%)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  Diminuisce il Prezzo
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>
                      <strong>Seconda/terza fila</strong> (-20-40%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>
                      <strong>Senza aria condizionata</strong> (-€50-100/sett)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>
                      <strong>Parcheggio pubblico</strong> (risparmi
                      €50-80/sett)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>
                      <strong>Piano terra</strong> (-10%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>
                      <strong>Prenotazione anticipata</strong> (-15-20%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>
                      <strong>Soggiorni lunghi (2+ sett)</strong> (-10-15%)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CONSIGLI PER RISPARMIARE */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Come Risparmiare: 7 Strategie Concrete
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  1. Prenota 3-4 Mesi Prima
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: fino al 20%</strong>
                  <br />
                  Per agosto, prenotare entro marzo. Per luglio, entro aprile. I
                  proprietari offrono sconti per prenotazioni anticipate sicure.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  2. Scegli Giugno o Settembre
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: fino al 60% vs agosto</strong>
                  <br />
                  Mare ancora caldo (22-24°C), stabilimenti aperti, meno
                  affollato. La seconda metà di giugno e prima metà settembre
                  sono ideali.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  3. Seconda o Terza Fila
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: 20-40%</strong>
                  <br />A 200-300 metri dal mare (3-5 minuti a piedi) i prezzi
                  calano drasticamente. Stessa qualità, più conveniente.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  4. Soggiorni di 2 Settimane
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: 10-15%</strong>
                  <br />
                  Molti proprietari offrono sconti per soggiorni lunghi. Due
                  settimane costano meno di due prenotazioni separate.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  5. Evita Ferragosto
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: fino al 50%</strong>
                  <br />
                  La settimana 10-20 agosto costa il doppio. Spostando di una
                  settimana prima o dopo risparmi centinaia di euro.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  6. Contatta Direttamente il Proprietario
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: 10-15%</strong>
                  <br />
                  Evita commissioni di booking.com (15-20%). Cerca su Facebook
                  Marketplace o gruppi locali "Affitti Pinarella".
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  7. Considera l'Entroterra
                </h3>
                <p className="text-gray-700">
                  <strong>Risparmio: 30-50%</strong>
                  <br />A Cervia centro (2 km) o Milano Marittima (1 km) i
                  prezzi possono essere molto più bassi. In bici arrivi in 5
                  minuti.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Domande Frequenti sui Prezzi
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quanto costa un monolocale per 2 persone?
                </h3>
                <p className="text-gray-700">
                  Un monolocale (25-35 mq) costa circa il 20-30% in meno del
                  bilocale:
                  <br />
                  • Giugno/Settembre: €300-600/sett
                  <br />
                  • Luglio: €600-900/sett
                  <br />• Agosto: €900-1.800/sett
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  E un trilocale per 6 persone?
                </h3>
                <p className="text-gray-700">
                  Un trilocale (70-80 mq) costa circa il 30-40% in più del
                  bilocale:
                  <br />
                  • Giugno/Settembre: €550-1.000/sett
                  <br />
                  • Luglio: €1.100-1.600/sett
                  <br />• Agosto: €1.600-3.200/sett
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Cosa è incluso nel prezzo?
                </h3>
                <p className="text-gray-700">
                  <strong>Sempre incluso:</strong> luce, acqua, gas, biancheria
                  letto, pulizia finale base
                  <br />
                  <strong>A volte incluso:</strong> WiFi, lavatrice, posto auto
                  <br />
                  <strong>Mai incluso:</strong> ombrellone/sdraio
                  (€15-25/giorno), consumi extra (se eccesivi), tassa soggiorno
                  (€1-2/persona/notte)
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quanto si paga di caparra?
                </h3>
                <p className="text-gray-700">
                  Solitamente il 30% alla prenotazione, il saldo all'arrivo.
                  Alcuni richiedono cauzione danni (€100-300) restituita alla
                  partenza se tutto ok.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  I prezzi sono trattabili?
                </h3>
                <p className="text-gray-700">
                  <strong>Sì</strong>, specialmente se:
                  <br />
                  • Prenoti fuori stagione (giugno/settembre)
                  <br />
                  • Prenoti più settimane
                  <br />
                  • Prenoti molto in anticipo
                  <br />
                  • Contatti direttamente il proprietario
                  <br />
                  Non in alta stagione (luglio/agosto) dove la domanda è alta.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Conviene prenotare last minute?
                </h3>
                <p className="text-gray-700">
                  Dipende. A volte trovi occasioni (proprietari preferiscono
                  abbassare il prezzo che lasciare vuoto), ma la scelta è
                  limitata e rischi di non trovare nulla. Funziona meglio a
                  giugno/settembre, meno in agosto.
                </p>
              </div>
            </div>
          </section>

          {/* CTA FINALE */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prenota il Tuo Appartamento a Pinarella
            </h2>
            <p className="text-xl mb-6">
              Appartamenti selezionati a prezzi trasparenti. Contattaci per
              disponibilità e preventivi personalizzati.
            </p>
            <a
              href="/book"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Richiedi Disponibilità →
            </a>
          </div>
        </div>
      </article>
    </>
  );
};

export default PrezziPinarella;
