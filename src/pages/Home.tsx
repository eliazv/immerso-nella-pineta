import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  LogIn,
  LogOut,
  TrendingUp,
  Home as HomeIcon,
  Users,
  Calendar,
} from "lucide-react";

import OccupancyChart from "@/components/dashboard/OccupancyChart";
import Activities from "@/components/dashboard/Activities";
import QuickStats from "@/components/dashboard/QuickStats";
import ApartmentsList from "@/components/dashboard/ApartmentsList";
import ApartmentForm from "@/components/forms/ApartmentForm";
import BookingForm from "@/components/forms/BookingForm";
import MobileHeader from "@/components/MobileHeader";
import ICalImporter from "@/components/calendar/ICalImporter";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ApartmentViewModal from "@/components/modals/ApartmentViewModal";
import { useApartments } from "@/hooks/useApartments";
import { useBookings } from "@/hooks/useBookings";
import { useDashboardData } from "@/hooks/useDashboardData";
import { localStorageService } from "@/services/localStorageService";
import { CreateApartmentData } from "@/services/apartmentService";
import { CreateBookingData } from "@/services/localBookingService";
import { Apartment } from "@/types/calendar";
import { isToday } from "date-fns";
import { parseDate } from "@/utils/dateUtils";

const Home: React.FC = () => {
  const { toast } = useToast();

  // Custom hooks
  const {
    apartments,
    stats,
    isLoading: apartmentsLoading,
    createNewApartment,
    getDefaultFormData,
  } = useApartments();
  const {
    upcomingBookings,
    isLoading: bookingsLoading,
    createNewBooking,
    getDefaultBookingFormData,
  } = useBookings();
  const { occupancyData, dashboardStats, loadDashboardData } =
    useDashboardData();

  // Modal states
  const [isCreateApartmentModalOpen, setIsCreateApartmentModalOpen] =
    useState(false);
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);
  const [isICalImportOpen, setIsICalImportOpen] = useState(false);
  const [isViewApartmentModalOpen, setIsViewApartmentModalOpen] =
    useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

  // Handle apartment click
  const handleApartmentClick = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setIsViewApartmentModalOpen(true);
  };

  // Export/Import functions
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

  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event: any) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          localStorageService.importData(data);
          loadDashboardData();

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
    };
    input.click();
  };

  // Form data
  const [apartmentFormData, setApartmentFormData] =
    useState<CreateApartmentData>(getDefaultFormData());
  const [bookingFormData, setBookingFormData] = useState<CreateBookingData>(
    getDefaultBookingFormData(apartments[0]?.id)
  );

  // Handlers per le modali
  const handleCreateApartment = async () => {
    const success = await createNewApartment(apartmentFormData);
    if (success) {
      setIsCreateApartmentModalOpen(false);
      setApartmentFormData(getDefaultFormData());
      loadDashboardData();
    }
  };

  const handleCreateBooking = async () => {
    const success = await createNewBooking(bookingFormData);
    if (success) {
      setIsCreateBookingModalOpen(false);
      setBookingFormData(getDefaultBookingFormData(apartments[0]?.id));
      loadDashboardData();
    }
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="space-y-6">
          <MobileHeader
            pageTitle="Home"
            onNewBookingClick={() => setIsCreateBookingModalOpen(true)}
            onNewApartmentClick={() => setIsCreateApartmentModalOpen(true)}
            onICalImportClick={() => setIsICalImportOpen(true)}
            onNotificationClick={() => console.log("Notifiche")}
            onExportDataClick={handleExportData}
            onImportDataClick={handleImportData}
            showCreateActions={true}
            showNotifications={true}
          />
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
                    (sum: number, item: { count: number }) => sum + item.count,
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
                  occupancyData?.monthlyOccupancy?.map(
                    (item: { month: string; rate: number }) => ({
                      month: item.month.substring(0, 3),
                      value: item.rate,
                    })
                  ) || []
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
            <ApartmentsList
              apartments={apartments}
              onApartmentClick={handleApartmentClick}
            />
          </div>

          {/* Modali */}
          <ApartmentForm
            isOpen={isCreateApartmentModalOpen}
            onClose={() => setIsCreateApartmentModalOpen(false)}
            formData={apartmentFormData}
            onFormDataChange={setApartmentFormData}
            onSubmit={handleCreateApartment}
            isLoading={apartmentsLoading}
            apartments={apartments}
          />

          <BookingForm
            isOpen={isCreateBookingModalOpen}
            onClose={() => setIsCreateBookingModalOpen(false)}
            formData={bookingFormData}
            onFormDataChange={setBookingFormData}
            onSubmit={handleCreateBooking}
            isLoading={bookingsLoading}
            apartments={apartments}
          />

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

          {/* Apartment View Modal */}
          <ApartmentViewModal
            apartment={selectedApartment}
            isOpen={isViewApartmentModalOpen}
            onClose={() => {
              setIsViewApartmentModalOpen(false);
              setSelectedApartment(null);
            }}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
