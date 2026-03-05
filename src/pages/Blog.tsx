import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import MetaTags from "@/components/MetaTags";
import { CONTACT_INFO } from "@/lib/contactConfig";
import { getSiteUrl, getCanonicalUrl } from "@/lib/config";
import {
  Calendar,
  MapPin,
  Utensils,
  ArrowRight,
  Palmtree,
  Music,
  ShoppingBag,
  Wind,
  Car,
  Star,
  Megaphone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      title: "Pinarella di Cervia: La Tua Guida Completa",
      slug: "pinarella-guida",
      excerpt:
        "Scopri tutto quello che c'è da sapere su Pinarella di Cervia: dove si trova, attrazioni, ristoranti, come arrivare e consigli per una vacanza perfetta.",
      date: "2026-02-01",
      icon: MapPin,
      image:
        "https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Cosa Fare a Pinarella di Cervia: Guida Completa 2026",
      slug: "cosa-fare-pinarella-cervia",
      excerpt:
        "Scopri le migliori attività, attrazioni e esperienze da vivere durante la tua vacanza a Pinarella: spiagge, escursioni, eventi e molto altro.",
      date: "2026-02-01",
      icon: Palmtree,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "I Migliori Ristoranti a Pinarella e Cervia: Dove Mangiare",
      slug: "migliori-ristoranti-pinarella-cervia",
      excerpt:
        "Guida gastronomica completa ai ristoranti, trattorie e pizzerie di Pinarella e Cervia. Dalla cucina romagnola ai piatti di pesce fresco.",
      date: "2026-02-01",
      icon: Utensils,
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Come Arrivare a Pinarella: Auto, Treno e Aereo",
      slug: "come-arrivare-pinarella",
      excerpt:
        "Tutte le informazioni su come raggiungere Pinarella di Cervia in auto, treno o aereo. Indicazioni stradali, stazioni e aeroporti più vicini.",
      date: "2026-02-01",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Eventi e Manifestazioni a Pinarella e Cervia: Calendario 2026",
      slug: "eventi-pinarella-cervia",
      excerpt:
        "Scopri tutti gli eventi, le sagre, i concerti e le manifestazioni culturali da non perdere durante la tua vacanza in Romagna.",
      date: "2026-02-01",
      icon: Calendar,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Festival Internazionale dell'Aquilone a Cervia",
      slug: "festival-aquilone-cervia",
      excerpt:
        "Oltre 200 artisti da 50 paesi per celebrare il volo degli aquiloni sulla spiaggia di Cervia. Un evento spettacolare tra fine aprile e inizio maggio.",
      date: "2026-02-03",
      icon: Wind,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      color: "from-sky-500 to-blue-500",
    },
    {
      title: "Pinarella Summer Festival: Concerti ed Eventi Estivi",
      slug: "pinarella-summer-festival",
      excerpt:
        "Concerti, spettacoli e animazione serale sul lungomare di Pinarella da giugno ad agosto. Programma completo degli eventi estivi 2026.",
      date: "2026-02-03",
      icon: Music,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Mercatino dell'Artigianato a Cervia e Pinarella",
      slug: "mercatino-artigianato-cervia",
      excerpt:
        "Scopri i mercatini dell'artigianato locale: ceramiche, gioielli, prodotti in legno e creazioni uniche. Date, orari e cosa trovare.",
      date: "2026-02-03",
      icon: ShoppingBag,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Cosa c'è di Bello a Pinarella di Cervia? Le Bellezze",
      slug: "bellezze-pinarella-cervia",
      excerpt:
        "Scopri cosa rende Pinarella speciale: spiagge dorate, pineta secolare, tramonti mozzafiato, percorsi ciclabili e atmosfera autentica.",
      date: "2026-02-04",
      icon: Palmtree,
      image:
        "https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Come è il Mare a Pinarella di Cervia? Caratteristiche",
      slug: "mare-pinarella-cervia",
      excerpt:
        "Scopri com'è il mare di Pinarella: acque basse e sicure, Bandiera Blu, temperature ideali e fondali perfetti per bambini e famiglie.",
      date: "2026-02-04",
      icon: Wind,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Mercato Serale a Pinarella: Quando c'è? Date e Orari",
      slug: "mercato-serale-pinarella",
      excerpt:
        "Scopri quando c'è il mercato serale a Pinarella: ogni martedì e venerdì dalle 18:00. Guida completa a tutti i mercati della zona.",
      date: "2026-02-04",
      icon: ShoppingBag,
      image: "https://www.viviromagna.it/archivio/eventi/7415/aghi-di-pino.jpg",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Prezzi Appartamenti Pinarella 2026: Quanto Costa Affittare?",
      slug: "prezzi-appartamenti-pinarella-2026",
      excerpt:
        "Guida completa ai prezzi per affittare appartamenti a Pinarella nel 2026. Tabelle dettagliate per periodo, consigli per risparmiare e quando prenotare.",
      date: "2026-02-04",
      icon: Calendar,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Spiagge Libere o Stabilimenti a Pinarella? Cosa Scegliere",
      slug: "spiagge-libere-stabilimenti-pinarella",
      excerpt:
        "Dove sono le spiagge libere gratuite a Pinarella? Quanto costano gli stabilimenti? Confronto completo con mappe, prezzi e consigli pratici.",
      date: "2026-02-04",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Pinarella o Milano Marittima: Dove Andare in Vacanza?",
      slug: "pinarella-o-milano-marittima",
      excerpt:
        "Confronto completo tra Pinarella e Milano Marittima: prezzi, spiagge, vita notturna, servizi. Scopri quale località è perfetta per te.",
      date: "2026-02-04",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Meteo Pinarella: Quando Andare? Guida Clima 2026",
      slug: "meteo-pinarella-quando-andare",
      excerpt:
        "Temperature mese per mese, periodi migliori, cosa portare in valigia. Guida completa al clima di Pinarella per pianificare la vacanza perfetta.",
      date: "2026-02-04",
      icon: Wind,
      image:
        "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Dove Dormire a Pinarella con Bambini: Zone e Consigli",
      slug: "dove-dormire-pinarella-cervia-bambini",
      excerpt:
        "Guida pratica per famiglie: zone migliori, servizi utili, spiagge sicure e checklist per scegliere l'alloggio perfetto a Pinarella.",
      date: "2026-02-05",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Come Arrivare a Pinarella da Bologna: Auto e Treno",
      slug: "come-arrivare-pinarella-da-bologna",
      excerpt:
        "Indicazioni passo-passo da Bologna a Pinarella: pedaggi, tempi reali, treni consigliati e opzioni transfer per famiglie.",
      date: "2026-02-05",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Come Arrivare a Pinarella da Milano: Guida Completa",
      slug: "come-arrivare-pinarella-da-milano",
      excerpt:
        "Tutte le opzioni da Milano a Pinarella: auto, treno con cambio a Bologna e costi medi. Ideale per pianificare il weekend al mare.",
      date: "2026-02-05",
      icon: Car,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Google Business per Freelance in Romagna: Cosa Conta Davvero",
      slug: "google-business-freelance-romagna",
      excerpt:
        "Guida pragmatica per trovare clienti locali: impatto reale dei post, recensioni, vicinanza geografica e profilo completo.",
      date: "2026-02-15",
      icon: MapPin,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Recensioni Google Business per Freelance: Strategia Semplice",
      slug: "recensioni-google-business-freelance",
      excerpt:
        "Workflow pratico per ottenere 8-12 recensioni autentiche in 2-3 mesi e aumentare visibilità locale e conversioni.",
      date: "2026-02-15",
      icon: Star,
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "5 Idee di Post Google Business per Clienti Locali",
      slug: "idee-post-google-business-romagna",
      excerpt:
        "Esempi pronti da copiare per freelance in Romagna: contenuti utili, CTA chiare e frequenza sostenibile.",
      date: "2026-02-15",
      icon: Megaphone,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-violet-500 to-purple-600",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Pinarella - Guida Vacanze Cervia",
    description:
      "Guide, consigli e informazioni utili per le tue vacanze a Pinarella di Cervia: attrazioni, ristoranti, eventi e molto altro.",
    url: getCanonicalUrl("/blog"),
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: getCanonicalUrl(`/blog/${post.slug}`),
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Blog Pinarella | Guide e Consigli per Vacanze a Cervia"
        description="Scopri guide, consigli e informazioni utili per le tue vacanze a Pinarella di Cervia: cosa fare, dove mangiare, come arrivare e eventi da non perdere."
        keywords="blog pinarella, guida pinarella cervia, come arrivare pinarella, google business freelance romagna, recensioni google business, vacanze romagna"
        canonicalUrl={getCanonicalUrl("/blog")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      <main className="flex-1 container mx-auto px-4 py-16 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-pine-dark/10 text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            <span>Guide e Consigli</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-pine-dark mb-4">
            Blog Pinarella
          </h1>
          <p className="text-lg text-gray-600">
            Guide complete, consigli pratici e articoli sulle indicazioni stradali per vivere al
            meglio la tua vacanza a Pinarella di Cervia
          </p>
        </div>

        {/* Blog Cards con Immagini - 3 colonne su desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {blogPosts.map((post, index) => (
            <Link key={index} to={`/blog/${post.slug}`} className="group block">
              <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-pine-light">
                {/* Immagine */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    <post.icon className="w-5 h-5 text-pine-dark" />
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(post.date).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-lg md:text-xl text-pine-dark mb-2 group-hover:text-pine-dark/80 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-pine-dark font-semibold group-hover:gap-3 gap-2 transition-all text-sm">
                    Leggi l'articolo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-pine-dark to-sea-dark rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prenota il Tuo Soggiorno a Pinarella
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Dopo aver letto le nostre guide, sei pronto per prenotare la tua
            vacanza? Prenota direttamente e risparmia sulle commissioni!
          </p>
          <Link to="/pineta3/book">
            <Button
              size="lg"
              className="bg-white text-pine-dark hover:bg-white/90 font-semibold px-8"
            >
              Prenota Ora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
