import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Dashboard from "./pages/Dashboard";
import Apartments from "./pages/Apartments";
import Migration from "./pages/Migration";
import BackofficeLayout from "@/components/backoffice/BackofficeLayout";

const queryClient = new QueryClient();

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

const App = () => {
  useEffect(() => {
    // Redirect automatico SOLO su Android e SOLO se siamo sulla homepage "/"
    if (
      Capacitor.isNativePlatform &&
      Capacitor.getPlatform() === "android" &&
      window.location.pathname === "/"
    ) {
      window.location.replace("/calendar");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* La pagina principale ora mostra la Home */}
              <Route path="/" element={<BackofficeLayout />}>
                <Route index element={<Home />} />
                <Route path="calendar" element={<AvailabilityCalendar />} />
                <Route path="apartments" element={<Apartments />} />
                <Route path="migration" element={<Migration />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* Reindirizza /admin direttamente alla pagina calendar */}
                <Route
                  path="admin"
                  element={<Navigate to="/calendar" replace />}
                />
              </Route>
              {/* Pagina 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
