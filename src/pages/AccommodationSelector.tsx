import React from "react";
import { Link } from "react-router-dom";
import { TreePine, MapPin, ChevronRight, Car, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

const AccommodationSelector = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <MetaTags
        title="Immerso nella Pineta - Appartamenti in Affitto a Pinarella di Cervia"
        description="Scegli il tuo appartamento per le vacanze a Pinarella di Cervia. Due alloggi immersi nella pineta, a 5 minuti dal mare."
        keywords="appartamenti affitto pinarella cervia, casa vacanze pinarella, alloggi cervia, vacanze mare emilia romagna"
        canonicalUrl="/"
      />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <img
                src="/images/logo.nobg.png"
                alt="Immerso nella Pineta"
                className="h-24 md:h-32 w-auto"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-pine-dark/10 text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-4 border border-pine-light/50">
              <MapPin className="h-4 w-4" />
              <span>Pinarella di Cervia, Riviera Romagnola</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-pine-dark mb-4 tracking-tight">
              Scegli il tuo appartamento
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Due alloggi confortevoli immersi nella pineta, a 5 minuti a piedi
              dal mare.
              <br className="hidden md:block" />
              Affitto diretto senza commissioni.
            </p>
          </div>

          {/* Accommodation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {/* Pineta 3 */}
            <Link
              to="/pineta3"
              className="group bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop"
                  alt="Immerso nella Pineta 3 - Appartamento Pinarella"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-bold text-pine-dark mb-1">
                  Pineta 3
                </h2>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Piano terra • Vista giardino</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Appartamento accogliente con accesso diretto al giardino
                  condiviso. Ideale per famiglie.
                </p>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-pine-dark" />
                  <span className="font-medium">4 posti letto</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-pine-dark" />
                  <span className="font-medium">Posto auto</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="text-lg font-bold text-green-700">
                  Da 52€/notte
                </div>
                <div className="text-xs text-green-600">Prezzi stagionali</div>
              </div>

              <div className="w-full bg-pine-dark hover:bg-pine-dark/90 text-white rounded-lg py-2.5 px-4 text-center font-semibold transition-colors flex items-center justify-center gap-2">
                Scopri l'appartamento
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Pineta 8 */}
            <Link
              to="/pineta8"
              className="group bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-1496353845267245023/original/b4103f6e-2051-49cb-8453-ccfbb53b3df2.jpeg?im_w=480"
                  alt="Immerso nella Pineta 8 - Appartamento Pinarella"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="mb-4">
                <h2 className="text-2xl font-bold text-sea-dark mb-1">
                  Pineta 8
                </h2>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Secondo piano • 3 balconi</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Appartamento spazioso con vista pineta. Perfetto per famiglie
                  numerose.
                </p>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-sea-dark" />
                  <span className="font-medium">6 posti letto</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-sea-dark" />
                  <span className="font-medium">Posto auto</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="text-lg font-bold text-blue-700">
                  Da 68€/notte
                </div>
                <div className="text-xs text-blue-600">Prezzi stagionali</div>
              </div>

              <div className="w-full bg-sea-dark hover:bg-sea-dark/90 text-white rounded-lg py-2.5 px-4 text-center font-semibold transition-colors flex items-center justify-center gap-2">
                Scopri l'appartamento
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          {/* Info Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-pine-dark mb-3">
                Affitto diretto, nessuna commissione
              </h3>
              <p className="text-gray-600 mb-8 text-base">
                Prenota direttamente con i proprietari e risparmia. Entrambi gli
                appartamenti offrono comfort e servizi completi, immersi nella
                pineta a 200m dal mare.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-pine-light/50 flex items-center justify-center mx-auto mb-2">
                    <TreePine className="h-5 w-5 text-pine-dark" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Nella pineta</h4>
                  <p className="text-xs text-gray-600">
                    Tranquillità e ombra naturale
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-sea-light/50 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="h-5 w-5 text-sea-dark" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Vicini al mare</h4>
                  <p className="text-xs text-gray-600">
                    5 minuti a piedi dalla spiaggia
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                    <Car className="h-5 w-5 text-green-600" />
                  </div>
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
      </div>
    </div>
  );
};

export default AccommodationSelector;
