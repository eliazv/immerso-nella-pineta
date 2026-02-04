import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Music,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PinarellaSummerFestival = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Pinarella Summer Festival 2026 | Concerti e Eventi Estivi sul Lungomare"
        description="Scopri il Pinarella Summer Festival 2026: concerti, spettacoli e animazione serale sul lungomare di Pinarella da giugno ad agosto. Programma completo e date degli eventi."
        keywords="pinarella summer festival, eventi pinarella, concerti pinarella, estate pinarella, lungomare pinarella, eventi estivi cervia"
        canonicalUrl={getCanonicalUrl("/blog/pinarella-summer-festival")}
      />

      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 pt-24 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al Blog
          </Button>
        </Link>

        {/* Hero Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80"
            alt="Pinarella Summer Festival - Concerti ed eventi estivi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-sm mb-4">
                <Music className="h-4 w-4" />
                <span>Eventi Estivi</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Pinarella Summer Festival 2026
              </h1>
            </div>
          </div>
        </div>

        {/* Article Info */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
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

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
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
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md mb-8">
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
          <div className="space-y-6 mb-8">
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
          <div className="bg-sea-light/30 p-6 rounded-xl border-2 border-sea-light mb-8">
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

          <div className="bg-gradient-to-r from-pine-dark to-sea-dark text-white p-8 rounded-2xl shadow-2xl text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Prenota la Tua Estate a Pinarella
            </h3>
            <p className="mb-6 text-white/90">
              Non perdere l'occasione di vivere il Pinarella Summer Festival
              2026!
            </p>
            <Link to="/pineta3/book">
              <Button
                size="lg"
                className="bg-white text-pine-dark hover:bg-white/90 font-bold"
              >
                Verifica Disponibilità
              </Button>
            </Link>
          </div>

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
        </article>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Potrebbero interessarti anche
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/blog/festival-aquilone-cervia"
              className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-pine-light hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-lg mb-2 text-pine-dark group-hover:text-pine-dark/80">
                Festival dell'Aquilone
              </h4>
              <p className="text-gray-600">
                L'evento primaverile più spettacolare di Cervia
              </p>
            </Link>
            <Link
              to="/blog/cosa-fare-pinarella-cervia"
              className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-pine-light hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-lg mb-2 text-pine-dark group-hover:text-pine-dark/80">
                Cosa Fare a Pinarella
              </h4>
              <p className="text-gray-600">
                Guida completa alle attività e attrazioni della zona
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PinarellaSummerFestival;
