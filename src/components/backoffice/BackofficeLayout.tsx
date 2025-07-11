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
  Plus,
  Bell,
  Download,
  ChevronDown,
} from "lucide-react";
import { ApartmentIcon } from "@/utils/apartmentIcons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const [selectedCalendar, setSelectedCalendar] = useState<CalendarType>("all");
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
  } else if (currentPath.includes("/statistics")) {
    activeTab = "statistics";
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
      setSelectedCalendar(savedCalendar);
    } else if (apartments.length > 0) {
      // Se non c'è una selezione salvata, usa il primo appartamento
      setSelectedCalendar(apartments[0].id);
    }
  }, [apartments]);

  // Gestisce il cambio di appartamento selezionato
  const handleCalendarChange = (value: string) => {
    if (value === "manage") {
      navigate("/apartments");
      return;
    }

    setSelectedCalendar(value);
    localStorage.setItem("selectedApartment", value);
  };

  // Ottiene il valore corrente per il Select (ora molto più semplice)
  const getSelectValue = (): string => {
    return selectedCalendar;
  };

  // Gestisce il cambio di tab
  const handleTabChange = (value: string) => {
    if (value === "home") {
      navigate("/");
    } else if (value === "statistics") {
      navigate("/statistics");
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

      {/* Desktop header with tabs */}
      <div className="hidden md:block">
        <div className="fixed left-0 right-0 bg-white shadow-sm z-50 top-0">
          <div className="container mx-auto px-4 py-2 max-w-5xl flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img src="/rentpilot.svg" alt="RentPilot" className="h-8 w-8" />
                <span className="font-bold text-lg text-petrolio">
                  RentPilot
                </span>
              </div>
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
                    value="statistics"
                    className="flex items-center gap-1.5"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden lg:inline">Statistiche</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Dropdown appartamenti con icona e titolo */}
              <Select
                value={getSelectValue()}
                onValueChange={handleCalendarChange}
              >
                <SelectTrigger className="w-[120px] lg:w-[140px] h-9 ml-3">
                  <div className="flex items-center gap-2">
                    {(() => {
                      if (selectedCalendar === "all") {
                        return (
                          <>
                            <Building className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate text-sm hidden md:inline lg:inline">
                              Tutti
                            </span>
                            <span className="truncate text-sm md:hidden">
                              Tutti
                            </span>
                          </>
                        );
                      }
                      const apartment = apartments.find(
                        (apt) => apt.id === selectedCalendar
                      );
                      return apartment ? (
                        <>
                          <ApartmentIcon
                            iconName={apartment.icon}
                            color={apartment.color}
                            size={16}
                            className="flex-shrink-0"
                          />
                          <span className="truncate text-sm hidden lg:inline">
                            {apartment.name}
                          </span>
                          <span className="truncate text-sm md:inline lg:hidden">
                            {apartment.name.length > 8
                              ? apartment.name.substring(0, 8) + "..."
                              : apartment.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <House className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate text-sm hidden md:inline">
                            Alloggio
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </SelectTrigger>
                <SelectContent className="min-w-[160px]">
                  {apartments.map((apartment) => (
                    <SelectItem key={apartment.id} value={apartment.id}>
                      <div className="flex items-center gap-2">
                        <ApartmentIcon
                          iconName={apartment.icon}
                          color={apartment.color}
                          size={16}
                        />
                        {apartment.name}
                      </div>
                    </SelectItem>
                  ))}
                  {apartments.length > 0 && (
                    <div className="border-t my-1"></div>
                  )}
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Tutti gli alloggi
                    </div>
                  </SelectItem>
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

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <div className="bg-white rounded-full shadow-sm border border-gray-100">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full hover:bg-petrolio/10 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-ardesia hover:text-petrolio" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => {
                          /* TODO: Implement */
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Nuova Prenotazione
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          /* TODO: Implement */
                        }}
                      >
                        <House className="h-4 w-4 mr-2" />
                        Nuovo Alloggio
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          /* TODO: Implement */
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Importa da iCal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="bg-white rounded-full shadow-sm border border-gray-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-petrolio/10 transition-colors"
                    onClick={() => {
                      /* TODO: Implement */
                    }}
                  >
                    <Bell className="h-4 w-4 text-ardesia hover:text-petrolio" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 border-b pb-2"></div>
      </div>

      {/* Floating navigation - now for all devices */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl">
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
              activeTab === "statistics"
                ? "text-petrolio bg-petrolio/10 font-semibold"
                : "text-ardesia/70"
            }`}
            onClick={() => handleTabChange("statistics")}
          >
            <BarChart3 className="h-5 w-5 mx-auto" />
            <span className="text-xs mt-1">Statistiche</span>
          </button>

          {/* Dropdown Appartamenti e Impostazioni */}
          <div className="flex flex-col items-center justify-center flex-1 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors text-ardesia/70 hover:text-petrolio relative bg-gray-100/50 border border-gray-200/50">
                  <div className="relative flex items-center gap-1">
                    {(() => {
                      const currentApartment = apartments.find(
                        (apt) => selectedCalendar === apt.id
                      );
                      if (currentApartment) {
                        return (
                          <>
                            <ApartmentIcon
                              iconName={currentApartment.icon}
                              color={currentApartment.color}
                              size={16}
                              className="flex-shrink-0"
                            />
                            <ChevronDown className="h-3 w-3 bg-white rounded-full" />
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Building className="h-5 w-5 mx-auto" />
                            <ChevronDown className="h-3 w-3 absolute -bottom-1 -right-1 bg-white rounded-full" />
                          </>
                        );
                      }
                    })()}
                  </div>
                  <span className="text-xs mt-1 truncate max-w-[60px]">
                    {(() => {
                      const currentApartment = apartments.find(
                        (apt) => selectedCalendar === apt.id
                      );
                      if (currentApartment) {
                        return currentApartment.name.length > 8
                          ? currentApartment.name.substring(0, 8) + "..."
                          : currentApartment.name;
                      } else if (selectedCalendar === "all") {
                        return "Tutti";
                      } else {
                        return "Alloggi";
                      }
                    })()}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mb-2">
                <div className="px-2 py-1.5 text-sm font-semibold text-ardesia">
                  Appartamenti
                </div>
                {apartments.map((apartment) => (
                  <DropdownMenuItem
                    key={apartment.id}
                    onClick={() => handleCalendarChange(apartment.id)}
                    className={`${
                      selectedCalendar === apartment.id
                        ? "bg-petrolio/10 text-petrolio"
                        : ""
                    }`}
                  >
                    <ApartmentIcon
                      iconName={apartment.icon}
                      color={apartment.color}
                      size={16}
                      className="mr-2"
                    />
                    {apartment.name}
                  </DropdownMenuItem>
                ))}

                {apartments.length > 0 && (
                  <DropdownMenuItem
                    onClick={() => handleCalendarChange("all")}
                    className={`${
                      selectedCalendar === "all"
                        ? "bg-petrolio/10 text-petrolio"
                        : ""
                    }`}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Tutti gli alloggi
                  </DropdownMenuItem>
                )}

                <div className="border-t my-1"></div>

                <DropdownMenuItem onClick={() => navigate("/apartments")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Impostazioni
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Content area with proper padding */}
      <div
        className={`pb-24 ${
          activeTab === "calendar" || activeTab === "statistics" ? "pt-6" : ""
        }`}
      >
        <Outlet context={{ selectedCalendar }} />
      </div>
    </div>
  );
};

export default BackofficeLayout;
