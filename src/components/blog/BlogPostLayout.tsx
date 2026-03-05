import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaTags from "@/components/MetaTags";
import { ArrowLeft, Calendar, Clock, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  heroImage: string;
  publishDate: string;
  readingTime: string;
  category?: string;
  canonicalUrl: string;
  keywords?: string;
  jsonLd?: any;
}

const BlogPostLayout = ({
  children,
  title,
  description,
  heroImage,
  publishDate,
  readingTime,
  category = "Turismo",
  canonicalUrl,
  keywords,
  jsonLd,
}: BlogPostLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <MetaTags
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        imageUrl={heroImage}
      />
      
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[400px] w-full overflow-hidden shadow-xl">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container px-4 text-center text-white">
              <div className="flex items-center justify-center gap-4 mb-4 text-sm font-medium uppercase tracking-wider text-pine-200">
                <span className="bg-pine-600/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {publishDate}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight drop-shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto -mt-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="bg-white rounded-2xl shadow-xl p-6 md:p-12 lg:w-2/3 border border-slate-100">
              <div className="mb-8">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 text-pine-600 hover:text-pine-700 font-semibold group transition-all"
                >
                  <div className="p-2 bg-pine-50 rounded-full group-hover:bg-pine-100">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                  Torna alla panoramica del blog
                </Link>
              </div>

              <div className="prose prose-lg prose-slate max-w-none prose-headings:text-pine-900 prose-a:text-cyan-600 hover:prose-a:text-cyan-700">
                {children}
              </div>

              {/* Final CTA */}
              <div className="mt-16 bg-gradient-to-br from-pine-900 to-pine-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                   <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[50%] bg-white rounded-full blur-[100px]" />
                   <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-cyan-400 rounded-full blur-[100px]" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
                  Pronto per la tua vacanza a Pinarella?
                </h2>
                <p className="text-pine-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                  Soggiorna nei nostri appartamenti a soli 200 metri dal mare. 
                  Prenota direttamente con noi per il miglior prezzo garantito e zero commissioni.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link to="/pineta3/book">
                    <Button size="lg" className="bg-white text-pine-900 hover:bg-pine-50 font-bold px-10 py-7 text-lg shadow-xl w-full sm:w-auto">
                      Prenota Pineta 3
                    </Button>
                  </Link>
                  <Link to="/pineta8/book">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-7 text-lg w-full sm:w-auto">
                      Prenota Pineta 8
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar / Recommended Posts */}
            <aside className="lg:w-1/3 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 sticky top-28">
                <h3 className="text-xl font-bold text-pine-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-pine-600" />
                  Potrebbe interessarti
                </h3>
                <div className="space-y-6">
                  <Link to="/blog/mare-pinarella-cervia" className="group block">
                    <span className="text-sm text-slate-500 block mb-1">Guida Mare</span>
                    <h4 className="font-bold text-slate-800 group-hover:text-pine-600 transition-colors line-clamp-2">
                      Com'è il mare a Pinarella? Acque basse e Bandiera Blu
                    </h4>
                  </Link>
                  <div className="h-px bg-slate-100" />
                  <Link to="/blog/cosa-fare-pinarella-cervia" className="group block">
                    <span className="text-sm text-slate-500 block mb-1">Attività</span>
                    <h4 className="font-bold text-slate-800 group-hover:text-pine-600 transition-colors line-clamp-2">
                      Cosa fare a Pinarella: 10 attività imperdibili
                    </h4>
                  </Link>
                  <div className="h-px bg-slate-100" />
                  <Link to="/blog/spiagge-libere-stabilimenti-pinarella" className="group block">
                    <span className="text-sm text-slate-500 block mb-1">Spiagge</span>
                    <h4 className="font-bold text-slate-800 group-hover:text-pine-600 transition-colors line-clamp-2">
                      Spiagge libere o stabilimenti? Guida alla scelta
                    </h4>
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="font-bold text-pine-900 mb-4">Hai domande?</h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Contattaci direttamente per informazioni sugli appartamenti e disponibilità.
                  </p>
                  <Link to="/chi-siamo">
                    <Button variant="link" className="p-0 text-pine-600 flex items-center gap-1 font-bold">
                      Scopri chi siamo <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostLayout;
