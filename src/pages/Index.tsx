import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TreePine,
  Waves,
  Bed,
  Car,
  ShowerHead,
  ChevronRight,
  MapPin,
  Calendar,
  Utensils,
  Aperture,
  House,
  CookingPot,
  DoorOpen,
  WashingMachine,
  Copy,
  PencilRuler,
  Heart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
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
      <section className="relative min-h-[90vh] md:h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={accommodation.heroImage}
            alt="Appartamento prenotazione diretta Pinarella di Cervia - affitto senza intermediari vicino al mare e pineta"
            className="object-cover w-full h-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Badge località e rating - Desktop solo: in BASSO a destra */}
        <div className="hidden md:flex absolute bottom-20 md:bottom-14 right-4 md:right-8 z-20 flex-col items-end gap-3">
          {/* Badge località */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg border border-white/25 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl">
            <MapPin className="h-4 w-4" />
            <span>Pinarella di Cervia</span>
          </div>

          {/* Badge rating */}
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-lg border border-amber-400/30 px-4 py-2.5 rounded-full shadow-xl">
            <div className="flex items-center gap-0.5">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 text-white"
                  fill="currentColor"
                  stroke="none"
                />
              ))}
              <div className="relative">
                <Star
                  className="h-3.5 w-3.5 text-white/40"
                  fill="currentColor"
                  stroke="none"
                />
                <Star
                  className="h-3.5 w-3.5 text-white absolute top-0 left-0"
                  style={{
                    clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                  }}
                  fill="currentColor"
                  stroke="none"
                />
              </div>
            </div>
            <span className="text-white text-sm font-bold">
              {accommodation.rating.airbnb}
            </span>
          </div>
        </div>

        <div className="container px-4 mx-auto relative z-10 text-center pt-16 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 drop-shadow-2xl tracking-tight leading-tight px-2">
            {accommodation.name}
          </h1>

          <div className="max-w-3xl mx-auto mb-8 md:mb-12 px-2">
            <p className="text-white text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4 drop-shadow-xl font-light">
              Vacanze al mare in affitto diretto
            </p>
            <p className="text-white/95 text-base sm:text-lg md:text-xl drop-shadow-lg font-medium">
              Nessuna commissione • Contatto diretto • Risparmia il 20%
            </p>
          </div>

          {/* Info Cards - Più compatte e moderne */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-2">
            <div className="group bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-2.5 md:px-5 md:py-3 text-white hover:bg-white/25 hover:border-white/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 md:gap-2.5">
                <div className="bg-white/20 p-1.5 md:p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Bed className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                  {accommodation.features.guests.replace("Fino a ", "")}
                </span>
              </div>
            </div>
            <div className="group bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-2.5 md:px-5 md:py-3 text-white hover:bg-white/25 hover:border-white/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 md:gap-2.5">
                <div className="bg-white/20 p-1.5 md:p-2 rounded-full group-hover:scale-110 transition-transform">
                  <TreePine className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                  Nella pineta
                </span>
              </div>
            </div>
            <div className="group bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-2.5 md:px-5 md:py-3 text-white hover:bg-white/25 hover:border-white/40 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 md:gap-2.5">
                <div className="bg-white/20 p-1.5 md:p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Waves className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                  5 min dal mare
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center mb-8 md:mb-12 px-4">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-gradient-to-r from-white to-gray-100 text-pine-dark hover:from-gray-100 hover:to-white font-bold shadow-2xl text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-full border-2 border-white/50 hover:scale-105 transition-transform"
            >
              <Link to={`${getBasePath()}/book`}>
                <span className="flex items-center gap-2">
                  Prenota ora - Risparmia 20%
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto bg-transparent backdrop-blur-lg border-2 border-white/40 text-white hover:bg-white/15 font-semibold text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              <Link to={`${getBasePath()}/gallery`}>
                <span className="flex items-center gap-2">
                  <Aperture className="h-4 w-4 md:h-5 md:w-5" />
                  Galleria foto
                </span>
              </Link>
            </Button>
          </div>

          {/* Badge località e rating Airbnb - Mobile solo: in fondo alla sezione */}
          <div className="md:hidden flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            {/* Badge località */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg border border-white/25 text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl">
              <MapPin className="h-3.5 w-3.5" />
              <span>Pinarella di Cervia</span>
            </div>

            {/* Badge rating */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-lg border border-amber-400/30 px-4 py-2 rounded-full shadow-xl">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    stroke="none"
                  />
                ))}
                <div className="relative">
                  <Star
                    className="h-3 w-3 text-white/40"
                    fill="currentColor"
                    stroke="none"
                  />
                  <Star
                    className="h-3 w-3 text-white absolute top-0 left-0"
                    style={{
                      clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                    }}
                    fill="currentColor"
                    stroke="none"
                  />
                </div>
              </div>
              <span className="text-white text-xs font-bold">
                {accommodation.rating.airbnb}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section - Più pulita */}
      <section className="py-16 md:py-20 overflow-x-hidden bg-gradient-to-b from-white to-pine-light/20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="scroll-reveal order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pine-light to-sea-light/50 text-pine-dark px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-6 md:mb-8 shadow-sm">
                <TreePine className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Pinarella, Cervia</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6 text-gray-900 leading-tight">
                {accommodation.welcomeTitle}
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                {accommodation.welcomeDescription}
              </p>

              {/* Features compatte */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
                <div className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-pine-light transition-all duration-200">
                  <div className="bg-gradient-to-br from-pine-light to-pine-light/50 p-2.5 md:p-3 rounded-lg shrink-0">
                    <Bed className="text-pine-dark h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                      {accommodation.features.guests}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      {accommodation.features.beds}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-sea-light transition-all duration-200">
                  <div className="bg-gradient-to-br from-sea-light to-sea-light/50 p-2.5 md:p-3 rounded-lg shrink-0">
                    <Car className="text-sea-dark h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                      {accommodation.features.parking}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      Incluso
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-pink-200 transition-all duration-200">
                  <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-2.5 md:p-3 rounded-lg shrink-0">
                    <Heart className="text-pink-600 h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-900">
                      {accommodation.features.petsAllowed}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-200">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 p-2.5 md:p-3 rounded-lg shrink-0">
                    <TreePine className="text-green-600 h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                      Giardino
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      Privato
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="shadow-lg w-full sm:w-auto"
                >
                  <Link to={`${getBasePath()}/book`}>
                    Prenota ora
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link to="/pinarella-guida">
                    Scopri Pinarella
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="scroll-reveal order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={accommodation.welcomeImage}
                    alt="Soggiorno appartamento prenotazione diretta Pinarella di Cervia"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 md:-bottom-8 -right-6 md:-right-8 -z-10 w-full h-full bg-gradient-to-br from-pine-light to-sea-light rounded-2xl opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-pine-light/30 via-white to-pine-light/20">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pine-light to-sea-light/50 text-pine-dark px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <House className="h-4 w-4" />
              <span>Lo spazio</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-gray-900">
              Comfort, privacy e natura
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Vivi la tua vacanza in un ambiente sereno e a contatto con al
              natura. L'appartamento è pensato per offrire relax e praticità a
              famiglie e coppie, con spazi funzionali e dettagli curati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-white p-7 md:p-8 rounded-xl border-2 border-border scroll-reveal flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-sea-light to-sea-light/50 flex items-center justify-center shadow-md">
                <Bed className="h-8 w-8 text-sea-dark" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Camera accogliente
              </h3>
              <ul className="flex flex-col gap-2 items-center mt-2">
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <Bed className="h-5 w-5" />
                  {`${accommodation.features.guestsCount} posti letto`}
                </li>
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <Copy className="h-5 w-5" />
                  Biancheria inclusa
                </li>
              </ul>
            </div>
            <div
              className="bg-white p-7 md:p-8 rounded-xl border-2 border-border scroll-reveal flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center shadow-md">
                <House className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Soggiorno &amp; Cucina
              </h3>
              <ul className="flex flex-col gap-2 items-center mt-2">
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <CookingPot className="h-5 w-5" />
                  Cucina attrezzata
                </li>
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <DoorOpen className="h-5 w-5" />
                  Accesso autonomo
                </li>
              </ul>
            </div>
            <div
              className="bg-white p-7 md:p-8 rounded-xl border-2 border-border scroll-reveal flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-md">
                <ShowerHead className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Bagno moderno
              </h3>
              <ul className="flex flex-col gap-2 items-center mt-2">
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <ShowerHead className="h-5 w-5" />
                  Bagno completo
                </li>
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <WashingMachine className="h-5 w-5" />
                  Lavatrice
                </li>
              </ul>
            </div>
            <div
              className="bg-white p-7 md:p-8 rounded-xl border-2 border-border scroll-reveal flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center shadow-md">
                <TreePine className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-gray-900">
                Spazi esterni
              </h3>
              <ul className="flex flex-col gap-2 items-center mt-2">
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <TreePine className="h-5 w-5" />
                  Giardino condiviso
                </li>
                <li className="flex items-center gap-2 text-pine-dark text-base font-semibold">
                  <Car className="h-5 w-5" />
                  Parcheggio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sea-light to-blue-100 text-sea-dark px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Aperture className="h-4 w-4" />
              <span>Galleria</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-gray-900">
              Dai un'occhiata agli spazi
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
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
                alt={`Camera da letto appartamento ${accommodation.features.guestsCount} posti letto Pinarella di Cervia - prenotazione diretta contatta proprietario`}
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
      <section className="py-20 bg-gradient-to-b from-sea-light/30 via-blue-50/20 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-white text-sea-dark px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-md">
              <PencilRuler className="h-4 w-4" />
              <span>Regole della casa</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-gray-900">
              Informazioni utili
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
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
      <section className="py-20 overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="scroll-reveal">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sea-light to-blue-100 text-sea-dark px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <MapPin className="h-4 w-4" />
                <span>Scopri la zona</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-gray-900">
                Attrazioni e consigli utili
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Scopri i migliori ristoranti di Pinarella, gli eventi locali di
                Cervia, e i suggerimenti per rendere il tuo soggiorno
                nell'appartamento in affitto indimenticabile. Abbiamo raccolto
                per te tutte le informazioni più utili sulla zona di Pinarella
                di Cervia per le tue vacanze al mare.
              </p>

              <div className="flex flex-col gap-5 mb-10">
                <div className="flex items-start bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-sea-light transition-all duration-300 shadow-md hover:shadow-lg">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-xl shrink-0">
                    <Utensils className="text-orange-600 h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg mb-1 text-gray-900">
                      Ristoranti locali
                    </h3>
                    <p className="text-base text-gray-600">
                      I migliori ristoranti e pizzerie della zona
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-sea-light transition-all duration-300 shadow-md hover:shadow-lg">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-xl shrink-0">
                    <Calendar className="text-purple-600 h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg mb-1 text-gray-900">
                      Eventi e attività
                    </h3>
                    <p className="text-base text-gray-600">
                      Cosa fare durante il tuo soggiorno
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="shadow-lg">
                <Link to={`${getBasePath()}/attractions`}>
                  Scopri di più
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="scroll-reveal">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://www.cerviaemilanomarittima.org/wp-content/uploads/2018/09/pinarella_950x551.jpg"
                    alt="Lungomare Pinarella di Cervia - appartamento 200m dal mare prenotazione diretta senza commissioni"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 -z-10 w-full h-full bg-gradient-to-br from-sea-light to-blue-200 rounded-2xl opacity-40" />
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
