import React, { Suspense, lazy, useEffect } from "react";
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

// Lazy-loaded pages to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Rules = lazy(() => import("./pages/Rules"));
const Book = lazy(() => import("./pages/Book"));
const Attractions = lazy(() => import("./pages/Attractions"));
const HouseRulesPDF = lazy(() => import("./pages/HouseRulesPDF"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AlloggiatiWeb = lazy(() => import("./pages/AlloggiatiWeb"));
const PinarellaGuide = lazy(() => import("./pages/PinarellaGuide"));
const Blog = lazy(() => import("./pages/Blog"));
const FAQ = lazy(() => import("./pages/FAQ"));
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
const ChiSiamo = lazy(() => import("./pages/ChiSiamo"));

const AvailabilityCalendar = lazy(
  () => import("@/components/AvailabilityCalendar"),
);
const BackofficeLayout = lazy(
  () => import("@/components/backoffice/BackofficeLayout"),
);
import { AccommodationProvider } from "@/contexts/AccommodationContext";
const AccommodationSelector = lazy(
  () => import("./pages/AccommodationSelector"),
);

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
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AccommodationProvider>
              <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center">
                    Caricamento...
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

                  {/* Pagina Attrazioni unificata */}
                  <Route path="/attractions" element={<Attractions />} />

                  {/* Sistema Alloggiati Web */}
                  <Route path="/alloggiati" element={<AlloggiatiWeb />} />

                  {/* SEO Content Pages */}
                  <Route path="/pinarella-guida" element={<PinarellaGuide />} />
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
                    element={<Navigate to="/pineta3/rules" replace />}
                  />
                  <Route
                    path="/book"
                    element={<Navigate to="/pineta3/book" replace />}
                  />
                  <Route
                    path="/rules/pdf"
                    element={<Navigate to="/pineta3/rules/pdf" replace />}
                  />

                  {/* Pagina 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AccommodationProvider>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
