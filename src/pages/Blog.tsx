import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import BreadcrumbSEO from "@/components/BreadcrumbSEO";
import { Calendar, MapPin, Utensils, ArrowRight, Palmtree } from "lucide-react";
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
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Pinarella - Guida Vacanze Cervia",
    description:
      "Guide, consigli e informazioni utili per le tue vacanze a Pinarella di Cervia: attrazioni, ristoranti, eventi e molto altro.",
    url: "https://immerso-nella-pineta.vercel.app/blog",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://immerso-nella-pineta.vercel.app/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <MetaTags
        title="Blog Pinarella | Guide e Consigli per Vacanze a Cervia"
        description="Scopri guide, consigli e informazioni utili per le tue vacanze a Pinarella di Cervia: cosa fare, dove mangiare, come arrivare e eventi da non perdere."
        keywords="blog pinarella, guida pinarella cervia, cosa fare pinarella, ristoranti pinarella, eventi cervia, vacanze romagna"
        canonical="https://immerso-nella-pineta.vercel.app/blog"
      />
      <BreadcrumbSEO
        items={[
          { name: "Home", url: "https://immerso-nella-pineta.vercel.app" },
          { name: "Blog", url: "https://immerso-nella-pineta.vercel.app/blog" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

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
            Guide complete, consigli pratici e informazioni utili per vivere al
            meglio la tua vacanza a Pinarella di Cervia
          </p>
        </div>

        {/* Blog Cards con Immagini */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {blogPosts.map((post, index) => (
            <Link key={index} to={`/blog/${post.slug}`} className="group block">
              <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-pine-light">
                {/* Immagine */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    <post.icon className="w-6 h-6 text-pine-dark" />
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-pine-dark mb-2 group-hover:text-pine-dark/80 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-pine-dark font-semibold group-hover:gap-3 gap-2 transition-all">
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
