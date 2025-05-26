import React, { useEffect } from "react";
import { MapPin, Waves } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";

const Gallery = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags
        title="Galleria Foto Appartamento Pinarella di Cervia | Immerso nella Pineta"
        description="Scopri il nostro appartamento a Pinarella di Cervia attraverso la galleria fotografica. Esplora gli spazi interni ed esterni vicino alla pineta e al mare."
        canonicalUrl="/gallery"
        keywords="foto appartamento pinarella, foto alloggio cervia, immagini casa vacanze pinarella, galleria appartamento cervia"
      />
      <SEOSchema />
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center animate-page-in">
              <div className="inline-flex items-center gap-2 bg-sea-light text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <Waves className="h-4 w-4" />
                <span>Galleria</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Esplora il nostro appartamento
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Scopri tutti gli spazi del nostro accogliente alloggio a Cervia,
                a pochi passi dalla pineta e dal mare.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pb-20">
          <div className="container px-4 mx-auto">
            <PhotoGallery className="animate-scale-in" />

            <div className="mt-16 text-center animate-fade-in">
              <h2 className="font-serif text-2xl font-medium mb-4">
                La nostra posizione
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                L'appartamento si trova in una posizione ideale, in Via
                Vallombrosa 10, a soli 200 metri dalla pineta e a 5 minuti a
                piedi dalle splendide spiagge di Pinarella di Cervia.
              </p>
              <section className="pb-20">
                <div className="container px-4 mx-auto">
                  <div className="max-w-4xl mx-auto">
                    <div className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md border border-border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2855.5175857991725!2d12.336976126126825!3d44.26143457117975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cb6ec48c3e64f%3A0xe2e57ac4f1dda518!2sVia%20Vallombrosa%2C%2010%2C%2048015%20Cervia%20RA!5e0!3m2!1sit!2sit!4v1712597348639!5m2!1sit!2sit"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mappa dell'appartamento"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <a
                        href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm inline-flex items-center"
                      >
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        Via Vallombrosa 10, Pinarella di Cervia (RA)
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
