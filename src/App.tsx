import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Rules from "./pages/Rules";
import Book from "./pages/Book";
import Attractions from "./pages/Attractions";
import HouseRulesPDF from "./pages/HouseRulesPDF";
import NotFound from "./pages/NotFound";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Dashboard from "./pages/Dashboard";
import BackofficeLayout from "@/components/backoffice/BackofficeLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pagine pubbliche del sito */}
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/book" element={<Book />} />
          <Route path="/rules/pdf" element={<HouseRulesPDF />} />

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

          {/* Pagina 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
