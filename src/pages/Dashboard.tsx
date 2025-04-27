import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Loader2 } from "lucide-react";

const Dashboard: React.FC = () => {
  const [selectedCalendar, setSelectedCalendar] =
    useState<CalendarType>("principale");
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

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
        navigate("/calendar"); // Reindirizza alla pagina di autenticazione
      }
    } else {
      navigate("/calendar"); // Reindirizza alla pagina di autenticazione
    }
  }, [navigate]);

  // Carica i dati quando l'utente è autenticato o cambia i filtri
  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated, selectedCalendar, selectedYear]);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const stats = await getDashboardStats(
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

  // Genera array di anni per il filtro (ultimi 5 anni)
  const availableYears = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  if (!isAuthenticated) {
    return null; // Non mostrare nulla se non autenticato
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-serif font-medium mb-6">
        Dashboard Gestionale
      </h1>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl">Statistiche e Performance</h2>
          <p className="text-muted-foreground">
            Analisi delle prenotazioni e dei ricavi
          </p>
        </div>
        <div className="flex gap-4">
          <Select
            value={selectedCalendar}
            onValueChange={(value) =>
              setSelectedCalendar(value as CalendarType)
            }
          >
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="Seleziona appartamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="principale">Appartamento N° 3</SelectItem>
              <SelectItem value="secondario">Appartamento N° 4</SelectItem>
              <SelectItem value="terziario">Appartamento N° 8</SelectItem>
            </SelectContent>
          </Select>

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
