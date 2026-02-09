import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  BarChart3,
  Building,
  House,
  Bell,
  BellOff,
  Menu,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PinAuth from "@/components/calendar/PinAuth";
import { CalendarType } from "@/types/calendar";
import { isAuthenticated, logout } from "@/services/authService";
import { ThemeToggle } from "./ThemeToggle";
import { notificationService } from "@/services/notificationService";
import { fetchBookings } from "@/services/bookingService";

/**
 * Layout condiviso per le pagine del backoffice (Dashboard e Calendario)
 * Si occupa della gestione dell'autenticazione e della navigazione tra le sezioni
 */

const BackofficeLayout: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notifPermission, setNotifPermission] = useState<string>(
    typeof window !== "undefined" ? Notification.permission : "default",
  );
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

  // Effetto per il controllo periodico delle prenotazioni (per notifiche)
  useEffect(() => {
    if (isAuth) {
      const checkNotifs = async () => {
        try {
          const { bookings } = await fetchBookings("all");
          notificationService.checkBookingEvents(bookings);
        } catch (error) {
          console.error("Errore nel controllo notifiche:", error);
        }
      };

      // Controlla subito al caricamento
      checkNotifs();

      // Poi controlla ogni 6 ore
      const interval = setInterval(checkNotifs, 1000 * 60 * 60 * 6);
      return () => clearInterval(interval);
    }
  }, [isAuth]);

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
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
          <Building className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
          Verifica accesso...
        </p>
      </div>
    );
  }

  // Se l'utente non è autenticato, mostra il form di autenticazione
  if (!isAuth) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex items-center justify-center">
        <PinAuth onAuthenticate={() => setIsAuth(true)} className="w-full" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - Visibile solo su Desktop */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b z-50 hidden md:block">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4 max-w-6xl">
          <div className="flex items-center gap-3">
            {/* Home button - Hidden on Mobile (moved to hamburger), visible on Desktop */}
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-accent rounded-full transition-colors hidden md:flex text-muted-foreground hover:text-foreground"
              title="Torna al sito"
            >
              <House className="h-5 w-5" />
            </button>

            <div className="h-6 w-[1px] bg-border hidden md:block" />

            <Select
              value={selectedCalendar}
              onValueChange={(value) =>
                handleCalendarChange(value as CalendarType)
              }
            >
              <SelectTrigger className="w-[140px] md:w-[180px] border-none shadow-none bg-muted hover:bg-accent focus:ring-0 rounded-2xl">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Building className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate font-medium text-foreground">
                    {apartmentOptions.find((o) => o.value === selectedCalendar)
                      ?.label || "Seleziona"}
                  </span>
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

          {/* Actions Area */}
          <div className="flex items-center gap-2">
            {/* Desktop Navigation & Actions */}
            <div className="hidden md:flex items-center gap-4">
              <nav className="bg-muted p-1 rounded-2xl flex items-center gap-1">
                <button
                  onClick={() => handleTabChange("calendar")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === "calendar"
                      ? "bg-background shadow-sm text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Calendario
                </button>
                <button
                  onClick={() => handleTabChange("dashboard")}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === "dashboard"
                      ? "bg-background shadow-sm text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Statistiche
                </button>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const p = await notificationService.requestPermission();
                    setNotifPermission(p);
                  }}
                  className={`p-2.5 rounded-full transition-colors ${
                    notifPermission === "granted"
                      ? "text-primary hover:bg-primary/10"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                  title={
                    notifPermission === "granted"
                      ? "Notifiche attive"
                      : "Attiva notifiche"
                  }
                >
                  {notifPermission === "granted" ? (
                    <Bell className="h-5 w-5" />
                  ) : (
                    <BellOff className="h-5 w-5" />
                  )}
                </button>

                <ThemeToggle />

                <button
                  onClick={handleLogout}
                  className="p-2.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-slate-400"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile Actions: REMOVED (moved to footer) */}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-4 md:pt-20 pb-28 md:pb-8 container mx-auto px-0 md:px-4 max-w-6xl">
        <Outlet context={{ selectedCalendar }} />
      </main>

      {/* Mobile Bottom Navigation - Floating style (NEW) */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-1.5 flex items-center gap-1 md:hidden">
        {/* Selettore Alloggio Mobile */}
        <Select
          value={selectedCalendar}
          onValueChange={(value) => handleCalendarChange(value as CalendarType)}
        >
          <SelectTrigger
            hideChevron
            className="w-14 h-11 border-none bg-slate-100 dark:bg-slate-800 rounded-full focus:ring-0 p-0 flex flex-col items-center justify-center"
          >
            <House className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black leading-none mt-0.5">
              {apartmentOptions
                .find((o) => o.value === selectedCalendar)
                ?.label.replace("N° ", "") || "ALL"}
            </span>
          </SelectTrigger>
          <SelectContent className="rounded-3xl border-none shadow-2xl">
            {apartmentOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="rounded-xl"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1 flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 rounded-full p-1">
          <button
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all ${
              activeTab === "calendar"
                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                : "text-slate-400"
            }`}
            onClick={() => handleTabChange("calendar")}
          >
            <Calendar className="h-4 w-4" />
            <span className="text-[8px] font-black uppercase tracking-widest">
              Cal
            </span>
          </button>
          <button
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-full transition-all ${
              activeTab === "dashboard"
                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                : "text-slate-400"
            }`}
            onClick={() => handleTabChange("dashboard")}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-[8px] font-black uppercase tracking-widest">
              Stats
            </span>
          </button>
        </div>

        {/* Hamburger/Menu Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-11 h-11 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-[2.5rem] border-none bg-white dark:bg-slate-950 p-6 pb-10"
          >
            <SheetHeader className="text-center pb-6">
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4" />
              <SheetTitle className="text-xl font-black">Opzioni</SheetTitle>
            </SheetHeader>

            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <House className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  Sito
                </span>
              </button>

              <button
                onClick={async () => {
                  const p = await notificationService.requestPermission();
                  setNotifPermission(p);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${notifPermission === "granted" ? "bg-green-50 dark:bg-green-900/20" : "bg-slate-100 dark:bg-slate-800"} flex items-center justify-center`}
                >
                  {notifPermission === "granted" ? (
                    <Bell className="h-6 w-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <BellOff className="h-6 w-6 text-slate-400" />
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  Notif
                </span>
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  Tema
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  Esci
                </span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default BackofficeLayout;
