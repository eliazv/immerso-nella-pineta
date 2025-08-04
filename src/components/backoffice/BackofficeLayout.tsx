import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart3, Settings } from "lucide-react";
import PinAuth from "@/components/calendar/PinAuth";
import { CalendarType } from "@/types/calendar";
import { isAuthenticated, logout } from "@/services/authService";

/**
 * Layout condiviso per le pagine del backoffice (Dashboard e Calendario)
 * Si occupa della gestione dell'autenticazione e della navigazione tra le sezioni
 */

const BackofficeLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Determina la tab attiva in base al percorso corrente
  const currentPath = location.pathname;
  const activeTab = currentPath.includes("/dashboard")
    ? "dashboard"
    : currentPath.includes("/calendar")
    ? "calendar"
    : currentPath.includes("/accommodations")
    ? "accommodations"
    : "calendar"; // Default

  // Verifica se l'utente è già autenticato al caricamento del componente
  useEffect(() => {
    // Verifica autenticazione utilizzando il servizio di auth sicuro
    setIsAuth(isAuthenticated());
    setIsLoading(false);
  }, []);

  // Gestisce il cambio di tab
  const handleTabChange = (value: string) => {
    if (value === "dashboard") {
      navigate("/dashboard");
    } else if (value === "accommodations") {
      navigate("/accommodations");
    } else {
      navigate("/calendar");
    }
  };

  // Gestisce il logout
  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  // Se l'utente non è autenticato, mostra il form di autenticazione
  if (!isAuth) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PinAuth onAuthenticate={() => setIsAuth(true)} className="mt-16" />
      </div>
    );
  }
  return (
    <div className="mx-auto">
      {/* Desktop/Tablet Header */}
      <div className="hidden sm:block fixed left-0 right-0 bg-slate-200 shadow-sm z-50 top-0">
        <div className="container mx-auto px-4 py-2 max-w-6xl">
          <div className="flex justify-center">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger
                  value="calendar"
                  className="flex items-center gap-1.5 px-4"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendario</span>
                </TabsTrigger>
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center gap-1.5 px-4"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Statistiche</span>
                </TabsTrigger>
                <TabsTrigger
                  value="accommodations"
                  className="flex items-center gap-1.5 px-4"
                >
                  <Settings className="h-4 w-4" />
                  <span>Impostazioni</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Mobile Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-100 border-t shadow sm:hidden">
        <div className="flex justify-around items-center h-14">
          <button
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === "calendar"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
            onClick={() => handleTabChange("calendar")}
          >
            <Calendar className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Calendario</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === "dashboard"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
            onClick={() => handleTabChange("dashboard")}
          >
            <BarChart3 className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Statistiche</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              activeTab === "accommodations"
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
            onClick={() => handleTabChange("accommodations")}
          >
            <Settings className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Impostazioni</span>
          </button>
        </div>
      </nav>

      {/* Pages content - different padding for mobile vs desktop */}
      <div className="pt-4 pb-16 sm:pt-16 sm:pb-6">
        <Outlet />
      </div>
    </div>
  );
};

export default BackofficeLayout;
