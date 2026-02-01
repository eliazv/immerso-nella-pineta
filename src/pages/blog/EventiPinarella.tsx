import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import BreadcrumbSEO from "@/components/BreadcrumbSEO";
import {
  Calendar,
  Music,
  Utensils,
  Sparkles,
  Heart,
  Sunset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const EventiPinarella = () => {
  const events = [
    {
      title: "Concerti Sulla Spiaggia",
      month: "Giugno - Settembre",
      icon: Music,
      description:
        "Ogni settimana concerti gratuiti sulla spiaggia al tramonto. Band locali e artisti nazionali per serate indimenticabili con i piedi nella sabbia.",
    },
    {
      title: "Sagre Gastronomiche",
      month: "Luglio - Agosto",
      icon: Utensils,
      description:
        "Festival del pesce azzurro, sagra della piadina, festa del gelato. Assaggia le specialità romagnole a prezzi popolari in atmosfera di festa.",
    },
    {
      title: "Ferragosto sul Mare",
      month: "15 Agosto",
      icon: Sparkles,
      description:
        "La notte più magica dell'estate con spettacoli pirotecnici sul mare, concerti live e feste sulla spiaggia fino all'alba.",
    },
    {
      title: "Notte Rosa",
      month: "Prima settimana di Luglio",
      icon: Heart,
      description:
        "Il capodanno dell'estate romagnola. Tutta la riviera si colora di rosa con eventi, concerti, street food e animazione fino all'alba.",
    },
    {
      title: "Alba in Pineta",
      month: "Maggio - Settembre",
      icon: Sunset,
      description:
        "Passeggiate guidate all'alba nella Pineta di Cervia con yoga, birdwatching e colazioni biologiche nel verde.",
    },
    {
      title: "Mercatini Notturni",
      month: "Giugno - Agosto",
      icon: Calendar,
      description:
        "Ogni martedì e giovedì sera mercatini dell'artigianato lungo il viale con prodotti locali, vintage e handmade.",
    },
  ];

  const monthlyHighlights = [
    {
      month: "Giugno",
      events:
        "Inizio stagione balneare, primi concerti, apertura mercatini notturni",
    },
    {
      month: "Luglio",
      events:
        "Notte Rosa (prima settimana), concerti settimanali, sagra della piadina",
    },
    {
      month: "Agosto",
      events:
        "Ferragosto con fuochi d'artificio, festival del gelato, eventi sportivi",
    },
    {
      month: "Settembre",
      events:
        "Festival del pesce azzurro, eventi culturali, concerti d'autunno",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Eventi e Manifestazioni a Pinarella e Cervia: Calendario 2026",
    description:
      "Scopri tutti gli eventi, sagre, concerti e manifestazioni a Pinarella e Cervia. Calendario completo 2026 con date e programmi.",
    image: "https://immerso-nella-pineta.vercel.app/images/logo.nobg.png",
    datePublished: "2026-02-01",
    author: {
      "@type": "Person",
      name: "Elia Zavatta",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Eventi Pinarella e Cervia 2026 | Calendario Concerti, Sagre e Manifestazioni"
        description="Scopri tutti gli eventi a Pinarella e Cervia: concerti sulla spiaggia, sagre gastronomiche, Notte Rosa, Ferragosto e mercatini. Calendario completo 2026."
        keywords="eventi pinarella, concerti cervia, notte rosa, ferragosto pinarella, sagre cervia, manifestazioni pinarella 2026"
        canonical="https://immerso-nella-pineta.vercel.app/blog/eventi-pinarella-cervia"
      />
      <BreadcrumbSEO
        items={[
          { name: "Home", url: "https://immerso-nella-pineta.vercel.app" },
          { name: "Blog", url: "https://immerso-nella-pineta.vercel.app/blog" },
          {
            name: "Eventi Pinarella",
            url: "https://immerso-nella-pineta.vercel.app/blog/eventi-pinarella-cervia",
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12">
          <Link
            to="/blog"
            className="text-pine-600 hover:text-pine-700 font-medium mb-4 inline-block"
          >
            ← Torna al Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-pine-800 mb-4">
            Eventi e Manifestazioni a Pinarella e Cervia 2026
          </h1>
          <p className="text-lg text-gray-700">
            Pubblicato il 1 Febbraio 2026 • Tempo di lettura: 5 minuti
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            L'estate a Pinarella e Cervia è un susseguirsi di eventi, concerti,
            sagre e manifestazioni che animano le serate e rendono ogni giorno
            di vacanza speciale. Ecco il calendario completo degli eventi da non
            perdere nel 2026.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Eventi Principali dell'Estate
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            {events.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-pine-100 rounded-full">
                      <event.icon className="w-6 h-6 text-pine-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="font-semibold text-pine-600">
                        {event.month}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Notte Rosa: Il Capodanno dell'Estate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La <strong>Notte Rosa</strong> è l'evento più atteso dell'estate
            romagnola. Si svolge generalmente nella prima settimana di luglio e
            trasforma tutta la riviera in una grande festa che dura fino
            all'alba.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A Pinarella e Cervia troverai:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              Concerti gratuiti sulla spiaggia e nelle piazze
            </li>
            <li className="text-gray-700">
              Installazioni luminose e artistiche lungo il mare
            </li>
            <li className="text-gray-700">
              Street food con specialità romagnole fino a notte fonda
            </li>
            <li className="text-gray-700">
              DJ set e musica dal vivo nei locali
            </li>
            <li className="text-gray-700">
              Spettacoli di fuoco e artisti di strada
            </li>
            <li className="text-gray-700">
              Apertura straordinaria di negozi e attrazioni
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Ferragosto a Pinarella
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Il <strong>15 agosto</strong> è un giorno magico a Pinarella. La
            sera culmina con i tradizionali fuochi d'artificio sul mare,
            visibili da tutta la spiaggia. Il consiglio è di arrivare presto per
            trovare un buon posto sulla sabbia.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Il programma di Ferragosto include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              Pranzo in spiaggia con animazione per bambini
            </li>
            <li className="text-gray-700">
              Tornei sportivi sulla sabbia (beach volley, calcetto)
            </li>
            <li className="text-gray-700">Aperitivi e DJ set dal pomeriggio</li>
            <li className="text-gray-700">
              Cena sotto le stelle nei ristoranti sul mare
            </li>
            <li className="text-gray-700">Spettacolo pirotecnico alle 23:00</li>
            <li className="text-gray-700">Feste e musica fino all'alba</li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Concerti Sulla Spiaggia
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Da giugno a settembre, ogni settimana Pinarella ospita concerti
            gratuiti sulla spiaggia al tramonto. Band locali, tribute band e
            artisti nazionali si esibiscono con i piedi nella sabbia in
            un'atmosfera unica.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            I concerti iniziano solitamente alle 21:00 e si tengono:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">Ogni giovedì sera a Pinarella</li>
            <li className="text-gray-700">Ogni venerdì sera a Cervia</li>
            <li className="text-gray-700">
              Eventi speciali durante Notte Rosa e Ferragosto
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Sagre e Festival Gastronomici
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La Romagna è famosa per le sue sagre, e Pinarella-Cervia non fa
            eccezione:
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Festival del Pesce Azzurro (Settembre)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A fine estate, Cervia celebra il pesce azzurro dell'Adriatico con
            stand gastronomici, cooking show con chef locali e degustazioni di
            sardine, alici e sgombri preparati secondo le ricette tradizionali.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Sagra della Piadina (Luglio)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Un weekend dedicato alla regina della cucina romagnola. Potrai
            vedere come si prepara la vera piadina romagnola e assaggiarla con
            tutti i ripieni tradizionali.
          </p>

          <h3 className="text-2xl font-bold text-pine-700 mt-8 mb-4">
            Festival del Gelato Artigianale (Agosto)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Degustazioni gratuite, laboratori per bambini e la possibilità di
            votare il gelato migliore tra le gelaterie artigianali della zona.
          </p>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Mercatini e Shopping Serale
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Durante l'estate, Pinarella si anima con mercatini notturni:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              <strong>Martedì e Giovedì sera:</strong> Mercatino
              dell'artigianato lungo Viale Cadorna
            </li>
            <li className="text-gray-700">
              <strong>Domenica mattina:</strong> Mercato alimentare con prodotti
              locali
            </li>
            <li className="text-gray-700">
              <strong>Venerdì sera a Cervia:</strong> Mercatino vintage e
              antiquariato
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Calendario per Mese
          </h2>

          <div className="not-prose space-y-4 my-8">
            {monthlyHighlights.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl text-pine-800">
                    {item.month}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{item.events}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Eventi Sportivi
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Per gli sportivi, Pinarella organizza:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              Tornei di beach volley ogni weekend
            </li>
            <li className="text-gray-700">Gare di nuoto in mare aperto</li>
            <li className="text-gray-700">
              Maratone e mezze maratone lungo la costa
            </li>
            <li className="text-gray-700">Bike tour guidati nella pineta</li>
            <li className="text-gray-700">
              Yoga all'alba sulla spiaggia (giugno-settembre)
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-pine-800 mt-12 mb-6">
            Come Rimanere Aggiornato
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Per conoscere il programma dettagliato degli eventi:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-gray-700">
              Sito ufficiale del turismo di Cervia:{" "}
              <strong>www.cerviaturismo.it</strong>
            </li>
            <li className="text-gray-700">
              Pagina Facebook "Pinarella di Cervia" per eventi dell'ultima ora
            </li>
            <li className="text-gray-700">
              Ufficio IAT (informazioni turistiche) in Viale Roma a Cervia
            </li>
            <li className="text-gray-700">
              Manifesti e locandine negli stabilimenti balneari
            </li>
          </ul>

          <div className="not-prose my-8">
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">
                      Consiglio dell'Esperto
                    </h4>
                    <p className="text-amber-800">
                      Se vuoi vivere l'atmosfera più autentica, pianifica la tua
                      vacanza per la prima settimana di luglio (Notte Rosa) o a
                      Ferragosto. Se preferisci più tranquillità ma con eventi
                      comunque interessanti, scegli giugno o la prima metà di
                      settembre.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 bg-pine-50 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <Calendar className="w-8 h-8 text-pine-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-pine-800 mb-3">
                Prenota per gli Eventi Più Belli dell'Estate
              </h3>
              <p className="text-gray-700 mb-6">
                Non perdere Notte Rosa, Ferragosto e tutti gli eventi
                dell'estate a Pinarella! Prenota ora il nostro appartamento con
                prenotazione diretta - risparmia sulle commissioni e goditi le
                migliori serate romagnole.
              </p>
              <Link to="/pineta3/book">
                <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
                  Prenota Ora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default EventiPinarella;
