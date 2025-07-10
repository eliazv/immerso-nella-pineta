import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Plus,
  Home as HomeIcon,
  Users,
  Bell,
  Download,
  AlertCircle,
  Upload,
  FileDown,
  Settings,
  LogIn,
  LogOut,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import OccupancyChart from "@/components/dashboard/OccupancyChart";
import Activities from "@/components/dashboard/Activities";
import QuickStats from "@/components/dashboard/QuickStats";
import { Booking, Apartment } from "@/types/calendar";
import { localStorageService } from "@/services/localStorageService";
import {
  getActiveApartments,
  getApartmentStats,
  createApartment,
  CreateApartmentData,
} from "@/services/apartmentService";
import {
  createBooking,
  CreateBookingData,
} from "@/services/localBookingService";
import { isToday, parseISO, addDays } from "date-fns";
import { getDashboardStats } from "@/services/dashboardService";
import ICalImporter from "@/components/calendar/ICalImporter";
import { ApartmentIcon } from "@/utils/apartmentIcons";

const Home: React.FC = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    inactive: number;
    totalCapacity: number;
    averagePrice: number;
  } | null>(null);
  const [occupancyData, setOccupancyData] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [isCreateApartmentModalOpen, setIsCreateApartmentModalOpen] =
    useState(false);
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);
  const [isICalImportOpen, setIsICalImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form data per nuovo appartamento
  const [apartmentFormData, setApartmentFormData] =
    useState<CreateApartmentData>({
      name: "",
      description: "",
      maxGuests: 4,
      address: "",
      amenities: [],
      basePrice: 0,
      cleaningFee: 0,
      isActive: true,
      color: "#3DA9A9",
      icon: "Home",
    });

  // Form data per nuova prenotazione
  const [bookingFormData, setBookingFormData] = useState<CreateBookingData>({
    Nome: "",
    OTA: "",
    CheckIn: "",
    CheckOut: "",
    Notti: "1",
    adulti: "2",
    bambini: "0",
    animali: "0",
    TotaleCliente: "0",
    FuoriOTA: "0",
    CostoNotti: "0",
    MediaANotte: "0",
    Pulizia: "0",
    Sconti: "0",
    SoggiornoTax: "0",
    OTATax: "0",
    CedolareSecca: "0",
    Totale: "0",
    Note: "",
    apartment: "",
  });

  const loadDashboardData = async () => {
    // Carica appartamenti
    const apartmentList = getActiveApartments();
    setApartments(apartmentList);

    // Carica statistiche appartamenti
    const apartmentStats = getApartmentStats();
    setStats(apartmentStats);

    // Carica dati di occupazione reali
    try {
      const dashboardStatsData = await getDashboardStats(
        "all",
        new Date().getFullYear()
      );
      setDashboardStats(dashboardStatsData.stats);
      setOccupancyData(dashboardStatsData.stats.occupancy);
    } catch (error) {
      console.error("Errore nel caricamento dati occupazione:", error);
    }

    // Carica prenotazioni prossime (prossimi 7 giorni)
    const allBookings = localStorageService.getBookings();
    const today = new Date();
    const nextWeek = addDays(today, 7);

    const upcoming = allBookings
      .filter((booking) => {
        const checkInDate = parseDate(booking.CheckIn);
        const checkOutDate = parseDate(booking.CheckOut);
        return (
          (checkInDate && checkInDate >= today && checkInDate <= nextWeek) ||
          (checkOutDate && checkOutDate >= today && checkOutDate <= nextWeek)
        );
      })
      .sort((a, b) => {
        const dateA = parseDate(a.CheckIn) || new Date();
        const dateB = parseDate(b.CheckIn) || new Date();
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 6); // Mostra solo le prime 6

    setUpcomingBookings(upcoming);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Funzioni per gestire le modali
  const resetApartmentForm = () => {
    setApartmentFormData({
      name: "",
      description: "",
      maxGuests: 4,
      address: "",
      amenities: [],
      basePrice: 0,
      cleaningFee: 0,
      isActive: true,
      color: "#3DA9A9",
      icon: "Home",
    });
  };

  const resetBookingForm = () => {
    setBookingFormData({
      Nome: "",
      OTA: "",
      CheckIn: "",
      CheckOut: "",
      Notti: "1",
      adulti: "2",
      bambini: "0",
      animali: "0",
      TotaleCliente: "0",
      FuoriOTA: "0",
      CostoNotti: "0",
      MediaANotte: "0",
      Pulizia: "0",
      Sconti: "0",
      SoggiornoTax: "0",
      OTATax: "0",
      CedolareSecca: "0",
      Totale: "0",
      Note: "",
      apartment: apartments[0]?.id || "",
    });
  };

  const handleCreateApartment = async () => {
    try {
      setIsLoading(true);
      await createApartment(apartmentFormData);
      toast({
        title: "Successo",
        description: "Alloggio creato con successo",
      });
      loadDashboardData();
      setIsCreateApartmentModalOpen(false);
      resetApartmentForm();
    } catch (error) {
      toast({
        title: "Errore",
        description:
          error instanceof Error ? error.message : "Errore nella creazione",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBooking = async () => {
    try {
      setIsLoading(true);
      await createBooking(bookingFormData);
      toast({
        title: "Successo",
        description: "Prenotazione creata con successo",
      });
      loadDashboardData();
      setIsCreateBookingModalOpen(false);
      resetBookingForm();
    } catch (error) {
      toast({
        title: "Errore",
        description:
          error instanceof Error ? error.message : "Errore nella creazione",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;

    // Se la data è in formato DD/MM/YYYY
    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    // Se la data è in formato YYYY-MM-DD
    if (dateString.includes("-")) {
      return parseISO(dateString);
    }

    return null;
  };

  // Funzioni per export/import dati
  const handleExportData = () => {
    try {
      const data = localStorageService.exportData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rentpilot-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export completato",
        description: "I dati sono stati esportati con successo",
      });
    } catch (error) {
      toast({
        title: "Errore export",
        description: "Errore durante l'esportazione dei dati",
        variant: "destructive",
      });
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        localStorageService.importData(data);
        loadDashboardData(); // Ricarica i dati

        toast({
          title: "Import completato",
          description: "I dati sono stati importati con successo",
        });
      } catch (error) {
        toast({
          title: "Errore import",
          description: "File non valido o corrotto",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = "";
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="space-y-6">
        {/* Mobile Header Section */}
        <div className="flex items-center justify-between">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <img
              src="/rentpilot.svg"
              alt="RentPilot"
              className="h-10 w-10 mr-2"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-petrolio">RentPilot</span>
              <span className="font-bold text-lg text-ardesia">Dashboard</span>
            </div>
          </div>

          {/* Pulsanti Azione */}
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
                    onClick={() => setIsCreateBookingModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Nuova Prenotazione
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsCreateApartmentModalOpen(true)}
                  >
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Nuovo Alloggio
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsICalImportOpen(true)}>
                    <Download className="h-4 w-4 mr-2" />
                    Importa da iCal
                  </DropdownMenuItem>
                  <div className="border-t my-1"></div>
                  <DropdownMenuItem onClick={handleExportData}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Esporta Dati
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <label className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Importa Dati
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="bg-white rounded-full shadow-sm border border-gray-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-petrolio/10 transition-colors"
                  >
                    <Bell className="h-4 w-4 text-ardesia hover:text-petrolio" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4">
                    <h3 className="font-semibold text-ardesia mb-3">
                      Notifiche
                    </h3>
                    <div className="space-y-3">
                      <div className="text-center py-4 text-muted-foreground">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nessuna notifica</p>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex items-center gap-2 text-sm text-ardesia/60 mb-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>
                            Attiva le notifiche per check-in/check-out
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            // Trigger notification permission request
                            if (
                              "Notification" in window &&
                              Notification.permission === "default"
                            ) {
                              Notification.requestPermission().then(
                                (permission) => {
                                  if (permission === "granted") {
                                    toast({
                                      title: "Notifiche attivate",
                                      description:
                                        "Riceverai notifiche per check-in e check-out",
                                    });
                                  }
                                }
                              );
                            } else if (Notification.permission === "granted") {
                              toast({
                                title: "Notifiche già attive",
                                description: "Le notifiche sono già abilitate",
                              });
                            } else {
                              toast({
                                title: "Notifiche bloccate",
                                description:
                                  "Abilita le notifiche nelle impostazioni del browser",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          Attiva Notifiche
                        </Button>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* Quick Stats Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            {apartments.length === 0 && (
              <div className="text-sm text-ardesia/60">
                Benvenuto! Inizia creando il tuo primo alloggio
              </div>
            )}
          </div>
          <QuickStats
            data={{
              totalRevenue:
                dashboardStats?.revenue?.totalRevenue ||
                Math.round(
                  localStorageService
                    .getBookings()
                    .reduce(
                      (sum, booking) =>
                        sum +
                        (parseFloat(
                          booking.Totale?.replace("€", "").replace(",", ".")
                        ) || 0),
                      0
                    )
                ),
              monthlyRevenue: Math.round(
                localStorageService
                  .getBookings()
                  .filter(
                    (booking) =>
                      new Date(booking.CheckIn).getMonth() ===
                      new Date().getMonth()
                  )
                  .reduce(
                    (sum, booking) =>
                      sum +
                      (parseFloat(
                        booking.Totale?.replace("€", "").replace(",", ".")
                      ) || 0),
                    0
                  )
              ),
              totalBookings:
                dashboardStats?.ota?.bookingCount?.reduce(
                  (sum: number, item: any) => sum + item.count,
                  0
                ) || localStorageService.getBookings().length,
              occupancyRate: occupancyData?.occupancyRate || 0,
              averageNightly:
                dashboardStats?.revenue?.averagePerNight ||
                Math.round(stats?.averagePrice || 0),
              activeProperties: stats?.active || 0,
            }}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <OccupancyChart
              data={
                occupancyData?.monthlyOccupancy?.map((item: any) => ({
                  month: item.month.substring(0, 3),
                  value: item.rate,
                })) || []
              }
            />
          </div>

          {/* Right Column - Activities */}
          <div className="space-y-6">
            <Activities upcomingBookings={upcomingBookings} />
          </div>
        </div>

        {/* Upcoming Bookings Section */}
        <div>
          <h2 className="text-xl font-semibold text-ardesia mb-4">
            Prossimi Check-in/Check-out
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingBookings.slice(0, 4).map((booking, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-petrolio/10">
                        {isToday(parseDate(booking.CheckIn) || new Date()) ? (
                          <LogIn className="h-4 w-4 text-petrolio" />
                        ) : (
                          <LogOut className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <span className="font-semibold text-ardesia">
                        {booking.Nome}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {booking.apartment || "N/A"}
                    </Badge>
                  </div>
                  <div className="text-sm text-ardesia/60 mb-2">
                    {isToday(parseDate(booking.CheckIn) || new Date())
                      ? `Check-in: ${booking.CheckIn}`
                      : `Check-out: ${booking.CheckOut}`}
                  </div>
                  <div className="flex items-center justify-between text-xs text-ardesia/50">
                    <span>{booking.Notti} notti</span>
                    <span className="font-semibold text-petrolio">
                      {booking.TotaleNetto && booking.TotaleNetto !== ""
                        ? `€${booking.TotaleNetto}`
                        : booking.Totale}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Legacy stats for reference - can be removed later */}
        <div
          className="grid gap-4 grid-cols-2 lg:grid-cols-4"
          style={{ display: "none" }}
        >
          <Card>
            <CardContent className="flex flex-col items-start p-3">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                  <HomeIcon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Alloggi Attivi
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{stats?.active || 0}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  di {stats?.total || 0} totali
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Capacità Totale
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.totalCapacity || 0}
              </div>
              <p className="text-xs text-muted-foreground">ospiti massimi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prenotazioni
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {localStorageService.getBookings().length}
              </div>
              <p className="text-xs text-muted-foreground">
                totali nel sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prezzo Medio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{Math.round(stats?.averagePrice || 0)}
              </div>
              <p className="text-xs text-muted-foreground">per notte</p>
            </CardContent>
          </Card>
        </div>

        {/* I Tuoi Alloggi */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Alloggi Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HomeIcon className="h-5 w-5" />I Tuoi Alloggi
              </CardTitle>
              <CardDescription>
                Panoramica degli appartamenti gestiti
              </CardDescription>
            </CardHeader>
            <CardContent>
              {apartments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <HomeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nessun alloggio configurato</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate("/apartments")}
                  >
                    Aggiungi Primo Alloggio
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {apartments.map((apartment) => {
                    const bookingsCount =
                      localStorageService.getBookingsByApartment(
                        apartment.id
                      ).length;
                    const totalRevenue = localStorageService
                      .getBookingsByApartment(apartment.id)
                      .reduce((sum, booking) => {
                        const amount = parseFloat(
                          (booking.TotaleNetto || booking.Totale || "0")
                            .replace("€", "")
                            .replace(",", ".")
                        );
                        return sum + (isNaN(amount) ? 0 : amount);
                      }, 0);

                    return (
                      <div
                        key={apartment.id}
                        className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => navigate("/apartments")}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${apartment.color}20` }}
                          >
                            <ApartmentIcon
                              iconName={apartment.icon}
                              color={apartment.color}
                              size={20}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-ardesia">
                              {apartment.name}
                            </div>
                            <div className="text-sm text-ardesia/60">
                              {apartment.description || "Nessuna descrizione"}
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-ardesia/50 flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Max {apartment.maxGuests} ospiti
                              </span>
                              {apartment.basePrice &&
                                apartment.basePrice > 0 && (
                                  <span className="text-xs text-ardesia/50">
                                    €{apartment.basePrice}/notte
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-ardesia">
                            {bookingsCount} prenotazioni
                          </div>
                          {totalRevenue > 0 && (
                            <div className="text-sm text-menta font-medium">
                              €{totalRevenue.toFixed(0)}
                            </div>
                          )}
                          <div className="text-xs text-ardesia/50 mt-1">
                            {apartment.isActive ? "Attivo" : "Inattivo"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-2 border-t">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/apartments")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Gestisci Tutti gli Alloggi
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modali */}
        {/* Modale per creare nuovo appartamento */}
        <Dialog
          open={isCreateApartmentModalOpen}
          onOpenChange={setIsCreateApartmentModalOpen}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crea Nuovo Alloggio</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli del nuovo alloggio
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={apartmentFormData.name}
                    onChange={(e) =>
                      setApartmentFormData({
                        ...apartmentFormData,
                        name: e.target.value,
                      })
                    }
                    placeholder="es. N° 3"
                  />
                </div>
                <div>
                  <Label htmlFor="maxGuests">Max Ospiti *</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    min="1"
                    max="20"
                    value={apartmentFormData.maxGuests}
                    onChange={(e) =>
                      setApartmentFormData({
                        ...apartmentFormData,
                        maxGuests: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={apartmentFormData.description}
                  onChange={(e) =>
                    setApartmentFormData({
                      ...apartmentFormData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Descrizione dell'alloggio..."
                />
              </div>

              {/* Icon and Color Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Icona</Label>
                  <Select
                    value={apartmentFormData.icon}
                    onValueChange={(value) =>
                      setApartmentFormData({
                        ...apartmentFormData,
                        icon: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <ApartmentIcon
                            iconName={apartmentFormData.icon}
                            color={apartmentFormData.color}
                          />
                          <span>{apartmentFormData.icon}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Home",
                        "Building",
                        "Castle",
                        "House",
                        "Building2",
                        "TreePine",
                        "Waves",
                        "Mountain",
                        "Sun",
                        "Star",
                      ].map((iconName) => (
                        <SelectItem key={iconName} value={iconName}>
                          <div className="flex items-center gap-2">
                            <ApartmentIcon
                              iconName={iconName}
                              color={apartmentFormData.color}
                            />
                            <span>{iconName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Colore</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={apartmentFormData.color}
                      onChange={(e) =>
                        setApartmentFormData({
                          ...apartmentFormData,
                          color: e.target.value,
                        })
                      }
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={apartmentFormData.color}
                      onChange={(e) =>
                        setApartmentFormData({
                          ...apartmentFormData,
                          color: e.target.value,
                        })
                      }
                      placeholder="#3DA9A9"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basePrice">Prezzo Base (€/notte)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={apartmentFormData.basePrice}
                    onChange={(e) =>
                      setApartmentFormData({
                        ...apartmentFormData,
                        basePrice: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cleaningFee">Costo Pulizia (€)</Label>
                  <Input
                    id="cleaningFee"
                    type="number"
                    min="0"
                    step="0.01"
                    value={apartmentFormData.cleaningFee}
                    onChange={(e) =>
                      setApartmentFormData({
                        ...apartmentFormData,
                        cleaningFee: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateApartmentModalOpen(false)}
              >
                Annulla
              </Button>
              <Button onClick={handleCreateApartment} disabled={isLoading}>
                {isLoading ? "Creazione..." : "Crea Alloggio"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modale per creare nuova prenotazione */}
        <Dialog
          open={isCreateBookingModalOpen}
          onOpenChange={setIsCreateBookingModalOpen}
        >
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crea Nuova Prenotazione</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli della nuova prenotazione
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Cliente *</Label>
                  <Input
                    id="nome"
                    value={bookingFormData.Nome}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        Nome: e.target.value,
                      })
                    }
                    placeholder="Nome del cliente"
                  />
                </div>
                <div>
                  <Label htmlFor="apartment">Appartamento *</Label>
                  <Select
                    value={bookingFormData.apartment}
                    onValueChange={(value) =>
                      setBookingFormData({
                        ...bookingFormData,
                        apartment: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona appartamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {apartments.map((apartment) => (
                        <SelectItem key={apartment.id} value={apartment.id}>
                          {apartment.name} - {apartment.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="ota">OTA/Canale</Label>
                <Select
                  value={bookingFormData.OTA}
                  onValueChange={(value) =>
                    setBookingFormData({ ...bookingFormData, OTA: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona canale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Airbnb">Airbnb</SelectItem>
                    <SelectItem value="Booking.com">Booking.com</SelectItem>
                    <SelectItem value="Diretto">Diretto</SelectItem>
                    <SelectItem value="Altro">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkin">Check-in *</Label>
                  <Input
                    id="checkin"
                    type="date"
                    value={bookingFormData.CheckIn}
                    onChange={(e) => {
                      const newCheckIn = e.target.value;
                      setBookingFormData({
                        ...bookingFormData,
                        CheckIn: newCheckIn,
                        // Se il check-out è prima o uguale al check-in, resettalo
                        CheckOut:
                          bookingFormData.CheckOut &&
                          bookingFormData.CheckOut <= newCheckIn
                            ? ""
                            : bookingFormData.CheckOut,
                      });
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="checkout">Check-out *</Label>
                  <Input
                    id="checkout"
                    type="date"
                    value={bookingFormData.CheckOut}
                    min={
                      bookingFormData.CheckIn
                        ? new Date(
                            new Date(bookingFormData.CheckIn).getTime() +
                              24 * 60 * 60 * 1000
                          )
                            .toISOString()
                            .split("T")[0]
                        : undefined
                    }
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        CheckOut: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="adulti">Adulti</Label>
                  <Input
                    id="adulti"
                    type="number"
                    min="1"
                    value={bookingFormData.adulti}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        adulti: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bambini">Bambini</Label>
                  <Input
                    id="bambini"
                    type="number"
                    min="0"
                    value={bookingFormData.bambini}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        bambini: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="totaleCliente">Totale Cliente (€)</Label>
                  <Input
                    id="totaleCliente"
                    type="number"
                    step="0.01"
                    value={bookingFormData.TotaleCliente}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        TotaleCliente: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="soggiornoTax">Tassa di Soggiorno (€)</Label>
                  <Input
                    id="soggiornoTax"
                    type="number"
                    step="0.01"
                    value={bookingFormData.SoggiornoTax}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        SoggiornoTax: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="otaTax">OTA Tax (€)</Label>
                  <Input
                    id="otaTax"
                    type="number"
                    step="0.01"
                    value={bookingFormData.OTATax}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        OTATax: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="sconti">Sconti (€)</Label>
                  <Input
                    id="sconti"
                    type="number"
                    step="0.01"
                    value={bookingFormData.Sconti}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        Sconti: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-lg font-semibold">Totale Netto</Label>
                <div className="text-2xl font-bold text-green-600">
                  €
                  {(
                    parseFloat(bookingFormData.TotaleCliente || "0") -
                    parseFloat(bookingFormData.SoggiornoTax || "0") -
                    parseFloat(bookingFormData.OTATax || "0") -
                    parseFloat(bookingFormData.Sconti || "0")
                  ).toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Totale Cliente - Tasse - Sconti
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateBookingModalOpen(false)}
              >
                Annulla
              </Button>
              <Button onClick={handleCreateBooking} disabled={isLoading}>
                {isLoading ? "Creazione..." : "Crea Prenotazione"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Importatore iCal */}
        <ICalImporter
          isOpen={isICalImportOpen}
          onClose={() => setIsICalImportOpen(false)}
          apartments={apartments}
          onImportComplete={(importedBookings) => {
            // Ricarica i dati dopo l'importazione
            loadDashboardData();
            toast({
              title: "Importazione completata",
              description: `${importedBookings.length} prenotazioni importate con successo`,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Home;
