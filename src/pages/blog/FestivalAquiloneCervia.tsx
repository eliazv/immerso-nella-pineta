import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { ArrowLeft, Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const FestivalAquiloneCervia = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Festival Internazionale dell'Aquilone a Cervia | Guida Completa 2026"
        description="Scopri tutto sul Festival Internazionale dell'Aquilone di Cervia: date, programma, artisti e come partecipare. Oltre 200 artisti da 50 paesi per celebrare il volo degli aquiloni."
        keywords="festival aquilone cervia, aquiloni cervia, eventi cervia, festival internazionale aquiloni, cervia volante, eventi aprile maggio cervia"
        canonicalUrl="https://immerso-nella-pineta.vercel.app/blog/festival-aquilone-cervia"
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
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
            alt="Festival Internazionale dell'Aquilone a Cervia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-sm mb-4">
                <Calendar className="h-4 w-4" />
                <span>Eventi</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Festival Internazionale dell'Aquilone a Cervia
              </h1>
            </div>
          </div>
        </div>

        {/* Article Info */}
        <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Fine aprile - Inizio maggio 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>Cervia, Spiaggia</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>8 min di lettura</span>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl border-l-4 border-sky-500 mb-8">
            <p className="text-lg font-semibold text-sky-900 mb-2 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Evento Imperdibile
            </p>
            <p className="text-gray-700 m-0">
              Ogni anno tra fine aprile e inizio maggio, la spiaggia di Cervia
              si trasforma in un palcoscenico colorato dove oltre 200 artisti
              provenienti da 50 paesi diversi celebrano l'arte del volo degli
              aquiloni.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Cos'è il Festival Internazionale dell'Aquilone
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Il <strong>Festival Internazionale dell'Aquilone di Cervia</strong>{" "}
            è uno degli eventi più attesi dell'anno sulla Riviera Romagnola.
            Nato nel 1981, questo festival ha acquisito nel tempo una fama
            internazionale, attirando maestri aquilonisti da tutto il mondo e
            migliaia di visitatori ogni anno.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Per una settimana, il cielo sopra la spiaggia di Cervia diventa una
            tela colorata dove aquiloni di ogni forma e dimensione danzano al
            vento: da quelli tradizionali a forme spettacolari di animali,
            personaggi fantastici e creazioni artistiche uniche.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Date e Programma 2026
          </h2>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Date
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pine-dark font-bold">•</span>
                    <span>Fine aprile - Inizio maggio 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pine-dark font-bold">•</span>
                    <span>Durata: circa 7-10 giorni</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pine-dark font-bold">•</span>
                    <span>Orari: 10:00 - 19:00</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Dove
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pine-dark font-bold">•</span>
                    <span>Spiaggia di Cervia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pine-dark font-bold">•</span>
                    <span>Lungomare G. Deledda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pine-dark font-bold">•</span>
                    <span>Ingresso libero</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Cosa Vedere al Festival
          </h2>
          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-orange-900">
                Spettacoli di Volo
              </h3>
              <p className="text-gray-700 m-0">
                Ammira gli aquiloni acrobatici pilotati da esperti
                internazionali, aquiloni giganti lunghi decine di metri e
                coreografie aeree sincronizzate con la musica.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-blue-900">
                Workshop e Laboratori
              </h3>
              <p className="text-gray-700 m-0">
                Partecipa ai laboratori per costruire il tuo aquilone, imparare
                le tecniche di volo e scoprire i segreti di questa antica arte.
                Attività perfette per famiglie con bambini.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3 text-purple-900">
                Esposizioni e Mercatini
              </h3>
              <p className="text-gray-700 m-0">
                Visita gli stand con aquiloni artigianali, accessori e prodotti
                tipici. Un'occasione unica per acquistare aquiloni realizzati da
                maestri artigiani.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Consigli Pratici per Visitare il Festival
          </h2>
          <div className="bg-sea-light/30 p-6 rounded-xl border-2 border-sea-light mb-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <strong>Orario migliore:</strong> Il pomeriggio offre le
                  condizioni di vento più favorevoli per ammirare gli spettacoli
                  più spettacolari.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <strong>Fotografia:</strong> Porta la tua macchina
                  fotografica! Il cielo colorato di aquiloni offre opportunità
                  fotografiche incredibili.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                <div>
                  <strong>Per famiglie:</strong> Evento perfetto per bambini.
                  Non dimenticare crema solare e cappellini, si sta all'aperto
                  per ore!
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🅿️</span>
                <div>
                  <strong>Parcheggio:</strong> Il lungomare può essere
                  affollato. Considera di arrivare in bicicletta o a piedi se
                  alloggi nelle vicinanze.
                </div>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Dove Alloggiare Durante il Festival
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Se vuoi vivere al meglio l'esperienza del Festival dell'Aquilone, ti
            consigliamo di soggiornare a <strong>Pinarella</strong>, località a
            pochi passi dalla spiaggia di Cervia dove si svolge l'evento. Da qui
            potrai raggiungere il festival a piedi o in bicicletta in pochi
            minuti.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Il nostro appartamento "Immerso nella Pineta" offre una posizione
            ideale: a 5 minuti dal mare e immerso nel verde della pineta, è
            perfetto per le famiglie che vogliono godersi il festival e allo
            stesso tempo avere un rifugio tranquillo dove rilassarsi.
          </p>

          <div className="bg-gradient-to-r from-pine-dark to-sea-dark text-white p-8 rounded-2xl shadow-2xl text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Prenota per il Festival dell'Aquilone 2026
            </h3>
            <p className="mb-6 text-white/90">
              Assicurati il tuo alloggio a Pinarella per non perdere questo
              evento spettacolare!
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
            Informazioni Utili
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>🌐 Sito ufficiale:</strong>{" "}
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
              <strong>📍 Come arrivare:</strong> Il festival si svolge sulla
              spiaggia libera di Cervia, facilmente raggiungibile a piedi dal
              centro città e dalle località vicine come Pinarella.
            </p>
            <p>
              <strong>💰 Ingresso:</strong> Gratuito. Alcune attività specifiche
              o workshop potrebbero richiedere un piccolo contributo.
            </p>
            <p>
              <strong>☔ In caso di maltempo:</strong> L'evento dipende dalle
              condizioni meteo. In caso di vento insufficiente o pioggia, alcune
              attività potrebbero essere rimandate.
            </p>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Potrebbero interessarti anche
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/blog/pinarella-summer-festival"
              className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-pine-light hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-lg mb-2 text-pine-dark group-hover:text-pine-dark/80">
                Pinarella Summer Festival
              </h4>
              <p className="text-gray-600">
                Scopri gli eventi estivi sul lungomare di Pinarella
              </p>
            </Link>
            <Link
              to="/blog/eventi-pinarella-cervia"
              className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-pine-light hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-lg mb-2 text-pine-dark group-hover:text-pine-dark/80">
                Eventi a Pinarella e Cervia
              </h4>
              <p className="text-gray-600">
                Calendario completo degli eventi 2026
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FestivalAquiloneCervia;
