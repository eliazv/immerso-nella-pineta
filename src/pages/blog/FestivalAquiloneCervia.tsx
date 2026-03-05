import React from "react";
import { Link } from "react-router-dom";
import { getCanonicalUrl } from "@/lib/config";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPostLayout from "@/components/blog/BlogPostLayout";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Festival Internazionale dell'Aquilone a Cervia | Guida Completa 2026",
  description:
    "Scopri tutto sul Festival Internazionale dell'Aquilone di Cervia: date, programma, artisti e come partecipare. Oltre 200 artisti da 50 paesi per celebrare il volo degli aquiloni.",
  image:
    "https://images.unsplash.com/photo-1604076913837-52ab5629fdc9?w=1200&q=80",
  datePublished: "2026-02-03",
  author: { "@type": "Organization", name: "Immerso nella Pineta" },
  publisher: {
    "@type": "Organization",
    name: "Immerso nella Pineta",
    logo: {
      "@type": "ImageObject",
      url: "https://immersonellapineta.it/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://immersonellapineta.it/blog/festival-aquilone-cervia",
  },
};

const FestivalAquiloneCervia = () => {
  return (
    <BlogPostLayout
      title="Festival Internazionale dell'Aquilone a Cervia | Guida Completa 2026"
      description="Scopri tutto sul Festival Internazionale dell'Aquilone di Cervia: date, programma, artisti e come partecipare. Oltre 200 artisti da 50 paesi per celebrare il volo degli aquiloni."
      heroImage="https://images.unsplash.com/photo-1604076913837-52ab5629fdc9?w=1200&q=80"
      publishDate="3 Febbraio 2026"
      readingTime="5 min di lettura"
      category="Eventi"
      canonicalUrl={getCanonicalUrl("/blog/festival-aquilone-cervia")}
      keywords="festival aquilone cervia, aquiloni cervia, eventi cervia, festival internazionale aquiloni, cervia volante, eventi aprile maggio cervia"
      jsonLd={jsonLd}
    >
      {/* Article Info */}
      <div className="flex flex-wrap gap-6 mb-8 text-gray-600 not-prose">
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

      <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl border-l-4 border-sky-500 mb-8">
        <p className="text-lg font-semibold text-sky-900 mb-2 flex items-center gap-2">
          <Users className="h-6 w-6" />
          Evento Imperdibile
        </p>
        <p className="text-gray-700 m-0">
          Ogni anno tra fine aprile e inizio maggio, la spiaggia di Cervia si
          trasforma in un palcoscenico colorato dove oltre 200 artisti
          provenienti da 50 paesi diversi celebrano l'arte del volo degli
          aquiloni.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Cos'è il Festival Internazionale dell'Aquilone
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Il <strong>Festival Internazionale dell'Aquilone di Cervia</strong> è
        uno degli eventi più attesi dell'anno sulla Riviera Romagnola. Nato nel
        1981, questo festival ha acquisito nel tempo una fama internazionale,
        attirando maestri aquilonisti da tutto il mondo e migliaia di visitatori
        ogni anno.
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">
        Per una settimana, il cielo sopra la spiaggia di Cervia diventa una tela
        colorata dove aquiloni di ogni forma e dimensione danzano al vento: da
        quelli tradizionali a forme spettacolari di animali, personaggi
        fantastici e creazioni artistiche uniche.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Date e Programma 2026
      </h2>
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md mb-8 not-prose">
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
      <div className="space-y-6 mb-8 not-prose">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-orange-900">
            Spettacoli di Volo
          </h3>
          <p className="text-gray-700 m-0">
            Ammira gli aquiloni acrobatici pilotati da esperti internazionali,
            aquiloni giganti lunghi decine di metri e coreografie aeree
            sincronizzate con la musica.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-blue-900">
            Workshop e Laboratori
          </h3>
          <p className="text-gray-700 m-0">
            Partecipa ai laboratori per costruire il tuo aquilone, imparare le
            tecniche di volo e scoprire i segreti di questa antica arte.
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
      <div className="bg-sea-light/30 p-6 rounded-xl border-2 border-sea-light mb-8 not-prose">
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <strong>Orario migliore:</strong> Il pomeriggio offre le
              condizioni di vento più favorevoli per ammirare gli spettacoli più
              spettacolari.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <strong>Fotografia:</strong> Porta la tua macchina fotografica! Il
              cielo colorato di aquiloni offre opportunità fotografiche
              incredibili.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">👨‍👩‍👧‍👦</span>
            <div>
              <strong>Per famiglie:</strong> Evento perfetto per bambini. Non
              dimenticare crema solare e cappellini, si sta all'aperto per ore!
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🅿️</span>
            <div>
              <strong>Parcheggio:</strong> Il lungomare può essere affollato.
              Considera di arrivare in bicicletta o a piedi se alloggi nelle
              vicinanze.
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
        potrai raggiungere il festival a piedi o in bicicletta in pochi minuti.
      </p>
      <p className="text-gray-700 leading-relaxed mb-8">
        Il nostro appartamento "Immerso nella Pineta" offre una posizione
        ideale: a 5 minuti dal mare e immerso nel verde della pineta, è perfetto
        per le famiglie che vogliono godersi il festival e allo stesso tempo
        avere un rifugio tranquillo dove rilassarsi.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Informazioni Utili
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          <strong>🌐 Programma Dettagliato:</strong>{" "}
          <a
            href="https://www.vitaromagna.it/eventi/artevento-2026-festival-internazionale-dellaquilone-2510"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pine-dark hover:underline font-bold"
          >
            Artevento 2026 su VitaRomagna
          </a>
        </p>
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
          spiaggia libera di Cervia, facilmente raggiungibile a piedi dal centro
          città e dalle località vicine come Pinarella.
        </p>
        <p>
          <strong>💰 Ingresso:</strong> Gratuito. Alcune attività specifiche o
          workshop potrebbero richiedere un piccolo contributo.
        </p>
        <p>
          <strong>☔ In caso di maltempo:</strong> L'evento dipende dalle
          condizioni meteo. In caso di vento insufficiente o pioggia, alcune
          attività potrebbero essere rimandate.
        </p>
      </div>

      <div className="bg-slate-100 p-8 rounded-2xl my-8 not-prose">
        <h3 className="text-xl font-bold text-pine-900 mb-4">
          Altri eventi a Pinarella
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/blog/eventi-pinarella-cervia"
              className="text-pine-600 hover:underline font-medium"
            >
              → Tutti gli eventi estivi a Pinarella e Cervia
            </Link>
          </li>
          <li>
            <Link
              to="/blog/pinarella-summer-festival"
              className="text-pine-600 hover:underline font-medium"
            >
              → Pinarella Summer Festival
            </Link>
          </li>
          <li>
            <Link
              to="/blog/cosa-fare-pinarella-cervia"
              className="text-pine-600 hover:underline font-medium"
            >
              → Cosa fare a Pinarella: guida completa
            </Link>
          </li>
        </ul>
      </div>
    </BlogPostLayout>
  );
};

export default FestivalAquiloneCervia;
