import React from "react";
import { Link } from "react-router-dom";
import { getCanonicalUrl } from "@/lib/config";
import {
  Calendar,
  MapPin,
  Clock,
  Music,
  PartyPopper,
} from "lucide-react";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Pinarella Summer Festival 2026 | Concerti e Eventi Estivi sul Lungomare",
  description:
    "Scopri il Pinarella Summer Festival 2026: concerti, spettacoli e animazione serale sul lungomare di Pinarella da giugno ad agosto. Programma completo e date degli eventi.",
  image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
  datePublished: "2026-02-03",
  author: { "@type": "Organization", name: "Immerso nella Pineta" },
  publisher: {
    "@type": "Organization",
    name: "Immerso nella Pineta",
    logo: {
      "@type": "ImageObject",
      url: "https://immerso.eliazavatta.it/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://immerso.eliazavatta.it/blog/pinarella-summer-festival",
  },
};

const PinarellaSummerFestival = () => {
  return (
    <BlogPostLayout
      title="Pinarella Summer Festival 2026 | Concerti e Eventi Estivi sul Lungomare"
      description="Scopri il Pinarella Summer Festival 2026: concerti, spettacoli e animazione serale sul lungomare di Pinarella da giugno ad agosto. Programma completo e date degli eventi."
      heroImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80"
      publishDate="3 Febbraio 2026"
      readingTime="5 min di lettura"
      category="Eventi"
      canonicalUrl={getCanonicalUrl("/blog/pinarella-summer-festival")}
      keywords="pinarella summer festival, eventi pinarella, concerti pinarella, estate pinarella, lungomare pinarella, eventi estivi cervia"
      jsonLd={jsonLd}
    >
      {/* Article Info */}
      <div className="flex flex-wrap gap-6 mb-8 text-gray-600 not-prose">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>Giugno - Agosto 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          <span>Lungomare Pinarella</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>7 min di lettura</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500 mb-8">
        <p className="text-lg font-semibold text-purple-900 mb-2 flex items-center gap-2">
          <PartyPopper className="h-6 w-6" />
          L'Estate di Pinarella
        </p>
        <p className="text-gray-700 m-0">
          Da giugno ad agosto, il lungomare di Pinarella si anima con il
          Summer Festival: un ricco calendario di concerti, spettacoli e
          animazione serale che rende le tue vacanze ancora più
          indimenticabili.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Cos'è il Pinarella Summer Festival
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Il <strong>Pinarella Summer Festival</strong> è l'evento estivo più
        atteso della stagione, che trasforma il lungomare in un palcoscenico
        a cielo aperto. Ogni sera, residenti e turisti si ritrovano per
        godere di musica dal vivo, spettacoli di intrattenimento, street art
        e molto altro.
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">
        L'atmosfera è quella tipica della Romagna: calorosa, accogliente e
        coinvolgente. Il festival è pensato per tutte le età, con eventi
        dedicati ai bambini nel pomeriggio e spettacoli serali per adulti e
        famiglie.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Calendario Eventi Estate 2026
      </h2>
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md mb-8 not-prose">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Giugno 2026
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Apertura ufficiale della stagione</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Concerti di musica pop e rock ogni weekend</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Animazione per bambini dal martedì al venerdì</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
              <Music className="h-5 w-5" />
              Luglio 2026
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Festival di musica latina ogni giovedì sera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>
                  Serate liscio e revival anni '70-'80 ogni martedì
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>
                  Spettacoli di cabaret e teatro comico nel weekend
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
              <PartyPopper className="h-5 w-5" />
              Agosto 2026
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>
                  Ferragosto con grande concerto e fuochi d'artificio
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Serate di DJ set sulla spiaggia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Gran finale del festival a fine agosto</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Tipologie di Eventi
      </h2>
      <div className="space-y-6 mb-8 not-prose">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-rose-900">
            🎵 Concerti e Musica dal Vivo
          </h3>
          <p className="text-gray-700 m-0">
            Ogni sera generi musicali diversi: pop italiano, rock, musica
            latina, liscio romagnolo, DJ set e tribute band. Gli artisti si
            esibiscono sul palco principale del lungomare, con ingresso
            gratuito per tutti.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-orange-900">
            🎭 Spettacoli di Intrattenimento
          </h3>
          <p className="text-gray-700 m-0">
            Teatro di strada, acrobati, giocolieri, maghi e artisti di circo
            animano il lungomare creando un'atmosfera magica e coinvolgente.
            Perfetto per le famiglie con bambini.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-blue-900">
            👶 Animazione per Bambini
          </h3>
          <p className="text-gray-700 m-0">
            Nel pomeriggio, animatori professionisti organizzano giochi,
            laboratori creativi, cacce al tesoro e mini-spettacoli dedicati
            ai più piccoli sulla spiaggia e sul lungomare.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-green-900">
            🍕 Enogastronomia e Stand
          </h3>
          <p className="text-gray-700 m-0">
            Durante gli eventi, trovi numerosi stand gastronomici con
            specialità romagnole, piadine, pesce fresco, gelati artigianali
            e molto altro. Un'occasione per assaggiare i sapori locali in
            un'atmosfera di festa.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Info Pratiche e Consigli
      </h2>
      <div className="bg-sea-light/30 p-6 rounded-xl border-2 border-sea-light mb-8 not-prose">
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-2xl">🎫</span>
            <div>
              <strong>Ingresso:</strong> Tutti gli eventi del Pinarella
              Summer Festival sono gratuiti e aperti al pubblico.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🕐</span>
            <div>
              <strong>Orari:</strong> Gli eventi pomeridiani iniziano alle
              17:00, mentre gli spettacoli serali partono alle 21:00/21:30.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <strong>Location:</strong> La maggior parte degli eventi si
              svolge sul lungomare G. Deledda e in Piazza Zara a Pinarella.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🚲</span>
            <div>
              <strong>Come arrivare:</strong> Il lungomare è facilmente
              raggiungibile a piedi o in bicicletta. Sono disponibili anche
              parcheggi nelle vicinanze.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🪑</span>
            <div>
              <strong>Cosa portare:</strong> Ti consigliamo di portare una
              sedia pieghevole o un telo per sederti comodamente durante i
              concerti. In alternativa, ci sono spazi con sedute pubbliche.
            </div>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Alloggiare a Pinarella Durante il Festival
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Per vivere al meglio il Pinarella Summer Festival, soggiorna
        direttamente a Pinarella! Potrai raggiungere gli eventi in pochi
        minuti a piedi e goderti le serate senza preoccuparti di spostamenti
        o parcheggi.
      </p>
      <p className="text-gray-700 leading-relaxed mb-8">
        Il nostro appartamento <strong>"Immerso nella Pineta"</strong> si
        trova a soli 5 minuti a piedi dal lungomare e offre un'oasi di
        tranquillità nella pineta, perfetto per rilassarti dopo una serata
        di festa. Con 4 posti letto, parcheggio privato e giardino, è la
        scelta ideale per le famiglie.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Programma Dettagliato
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          <strong>📱 Aggiornamenti in tempo reale:</strong> Per conoscere il
          programma dettagliato settimana per settimana, consulta il sito
          ufficiale del turismo di Cervia o le pagine social dell'Ufficio
          Turismo.
        </p>
        <p>
          <strong>🌐 Info e contatti:</strong>{" "}
          <a
            href="https://www.cerviaemilanomarittima.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pine-dark hover:underline font-medium"
          >
            cerviaemilanomarittima.it
          </a>
        </p>
        <p>
          <strong>☔ In caso di maltempo:</strong> Gli eventi all'aperto
          potrebbero essere annullati o spostati in caso di pioggia.
          Verifica sempre il programma prima di uscire.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Altri Eventi Estivi nelle Vicinanze
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Oltre al Pinarella Summer Festival, durante l'estate trovi molti
        altri eventi a Cervia e dintorni: la Notte Rosa (inizio luglio),
        sagre enogastronomiche, mercatini dell'artigianato e manifestazioni
        sportive sulla spiaggia.
      </p>

      <div className="bg-slate-100 p-8 rounded-2xl my-8 not-prose">
        <h3 className="text-xl font-bold text-pine-900 mb-4">Scopri altri eventi</h3>
        <ul className="space-y-2">
          <li><Link to="/blog/eventi-pinarella-cervia" className="text-pine-600 hover:underline font-medium">→ Calendario eventi completo Pinarella</Link></li>
          <li><Link to="/blog/festival-aquilone-cervia" className="text-pine-600 hover:underline font-medium">→ Festival Internazionale dell'Aquilone</Link></li>
          <li><Link to="/blog/mercato-serale-pinarella" className="text-pine-600 hover:underline font-medium">→ Mercato serale di Pinarella</Link></li>
        </ul>
      </div>
    </BlogPostLayout>
  );
};

export default PinarellaSummerFestival;
