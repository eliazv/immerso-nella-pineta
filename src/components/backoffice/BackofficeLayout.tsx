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
import { Calendar, BarChart3, LogOut, Building } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PinAuth from "@/components/calendar/PinAuth";
import { CalendarType } from "@/types/calendar";

/**
 * Layout condiviso per le pagine del backoffice (Dashboard e Calendario)
 * Si occupa della gestione dell'autenticazione e della navigazione tra le sezioni
 */
const BackofficeLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
    const authStatus = localStorage.getItem("calendarAuth");
    if (authStatus) {
      const { timestamp, authenticated } = JSON.parse(authStatus);
      // Controlla se l'autenticazione è ancora valida (24 ore)
      const now = new Date().getTime();
      if (authenticated && now - timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        // Autenticazione scaduta
        localStorage.removeItem("calendarAuth");
      }
    }
  }, []);

  // Carica la selezione dell'appartamento salvata (se disponibile)
  useEffect(() => {
    const savedCalendar = localStorage.getItem("selectedApartment");
    if (savedCalendar) {
      setSelectedCalendar(savedCalendar as CalendarType);
    }
  }, []);

  // Salva la selezione dell'appartamento per mantenere la coerenza tra le pagine
  useEffect(() => {
    localStorage.setItem("selectedApartment", selectedCalendar);
  }, [selectedCalendar]);

  // Gestisce il cambio di tab
  const handleTabChange = (value: string) => {
    navigate(value === "dashboard" ? "/dashboard" : "/calendar");
  };

  // Gestisce il logout
  const handleLogout = () => {
    localStorage.removeItem("calendarAuth");
    setIsAuthenticated(false);
  };

  // Se l'utente non è autenticato, mostra il form di autenticazione
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PinAuth
          onAuthenticate={() => setIsAuthenticated(true)}
          className="mt-16"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="fixed top-0 left-0 right-0 bg-slate-100 shadow-sm z-10">
        <div className="container mx-auto px-4 py-2 max-w-5xl flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-serif font-medium hidden md:block">
              Backoffice
            </h1>

            <Select
              value={selectedCalendar}
              onValueChange={(value) =>
                setSelectedCalendar(value as CalendarType)
              }
            >
              <SelectTrigger className="min-w-[80px] border-dashed">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <SelectValue placeholder="Seleziona appartamento" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="principale">N° 3</SelectItem>
                <SelectItem value="secondario">N° 4</SelectItem>
                <SelectItem value="terziario">N° 8</SelectItem>
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
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Esci</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 border-b pb-2"></div>

      {/* Passa l'appartamento selezionato alle pagine figlie */}
      <div className="pt-10 pb-6">
        <Outlet context={{ selectedCalendar }} />
      </div>
    </div>
  );
};

export default BackofficeLayout;
