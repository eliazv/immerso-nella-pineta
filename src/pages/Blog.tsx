import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import BreadcrumbSEO from "@/components/BreadcrumbSEO";
import { Calendar, MapPin, Utensils, ArrowRight, Palmtree } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      title: "Cosa Fare a Pinarella di Cervia: Guida Completa 2026",
      slug: "cosa-fare-pinarella-cervia",
      excerpt: "Scopri le migliori attività, attrazioni e esperienze da vivere durante la tua vacanza a Pinarella: spiagge, escursioni, eventi e molto altro.",
      date: "2026-02-01",
      icon: Palmtree,
      image: "/placeholder.svg",
    },
    {
      title: "I Migliori Ristoranti a Pinarella e Cervia: Dove Mangiare",
      slug: "migliori-ristoranti-pinarella-cervia",
      excerpt: "Guida gastronomica completa ai ristoranti, trattorie e pizzerie di Pinarella e Cervia. Dalla cucina romagnola ai piatti di pesce fresco.",
      date: "2026-02-01",
      icon: Utensils,
      image: "/placeholder.svg",
    },
    {
      title: "Come Arrivare a Pinarella: Auto, Treno e Aereo",
      slug: "come-arrivare-pinarella",
      excerpt: "Tutte le informazioni su come raggiungere Pinarella di Cervia in auto, treno o aereo. Indicazioni stradali, stazioni e aeroporti più vicini.",
      date: "2026-02-01",
      icon: MapPin,
      image: "/placeholder.svg",
    },
    {
      title: "Eventi e Manifestazioni a Pinarella e Cervia: Calendario 2026",
      slug: "eventi-pinarella-cervia",
      excerpt: "Scopri tutti gli eventi, le sagre, i concerti e le manifestazioni culturali da non perdere durante la tua vacanza in Romagna.",
      date: "2026-02-01",
      icon: Calendar,
      image: "/placeholder.svg",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Pinarella - Guida Vacanze Cervia",
    description: "Guide, consigli e informazioni utili per le tue vacanze a Pinarella di Cervia: attrazioni, ristoranti, eventi e molto altro.",
    url: "https://immersonellapineta.it/blog",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://immersonellapineta.it/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white">
      <MetaTags
        title="Blog Pinarella | Guide e Consigli per Vacanze a Cervia"
        description="Scopri guide, consigli e informazioni utili per le tue vacanze a Pinarella di Cervia: cosa fare, dove mangiare, come arrivare e eventi da non perdere."
        keywords="blog pinarella, guida pinarella cervia, cosa fare pinarella, ristoranti pinarella, eventi cervia, vacanze romagna"
        canonical="https://immersonellapineta.it/blog"
      />
      <BreadcrumbSEO
        items={[
          { name: "Home", url: "https://immersonellapineta.it" },
          { name: "Blog", url: "https://immersonellapineta.it/blog" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pine-800 mb-4">
            Blog Pinarella
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Guide complete, consigli pratici e informazioni utili per vivere al
            meglio la tua vacanza a Pinarella di Cervia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-pine-100 rounded-full">
                    <post.icon className="w-6 h-6 text-pine-600" />
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString("it-IT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <CardTitle className="text-2xl text-pine-800 mb-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full group">
                    Leggi l'articolo
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-pine-50 rounded-lg p-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-pine-800 mb-4">
            Prenota il Tuo Soggiorno a Pinarella
          </h2>
          <p className="text-gray-700 mb-6">
            Dopo aver letto le nostre guide, sei pronto per prenotare la tua
            vacanza? Prenota direttamente e risparmia sulle commissioni!
          </p>
          <Link to="/pineta3/book">
            <Button size="lg" className="bg-pine-600 hover:bg-pine-700">
              Prenota Ora
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
