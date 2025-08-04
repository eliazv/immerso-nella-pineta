import React, { useState, useEffect } from "react";
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
  Loader2,
  Calendar,
  TrendingUp,
  PieChart,
  BarChart,
  House,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AccommodationService } from "@/services/accommodationService";

const Dashboard: React.FC = () => {
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [stats, setStats] = useState<any>(null);
  const isMobile = useIsMobile();

  // Load saved apartment selection
  useEffect(() => {
    const savedCalendar = localStorage.getItem("selectedApartment");
    if (savedCalendar) {
      setSelectedCalendar(savedCalendar as CalendarType);
    }
  }, []);

  // Save apartment selection
  const handleCalendarChange = (value: CalendarType) => {
    setSelectedCalendar(value);
    localStorage.setItem("selectedApartment", value);
  };

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
        parseInt(selectedYear)
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

  // Genera array di anni per il filtro (dal 2024 all'anno attuale)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => (2024 + i).toString()
  );

  // Get dynamic apartment mappings from AccommodationService
  const apartmentNames = AccommodationService.getCalendarTypeMapping();

  // Get apartment options for selector
  const accommodations = AccommodationService.getActiveAccommodations();
  const apartmentOptions = [
    ...accommodations.map((acc) => ({
      value: acc.id,
      label: acc.name,
      shortLabel: acc.shortName,
    })),
    { value: "all", label: "Tutti gli appartamenti", shortLabel: "Tutti" },
  ];

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Statistiche e Performance</h1>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Select value={selectedCalendar} onValueChange={handleCalendarChange}>
            <SelectTrigger className="w-[180px] sm:w-[220px]">
              <div className="flex items-center gap-2">
                <House className="h-4 w-4" />
                <SelectValue placeholder="Seleziona appartamento" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {apartmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">{option.shortLabel}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px] sm:w-[120px]">
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
                <TrendingUp className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
                <span className="sm:hidden">Ricavi</span>
                <span className="hidden sm:inline">Ricavi</span>
              </TabsTrigger>
              <TabsTrigger
                value="occupancy"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <Calendar className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
                <span className="sm:hidden">Occup.</span>
                <span className="hidden sm:inline">Occupazione</span>
              </TabsTrigger>
              <TabsTrigger
                value="ota"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <PieChart className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
                <span className="sm:hidden">OTA</span>
                <span className="hidden sm:inline">Confronto OTA</span>
              </TabsTrigger>
              <TabsTrigger
                value="seasonality"
                className="flex flex-col items-center h-full py-0 text-base sm:flex-row sm:py-2 sm:text-sm gap-0 sm:gap-1"
              >
                <BarChart className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
                <span className="sm:hidden">Stag.</span>
                <span className="hidden sm:inline">Stagionalità</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="occupancy" className="animate-fade-in w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Tasso di Occupazione</CardTitle>
                  <CardDescription>
                    Analisi mensile del tasso di occupazione dell'appartamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OccupancyChart data={stats.occupancy} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="animate-fade-in w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Andamento Ricavi</CardTitle>
                  <CardDescription>
                    Ricavi mensili e analisi delle tendenze
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart data={stats.revenue} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ota" className="animate-fade-in w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Confronto tra Piattaforme (OTA)</CardTitle>
                  <CardDescription>
                    Analisi delle prenotazioni e dei ricavi per piattaforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <OtaComparison data={stats.ota} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seasonality" className="animate-fade-in w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Stagionalità</CardTitle>
                  <CardDescription>
                    Analisi dei prezzi e delle prenotazioni in base al periodo
                    dell'anno
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SeasonalityChart data={stats.seasonality} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Sezione migliori e peggiori mesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Mesi più redditizi</CardTitle>
                <CardDescription>
                  I mesi con il maggior ricavo dell'anno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topMonths.map((month: any, index: number) => (
                    <div
                      key={month.month}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{month.month}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          € {month.revenue.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Occupazione: {month.occupancyRate.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Periodi da migliorare</CardTitle>
                <CardDescription>
                  I mesi con il minor ricavo dell'anno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.worstMonths.map((month: any, index: number) => (
                    <div
                      key={month.month}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{month.month}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          € {month.revenue.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Occupazione: {month.occupancyRate.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="text-center p-8">
          <p>Nessun dato disponibile per il periodo selezionato.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
