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
    0,
  );

  // Ottieni media pernottamenti
  const averageNights =
    totalBookings > 0
      ? Math.round((occupancy.occupiedDays / totalBookings) * 10) / 10
      : 0;

  return (
    <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <TrendingUp className="h-12 w-12 text-green-600" />
        </div>
        <CardContent className="flex flex-col items-start p-3.5 md:p-4">
          <div className="flex items-center mb-2.5">
            <TrendingUp className="h-4.5 w-4.5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Ricavi
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-white leading-none">
              € {revenue.totalRevenue.toLocaleString("it-IT")}
            </h3>
            <p className="text-xs md:text-sm text-green-600 dark:text-green-400 font-bold mt-1.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              €{revenue.averagePerNight} /notte
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Calendar className="h-12 w-12 text-primary" />
        </div>
        <CardContent className="flex flex-col items-start p-3.5 md:p-4">
          <div className="flex items-center mb-2.5">
            <Calendar className="h-4.5 w-4.5 text-primary mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Occupazione
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-white leading-none">
              {occupancy.occupancyRate}%
            </h3>
            <p className="text-xs md:text-sm text-primary font-bold mt-1.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              {occupancy.occupiedDays}/{occupancy.totalDays} gg
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Users className="h-12 w-12 text-blue-600" />
        </div>
        <CardContent className="flex flex-col items-start p-3.5 md:p-4">
          <div className="flex items-center mb-2.5">
            <Users className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Prenotazioni
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-white leading-none">
              {totalBookings}
            </h3>
            <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold mt-1.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
              €{revenue.averagePerBooking.toFixed(0)} /pren.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <CardContent className="flex flex-col items-start p-3.5 md:p-4">
          <div className="flex items-center mb-2.5">
            <Activity className="h-4.5 w-4.5 text-orange-600 dark:text-orange-400 mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Media Notti
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 dark:text-white leading-none">
              {averageNights}
            </h3>
            <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-bold mt-1.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500" />
              {occupancy.occupiedDays} gg tot.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
