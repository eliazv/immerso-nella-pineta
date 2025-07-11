import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarType } from "@/types/calendar";
import { getDashboardStats } from "@/services/dashboardService";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RevenueChart from "@/components/dashboard/RevenueChart";
import OtaComparison from "@/components/dashboard/OtaComparison";
import SeasonalityChart from "@/components/dashboard/SeasonalityChart";
import SummaryCards from "@/components/dashboard/SummaryCards";
import {
  Calendar,
  TrendingUp,
  PieChart,
  BarChart,
  Loader2,
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";

// Interfaccia per il contesto condiviso dal layout
interface BackofficeContext {
  selectedCalendar: CalendarType;
}

const Statistics: React.FC = () => {
  const { selectedCalendar } = useOutletContext<BackofficeContext>();
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<any>(null);

  // Carica i dati quando il componente viene montato o cambiano i filtri
  useEffect(() => {
    loadStats();
  }, [selectedCalendar, selectedYear]);

  // Ricarica i dati quando la pagina diventa visibile (per catturare modifiche da altre pagine)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadStats(true); // Forza il refresh quando la pagina diventa visibile
      }
    };

    const handleFocus = () => {
      loadStats(true); // Forza il refresh quando la finestra torna in focus
    };

    // Listener per aggiornamenti dati
    const handleDataUpdate = () => {
      loadStats(true); // Ricarica quando cambiano prenotazioni o appartamenti
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Eventi personalizzati per aggiornamenti
    window.addEventListener("apartmentsUpdated", handleDataUpdate);
    window.addEventListener("bookingsUpdated", handleDataUpdate);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("apartmentsUpdated", handleDataUpdate);
      window.removeEventListener("bookingsUpdated", handleDataUpdate);
    };
  }, [selectedCalendar, selectedYear]);

  const loadStats = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const { stats } = await getDashboardStats(
        selectedCalendar,
        parseInt(selectedYear)
      );
      setStats(stats);

      if (forceRefresh) {
        console.log("Statistiche ricaricate forzatamente");
      }
    } catch (error) {
      console.error("Errore nel caricamento delle statistiche:", error);
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Genera gli anni disponibili (dal 2024 all'anno corrente)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => (2024 + i).toString()
  );

  // Funzione per ottenere il nome dell'appartamento
  const getApartmentName = (apartmentId: string) => {
    const apartment = apartments.find((apt) => apt.id === apartmentId);
    return apartment ? apartment.name : "Appartamento sconosciuto";
  };

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Mobile Header */}
      <MobileHeader
        pageTitle="Statistiche"
        // onNewBookingClick={() => setIsCreateModalOpen(true)}
        // onICalImportClick={() => setIsICalImportOpen(true)}
        onNotificationClick={() => console.log("Notifiche")}
        showCreateActions={true}
        showNotifications={true}
      />
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Anno" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : stats ? (
        <>
          {/* Schede riassuntive */}
          <SummaryCards stats={stats} />

          <Tabs defaultValue="revenue" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-8 w-full gap-2 sm:gap-0 h-16 items-stretch">
              <TabsTrigger
                value="revenue"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <TrendingUp className="h-4 w-4 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Ricavi</span>
              </TabsTrigger>
              <TabsTrigger
                value="occupancy"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <Calendar className="h-4 w-4 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Occupazione</span>
              </TabsTrigger>
              <TabsTrigger
                value="ota"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <PieChart className="h-4 w-4 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">OTA</span>
              </TabsTrigger>
              <TabsTrigger
                value="seasonality"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <BarChart className="h-4 w-4 mb-1 sm:mb-0" />
                <span className="text-xs sm:text-sm">Stagionalità</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Andamento Ricavi
                  </CardTitle>
                  <CardDescription>
                    Ricavi mensili per l'anno {selectedYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart
                    data={stats.monthlyRevenue}
                    selectedCalendar={selectedCalendar}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="occupancy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Tasso di Occupazione
                  </CardTitle>
                  <CardDescription>
                    Percentuale di occupazione mensile per l'anno {selectedYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OccupancyChart selectedCalendar={selectedCalendar} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ota" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Confronto OTA
                  </CardTitle>
                  <CardDescription>
                    Distribuzione delle prenotazioni per piattaforma nell'anno{" "}
                    {selectedYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OtaComparison
                    data={stats.otaComparison}
                    selectedCalendar={selectedCalendar}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seasonality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Analisi Stagionalità
                  </CardTitle>
                  <CardDescription>
                    Andamento stagionale delle prenotazioni per l'anno{" "}
                    {selectedYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SeasonalityChart
                    data={stats.seasonality}
                    selectedCalendar={selectedCalendar}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
            <div className="text-muted-foreground mb-4">
              <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">
                Nessun dato disponibile
              </h3>
              <p className="text-sm">
                Non ci sono dati sufficienti per generare le statistiche per
                l'anno {selectedYear}.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Statistics;
