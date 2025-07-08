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

// Interfaccia per il contesto condiviso dal layout
interface BackofficeContext {
  selectedCalendar: CalendarType;
}

const Dashboard: React.FC = () => {
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

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const { stats } = await getDashboardStats(
        selectedCalendar,
        parseInt(selectedYear)
      );
      setStats(stats);
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

  // Mappa tra codici calendario e nomi degli appartamenti
  const apartmentNames = {
    principale: "Appartamento 3",
    secondario: "Appartamento 4",
    terziario: "Appartamento 8",
  };

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-medium">Statistiche e Performance</h2>
          <p className="text-muted-foreground">
            {apartmentNames[selectedCalendar]}
          </p>
        </div>
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
