import React, { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, StatusBarStyle } from "@capacitor/status-bar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BarChart3,
  Building,
  House,
  Home,
  Settings,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarType, Apartment } from "@/types/calendar";
import { isAuthenticated, logout } from "@/services/authService";
import { localStorageService } from "@/services/localStorageService";
import { getActiveApartments } from "@/services/apartmentService";

/**
 * Layout condiviso per le pagine del backoffice (Dashboard e Calendario)
 * Si occupa della gestione dell'autenticazione e della navigazione tra le sezioni
 */

const BackofficeLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");
  const [apartments, setApartments] = useState<Apartment[]>([]);

  // Gestione status bar su Android - ora gestita tramite configurazione nativa
  useEffect(() => {
    const setupStatusBar = async () => {
      if (Capacitor.isNativePlatform && Capacitor.getPlatform() === "android") {
        try {
          // La configurazione è ora gestita tramite capacitor.config.ts e MainActivity.java
          // Non serve più impostare manualmente overlay mode
          console.log("Status bar configurata tramite configurazione nativa");
        } catch (e) {
          console.error("Errore configurazione StatusBar:", e);
        }
      }
    };
    setupStatusBar();
  }, []);

  // Determina la tab attiva in base al percorso corrente
  const currentPath = location.pathname;
  let activeTab: string = "home";
  if (currentPath === "/" || currentPath === "/home") {
    activeTab = "home";
  } else if (currentPath.includes("/dashboard")) {
    activeTab = "dashboard";
  } else if (currentPath.includes("/calendar")) {
    activeTab = "calendar";
  } else if (currentPath.includes("/apartments")) {
    activeTab = "apartments";
  } else if (currentPath.includes("/migration")) {
    activeTab = "migration";
  }

  // Verifica se l'utente è già autenticato al caricamento del componente
  useEffect(() => {
    // Verifica autenticazione utilizzando il servizio di auth sicuro
    setIsAuth(isAuthenticated());

    // Inizializza lo store locale
    localStorageService.initializeStore();

    // Carica gli appartamenti
    const apartmentList = getActiveApartments();
    setApartments(apartmentList);

    setIsLoading(false);
  }, []);

  // Carica la selezione dell'appartamento salvata (se disponibile)
  useEffect(() => {
    const savedCalendar = localStorage.getItem("selectedApartment");
    if (savedCalendar) {
      setSelectedCalendar(savedCalendar as CalendarType);
    }
  }, []);

  // Gestisce il cambio di appartamento selezionato
  const handleCalendarChange = (value: string) => {
    if (value === "manage") {
      navigate("/apartments");
      return;
    }

    // Converte l'ID appartamento in CalendarType per compatibilità
    let calendarType: CalendarType;
    if (value === "all") {
      calendarType = "all";
    } else {
      // Trova l'appartamento e mappa al CalendarType corrispondente
      const apartment = apartments.find((apt) => apt.id === value);
      if (apartment) {
        // Mappa basata sul nome dell'appartamento (per compatibilità)
        switch (apartment.name) {
          case "N° 3":
            calendarType = "principale";
            break;
          case "N° 4":
            calendarType = "secondario";
            break;
          case "N° 8":
            calendarType = "terziario";
            break;
          default:
            calendarType = "principale";
        }
      } else {
        calendarType = "principale";
      }
    }

    setSelectedCalendar(calendarType);
  };

  // Converte CalendarType in ID appartamento per il Select
  const getSelectValue = (): string => {
    if (selectedCalendar === "all") return "all";

    // Trova l'appartamento corrispondente al CalendarType
    const apartment = apartments.find((apt) => {
      switch (selectedCalendar) {
        case "principale":
          return apt.name === "N° 3";
        case "secondario":
          return apt.name === "N° 4";
        case "terziario":
          return apt.name === "N° 8";
        default:
          return false;
      }
    });

    return apartment ? apartment.id : apartments[0]?.id || "all";
  };

  // Gestisce il cambio di tab
  const handleTabChange = (value: string) => {
    if (value === "home") {
      navigate("/");
    } else if (value === "dashboard") {
      navigate("/dashboard");
    } else if (value === "calendar") {
      navigate("/calendar");
    } else if (value === "apartments") {
      navigate("/apartments");
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

  return (
    <div className="mx-auto">
      {/*
        Con la configurazione nativa corretta, la WebView ora inizia automaticamente
        sotto la status bar su Android, senza bisogno di padding dinamico
      */}

      {/* Header only shows accommodation dropdown on calendar and statistics pages */}
      {(activeTab === "calendar" || activeTab === "dashboard") && (
        <div className="fixed left-4 top-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl z-40 md:hidden max-w-xs">
          <div className="px-4 py-3 flex items-center gap-3">
            <Select
              value={getSelectValue()}
              onValueChange={handleCalendarChange}
            >
              <SelectTrigger className="min-w-[160px]">
                <div className="flex items-center gap-2">
                  <House className="h-4 w-4" />
                  <SelectValue placeholder="Seleziona appartamento" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {/* Opzioni dinamiche degli appartamenti */}
                {apartments.map((apartment) => (
                  <SelectItem key={apartment.id} value={apartment.id}>
                    {apartment.name}
                  </SelectItem>
                ))}

                {/* Separatore */}
                {apartments.length > 0 && <div className="border-t my-1"></div>}

                {/* Opzione per visualizzare tutti */}
                <SelectItem value="all">Tutti gli alloggi</SelectItem>
              </SelectContent>
            </Select>

            {/* Settings button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100"
              onClick={() => navigate("/apartments")}
            >
              <Settings className="h-4 w-4 text-ardesia" />
            </Button>
          </div>
        </div>
      )}

      {/* Desktop header with tabs */}
      <div className="hidden md:block">
        <div className="fixed left-0 right-0 bg-white shadow-sm z-50 top-0">
          <div className="container mx-auto px-4 py-2 max-w-5xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Select
                value={getSelectValue()}
                onValueChange={handleCalendarChange}
              >
                <SelectTrigger className="min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <House className="h-4 w-4" />
                    <SelectValue placeholder="Seleziona appartamento" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {apartments.map((apartment) => (
                    <SelectItem key={apartment.id} value={apartment.id}>
                      {apartment.name}
                    </SelectItem>
                  ))}
                  {apartments.length > 0 && (
                    <div className="border-t my-1"></div>
                  )}
                  <SelectItem value="all">Tutti gli alloggi</SelectItem>
                  <div className="border-t my-1"></div>
                  <SelectItem
                    value="manage"
                    onSelect={() => navigate("/apartments")}
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Gestisci Alloggi
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="items-center gap-3 ml-auto flex">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger
                    value="home"
                    className="flex items-center gap-1.5"
                  >
                    <Home className="h-4 w-4" />
                    <span className="hidden lg:inline">Home</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="calendar"
                    className="flex items-center gap-1.5"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden lg:inline">Calendario</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="dashboard"
                    className="flex items-center gap-1.5"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden lg:inline">Statistiche</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="mb-8 border-b pb-2"></div>
      </div>

      {/* Floating mobile navigation */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl md:hidden">
        <div className="flex justify-around items-center h-16 px-2">
          <button
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-colors ${
              activeTab === "home"
                ? "text-petrolio bg-petrolio/10 font-semibold"
                : "text-ardesia/70"
            }`}
            onClick={() => handleTabChange("home")}
          >
            <Home className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-colors ${
              activeTab === "calendar"
                ? "text-petrolio bg-petrolio/10 font-semibold"
                : "text-ardesia/70"
            }`}
            onClick={() => handleTabChange("calendar")}
          >
            <Calendar className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Calendario</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-colors ${
              activeTab === "dashboard"
                ? "text-petrolio bg-petrolio/10 font-semibold"
                : "text-ardesia/70"
            }`}
            onClick={() => handleTabChange("dashboard")}
          >
            <BarChart3 className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Statistiche</span>
          </button>
        </div>
      </nav>

      {/* Content area with proper padding */}
      <div
        className={`pb-24 md:pb-6 ${
          activeTab === "calendar" || activeTab === "dashboard"
            ? "pt-20 md:pt-20"
            : ""
        }`}
      >
        <Outlet context={{ selectedCalendar }} />
      </div>
    </div>
  );
};

export default BackofficeLayout;
