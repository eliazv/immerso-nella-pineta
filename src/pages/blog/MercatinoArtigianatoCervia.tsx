import React from "react";
import { Link } from "react-router-dom";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getCanonicalUrl } from "@/lib/config";
import {
  MapPin,
  Clock,
  Heart,
} from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mercatino dell'Artigianato a Cervia e Pinarella | Guida 2026",
  description:
    "Scopri il Mercatino dell'Artigianato di Cervia e Pinarella: date, orari, prodotti artigianali, ceramiche, gioielli e creazioni uniche. Tutto quello che devi sapere per visitarlo.",
  image:
    "https://images.unsplash.com/photo-1555529669-2269763671c0?w=1200&q=80",
  datePublished: "2026-02-04",
  dateModified: "2026-02-04",
  author: {
    "@type": "Person",
    name: "Elia Zavatta",
  },
  publisher: {
    "@type": "Organization",
    name: "Immerso nella Pineta",
    url: "https://immersonellapineta.it",
  },
};

const MercatinoArtigianatoCervia = () => {
  return (
    <BlogPostLayout
      title="Mercatino dell'Artigianato a Cervia e Pinarella | Guida 2026"
      description="Scopri il Mercatino dell'Artigianato di Cervia e Pinarella: date, orari, prodotti artigianali, ceramiche, gioielli e creazioni uniche. Tutto quello che devi sapere per visitarlo."
      heroImage="https://images.unsplash.com/photo-1555529669-2269763671c0?w=1200&q=80"
      publishDate="4 Febbraio 2026"
      readingTime="6 min di lettura"
      category="Shopping"
      canonicalUrl={getCanonicalUrl("/blog/mercatino-artigianato-cervia")}
      keywords="mercatino artigianato cervia, mercatino pinarella, artigianato locale cervia, mercatini estivi romagna, prodotti artigianali cervia"
      jsonLd={jsonLd}
    >
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-l-4 border-amber-500 mb-8">
        <p className="text-lg font-semibold text-amber-900 mb-2 flex items-center gap-2">
          <Heart className="h-6 w-6" />
          Artigianato Locale
        </p>
        <p className="text-gray-700 m-0">
          I mercatini dell'artigianato di Cervia e Pinarella sono
          un'occasione imperdibile per scoprire le creazioni di artisti e
          artigiani locali: ceramiche, gioielli, oggetti in legno, tessuti e
          molto altro, tutto realizzato a mano con passione.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        I Mercatini dell'Artigianato
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Durante la stagione estiva, i{" "}
        <strong>Mercatini dell'Artigianato</strong> animano le piazze e i
        lungomare di Cervia, Pinarella, Milano Marittima e delle altre
        frazioni. Questi eventi rappresentano un'opportunità unica per
        entrare in contatto con l'artigianato locale, acquistare prodotti
        autentici e originali e conoscere direttamente gli artisti che li
        creano.
      </p>
      <p className="text-gray-700 leading-relaxed mb-6">
        I mercatini si svolgono principalmente nelle serate estive, creando
        un'atmosfera vivace e colorata perfetta per una passeggiata dopo
        cena. Oltre agli stand di artigianato, spesso trovi anche bancarelle
        con prodotti enogastronomici locali e vintage.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Quando e Dove Trovarli
      </h2>
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md mb-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Pinarella di Cervia
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Piazza Zara - ogni martedì sera (giugno-agosto)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>
                  Lungomare G. Deledda - giovedì sera (luglio-agosto)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Orario: 19:00 - 24:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Cervia Centro
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>
                  Piazza Garibaldi - mercoledì sera (giugno-agosto)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Porto Canale - venerdì sera (luglio-agosto)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Orario: 19:30 - 24:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3 text-pine-dark flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Milano Marittima
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>
                  Viale 2 Giugno (Rotonda 1° Maggio) - ogni lunedì sera
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pine-dark font-bold">•</span>
                <span>Periodo: giugno-settembre</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Cosa Puoi Trovare
      </h2>
      <div className="space-y-6 mb-8">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-rose-900">
            Gioielli e Bijoux
          </h3>
          <p className="text-gray-700 m-0">
            Collane, bracciali, orecchini e anelli realizzati a mano con
            materiali naturali, pietre dure, argento e perline. Ogni pezzo è
            unico e originale, perfetto per un regalo speciale o per te
            stesso.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-orange-900">
            Ceramiche e Terracotte
          </h3>
          <p className="text-gray-700 m-0">
            Piatti decorativi, vasi, ciotole e oggetti per la casa
            realizzati da ceramisti della Romagna. Le decorazioni richiamano
            spesso i colori e i motivi del mare e della tradizione locale.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-green-900">
            Oggetti in Legno
          </h3>
          <p className="text-gray-700 m-0">
            Taglieri, cornici, sculture e giocattoli in legno naturale
            lavorato a mano. Gli artigiani del legno creano pezzi funzionali
            e decorativi che portano il calore e l'autenticità del materiale
            naturale.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-blue-900">
            Tessuti e Accessori
          </h3>
          <p className="text-gray-700 m-0">
            Borse, sciarpe, cappelli e abbigliamento artigianale in tessuti
            naturali. Molti artigiani propongono anche lavori all'uncinetto,
            ricami e patchwork.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-3 text-purple-900">
            Arte e Decorazioni
          </h3>
          <p className="text-gray-700 m-0">
            Dipinti, stampe, fotografie d'autore e decorazioni per la casa.
            Artisti locali espongono le loro opere ispirate al mare, alla
            natura e alla vita romagnola.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Consigli per Visitare i Mercatini
      </h2>
      <div className="bg-sea-light/30 p-6 rounded-xl border-2 border-sea-light mb-8">
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <strong>Contanti:</strong> La maggior parte degli artigiani
              accetta solo contanti, quindi porta con te del denaro. Alcuni
              stand dispongono di POS, ma non tutti.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🕐</span>
            <div>
              <strong>Orario migliore:</strong> Arriva verso le 20:00-20:30
              per evitare la calca e goderti una passeggiata rilassante tra
              gli stand.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">👶</span>
            <div>
              <strong>Con bambini:</strong> I mercatini sono
              family-friendly. Molti artigiani offrono anche piccoli
              laboratori creativi per i bambini.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <strong>Regali unici:</strong> I mercatini sono perfetti per
              trovare regali originali e autentici da portare a casa come
              ricordo delle vacanze.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <strong>Interagisci con gli artigiani:</strong> Non esitare a
              fare domande e conoscere le storie dietro ogni creazione. Gli
              artigiani sono sempre felici di condividere la loro passione.
            </div>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Mercatini Speciali e Eventi
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Oltre ai mercatini settimanali, durante l'estate si svolgono anche{" "}
        <strong>mercatini speciali tematici</strong>:
      </p>
      <ul className="space-y-3 text-gray-700 mb-8">
        <li className="flex items-start gap-2">
          <span className="text-pine-dark font-bold">•</span>
          <span>
            <strong>Mercatino del Vintage</strong> - fine giugno:
            abbigliamento, accessori e oggetti d'epoca
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-pine-dark font-bold">•</span>
          <span>
            <strong>Notte Bianca dell'Artigianato</strong> - metà luglio:
            mercatini aperti fino all'alba con musica e intrattenimento
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-pine-dark font-bold">•</span>
          <span>
            <strong>Mercatino di Ferragosto</strong> - 15 agosto: edizione
            speciale con oltre 100 espositori
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-pine-dark font-bold">•</span>
          <span>
            <strong>Mercatino di Fine Estate</strong> - fine agosto:
            chiusura della stagione con sconti e promozioni
          </span>
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Soggiornare a Pinarella
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Se vuoi visitare i mercatini dell'artigianato con calma e senza
        fretta, soggiorna a<strong> Pinarella</strong>. La posizione
        strategica ti permette di raggiungere a piedi i mercatini locali e,
        con pochi minuti in bicicletta, anche quelli di Cervia e Milano
        Marittima.
      </p>
      <p className="text-gray-700 leading-relaxed mb-8">
        Il nostro appartamento offre <strong>parcheggio privato</strong>{" "}
        (utile se decidi di visitare mercatini più lontani),{" "}
        <strong>4 posti letto</strong> per famiglie e un
        <strong> giardino</strong> dove rilassarti dopo le passeggiate
        serali.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
        Informazioni Utili
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Info e calendario aggiornato:</strong>{" "}
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
          <strong>Prezzi:</strong> I prezzi dei prodotti artigianali
          variano a seconda della complessità e dei materiali, ma sono
          generalmente accessibili. Aspettati di spendere da 10€ per piccoli
          oggetti fino a 100€+ per pezzi più elaborati.
        </p>
        <p>
          <strong>Parcheggio:</strong> Nelle vicinanze dei mercatini sono
          disponibili parcheggi pubblici. Ti consigliamo di arrivare in
          bicicletta se possibile, soprattutto nei fine settimana più
          affollati.
        </p>
        <p>
          <strong>Condizioni meteo:</strong> I mercatini all'aperto
          potrebbero essere annullati in caso di maltempo. Verifica sempre
          prima di uscire.
        </p>
      </div>

      <div className="bg-slate-100 p-8 rounded-2xl my-8 not-prose">
        <h3 className="text-xl font-bold text-pine-900 mb-4">Altre guide su Pinarella</h3>
        <ul className="space-y-2">
          <li><Link to="/blog/mercato-serale-pinarella" className="text-pine-600 hover:underline font-medium">→ Mercato serale di Pinarella: cosa comprare</Link></li>
          <li><Link to="/blog/eventi-pinarella-cervia" className="text-pine-600 hover:underline font-medium">→ Tutti gli eventi estivi a Pinarella</Link></li>
          <li><Link to="/blog/cosa-fare-pinarella-cervia" className="text-pine-600 hover:underline font-medium">→ Cosa fare a Pinarella: guida completa</Link></li>
        </ul>
      </div>
    </BlogPostLayout>
  );
};

export default MercatinoArtigianatoCervia;
