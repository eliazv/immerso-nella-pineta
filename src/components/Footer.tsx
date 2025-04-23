import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, TreePine, Waves } from "lucide-react";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("border-t border-border mt-16", className)}>
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex items-center">
                <TreePine className="text-pine-dark h-6 w-6" />
                <Waves className="text-sea-dark h-6 w-6 absolute left-3" />
              </div>
              <span className="font-serif text-lg font-semibold tracking-tight">
                Immerso nella Pineta
              </span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Appartamento a Cervia, Italia.
              <br />A 5 minuti a piedi dal mare di Pinarella.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://maps.app.goo.gl/GjWrURBihH8ktaN77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pine-dark transition-colors"
                aria-label="Visualizza su Google Maps"
              >
                <MapPin className="h-5 w-5" />
              </a>
              <a
                href="tel:+393938932793"
                className="text-muted-foreground hover:text-pine-dark transition-colors"
                aria-label="Chiama"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="mailto:zavattaelia@gmail.com"
                className="text-muted-foreground hover:text-pine-dark transition-colors"
                aria-label="Invia email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              CIN: IT039007C2RWYMLE52
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="font-serif font-medium text-base mb-4">
              Collegamenti rapidi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-pine-dark transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-muted-foreground hover:text-pine-dark transition-colors text-sm"
                >
                  Galleria foto
                </Link>
              </li>
              <li>
                <Link
                  to="/attractions"
                  className="text-muted-foreground hover:text-pine-dark transition-colors text-sm"
                >
                  Attrazioni
                </Link>
              </li>
              <li>
                <Link
                  to="/rules"
                  className="text-muted-foreground hover:text-pine-dark transition-colors text-sm"
                >
                  Regole della casa
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className="text-muted-foreground hover:text-pine-dark transition-colors text-sm"
                >
                  Prenota ora
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="font-serif font-medium text-base mb-4">
              Informazioni
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Cervia, una pittoresca città costiera sulla Riviera Romagnola,
              offre una perfetta combinazione di spiagge dorate, pinete
              rigogliose e una ricca tradizione culinaria.
            </p>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Immerso nella Pineta. Sito web
              sviluppato da{" "}
              <a
                href="https://portfolio-elia.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-pine-dark transition-colors"
              >
                Elia Zavatta
              </a>
              . Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
