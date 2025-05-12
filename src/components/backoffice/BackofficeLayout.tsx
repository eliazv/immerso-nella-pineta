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
  Database,
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
import {
  initPocketBase,
  isPocketBaseAvailable,
} from "@/services/pocketbaseService";
import { toast } from "@/hooks/use-toast";

/**
 * Layout condiviso per le pagine del backoffice (Dashboard e Calendario)
 * Si occupa della gestione dell'autenticazione e della navigazione tra le sezioni
 */
const BackofficeLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPocketBaseActive, setIsPocketBaseActive] = useState<boolean>(true);
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

  // Verifica se l'utente è già autenticato e se PocketBase è disponibile
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verifica se PocketBase è disponibile
        const isAvailable = await isPocketBaseAvailable();
        setIsPocketBaseActive(isAvailable);

        if (!isAvailable) {
          console.warn(
            "PocketBase non è disponibile. Alcune funzionalità potrebbero non funzionare correttamente."
          );
        }

        // Verifica autenticazione
        setIsAuth(isAuthenticated());
      } catch (error) {
        console.error(
          "Errore durante il controllo dell'autenticazione:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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
        {!isPocketBaseActive && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-md text-sm text-yellow-800">
            <p className="font-semibold mb-1">Attenzione</p>
            <p>
              Il servizio PocketBase non è attivo. Alcune funzionalità
              potrebbero non essere disponibili. Assicurati che il server
              PocketBase sia in esecuzione prima di continuare.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="fixed top-0 left-0 right-0 bg-slate-100 shadow-sm z-50">
        <div className="container mx-auto px-4 py-2 max-w-5xl flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-serif font-medium hidden md:block">
              Backoffice
            </h1>

            <Select
              value={selectedCalendar}
              onValueChange={(value) =>
                handleCalendarChange(value as CalendarType)
              }
            >
              <SelectTrigger className="min-w-[80px] border-dashed">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
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
          <div className="flex items-center gap-3 ml-auto">
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
                  <span className="hidden md:inline">Dashboard</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/database-admin")}
              className="flex items-center gap-1"
            >
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Database</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Esci</span>
            </Button>
          </div>
        </div>
      </div>

      {!isPocketBaseActive && (
        <div className="fixed top-14 left-0 right-0 bg-yellow-100 z-40 py-2">
          <div className="container mx-auto px-4 text-sm text-yellow-800 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>
              PocketBase non è attivo. Alcune funzionalità potrebbero non essere
              disponibili.
            </span>
          </div>
        </div>
      )}

      <div className="mb-8 border-b pb-2"></div>

      {/* Passa l'appartamento selezionato alle pagine figlie */}
      <div className={`pt-10 pb-6 ${!isPocketBaseActive ? "pt-16" : ""}`}>
        <Outlet context={{ selectedCalendar }} />
      </div>
    </div>
  );
};

export default BackofficeLayout;
