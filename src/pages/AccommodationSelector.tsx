import React from "react";
import { Link } from "react-router-dom";
import {
  TreePine,
  MapPin,
  ChevronRight,
  Car,
  Bed,
  Wifi,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AccommodationSelector = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MetaTags
        title="Immerso nella Pineta - Appartamenti in Affitto a Pinarella di Cervia"
        description="Scegli il tuo appartamento per le vacanze a Pinarella di Cervia. Due alloggi immersi nella pineta, a 5 minuti dal mare."
        keywords="appartamenti affitto pinarella cervia, casa vacanze pinarella, alloggi cervia, vacanze mare emilia romagna"
        canonicalUrl="/"
      />

      <Header />

      <div
        className="flex-1 flex items-center justify-center px-4 py-24 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.85)), url("https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070")',
        }}
      >
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-pine-dark/10 text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-4 border border-pine-light/50">
              <MapPin className="h-4 w-4" />
              <span>Pinarella di Cervia, Riviera Romagnola</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-pine-dark mb-3 tracking-tight">
              Scegli il tuo alloggio
            </h1>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Due alloggi confortevoli immersi nella pineta, a 5 minuti dal
              mare.
              <span className="block mt-1 text-pine-dark font-semibold">
                Affitto diretto senza commissioni.
              </span>
            </p>
          </div>

          {/* Accommodation Cards - Più compatte */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {/* Pineta 3 */}
            <Link
              to="/pineta3"
              className="group bg-white rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-pine-dark transition-all duration-300 hover:-translate-y-1 block overflow-hidden"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop"
                  alt="Immerso nella Pineta 3 - Appartamento Pinarella"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                {/* Titolo e Prezzo */}
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-pine-dark">Pineta 3</h2>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-700">52€</div>
                    <div className="text-xs text-gray-500">per notte</div>
                  </div>
                </div>

                {/* Sottotitolo */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>Piano terra • Vista giardino</span>
                </div>

                {/* Info compatte */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-700">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-pine-dark" />
                    <span>4 ospiti</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5 text-pine-dark" />
                    <span>2 camere</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-3.5 w-3.5 text-pine-dark" />
                    <span>Parcheggio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3.5 w-3.5 text-pine-dark" />
                    <span>Wi-Fi</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="w-full bg-pine-dark hover:bg-pine-dark/90 text-white rounded-lg py-2 px-4 text-sm text-center font-semibold transition-colors flex items-center justify-center gap-2 mt-3">
                  Scopri di più
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            {/* Pineta 8 */}
            <Link
              to="/pineta8"
              className="group bg-white rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-sea-dark transition-all duration-300 hover:-translate-y-1 block overflow-hidden"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/b4103f6e-2051-49cb-8453-ccfbb53b3df2.jpeg?im_w=480"
                  alt="Immerso nella Pineta 8 - Appartamento Pinarella"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                {/* Titolo e Prezzo */}
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-sea-dark">Pineta 8</h2>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">68€</div>
                    <div className="text-xs text-gray-500">per notte</div>
                  </div>
                </div>

                {/* Sottotitolo */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>Secondo piano • 3 balconi</span>
                </div>

                {/* Info compatte */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-700">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-sea-dark" />
                    <span>6 ospiti</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5 text-sea-dark" />
                    <span>3 camere</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-3.5 w-3.5 text-sea-dark" />
                    <span>Parcheggio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3.5 w-3.5 text-sea-dark" />
                    <span>Wi-Fi</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="w-full bg-sea-dark hover:bg-sea-dark/90 text-white rounded-lg py-2 px-4 text-sm text-center font-semibold transition-colors flex items-center justify-center gap-2 mt-3">
                  Scopri di più
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Info Section - Più compatta */}
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-pine-dark mb-2">
              Affitto diretto, nessuna commissione
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Prenota direttamente con i proprietari e risparmia. Entrambi gli
              appartamenti offrono comfort e servizi completi, immersi nella
              pineta a 200m dal mare.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-pine-light/30 to-pine-light/10 rounded-lg p-4 border border-pine-light/50">
                <TreePine className="h-8 w-8 text-pine-dark mx-auto mb-2" />
                <h4 className="font-semibold text-sm mb-1">Nella pineta</h4>
                <p className="text-xs text-gray-600">
                  Tranquillità e ombra naturale
                </p>
              </div>

              <div className="bg-gradient-to-br from-sea-light/30 to-sea-light/10 rounded-lg p-4 border border-sea-light/50">
                <MapPin className="h-8 w-8 text-sea-dark mx-auto mb-2" />
                <h4 className="font-semibold text-sm mb-1">Vicini al mare</h4>
                <p className="text-xs text-gray-600">
                  5 minuti a piedi dalla spiaggia
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-4 border border-green-200">
                <Car className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm mb-1">
                  Parcheggio incluso
                </h4>
                <p className="text-xs text-gray-600">
                  Posto auto privato per ogni alloggio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccommodationSelector;
