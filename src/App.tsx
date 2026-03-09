import React, { Suspense, lazy, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import AccommodationSelector from "./pages/AccommodationSelector";
const Gallery = lazy(() => import("./pages/Gallery"));
const Rules = lazy(() => import("./pages/Rules"));
const Book = lazy(() => import("./pages/Book"));
const Zona = lazy(() => import("./pages/Zona"));
const CosaFarePinarella = lazy(() => import("./pages/blog/CosaFarePinarella"));
const RistorantiPinarella = lazy(
  () => import("./pages/blog/RistorantiPinarella"),
);
const ComeArrivarePinarella = lazy(
  () => import("./pages/blog/ComeArrivarePinarella"),
);
const EventiPinarella = lazy(() => import("./pages/blog/EventiPinarella"));
const FestivalAquiloneCervia = lazy(
  () => import("./pages/blog/FestivalAquiloneCervia"),
);
const PinarellaSummerFestival = lazy(
  () => import("./pages/blog/PinarellaSummerFestival"),
);
const MercatinoArtigianatoCervia = lazy(
  () => import("./pages/blog/MercatinoArtigianatoCervia"),
);
const BellezzePinarella = lazy(() => import("./pages/blog/BellezzePinarella"));
const MarePinarella = lazy(() => import("./pages/blog/MarePinarella"));
const MercatoSeralePinarella = lazy(
  () => import("./pages/blog/MercatoSeralePinarella"),
);
const PrezziPinarella = lazy(() => import("./pages/blog/PrezziPinarella"));
const SpiaggeLibereStabilimenti = lazy(
  () => import("./pages/blog/SpiaggeLibereStabilimenti"),
);
const PinarellaVsMilanoMarittima = lazy(
  () => import("./pages/blog/PinarellaVsMilanoMarittima"),
);
const MeteoPinarella = lazy(() => import("./pages/blog/MeteoPinarella"));
const DormirePinarellaBambini = lazy(
  () => import("./pages/blog/DormirePinarellaBambini"),
);
const DaBolognaAPinarella = lazy(
  () => import("./pages/blog/DaBolognaAPinarella"),
);
const DaMilanoAPinarella = lazy(
  () => import("./pages/blog/DaMilanoAPinarella"),
);
const ColazionePinarella = lazy(
  () => import("./pages/blog/ColazionePinarella"),
);
const ItinerariBiciclettaPinarella = lazy(
  () => import("./pages/blog/ItinerariBiciclettaPinarella"),
);
const VacanzePetFriendlyPinarella = lazy(
  () => import("./pages/blog/VacanzePetFriendlyPinarella"),
);
const EscursioniGiornalierePinarella = lazy(
  () => import("./pages/blog/EscursioniGiornalierePinarella"),
);
const ParchiGiocoPinarella = lazy(
  () => import("./pages/blog/ParchiGiocoPinarella"),
);
const SportAcquaticiPinarella = lazy(
  () => import("./pages/blog/SportAcquaticiPinarella"),
);
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));

import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import BackofficeLayout from "@/components/backoffice/BackofficeLayout";
import Dashboard from "@/pages/Dashboard";
import { AccommodationProvider } from "@/contexts/AccommodationContext";
import HouseRulesPDF from "./pages/HouseRulesPDF";
import PinarellaGuide from "./pages/PinarellaGuide";
import AlloggiatiWeb from "./pages/AlloggiatiWeb";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente per scroll automatico al cambio pagina
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
        >
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
              <ScrollToTop />
              <AccommodationProvider>
                <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                  <Suspense
                    fallback={
                      <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background/50 backdrop-blur-sm">
                        <div className="relative">
                          <Loader2 className="h-12 w-12 animate-spin text-primary" />
                          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20"></div>
                        </div>
                        <p className="animate-pulse font-serif text-lg font-medium text-foreground/70">
                          Immerso nella Pineta...
                        </p>
                      </div>
                    }
                  >
                    <Routes>
                      {/* Homepage - Selettore alloggi */}
                      <Route path="/" element={<AccommodationSelector />} />

                      {/* Pagine per Pineta 3 */}
                      <Route path="/pineta3" element={<Index />} />
                      <Route path="/pineta3/gallery" element={<Gallery />} />
                      <Route path="/pineta3/rules" element={<Rules />} />
                      <Route path="/pineta3/book" element={<Book />} />
                      <Route
                        path="/pineta3/rules/pdf"
                        element={<HouseRulesPDF />}
                      />

                      {/* Pagine per Pineta 8 */}
                      <Route path="/pineta8" element={<Index />} />
                      <Route path="/pineta8/gallery" element={<Gallery />} />
                      <Route path="/pineta8/rules" element={<Rules />} />
                      <Route path="/pineta8/book" element={<Book />} />
                      <Route
                        path="/pineta8/rules/pdf"
                        element={<HouseRulesPDF />}
                      />

                      {/* Pagina Zona unificata */}
                      <Route path="/zona" element={<Zona />} />
                      <Route
                        path="/attractions"
                        element={<Navigate to="/zona" replace />}
                      />
                      <Route
                        path="/blog"
                        element={<Navigate to="/zona" replace />}
                      />

                      {/* Sistema Alloggiati Web */}
                      <Route path="/alloggiati" element={<AlloggiatiWeb />} />

                      {/* SEO Content Pages */}
                      <Route
                        path="/pinarella-guida"
                        element={<PinarellaGuide />}
                      />
                      <Route path="/chi-siamo" element={<ChiSiamo />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route
                        path="/blog/pinarella-guida"
                        element={<PinarellaGuide />}
                      />
                      <Route
                        path="/blog/cosa-fare-pinarella-cervia"
                        element={<CosaFarePinarella />}
                      />
                      <Route
                        path="/blog/migliori-ristoranti-pinarella-cervia"
                        element={<RistorantiPinarella />}
                      />
                      <Route
                        path="/blog/come-arrivare-pinarella"
                        element={<ComeArrivarePinarella />}
                      />
                      <Route
                        path="/blog/eventi-pinarella-cervia"
                        element={<EventiPinarella />}
                      />
                      <Route
                        path="/blog/festival-aquilone-cervia"
                        element={<FestivalAquiloneCervia />}
                      />
                      <Route
                        path="/blog/pinarella-summer-festival"
                        element={<PinarellaSummerFestival />}
                      />
                      <Route
                        path="/blog/mercatino-artigianato-cervia"
                        element={<MercatinoArtigianatoCervia />}
                      />
                      <Route
                        path="/blog/bellezze-pinarella-cervia"
                        element={<BellezzePinarella />}
                      />
                      <Route
                        path="/blog/mare-pinarella-cervia"
                        element={<MarePinarella />}
                      />
                      <Route
                        path="/blog/mercato-serale-pinarella"
                        element={<MercatoSeralePinarella />}
                      />
                      <Route
                        path="/blog/prezzi-appartamenti-pinarella-2026"
                        element={<PrezziPinarella />}
                      />
                      <Route
                        path="/blog/spiagge-libere-stabilimenti-pinarella"
                        element={<SpiaggeLibereStabilimenti />}
                      />
                      <Route
                        path="/blog/pinarella-o-milano-marittima"
                        element={<PinarellaVsMilanoMarittima />}
                      />
                      <Route
                        path="/blog/meteo-pinarella-quando-andare"
                        element={<MeteoPinarella />}
                      />
                      <Route
                        path="/blog/dove-dormire-pinarella-cervia-bambini"
                        element={<DormirePinarellaBambini />}
                      />
                      <Route
                        path="/blog/come-arrivare-pinarella-da-bologna"
                        element={<DaBolognaAPinarella />}
                      />
                      <Route
                        path="/blog/come-arrivare-pinarella-da-milano"
                        element={<DaMilanoAPinarella />}
                      />
                      <Route
                        path="/blog/dove-fare-colazione-pinarella"
                        element={<ColazionePinarella />}
                      />
                      <Route
                        path="/blog/itinerari-bicicletta-pinarella"
                        element={<ItinerariBiciclettaPinarella />}
                      />
                      <Route
                        path="/blog/vacanze-pet-friendly-pinarella"
                        element={<VacanzePetFriendlyPinarella />}
                      />
                      <Route
                        path="/blog/escursioni-giornaliere-pinarella"
                        element={<EscursioniGiornalierePinarella />}
                      />
                      <Route
                        path="/blog/parchi-gioco-bambini-pinarella"
                        element={<ParchiGiocoPinarella />}
                      />
                      <Route
                        path="/blog/sport-acquatici-pinarella"
                        element={<SportAcquaticiPinarella />}
                      />

                      {/* Backoffice con layout condiviso */}
                      <Route path="/" element={<BackofficeLayout />}>
                        <Route
                          path="/calendar"
                          element={<AvailabilityCalendar />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Reindirizza /admin direttamente alla pagina calendar */}
                        <Route
                          path="/admin"
                          element={<Navigate to="/calendar" replace />}
                        />
                      </Route>

                      {/* Backward compatibility - redirect old routes to new unified routes */}
                      <Route
                        path="/gallery"
                        element={<Navigate to="/pineta3/gallery" replace />}
                      />
                      <Route
                        path="/pineta3/attractions"
                        element={<Navigate to="/attractions" replace />}
                      />
                      <Route
                        path="/pineta8/attractions"
                        element={<Navigate to="/attractions" replace />}
                      />
                      <Route
                        path="/rules"
                        element={<Navigate to="/faq" replace />}
                      />
                      <Route
                        path="/book"
                        element={<Navigate to="/pineta3/book" replace />}
                      />
                      <Route
                        path="/rules/pdf"
                        element={<Navigate to="/faq" replace />}
                      />

                      {/* Pagina 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
              </AccommodationProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
