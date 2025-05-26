import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollText, ChevronRight, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HouseRules from "@/components/HouseRules";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";

const Rules = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags
        title="Regolamento Appartamento Pinarella di Cervia | Immerso nella Pineta"
        description="Informazioni utili e regolamento per il soggiorno nel nostro appartamento a Pinarella di Cervia. Orari, norme sulla raccolta differenziata e indicazioni per gli ospiti."
        canonicalUrl="/rules"
        keywords="regolamento appartamento cervia, norme soggiorno pinarella, orari check-in pinarella, informazioni affitto estivo cervia"
      />
      <SEOSchema />
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-12">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center animate-page-in">
              <div className="inline-flex items-center gap-2 bg-pine-light text-pine-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <ScrollText className="h-4 w-4" />
                <span>Regole e Informazioni</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Tutto ciò che devi sapere
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Informazioni utili e regole della casa per rendere il tuo
                soggiorno piacevole e senza sorprese.
              </p>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto animate-scale-in">
              <HouseRules />
            </div>

            <div className="max-w-3xl mx-auto mt-10 bg-sea-light/30 p-8 rounded-xl border border-sea-light animate-fade-in">
              <h2 className="font-serif text-2xl font-medium mb-4">
                Accessibilità
              </h2>
              <p className="text-muted-foreground mb-6">
                Purtroppo, l'alloggio non è completamente accessibile per
                persone in sedia a rotelle. E' situato interamente al piano
                terra ma l'ingresso principale ha una larghezza di 81 cm, mentre
                le porte interne della camera e del bagno misurano
                rispettivamente 76 cm e 68 cm. Il bagno presenta uno scalino di
                6 cm.
              </p>

              <div className="mt-8 text-center">
                <Button asChild>
                  <Link to="/book">
                    Prenota ora
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/rules/pdf" target="_blank">
                <FileText className="h-4 w-4" />
                <span>Versione stampabile delle regole in PDF</span>
                <Printer className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;
