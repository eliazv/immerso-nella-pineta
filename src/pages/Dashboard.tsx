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
import { Loader2, RefreshCw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  // Funzione per forzare un aggiornamento fresco dei dati
  const handleRefresh = () => {
    loadStats(true);
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
            Analisi per {apartmentNames[selectedCalendar]}
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

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {!isMobile && <span>Caricamento...</span>}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  {!isMobile && <span>Aggiorna dati</span>}
                </>
              )}
            </button>
          </div>
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

          <Tabs defaultValue="occupancy" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-8 w-full max-w-4xl">
              <TabsTrigger value="occupancy">Occupazione</TabsTrigger>
              <TabsTrigger value="revenue">Ricavi</TabsTrigger>
              <TabsTrigger value="ota">Confronto OTA</TabsTrigger>
              <TabsTrigger value="seasonality">Stagionalità</TabsTrigger>
            </TabsList>

            <TabsContent value="occupancy" className="animate-fade-in">
              <Card>
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

            <TabsContent value="revenue" className="animate-fade-in">
              <Card>
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

            <TabsContent value="ota" className="animate-fade-in">
              <Card>
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

            <TabsContent value="seasonality" className="animate-fade-in">
              <Card>
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
