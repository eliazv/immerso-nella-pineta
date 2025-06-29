import React, { useEffect, useState } from "react";
import {
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  BarChart3,
  LogOut,
  Building,
  ShieldAlert,
  BookOpen,
} from "lucide-react";
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
    : currentPath.includes("/bookings")
    ? "bookings"
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
    if (value === "dashboard") {
      navigate("/dashboard");
    } else if (value === "bookings") {
      navigate("/bookings");
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
    <div className="mx-auto min-h-screen bg-slate-50">
      {/* Header mobile-friendly */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-slate-200">
        <div className="container mx-auto px-2 py-2 max-w-5xl flex flex-nowrap justify-between items-center gap-2 md:gap-4">
          {/* Mobile: hamburger + logo + azioni rapide */}
          <div className="flex items-center gap-2 md:gap-4 w-full">
            <h1 className="text-lg font-serif font-medium hidden md:block">
              Backoffice
            </h1>
            <Select
              value={selectedCalendar}
              onValueChange={(value) =>
                handleCalendarChange(value as CalendarType)
              }
            >
              <SelectTrigger className="min-w-[80px] border-dashed text-xs md:text-base">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <SelectValue placeholder="Appartamento" />
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
            {/* Tabs mobile: solo icone, sticky bottom nav */}
            <div className="flex items-center gap-2 md:gap-3 ml-auto">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="hidden md:grid grid-cols-3">
                  <TabsTrigger
                    value="calendar"
                    className="flex items-center gap-1.5 text-xs md:text-base"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden md:inline">Calendario</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="bookings"
                    className="flex items-center gap-1.5 text-xs md:text-base"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden md:inline">Prenotazioni</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="dashboard"
                    className="flex items-center gap-1.5 text-xs md:text-base"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden md:inline">Dashboard</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                className="flex items-center gap-1 px-2 md:px-3"
                aria-label="Esci"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline">Esci</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Bottom nav solo mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-md flex md:hidden justify-around py-1">
        <button
          className={`flex flex-col items-center text-xs px-2 py-1 ${
            activeTab === "calendar" ? "text-primary" : "text-slate-500"
          }`}
          onClick={() => handleTabChange("calendar")}
        >
          <Calendar className="h-5 w-5 mb-0.5" />
          Calendario
        </button>
        <button
          className={`flex flex-col items-center text-xs px-2 py-1 ${
            activeTab === "bookings" ? "text-primary" : "text-slate-500"
          }`}
          onClick={() => handleTabChange("bookings")}
        >
          <BookOpen className="h-5 w-5 mb-0.5" />
          Prenotazioni
        </button>
        <button
          className={`flex flex-col items-center text-xs px-2 py-1 ${
            activeTab === "dashboard" ? "text-primary" : "text-slate-500"
          }`}
          onClick={() => handleTabChange("dashboard")}
        >
          <BarChart3 className="h-5 w-5 mb-0.5" />
          Dashboard
        </button>
      </nav>

      {/* Spazio per header fisso */}
      <div className="h-[56px] md:h-[60px]"></div>

      {/* Passa l'appartamento selezionato alle pagine figlie */}
      <main className="pt-2 pb-6 px-1 md:px-0">
        <Outlet context={{ selectedCalendar }} />
      </main>
    </div>
  );
};

export default BackofficeLayout;
