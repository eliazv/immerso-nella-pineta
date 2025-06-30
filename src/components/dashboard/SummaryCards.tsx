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
      <Card>
        <CardContent className="flex flex-col items-start p-3">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-1.5 rounded-full mr-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Ricavi Totali
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              € {revenue.totalRevenue.toLocaleString("it-IT")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              € {revenue.averagePerNight} media a notte
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-start p-3">
          <div className="flex items-center mb-2">
            <div className="bg-primary/10 p-1.5 rounded-full mr-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Tasso di Occupazione
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{occupancy.occupancyRate}%</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {occupancy.occupiedDays} giorni su {occupancy.totalDays}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-start p-3">
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 p-1.5 rounded-full mr-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Prenotazioni
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{totalBookings}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              € {revenue.averagePerBooking.toLocaleString("it-IT")} media per
              prenotazione
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-start p-3">
          <div className="flex items-center mb-2">
            <div className="bg-amber-100 p-1.5 rounded-full mr-2">
              <Activity className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Durata Media
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{averageNights} notti</h3>
            <p className="text-xs text-muted-foreground mt-1">
              per prenotazione
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
