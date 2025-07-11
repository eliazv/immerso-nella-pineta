import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardStats } from "@/services/dashboardService";
import { Calendar, TrendingUp, Users, Activity } from "lucide-react";

interface SummaryCardsProps {
  stats: DashboardStats;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  const { occupancy, revenue } = stats;

  // Calcola prenotazioni totali (somma di tutte le prenotazioni per OTA)
  const totalBookings = stats.ota.bookingCount.reduce(
    (sum, item) => sum + item.count,
    0
  );

  // Ottieni media pernottamenti
  const averageNights =
    totalBookings > 0
      ? Math.round((occupancy.occupiedDays / totalBookings) * 10) / 10
      : 0;

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
        <CardContent className="flex flex-col items-start p-6">
          <div className="flex items-center mb-3">
            <div className="bg-menta/10 p-2.5 rounded-xl mr-3">
              <TrendingUp className="h-5 w-5 text-menta" />
            </div>
            <p className="text-sm font-medium text-ardesia/60">Ricavi Totali</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ardesia">
              € {(revenue.totalRevenue || 0).toLocaleString("it-IT")}
            </h3>
            <p className="text-xs text-ardesia/60 mt-1">
              € {revenue.averagePerNight || 0} media a notte
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
        <CardContent className="flex flex-col items-start p-6">
          <div className="flex items-center mb-3">
            <div className="bg-petrolio/10 p-2.5 rounded-xl mr-3">
              <Calendar className="h-5 w-5 text-petrolio" />
            </div>
            <p className="text-sm font-medium text-ardesia/60">
              Tasso di Occupazione
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ardesia">
              {occupancy.occupancyRate}%
            </h3>
            <p className="text-xs text-ardesia/60 mt-1">
              {occupancy.occupiedDays} giorni su {occupancy.totalDays}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
        <CardContent className="flex flex-col items-start p-6">
          <div className="flex items-center mb-3">
            <div className="bg-petrolio/10 p-2.5 rounded-xl mr-3">
              <Users className="h-5 w-5 text-petrolio" />
            </div>
            <p className="text-sm font-medium text-ardesia/60">Prenotazioni</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ardesia">{totalBookings}</h3>
            <p className="text-xs text-ardesia/60 mt-1">
              € {(revenue.averagePerBooking || 0).toLocaleString("it-IT")} media
              per prenotazione
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
        <CardContent className="flex flex-col items-start p-6">
          <div className="flex items-center mb-3">
            <div className="bg-warning/10 p-2.5 rounded-xl mr-3">
              <Activity className="h-5 w-5 text-warning" />
            </div>
            <p className="text-sm font-medium text-ardesia/60">Durata Media</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ardesia">
              {averageNights} notti
            </h3>
            <p className="text-xs text-ardesia/60 mt-1">per prenotazione</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
