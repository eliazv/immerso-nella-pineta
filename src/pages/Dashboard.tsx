import React, { useState, useEffect, lazy, Suspense } from "react";
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
const OccupancyChart = lazy(
  () => import("@/components/dashboard/OccupancyChart"),
);
const RevenueChart = lazy(() => import("@/components/dashboard/RevenueChart"));
const OtaComparison = lazy(
  () => import("@/components/dashboard/OtaComparison"),
);
const SeasonalityChart = lazy(
  () => import("@/components/dashboard/SeasonalityChart"),
);
import SummaryCards from "@/components/dashboard/SummaryCards";
import {
  Loader2,
  RefreshCw,
  Calendar,
  TrendingUp,
  PieChart,
  BarChart,
  Activity,
  Building,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Interfaccia per il contesto condiviso dal layout
interface BackofficeContext {
  selectedCalendar: CalendarType;
}

const Dashboard: React.FC = () => {
  const { selectedCalendar } = useOutletContext<BackofficeContext>();
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [stats, setStats] = useState<any>(null);
  const isMobile = useIsMobile();

  // Carica i dati quando il componente viene montato o cambiano i filtri
  useEffect(() => {
    loadStats();
  }, [selectedCalendar, selectedYear]);

  const loadStats = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      // Aggiunge un parametro per forzare il refresh nella funzione fetchBookings
      const { stats, isCachedData } = await getDashboardStats(
        selectedCalendar,
        parseInt(selectedYear),
      );
      setStats(stats);
      setIsCached(isCachedData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Errore nel caricamento delle statistiche:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Funzione per forzare un aggiornamento fresco dei dati
  const handleRefresh = () => {
    loadStats(true);
  };

  // Genera array di anni per il filtro (dal 2024 all'anno attuale)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => (2024 + i).toString(),
  );

  // Mappa tra codici calendario e nomi degli appartamenti
  const apartmentNames = {
    principale: "Appartamento 3",
    secondario: "Appartamento 4",
    terziario: "Appartamento 8",
  };

  return (
    <div className="space-y-6 px-2 md:px-6 lg:px-8 max-w-7xl mx-auto py-4">
      <div className="flex items-center justify-between gap-4 px-2 md:px-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-white">
            Statistiche
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground font-semibold mt-0.5 flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-primary" />
            {apartmentNames[selectedCalendar as keyof typeof apartmentNames]}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border shadow-sm uppercase">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger
              hideChevron
              className="w-[85px] md:w-[100px] h-7 md:h-8 border-none shadow-none focus:ring-0 font-bold text-xs md:text-sm p-0"
            >
              <SelectValue placeholder="Anno" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-none shadow-xl">
              {availableYears.map((year) => (
                <SelectItem
                  key={year}
                  value={year}
                  className="rounded-lg text-sm"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="min-h-[500px] flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <TrendingUp className="h-8 w-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-lg font-bold text-slate-400 animate-pulse">
            Elaborazione dati...
          </p>
        </div>
      ) : stats ? (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Schede riassuntive */}
          <SummaryCards stats={stats} />

          {/* Griglia Grafici - Stack su mobile, 2x2 su desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-4 pt-6 px-6 md:pt-8 md:px-8">
                <CardTitle className="text-xl font-black">
                  Andamento Ricavi
                </CardTitle>
                <CardDescription className="font-medium">
                  Ricavi mensili lordi per il {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-6 md:px-8 md:pb-8">
                <Suspense
                  fallback={
                    <div className="h-[350px] w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-3xl" />
                  }
                >
                  <RevenueChart data={stats.revenue} />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-4 pt-6 px-6 md:pt-8 md:px-8">
                <CardTitle className="text-xl font-black">
                  Occupazione
                </CardTitle>
                <CardDescription className="font-medium">
                  Saturazione delle disponibilità mensili
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-6 md:px-8 md:pb-8">
                <Suspense
                  fallback={
                    <div className="h-[350px] w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-3xl" />
                  }
                >
                  <OccupancyChart data={stats.occupancy} />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-4 pt-6 px-6 md:pt-8 md:px-8">
                <CardTitle className="text-xl font-black">
                  Canali di Vendita
                </CardTitle>
                <CardDescription className="font-medium">
                  Distribuzione delle prenotazioni per piattaforma
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-6 md:px-8 md:pb-8">
                <Suspense
                  fallback={
                    <div className="h-[350px] w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-3xl" />
                  }
                >
                  <OtaComparison data={stats.ota} />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden">
              <CardHeader className="px-6 pt-6 md:px-8 md:pt-8">
                <TrendingUp className="h-7 w-7 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-2xl font-black">
                  Top Performance
                </CardTitle>
                <CardDescription className="font-bold text-green-700/70 dark:text-green-400/70">
                  I periodi migliori del {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 md:px-8 md:pb-8">
                <div className="space-y-3">
                  {stats.topMonths
                    .slice(0, 4)
                    .map((month: any, index: number) => (
                      <div
                        key={month.month}
                        className="flex justify-between items-center p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${
                              index === 0
                                ? "bg-amber-400 text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="font-bold text-base">
                            {month.month}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-lg text-green-700 dark:text-green-400 leading-none">
                            € {month.revenue.toLocaleString("it-IT")}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 md:pt-8 md:px-8">
              <CardTitle className="text-xl font-black">Stagionalità</CardTitle>
              <CardDescription className="font-medium">
                Performance medie suddivise per stagioni
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-6 md:px-8 md:pb-8">
              <Suspense
                fallback={
                  <div className="h-[350px] w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-3xl" />
                }
              >
                <SeasonalityChart data={stats.seasonality} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center p-8">
          <p>Nessun dato disponibile per il periodo selezionato.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
