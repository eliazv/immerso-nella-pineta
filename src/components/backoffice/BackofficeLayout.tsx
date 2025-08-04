import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart3, Building, House } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");

  // Determina la tab attiva in base al percorso corrente
  const currentPath = location.pathname;
  const activeTab = currentPath.includes("/dashboard")
    ? "dashboard"
    : currentPath.includes("/calendar")
    ? "calendar"
    : "calendar"; // Default

  // Verifica se l'utente è già autenticato al caricamento del componente
  useEffect(() => {
    // Verifica autenticazione utilizzando il servizio di auth sicuro
    setIsAuth(isAuthenticated());
    setIsLoading(false);
  }, []);

  // Carica la selezione dell'appartamento salvata (se disponibile)
  useEffect(() => {
    const savedCalendar = localStorage.getItem("selectedApartment");
    if (savedCalendar) {
      setSelectedCalendar(savedCalendar as CalendarType);
    }
  }, []);

  // Salva la selezione dell'appartamento
  const handleCalendarChange = (value: CalendarType) => {
    setSelectedCalendar(value);
    localStorage.setItem("selectedApartment", value);
  };

  // Mappa tra codici calendario e nomi degli appartamenti
  const apartmentOptions = [
    { value: "principale", label: "N° 3" },
    { value: "secondario", label: "N° 4" },
    { value: "terziario", label: "N° 8" },
    { value: "all", label: "Tutti" },
  ];

  // Gestisce il cambio di tab
  const handleTabChange = (value: string) => {
    navigate(value === "dashboard" ? "/dashboard" : "/calendar");
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
      <div className="fixed left-0 right-0 bg-slate-200 shadow-sm z-50 top-0">
        <div className="container mx-auto px-4 py-2 max-w-5xl flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {/* <h1 className="text-lg font-serif font-medium">Alloggio:</h1> */}

            <Select
              value={selectedCalendar}
              onValueChange={(value) =>
                handleCalendarChange(value as CalendarType)
              }
            >
              <SelectTrigger className="min-w-[80px]">
                <div className="flex items-center gap-2">
                  <House className="h-4 w-4" />
                  <SelectValue placeholder="Seleziona appartamento" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {apartmentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="items-center gap-3 ml-auto hidden md:flex">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger
                  value="calendar"
                  className="flex items-center gap-1.5"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="hidden md:inline">Calendario</span>
                </TabsTrigger>
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center gap-1.5"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden md:inline">Statistiche</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Esci</span>
            </Button> */}
          </div>

          {/* Footer mobile navigation */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-100 border-t shadow md:hidden">
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
              {/* <button
                className="flex flex-col items-center justify-center flex-1 py-2 text-muted-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mx-auto" />
                <span className="text-xs mt-1">Esci</span>
              </button> */}
            </div>
          </nav>
        </div>
      </div>

      <div className="mb-8 border-b pb-2"></div>

      {/* Passa l'appartamento selezionato alle pagine figlie */}
      <div className="pt-8 pb-16 md:pb-6">
        <Outlet context={{ selectedCalendar }} />
      </div>
    </div>
  );
};

export default BackofficeLayout;
