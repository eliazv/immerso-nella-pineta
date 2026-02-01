import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Toilet,
  Bath,
  CookingPot,
  DoorOpen,
  WashingMachine,
  Copy,
  PencilRuler,
  Heart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import PhotoGallery from "@/components/PhotoGallery";
import EssentialInfo from "@/components/EssentialInfo";
import MetaTags from "@/components/MetaTags";
import SEOSchema from "@/components/SEOSchema";
import AdvancedSEOSchema from "@/components/AdvancedSEOSchema";
import FAQ from "@/components/FAQ";
import { useAccommodation } from "@/contexts/AccommodationContext";
import { CONTACT_INFO } from "@/lib/contactConfig";

const Index = () => {
  const { accommodation } = useAccommodation();
  const location = useLocation();

  const getBasePath = () => {
    return location.pathname.split("/")[1] === "pineta8"
      ? "/pineta8"
      : "/pineta3";
  };

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
      <AdvancedSEOSchema
        accommodationType={
          location.pathname.includes("pineta8") ? "pineta8" : "pineta3"
        }
      />
      <MetaTags
        title={accommodation.metaTags.title}
        description={accommodation.metaTags.description}
        keywords={accommodation.metaTags.keywords}
        canonicalUrl={getBasePath()}
      />

      <Header />
      <WhatsAppFloating
        phoneNumber={CONTACT_INFO.phone}
        message={CONTACT_INFO.whatsappMessage}
      />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={accommodation.heroImage}
            alt="Appartamento prenotazione diretta Pinarella di Cervia - affitto senza intermediari vicino al mare e pineta"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </div>

        {/* Rating in bottom right */}
        <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
              <div className="relative">
                <Star className="h-4 w-4 text-gray-300 fill-current" />
                <Star
                  className="h-4 w-4 text-yellow-400 fill-current absolute top-0 left-0"
                  style={{
                    clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                  }}
                />
              </div>
            </div>
            <span className="text-white text-sm font-medium">
              {accommodation.rating.airbnb}
            </span>
          </div>
        </div>

        <div className="container px-4 mx-auto relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-white mb-4 drop-shadow-md">
            {accommodation.heroTitle}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            {accommodation.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative inline-block">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-pine-dark/50 backdrop-blur-md border border-pine-light/70 text-white hover:bg-pine-dark/30 hover:text-white"
              >
                <Link to={`${getBasePath()}/gallery`}>Scopri l'alloggio</Link>
              </Button>
            </div>
            <div className="relative inline-block">
              <span className="absolute -top-3 left-1/2 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white shadow-lg animate-pulse z-10 whitespace-nowrap">
                -20% vs Booking/Airbnb
              </span>
              <Button
                size="lg"
                asChild
                className="bg-sea-dark hover:bg-sea-dark/90"
              >
                {/* <Link to="/rules">Regole e Istruzioni</Link> */}
                <Link
                  to={`${getBasePath()}/book`}
                  className="flex items-center gap-2"
                >
                  Prenota ora
                </Link>
                {/* <Link to="/gallery">Esplora la casa</Link> */}
              </Button>
            </div>
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
                    src={accommodation.welcomeImage}
                    alt="Soggiorno appartamento prenotazione diretta Pinarella di Cervia - casa vacanze senza commissioni"
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
                {accommodation.welcomeTitle}
              </h2>

              <p className="text-muted-foreground mb-6">
                {accommodation.welcomeDescription}{" "}
                <Link
                  to="/pinarella-guida"
                  className="text-pine-dark underline hover:text-pine-dark/80 transition-colors"
                >
                  Scopri tutto su Pinarella di Cervia
                </Link>{" "}
                nella nostra guida completa.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start">
                  <Bed className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      {accommodation.features.guests}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {accommodation.features.beds}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="text-pine-dark h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      {accommodation.features.parking}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {accommodation.features.parkingNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="text-pink-600 h-6 w-6 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      {accommodation.features.petsAllowed}
                    </h3>
                  </div>
                </div>
              </div>

              <Button asChild>
                <Link to={`${getBasePath()}/book`}>
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
              <House className="h-4 w-4" />
              <span>Lo spazio</span>
            </div>
            <h2 className="font-serif text-3xl font-medium mb-4">
              Comfort, privacy e natura
            </h2>
            <p className="text-muted-foreground text-base mb-2">
              Vivi la tua vacanza in un ambiente sereno e a contatto con al
              natura. L’appartamento è pensato per offrire relax e praticità a
              famiglie e coppie, con spazi funzionali e dettagli curati.
            </p>
            {/* Dotazioni principali ora nelle cards */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-border scroll-reveal flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 mb-4 rounded-full bg-sea-light flex items-center justify-center">
                <Bed className="h-6 w-6 text-sea-dark" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Camera accogliente</h3>
              <ul className="flex flex-col gap-1 items-center mt-2">
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <Bed className="h-4 w-4" />4 posti letto
                </li>
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <Copy className="h-4 w-4" />
                  Biancheria inclusa
                </li>
              </ul>
            </div>
            <div
              className="bg-white p-6 rounded-xl border border-border scroll-reveal flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-sea-light flex items-center justify-center">
                <House className="h-6 w-6 text-sea-dark" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Soggiorno &amp; Cucina
              </h3>
              <ul className="flex flex-col gap-1 items-center mt-2">
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <CookingPot className="h-4 w-4" />
                  Cucina attrezzata
                </li>
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <DoorOpen className="h-4 w-4" />
                  Accesso autonomo
                </li>
              </ul>
            </div>
            <div
              className="bg-white p-6 rounded-xl border border-border scroll-reveal flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-sea-light flex items-center justify-center">
                <ShowerHead className="h-6 w-6 text-sea-dark" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Bagno moderno</h3>
              <ul className="flex flex-col gap-1 items-center mt-2">
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <ShowerHead className="h-4 w-4" />
                  Bagno completo
                </li>
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <WashingMachine className="h-4 w-4" />
                  Lavatrice
                </li>
              </ul>
            </div>
            <div
              className="bg-white p-6 rounded-xl border border-border scroll-reveal flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <TreePine className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Spazi esterni</h3>
              <ul className="flex flex-col gap-1 items-center mt-2">
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <TreePine className="h-4 w-4" />
                  Giardino condiviso
                </li>
                <li className="flex items-center gap-1 text-pine-dark text-xs font-medium">
                  <Car className="h-4 w-4" />
                  Parcheggio
                </li>
              </ul>
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
                src={accommodation.galleryImages.soggiorno}
                alt="Soggiorno luminoso appartamento prenotazione diretta Pinarella di Cervia - affitto senza intermediari"
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
                src={accommodation.galleryImages.camera}
                alt="Camera da letto appartamento 4 posti letto Pinarella di Cervia - prenotazione diretta contatta proprietario"
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
                src={accommodation.galleryImages.esterno}
                alt="Cortile esterno con zona pranzo appartamento Pinarella - casa vacanze prenotazione diretta Cervia"
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
              <Link to={`${getBasePath()}/gallery`}>
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
              <PencilRuler className="h-4 w-4" />
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
                <Link to={`${getBasePath()}/rules`}>
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
                <Link to={`${getBasePath()}/attractions`}>
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
                    alt="Lungomare Pinarella di Cervia - appartamento 200m dal mare prenotazione diretta senza commissioni"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-sea-light rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="scroll-reveal">
            <FAQ />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920&auto=format&fit=crop"
            alt="Mare di Pinarella - vacanze appartamento prenotazione diretta Cervia senza intermediari"
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
              <Link to={`${getBasePath()}/book`}>Verifica disponibilità</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
