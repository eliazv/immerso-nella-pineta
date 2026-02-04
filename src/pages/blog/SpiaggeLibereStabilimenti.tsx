import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, MapPin, Euro, Waves, Users, Info } from "lucide-react";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl } from "@/lib/config";

const SpiaggeLibereStabilimenti = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Spiagge Libere o Stabilimenti a Pinarella? Guida Completa 2026",
    description:
      "Dove andare al mare a Pinarella: spiagge libere gratuite o stabilimenti balneari? Mappa, prezzi, servizi e consigli per scegliere.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      "@id": getCanonicalUrl("/blog/spiagge-libere-stabilimenti-pinarella"),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Dove sono le spiagge libere a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Pinarella ci sono 3 spiagge libere principali: Bagno 90 (nord), zona centrale tra bagno 95-97, e zona sud vicino confine Cervia. Tutte accessibili gratuitamente con docce pubbliche.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto costa uno stabilimento balneare a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I prezzi 2026 variano: Giugno €12-15/giorno. Luglio €18-22/giorno. Agosto €25-35/giorno. Settembre €10-15/giorno. Abbonamenti settimanali: €80-180. Abbonamenti mensili: €200-450.",
        },
      },
      {
        "@type": "Question",
        name: "Meglio spiaggia libera o stabilimento a Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dipende dalle esigenze. Spiaggia libera: gratis, flessibile, meno servizi. Stabilimento: comodo, servizi completi, animazione, costa di più. Per famiglie con bambini piccoli meglio stabilimento. Per coppie/giovani va bene anche libera.",
        },
      },
    ],
  };

  return (
    <>
      <MetaTags
        title="Spiagge Libere o Stabilimenti a Pinarella: Cosa Scegliere?"
        description="Guida completa alle spiagge di Pinarella 2026: dove sono le spiagge libere gratuite, quanto costano gli stabilimenti balneari, mappa e consigli pratici."
        canonicalUrl="/blog/spiagge-libere-stabilimenti-pinarella"
        ogImage="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
              Spiagge Libere o Stabilimenti a Pinarella? Cosa Scegliere
            </h1>
            <p className="text-xl text-gray-600">
              Guida completa alle spiagge di Pinarella: dove sono le spiagge
              libere gratuite, quanto costano gli stabilimenti, e quale
              scegliere per la tua vacanza.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Spiaggia di Pinarella"
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-12"
          />

          {/* RISPOSTA DIRETTA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Waves className="h-6 w-6" />
              Risposta Rapida
            </h2>
            <p className="text-lg text-blue-900 leading-relaxed mb-4">
              <strong>A Pinarella hai entrambe le opzioni:</strong>
            </p>
            <ul className="space-y-3 text-blue-900">
              <li className="flex items-start gap-3">
                <span className="font-bold text-2xl">🏖️</span>
                <div>
                  <strong>Spiagge Libere (gratuite):</strong> 3 zone principali
                  accessibili senza costi, con docce pubbliche e spazio per
                  teli/ombrellone proprio.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-2xl">🏖️</span>
                <div>
                  <strong>Stabilimenti Balneari (€10-35/giorno):</strong> 15+
                  bagni attrezzati con lettini, ombrelloni, bar, docce calde,
                  animazione e servizi completi.
                </div>
              </li>
            </ul>
          </div>

          {/* TABELLA COMPARATIVA */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Confronto Diretto: Cosa Scegliere?
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Caratteristica
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Spiaggia Libera 🏖️
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Stabilimento 🏖️
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Costo</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      €0 (gratis)
                    </td>
                    <td className="px-6 py-4">€10-35/giorno</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Ombrellone</td>
                    <td className="px-6 py-4">Devi portare il tuo</td>
                    <td className="px-6 py-4 text-green-600">✅ Incluso</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Lettino/Sdraio</td>
                    <td className="px-6 py-4">Devi portare il tuo</td>
                    <td className="px-6 py-4 text-green-600">
                      ✅ Incluso (2 lettini)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Docce</td>
                    <td className="px-6 py-4">Docce pubbliche fredde</td>
                    <td className="px-6 py-4 text-green-600">
                      Docce calde private
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Bagni/Spogliatoi</td>
                    <td className="px-6 py-4">Bagni pubblici (limitati)</td>
                    <td className="px-6 py-4 text-green-600">
                      Bagni privati puliti
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Bar/Ristorante</td>
                    <td className="px-6 py-4">Devi uscire dalla spiaggia</td>
                    <td className="px-6 py-4 text-green-600">
                      Bar in spiaggia
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Animazione bambini
                    </td>
                    <td className="px-6 py-4">❌ No</td>
                    <td className="px-6 py-4 text-green-600">
                      ✅ Sì (luglio-agosto)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Bagnino</td>
                    <td className="px-6 py-4">Solo zone sorvegliate</td>
                    <td className="px-6 py-4 text-green-600">
                      ✅ Sempre presente
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Prenotazione posto
                    </td>
                    <td className="px-6 py-4">No (primo arrivato)</td>
                    <td className="px-6 py-4 text-green-600">
                      ✅ Posto fisso tutta stagione
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      Spazio disponibile
                    </td>
                    <td className="px-6 py-4">Variabile (affollato agosto)</td>
                    <td className="px-6 py-4 text-green-600">Garantito</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">WiFi</td>
                    <td className="px-6 py-4">❌ No</td>
                    <td className="px-6 py-4 text-green-600">
                      Spesso disponibile
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Sport/Attività</td>
                    <td className="px-6 py-4">Limitate</td>
                    <td className="px-6 py-4 text-green-600">
                      Beach volley, ping pong, yoga
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* MAPPA SPIAGGE LIBERE */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              Dove Sono le Spiagge Libere a Pinarella
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Spiaggia Libera Nord (Zona Bagno 90)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Posizione:</strong> Viale dei Mille (nord Pinarella)
                  </p>
                  <p>
                    <strong>Dimensione:</strong> ~100 metri di lunghezza
                  </p>
                  <p>
                    <strong>Servizi:</strong> Docce pubbliche, parcheggio libero
                    vicino
                  </p>
                  <p>
                    <strong>Ideale per:</strong> Chi alloggia a nord Pinarella,
                    meno affollata
                  </p>
                  <p className="text-sm text-blue-600">
                    📍 <strong>Come arrivare:</strong> Via dei Mille fino alla
                    rotonda, poi verso mare
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Spiaggia Libera Centrale (Zona Bagno 95-97)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Posizione:</strong> Via Platani / Via Abeti
                  </p>
                  <p>
                    <strong>Dimensione:</strong> ~150 metri di lunghezza (la più
                    grande)
                  </p>
                  <p>
                    <strong>Servizi:</strong> Docce pubbliche, bar vicini,
                    parcheggio
                  </p>
                  <p>
                    <strong>Ideale per:</strong> Famiglie, zona più centrale e
                    comoda
                  </p>
                  <p className="text-sm text-blue-600">
                    📍 <strong>Come arrivare:</strong> Via Platani verso mare,
                    prosegui a sinistra
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Spiaggia Libera Sud (Confine Cervia)
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Posizione:</strong> Fine Viale dei Platani (sud)
                  </p>
                  <p>
                    <strong>Dimensione:</strong> ~80 metri di lunghezza
                  </p>
                  <p>
                    <strong>Servizi:</strong> Docce pubbliche, zona più
                    tranquilla
                  </p>
                  <p>
                    <strong>Ideale per:</strong> Chi cerca pace, meno turisti
                  </p>
                  <p className="text-sm text-blue-600">
                    📍 <strong>Come arrivare:</strong> Viale Platani direzione
                    sud, ultimo accesso al mare
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="flex items-start gap-2 text-sm text-yellow-900">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Nota:</strong> In agosto le spiagge libere si
                  riempiono presto. Arriva entro le 9:00 per trovare posto
                  comodo. Porta ombrellone, teli e tutto il necessario.
                </span>
              </p>
            </div>
          </section>

          {/* PREZZI STABILIMENTI */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Euro className="h-8 w-8 text-blue-600" />
              Prezzi Stabilimenti Balneari 2026
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Periodo
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Giornaliero
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Settimanale
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Mensile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Giugno</td>
                    <td className="px-6 py-4">€12-15</td>
                    <td className="px-6 py-4 text-green-600">€80-100</td>
                    <td className="px-6 py-4 text-green-600">€200-280</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Luglio</td>
                    <td className="px-6 py-4">€18-22</td>
                    <td className="px-6 py-4">€120-150</td>
                    <td className="px-6 py-4">€350-420</td>
                  </tr>
                  <tr className="bg-red-50 hover:bg-red-100">
                    <td className="px-6 py-4 font-bold">Agosto</td>
                    <td className="px-6 py-4 text-red-600 font-bold">€25-35</td>
                    <td className="px-6 py-4 text-red-600">€160-220</td>
                    <td className="px-6 py-4 text-red-600">€450-600</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Settembre</td>
                    <td className="px-6 py-4">€10-15</td>
                    <td className="px-6 py-4 text-green-600">€70-90</td>
                    <td className="px-6 py-4 text-green-600">€180-250</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">
                💡 Cosa Include il Prezzo Stabilimento:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>1 ombrellone + 2 lettini (fila standard)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Docce calde e bagni privati</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Bagnino e sorveglianza</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Animazione bambini (luglio-agosto)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Bar/ristorante (a pagamento separato)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CONSIGLI PER SCEGLIERE */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              Quale Scegliere? Consigli Pratici
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  🏖️ Scegli SPIAGGIA LIBERA se:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Vuoi risparmiare (€0 vs €15-30/giorno)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>
                      Hai già ombrellone/sdraio o li noleggi (€10-15/giorno)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Vai in spiaggia poche ore al giorno</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Cerchi flessibilità (cambi zona ogni giorno)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Sei giovane/coppia senza bambini piccoli</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Vieni fuori stagione (giugno/settembre)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  🏖️ Scegli STABILIMENTO se:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      Hai bambini piccoli (servizi, animazione, sicurezza)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Passi tutta la giornata in spiaggia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      Vuoi comfort e servizi (docce calde, bagni puliti, bar)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Non vuoi portare/noleggiare attrezzatura</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Vuoi posto fisso garantito (specie agosto)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Cerchi socialità e attività organizzate</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  💡 SOLUZIONE IBRIDA (consigliata):
                </h3>
                <p className="text-gray-700 mb-3">
                  Molti turisti usano <strong>entrambe le opzioni</strong> nella
                  stessa vacanza:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">→</span>
                    <span>
                      <strong>Stabilimento nei giorni infrasettimanali</strong>{" "}
                      (servizi, relax)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">→</span>
                    <span>
                      <strong>Spiaggia libera nel weekend</strong> (risparmio,
                      varietà)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">→</span>
                    <span>
                      O viceversa: libera al mattino, stabilimento al pomeriggio
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Domande Frequenti
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Posso noleggiare ombrellone sulla spiaggia libera?
                </h3>
                <p className="text-gray-700">
                  Sì, alcuni stabilimenti confinanti noleggiano ombrelloni per
                  la spiaggia libera adiacente a €10-15/giorno. In alternativa,
                  portalo da casa o compralo a Cervia (€15-30).
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Le spiagge libere sono sorvegliate?
                </h3>
                <p className="text-gray-700">
                  Sì, ci sono bagnini che sorvegliano anche le zone libere, ma
                  con meno copertura rispetto agli stabilimenti. In agosto c'è
                  sempre sorveglianza.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Conviene prenotare lo stabilimento in anticipo?
                </h3>
                <p className="text-gray-700">
                  Per agosto sì, specialmente per la prima fila. Prenota 2-3
                  mesi prima. A giugno/settembre trovi sempre posto anche
                  all'ultimo momento.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Prima fila: quanto costa in più?
                </h3>
                <p className="text-gray-700">
                  La prima fila (vista mare diretta) costa il 20-40% in più. In
                  agosto può arrivare a €40-50/giorno. Le file 3-5 sono un buon
                  compromesso (€20-30/giorno in agosto).
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Posso pagare solo mezza giornata?
                </h3>
                <p className="text-gray-700">
                  Alcuni stabilimenti offrono tariffa ridotta pomeriggio (dalle
                  14:00) a €8-15. Non tutti lo fanno, chiedi prima.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Cani ammessi in spiaggia?
                </h3>
                <p className="text-gray-700">
                  Sulle spiagge libere sì, purché al guinzaglio. Alcuni
                  stabilimenti hanno zone pet-friendly (es. Bagno 91). A Cervia
                  c'è anche una spiaggia per cani dedicata.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prenota la Tua Vacanza a Pinarella
            </h2>
            <p className="text-xl mb-6">
              Appartamenti a pochi passi dalle spiagge libere e dagli
              stabilimenti. Scegli la soluzione perfetta per te.
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

export default SpiaggeLibereStabilimenti;
