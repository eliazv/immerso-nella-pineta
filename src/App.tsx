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
import { useEffect } from "react";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Rules from "./pages/Rules";
import Book from "./pages/Book";
import Attractions from "./pages/Attractions";
import HouseRulesPDF from "./pages/HouseRulesPDF";
import NotFound from "./pages/NotFound";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Dashboard from "./pages/Dashboard";
import AlloggiatiWeb from "./pages/AlloggiatiWeb";
import PinarellaGuide from "./pages/PinarellaGuide";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import CosaFarePinarella from "./pages/blog/CosaFarePinarella";
import RistorantiPinarella from "./pages/blog/RistorantiPinarella";
import ComeArrivarePinarella from "./pages/blog/ComeArrivarePinarella";
import EventiPinarella from "./pages/blog/EventiPinarella";
import FestivalAquiloneCervia from "./pages/blog/FestivalAquiloneCervia";
import PinarellaSummerFestival from "./pages/blog/PinarellaSummerFestival";
import MercatinoArtigianatoCervia from "./pages/blog/MercatinoArtigianatoCervia";
import ChiSiamo from "./pages/ChiSiamo";
import BackofficeLayout from "@/components/backoffice/BackofficeLayout";
import { AccommodationProvider } from "@/contexts/AccommodationContext";
import AccommodationSelector from "./pages/AccommodationSelector";

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
              <Routes>
                {/* Homepage - Selettore alloggi */}
                <Route path="/" element={<AccommodationSelector />} />

                {/* Pagine per Pineta 3 */}
                <Route path="/pineta3" element={<Index />} />
                <Route path="/pineta3/gallery" element={<Gallery />} />
                <Route path="/pineta3/rules" element={<Rules />} />
                <Route path="/pineta3/book" element={<Book />} />
                <Route path="/pineta3/rules/pdf" element={<HouseRulesPDF />} />

                {/* Pagine per Pineta 8 */}
                <Route path="/pineta8" element={<Index />} />
                <Route path="/pineta8/gallery" element={<Gallery />} />
                <Route path="/pineta8/rules" element={<Rules />} />
                <Route path="/pineta8/book" element={<Book />} />
                <Route path="/pineta8/rules/pdf" element={<HouseRulesPDF />} />

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

                {/* Backoffice con layout condiviso */}
                <Route path="/" element={<BackofficeLayout />}>
                  <Route path="/calendar" element={<AvailabilityCalendar />} />
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
            </AccommodationProvider>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
