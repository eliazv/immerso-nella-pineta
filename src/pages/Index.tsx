import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TreePine,
  Waves,
  Bed,
  Car,
  ShowerHead,
  Wifi,
  ChevronRight,
  MapPin,
  Calendar,
  Utensils,
  Aperture,
  House,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import EssentialInfo from "@/components/EssentialInfo";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Scroll animation
    const handleScroll = () => {
      const reveals = document.querySelectorAll(".scroll-reveal");

      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOSchema />
      <MetaTags
        title="Appartamento in Affitto a Pinarella di Cervia | Vacanze Mare 2025"
        description="Affitto appartamento vacanze a Pinarella di Cervia. A 5 minuti dal mare, posto auto privato, 4 posti letto. Prenotazioni aperte. Ideale famiglie."
        keywords="appartamento affitto pinarella cervia, casa vacanze pinarella, affitto estivo cervia, appartamento mare cervia, alloggio pinarella di cervia, vacanze cervia appartamento, affitto breve termine pinarella"
        canonicalUrl="/"
      />

      <Header />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.pinarellavillage.com/images/slider/1.jpg"
            alt="Appartamento in affitto Pinarella di Cervia - Pineta e mare"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </div>

        <div className="container px-4 mx-auto relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-white mb-4 drop-shadow-md">
            Immerso nella Pineta
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Casa vacanze a Cervia - A soli 5 minuti a piedi dal mare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-sea-dark hover:bg-sea-dark/90"
            >
              {/* <Link to="/rules">Regole e Istruzioni</Link> */}
              <Link to="/book">Prenota ora</Link>
              {/* <Link to="/gallery">Esplora la casa</Link> */}
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-pine-dark/50 backdrop-blur-md border border-pine-light/70 text-white hover:bg-pine-dark/30 hover:text-white"
            >
              <Link to="/attractions">Scopri la zona</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 overflow-x-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop"
                    alt="Soggiorno appartamento affitto Pinarella di Cervia"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-pine-light rounded-xl" />
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-pine-light/50 text-pine-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <TreePine className="h-4 w-4" />
                <span>Cervia, Italia</span>
              </div>

              <h2 className="font-serif text-3xl font-medium mb-6">
                Appartamento in affitto per le vostre vacanze
              </h2>

              <p className="text-muted-foreground mb-6">
                Benvenuti nel nostro accogliente appartamento, a soli 200 metri
                dalla splendida pineta e dalle acque del mare di Pinarella.
                Situato al piano terra di una graziosa palazzina immersa nel
                verde, ombreggiata da alti pini, questo è il rifugio perfetto
                per chi cerca relax e comfort durante le vacanze estive.
                Godetevi la pace della zona, a due passi dalla spiaggia, e
                lasciatevi coccolare dalla fresca brezza marina.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex items-start">
                  <Bed className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Fino a 4 ospiti</h3>
                    <p className="text-sm text-muted-foreground">
                      Letto matrimoniale e due letti singoli
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Parcheggio privato</h3>
                    <p className="text-sm text-muted-foreground">
                      Posto auto riservato #3
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link to="/book">
                  Controlla disponibilità
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-pine-light/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-white text-pine-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <Waves className="h-4 w-4" />
              <span>Lo spazio</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-6">
              Tutto ciò di cui avete bisogno
            </h2>
            <p className="text-muted-foreground">
              Appartamento al piano terra di 35 mq con parcheggio riservato,
              accesso autonomo e giardino condiviso. Ideale per famiglie che
              cercano relax vicino al mare in zona tranquilla.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-border scroll-reveal">
              <div className="w-10 h-10 mb-3 rounded-full bg-sea-light flex items-center justify-center">
                <Bed className="h-5 w-5 text-sea-dark" />
              </div>
              <h3 className="font-medium text-base mb-2">Camera</h3>
              <p className="text-muted-foreground text-sm">
                Letto matrimoniale e due singoli con biancheria inclusa
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-xl border border-border scroll-reveal"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-10 h-10 mb-3 rounded-full bg-sea-light flex items-center justify-center">
                <House className="h-5 w-5 text-sea-dark" />
              </div>
              <h3 className="font-medium text-base mb-2">Soggiorno-Cucina</h3>
              <p className="text-muted-foreground text-sm">
                Ambiente luminoso con AC, TV e cucina completamente attrezzata
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-xl border border-border scroll-reveal"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-10 h-10 mb-3 rounded-full bg-sea-light flex items-center justify-center">
                <ShowerHead className="h-5 w-5 text-sea-dark" />
              </div>
              <h3 className="font-medium text-base mb-2">Bagno</h3>
              <p className="text-muted-foreground text-sm">
                Doccia, bidet, lavatrice e set asciugamani per tutti
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl border border-border scroll-reveal"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-10 h-10 mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <TreePine className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium text-base mb-2">Esterni</h3>
              <p className="text-muted-foreground text-sm">
                🚗 Parcheggio • 🔑 Accesso autonomo • 🌳 Giardino condiviso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-sea-light text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <Aperture className="h-4 w-4" />
              <span>Galleria</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-6">
              Dai un'occhiata agli spazi
            </h2>
            <p className="text-muted-foreground">
              Esplora il nostro appartamento in affitto a Pinarella attraverso
              le immagini: camera con letti matrimoniale e singoli, cucina
              attrezzata, bagno con lavatrice e giardino condiviso con area
              riservata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-reveal">
            {/* Soggiorno */}
            <div className="relative overflow-hidden rounded-xl group aspect-[4/3] cursor-pointer">
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/70cdc17b-b1f7-462e-9751-c2071478d2ce.jpeg?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Soggiorno luminoso appartamento a Pinarella di Cervia"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-medium text-lg mb-1">Soggiorno</h3>
                  <p className="text-sm text-white/80">
                    Spazio luminoso e accogliente
                  </p>
                </div>
              </div>
            </div>

            {/* Camera da letto */}
            <div className="relative overflow-hidden rounded-xl group aspect-[4/3] cursor-pointer">
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/45d7a05d-bfcb-403b-86cf-5a43aeeead4d.jpeg?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Camera da letto appartamento in affitto Pinarella di Cervia"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-medium text-lg mb-1">Camera da letto</h3>
                  <p className="text-sm text-white/80">
                    Letto matrimoniale e letti singoli
                  </p>
                </div>
              </div>
            </div>

            {/* Cortile esterno */}
            <div className="relative overflow-hidden rounded-xl group aspect-[4/3] cursor-pointer">
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/1fd1ceeb-47d2-4ce1-a166-18c7147b3709.jpeg?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Cortile esterno con zona pranzo all'aperto appartamento Pinarella"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-medium text-lg mb-1">Cortile esterno</h3>
                  <p className="text-sm text-white/80">
                    Zona pranzo all'aperto
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center scroll-reveal">
            <Button variant="outline" asChild>
              <Link to="/gallery">
                Vedi tutte le foto
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rules Preview */}
      <section className="py-16 bg-sea-light/30">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-white text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
              <TreePine className="h-4 w-4" />
              <span>Regole della casa</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-6">
              Informazioni utili
            </h2>
            <p className="text-muted-foreground">
              Informazioni essenziali per il vostro soggiorno: orari di check-in
              e check-out, contatti diretti e dettagli su parcheggio e accesso
              autonomo al nostro appartamento a Pinarella di Cervia.
            </p>
          </div>

          <div className="max-w-3xl mx-auto scroll-reveal">
            <EssentialInfo />

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link to="/rules">
                  Vedi tutte le informazioni
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Preview Section */}
      <section className="py-20 overflow-x-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-sea-light text-sea-dark px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                <span>Scopri la zona</span>
              </div>

              <h2 className="font-serif text-3xl font-medium mb-6">
                Attrazioni e consigli utili
              </h2>

              <p className="text-muted-foreground mb-6">
                Scopri i migliori ristoranti di Pinarella, gli eventi locali di
                Cervia, e i suggerimenti per rendere il tuo soggiorno
                nell'appartamento in affitto indimenticabile. Abbiamo raccolto
                per te tutte le informazioni più utili sulla zona di Pinarella
                di Cervia per le tue vacanze al mare.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex items-start">
                  <Utensils className="text-sea-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Ristoranti locali</h3>
                    <p className="text-sm text-muted-foreground">
                      I migliori ristoranti e pizzerie della zona
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="text-sea-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Eventi e attività</h3>
                    <p className="text-sm text-muted-foreground">
                      Cosa fare durante il tuo soggiorno
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link to="/attractions">
                  Scopri di più
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="scroll-reveal">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg"
                    alt="Lungomare di Pinarella di Cervia - appartamento vicino al mare"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-sea-light rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920&auto=format&fit=crop"
            alt="Mare di Pinarella - vacanze in appartamento affitto Cervia"
            className="object-cover w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-dark/80 to-sea-dark/80" />
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-white mb-6">
              Prenota ora la tua vacanza a Cervia
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Non perdere l'opportunità di soggiornare nel nostro accogliente
              appartamento in affitto a Pinarella, a pochi passi dal mare e
              immerso nella pineta di Cervia. Casa vacanze perfetta per le tue
              vacanze estive in Emilia Romagna.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-white text-pine-dark hover:bg-white/90"
            >
              <Link to="/book">Verifica disponibilità</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
