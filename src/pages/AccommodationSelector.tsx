import React from "react";
import { Link } from "react-router-dom";
import { TreePine, MapPin, ChevronRight, Car, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

const AccommodationSelector = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pine-light/20 to-sea-light/20">
      <MetaTags
        title="Immerso nella Pineta - Appartamenti in Affitto a Pinarella di Cervia"
        description="Scegli il tuo appartamento per le vacanze a Pinarella di Cervia. Due alloggi immersi nella pineta, a 5 minuti dal mare."
        keywords="appartamenti affitto pinarella cervia, casa vacanze pinarella, alloggi cervia, vacanze mare emilia romagna"
        canonicalUrl="/"
      />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pine-light/50 text-pine-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TreePine className="h-4 w-4" />
              <span>Cervia, Italia</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-medium text-pine-dark mb-4">
              Immerso nella Pineta
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Scegli il tuo appartamento ideale per le vacanze a Pinarella di Cervia.
              Due accoglienti alloggi immersi nella pineta, a soli 5 minuti a piedi dal mare.
            </p>
          </div>

          {/* Accommodation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pineta 3 */}
            <div className="group bg-white rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop"
                  alt="Immerso nella Pineta 3 - Appartamento Pinarella"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-medium text-pine-dark mb-2">
                  Immerso nella Pineta 3
                </h2>
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Pinarella di Cervia</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Appartamento accogliente al piano terra, perfetto per famiglie. 
                  Immerso nel verde della pineta con accesso diretto al giardino condiviso.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Bed className="h-4 w-4 text-pine-dark" />
                  <span>4 posti letto</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Car className="h-4 w-4 text-pine-dark" />
                  <span>Posto auto #3</span>
                </div>
              </div>

              <Button asChild className="w-full bg-pine-dark hover:bg-pine-dark/90">
                <Link to="/pineta3" className="flex items-center justify-center gap-2">
                  Scopri Pineta 3
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Pineta 8 */}
            <div className="group bg-white rounded-2xl p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <img
                  src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3MDMyNTgyNDcwNjQwMzA1OQ==/original/529559d4-9514-4ece-a94b-38de9fc199ab.jpeg?q=80&w=800&auto=format&fit=crop"
                  alt="Immerso nella Pineta 8 - Appartamento Pinarella"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-medium text-sea-dark mb-2">
                  Immerso nella Pineta 8
                </h2>
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Pinarella di Cervia</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Appartamento accogliente al piano terra, perfetto per famiglie. 
                  Immerso nel verde della pineta con accesso diretto al giardino condiviso.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Bed className="h-4 w-4 text-sea-dark" />
                  <span>4 posti letto</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Car className="h-4 w-4 text-sea-dark" />
                  <span>Posto auto #8</span>
                </div>
              </div>

              <Button asChild className="w-full bg-sea-dark hover:bg-sea-dark/90">
                <Link to="/pineta8" className="flex items-center justify-center gap-2">
                  Scopri Pineta 8
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Info Section */}
          <div className="text-center mt-16">
            <div className="max-w-3xl mx-auto">
              <h3 className="font-serif text-2xl font-medium text-pine-dark mb-4">
                Due appartamenti, un'unica esperienza
              </h3>
              <p className="text-muted-foreground mb-8">
                Entrambi gli appartamenti offrono lo stesso livello di comfort e servizi. 
                La scelta dipende solo dalla vostra preferenza per il posto auto e dalla disponibilità.
                Immersi nella tranquilla pineta di Pinarella, a soli 200 metri dal mare.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="w-12 h-12 rounded-full bg-pine-light/50 flex items-center justify-center mx-auto mb-3">
                    <TreePine className="h-6 w-6 text-pine-dark" />
                  </div>
                  <h4 className="font-medium mb-2">Immersi nella pineta</h4>
                  <p className="text-sm text-muted-foreground">
                    Tranquillità e ombra degli alti pini
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 rounded-full bg-sea-light/50 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-sea-dark" />
                  </div>
                  <h4 className="font-medium mb-2">Vicini al mare</h4>
                  <p className="text-sm text-muted-foreground">
                    5 minuti a piedi dalla spiaggia
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <Car className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-2">Parcheggio incluso</h4>
                  <p className="text-sm text-muted-foreground">
                    Posto auto privato assegnato
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