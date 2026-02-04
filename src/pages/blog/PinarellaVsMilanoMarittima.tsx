import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, MapPin, Users, Euro, Waves, TrendingUp } from "lucide-react";
import MetaTags from "@/components/MetaTags";
import { getCanonicalUrl } from "@/lib/config";

const PinarellaVsMilanoMarittima = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "Pinarella o Milano Marittima: Dove Andare? Confronto Completo 2026",
    description:
      "Meglio Pinarella o Milano Marittima per le vacanze? Confronto dettagliato tra prezzi, spiagge, vita notturna, servizi e tipologia di turismo.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      "@id": getCanonicalUrl("/blog/pinarella-o-milano-marittima"),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cosa è meglio: Pinarella o Milano Marittima?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dipende dalle esigenze. Pinarella: più tranquilla, familiare, prezzi bassi (-30-50%), ideale per famiglie e relax. Milano Marittima: più mondana, vita notturna, servizi lusso, ideale per giovani e coppie che cercano movida.",
        },
      },
      {
        "@type": "Question",
        name: "Quanto distano Pinarella e Milano Marittima?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pinarella e Milano Marittima distano solo 2 km. In auto 5 minuti, in bici 8-10 minuti. Sono praticamente attaccate, quindi puoi alloggiare a Pinarella e andare la sera a Milano Marittima.",
        },
      },
      {
        "@type": "Question",
        name: "Milano Marittima costa di più di Pinarella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, Milano Marittima è significativamente più cara. Appartamenti: +30-50%. Stabilimenti balneari: +20-40%. Ristoranti: +25-35%. Bar/aperitivi: +30-50%. Per una famiglia, la differenza può essere €500-1000 a settimana.",
        },
      },
    ],
  };

  return (
    <>
      <MetaTags
        title="Pinarella o Milano Marittima: Dove Andare in Vacanza?"
        description="Meglio Pinarella o Milano Marittima? Confronto completo 2026 tra prezzi, spiagge, vita notturna, servizi e tipologia di turismo per scegliere la località perfetta."
        canonicalUrl="/blog/pinarella-o-milano-marittima"
        ogImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
              Pinarella o Milano Marittima: Dove Andare in Vacanza?
            </h1>
            <p className="text-xl text-gray-600">
              Confronto completo tra le due località per aiutarti a scegliere:
              prezzi, spiagge, vita notturna, servizi e tipologia di turismo.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Spiaggia Romagna"
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-12"
          />

          {/* RISPOSTA DIRETTA */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Risposta Rapida
            </h2>
            <div className="space-y-4 text-lg text-blue-900">
              <div>
                <strong>🏖️ Scegli PINARELLA se:</strong>
                <ul className="mt-2 ml-6 space-y-1">
                  <li>• Cerchi tranquillità e relax</li>
                  <li>• Hai bambini piccoli</li>
                  <li>• Vuoi risparmiare (prezzi -30-50%)</li>
                  <li>• Preferisci atmosfera familiare</li>
                </ul>
              </div>
              <div>
                <strong>✨ Scegli MILANO MARITTIMA se:</strong>
                <ul className="mt-2 ml-6 space-y-1">
                  <li>• Vuoi vita notturna e movida</li>
                  <li>• Cerchi locali trendy e aperitivi</li>
                  <li>• Ti piace l'atmosfera mondana</li>
                  <li>• Il budget non è un problema</li>
                </ul>
              </div>
              <p className="pt-2 border-t border-blue-200">
                <strong>💡 Soluzione ideale:</strong> Alloggia a Pinarella
                (risparmi) e vai la sera a Milano Marittima (sono a 2 km, 5 min
                in auto).
              </p>
            </div>
          </div>

          {/* TABELLA COMPARATIVA PRINCIPALE */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Confronto Completo: Pinarella vs Milano Marittima
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Aspetto
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      🏖️ Pinarella
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      ✨ Milano Marittima
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Atmosfera</td>
                    <td className="px-6 py-4">
                      Tranquilla, familiare, residenziale
                    </td>
                    <td className="px-6 py-4">Mondana, vivace, glamour</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Prezzi medi</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      €€ (economico)
                    </td>
                    <td className="px-6 py-4 text-red-600">€€€€ (caro)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Vita notturna</td>
                    <td className="px-6 py-4">Limitata, pochi locali</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      Intensa, discoteche, bar
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Spiaggia</td>
                    <td className="px-6 py-4">
                      Ampia, sabbia dorata, meno affollata
                    </td>
                    <td className="px-6 py-4">
                      Ampia, sabbia fine, più affollata
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Pineta</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      Secolare, rigogliosa, fresca
                    </td>
                    <td className="px-6 py-4">Presente ma meno estesa</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Ristoranti</td>
                    <td className="px-6 py-4">
                      Tradizionali, familiari, buon rapporto qualità/prezzo
                    </td>
                    <td className="px-6 py-4">Raffinati, trendy, costosi</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Shopping</td>
                    <td className="px-6 py-4">
                      Negozi essenziali, supermercati
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      Boutique, griffe, negozi di lusso
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Parcheggio</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      Facile, spesso gratuito
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      Difficile, costoso
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Affollamento</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      Moderato, anche in agosto
                    </td>
                    <td className="px-6 py-4 text-red-600">
                      Alto, molto in agosto
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Target principale</td>
                    <td className="px-6 py-4">
                      Famiglie con bambini, coppie mature
                    </td>
                    <td className="px-6 py-4">
                      Giovani, coppie, turismo internazionale
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Distanza Cervia</td>
                    <td className="px-6 py-4">2 km (5 min auto)</td>
                    <td className="px-6 py-4">1 km (3 min auto)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">Ideale per</td>
                    <td className="px-6 py-4">
                      Relax, natura, risparmio, famiglie
                    </td>
                    <td className="px-6 py-4">
                      Divertimento, movida, socialità
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CONFRONTO PREZZI DETTAGLIATO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Euro className="h-8 w-8 text-blue-600" />
              Confronto Prezzi: Quanto Si Risparmia a Pinarella?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-600 mb-4">
                  🏖️ Pinarella - Prezzi
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between border-b pb-2">
                    <span>Appartamento (4p, sett agosto)</span>
                    <strong>€1.200-2.000</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Stabilimento balneare (giorno agosto)</span>
                    <strong>€25-35</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Cena ristorante (2p)</span>
                    <strong>€50-70</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Aperitivo (2p)</span>
                    <strong>€15-20</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Pizza da asporto</span>
                    <strong>€7-9</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Gelato (2 gusti)</span>
                    <strong>€2.50-3</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Parcheggio giornaliero</span>
                    <strong className="text-green-600">Gratuito</strong>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-green-600 font-semibold">
                  💰 Totale settimana agosto: ~€2.000-2.800
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-purple-600 mb-4">
                  ✨ Milano Marittima - Prezzi
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between border-b pb-2">
                    <span>Appartamento (4p, sett agosto)</span>
                    <strong className="text-red-600">€2.000-3.500</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Stabilimento balneare (giorno agosto)</span>
                    <strong className="text-red-600">€35-50</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Cena ristorante (2p)</span>
                    <strong className="text-red-600">€80-120</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Aperitivo (2p)</span>
                    <strong className="text-red-600">€25-40</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Pizza da asporto</span>
                    <strong className="text-red-600">€9-12</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Gelato (2 gusti)</span>
                    <strong className="text-red-600">€3.50-4.50</strong>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Parcheggio giornaliero</span>
                    <strong className="text-red-600">€5-15</strong>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-red-600 font-semibold">
                  💰 Totale settimana agosto: ~€3.500-5.000
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
              <p className="text-lg font-bold text-gray-900 mb-2">
                💡 Risparmio Pinarella vs Milano Marittima:
              </p>
              <p className="text-gray-700">
                Una famiglia di 4 persone risparmia{" "}
                <strong>€1.000-2.000 a settimana</strong> scegliendo Pinarella
                invece di Milano Marittima. In due settimane:{" "}
                <strong>€2.000-4.000 di risparmio</strong>.
              </p>
            </div>
          </section>

          {/* SPIAGGE A CONFRONTO */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Waves className="h-8 w-8 text-blue-600" />
              Qualità Spiagge: Differenze Reali
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  🏖️ Spiaggia Pinarella
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      <strong>Larghezza:</strong> 150-200 metri (molto ampia)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      <strong>Sabbia:</strong> dorata, fine, morbida
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      <strong>Mare:</strong> fondale basso (sicuro bambini)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      <strong>Affollamento:</strong> moderato, spazio
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      <strong>Pineta:</strong> direttamente in spiaggia
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>
                      <strong>Spiagge libere:</strong> 3 zone gratuite
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  ✨ Spiaggia Milano Marittima
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>
                      <strong>Larghezza:</strong> 150-180 metri (ampia)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>
                      <strong>Sabbia:</strong> finissima, chiara, curata
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>
                      <strong>Mare:</strong> fondale basso (sicuro)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>
                      <strong>Affollamento:</strong> alto, specie agosto
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>
                      <strong>Pineta:</strong> presente ma meno estesa
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>
                      <strong>Spiagge libere:</strong> molto limitate
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-gray-700 text-center text-lg">
              <strong>Verdetto:</strong> La qualità della spiaggia è
              praticamente <strong>identica</strong>. Pinarella ha il vantaggio
              di essere meno affollata e con più pineta. Milano Marittima ha
              stabilimenti più lussuosi.
            </p>
          </section>

          {/* VITA NOTTURNA */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Vita Notturna e Divertimento
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🏖️ Pinarella - Serate Tranquille
                </h3>
                <p className="text-gray-700 mb-4">
                  Pinarella è perfetta per chi cerca{" "}
                  <strong>relax serale</strong>. Le attività principali:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Passeggiate in pineta al tramonto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Mercato serale (martedì e venerdì sera)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Cena in ristoranti tradizionali</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Gelato sul lungomare</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Qualche bar con musica dal vivo (estivi)</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Locali notturni: 1-2 bar aperti fino alle 00:30-01:00. Nessuna
                  discoteca. Perfetto per dormire sereni.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ✨ Milano Marittima - Movida Intensa
                </h3>
                <p className="text-gray-700 mb-4">
                  Milano Marittima è{" "}
                  <strong>il fulcro della movida romagnola</strong>. Offre:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>
                      <strong>Discoteche famose:</strong> Pineta, Papeete Beach,
                      Villa delle Rose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>
                      <strong>Bar trendy:</strong> aperitivi fino a notte, DJ
                      set
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>
                      <strong>Beach club:</strong> Papeete (l'icona della
                      riviera)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>
                      <strong>Viale Gramsci:</strong> passeggiata mondana con
                      vetrine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>
                      <strong>Eventi VIP:</strong> serate tematiche, ospiti
                      famosi
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Attenzione: molto rumore notturno. Se alloggi vicino a locali,
                  difficile dormire prima delle 2-3 di notte.
                </p>
              </div>
            </div>
          </section>

          {/* CONSIGLI FINALI */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              Quale Scegliere? Consigli per Profilo
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  👨‍👩‍👧‍👦 Famiglie con Bambini Piccoli (0-8 anni)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Consiglio:</strong>{" "}
                  <span className="text-green-600 font-bold">
                    PINARELLA 100%
                  </span>
                </p>
                <p className="text-gray-700">
                  Tranquillità, sicurezza, prezzi bassi, spiaggia meno
                  affollata, bambini dormono meglio la notte. Nessun vantaggio
                  da Milano Marittima per questa fascia.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  👫 Coppie Giovani (20-35 anni)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Consiglio:</strong>{" "}
                  <span className="text-purple-600 font-bold">
                    MILANO MARITTIMA
                  </span>{" "}
                  se cerchi divertimento,{" "}
                  <span className="text-green-600 font-bold">PINARELLA</span> se
                  cerchi relax/romanticismo
                </p>
                <p className="text-gray-700">
                  O la soluzione furba: <strong>alloggia a Pinarella</strong>{" "}
                  (risparmi €500-1000) e{" "}
                  <strong>esci la sera a Milano Marittima</strong> (5 min auto).
                  Meglio di entrambi i mondi.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  👴👵 Coppie Mature / Pensionati
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Consiglio:</strong>{" "}
                  <span className="text-green-600 font-bold">PINARELLA</span>
                </p>
                <p className="text-gray-700">
                  Tranquillità, natura (pineta), prezzi onesti, ristoranti
                  tradizionali, niente caos notturno. Milano Marittima può
                  essere troppo chiassosa e cara.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  👥 Gruppi di Amici (Giovani)
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Consiglio:</strong>{" "}
                  <span className="text-purple-600 font-bold">
                    MILANO MARITTIMA
                  </span>
                </p>
                <p className="text-gray-700">
                  Movida, discoteche, beach party, socialità. È il motivo per
                  cui esistono gruppi in vacanza. A Pinarella vi annoiereste
                  dopo 2 giorni.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  💰 Budget Limitato
                </h3>
                <p className="text-gray-700 mb-2">
                  <strong>Consiglio:</strong>{" "}
                  <span className="text-green-600 font-bold">PINARELLA</span>
                </p>
                <p className="text-gray-700">
                  Se hai budget stretto, Pinarella ti fa risparmiare
                  €1.000-2.000 a settimana. Con quei soldi puoi allungare la
                  vacanza di 3-4 giorni o concederti qualche extra.
                </p>
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
                  Quanto tempo ci vuole da Pinarella a Milano Marittima?
                </h3>
                <p className="text-gray-700">
                  In auto: 5 minuti. In bici: 8-10 minuti. A piedi: 25-30
                  minuti. Sono praticamente attaccate, quindi puoi facilmente
                  goderti entrambe le località.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Posso parcheggiare gratis a Milano Marittima?
                </h3>
                <p className="text-gray-700">
                  Difficile. In alta stagione i parcheggi gratuiti si riempiono
                  entro le 8:00. I parcheggi a pagamento costano €1-2/ora
                  (€10-20/giorno). A Pinarella è quasi sempre gratis.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Milano Marittima è più bella di Pinarella?
                </h3>
                <p className="text-gray-700">
                  Dipende dai gusti. Milano Marittima ha più lusso, negozi,
                  movida. Pinarella ha più natura (pineta secolare),
                  tranquillità, autenticità. La spiaggia è identica in qualità.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ci sono supermercati a Pinarella?
                </h3>
                <p className="text-gray-700">
                  Sì, ci sono 2-3 supermercati ben forniti (Conad, Sigma).
                  Milano Marittima ne ha di più e alcuni più grandi, ma i prezzi
                  sono simili.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Vale la pena spendere di più per Milano Marittima?
                </h3>
                <p className="text-gray-700">
                  Solo se la movida notturna è essenziale per te. Se vai al mare
                  per rilassarti, Pinarella offre la stessa qualità a prezzi
                  molto più bassi. La differenza di €1.000-2.000 a settimana è
                  significativa.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prenota a Pinarella e Goditi Entrambe le Località
            </h2>
            <p className="text-xl mb-6">
              Alloggia a Pinarella per tranquillità e risparmio, vai la sera a
              Milano Marittima per la movida. Il meglio di entrambi i mondi.
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

export default PinarellaVsMilanoMarittima;
