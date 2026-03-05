import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useAccommodation } from "@/contexts/AccommodationContext";

const Footer = ({ className }: { className?: string }) => {
  const location = useLocation();
  const { accommodation } = useAccommodation();

  const getBasePath = () => {
    if (location.pathname.startsWith("/pineta8")) return "/pineta8";
    if (location.pathname.startsWith("/pineta3")) return "/pineta3";
    return "/pineta3";
  };

  const basePath = getBasePath();

  return (
    <footer
      className={cn(
        "bg-gradient-to-br from-pine-dark via-pine-dark to-sea-dark text-white mt-auto",
        className,
      )}
    >
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-2">
          {/* Colonna 1: Brand e Contatti */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/optimized/logo.nobg-320.avif"
                />
                <source
                  type="image/webp"
                  srcSet="/images/optimized/logo.nobg-320.webp"
                />
                <img
                  src="/images/logo.nobg.png"
                  alt="Immerso nella Pineta"
                  loading="lazy"
                  className="h-8 w-auto object-contain"
                />
              </picture>
              <span className="font-serif text-lg font-semibold tracking-tight">
                Immerso nella Pineta
              </span>
            </div>
            <p className="text-white/80 mb-4 text-sm leading-relaxed">
              Appartamenti a Pinarella di Cervia, a 5 minuti dal mare e immersi
              nella pineta.
            </p>

            {/* Contatti */}
            <div className="space-y-2 mb-4">
              <a
                href="tel:+393938932793"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm group"
              >
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>+39 393 893 2793</span>
              </a>
              <a
                href="mailto:zavattaelia@gmail.com"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>zavattaelia@gmail.com</span>
              </a>
              <a
                href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm group"
              >
                <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Via Vallombrosa 10, Cervia (Apri su Google Maps)</span>
              </a>
            </div>

            {/* <p className="text-xs text-white/60 mt-4">
              CIN: {accommodation.cin}
            </p> */}
          </div>

          {/* Colonna 2: I Nostri Alloggi */}
          <div className="md:col-span-1">
            <h3 className="font-serif font-semibold text-base mb-4 text-white">
              I Nostri Alloggi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/pineta3"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Pineta 3 - Piano Terra
                </Link>
              </li>
              <li>
                <Link
                  to="/pineta8"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Pineta 8 - Secondo Piano
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Confronta gli alloggi
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Collegamenti Utili */}
          <div className="md:col-span-1">
            <h3 className="font-serif font-semibold text-base mb-4 text-white">
              Collegamenti Utili
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={`${basePath}/gallery`}
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Galleria Foto
                </Link>
              </li>
              <li>
                <Link
                  to="/attractions"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Attrazioni Locali
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Blog e Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Domande Frequenti
                </Link>
              </li>
              <li>
                <Link
                  to="/chi-siamo"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 4: Info e Prenota */}
          <div className="md:col-span-1">
            <h3 className="font-serif font-semibold text-base mb-4 text-white">
              Prenota il Tuo Soggiorno
            </h3>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Affitto diretto senza commissioni. Contattaci per disponibilità e
              offerte.
            </p>
            <Link
              to={`${basePath}/book`}
              className="inline-flex items-center gap-2 bg-white text-pine-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Prenota Ora
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} Immerso nella Pineta. Tutti i diritti
              riservati. Sito sviluppato da{" "}
              <a
                href="https://eliazavatta.it/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors underline"
              >
                Elia Zavatta
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
