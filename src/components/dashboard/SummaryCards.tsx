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
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <TrendingUp className="h-12 w-12 text-green-600" />
        </div>
        <CardContent className="flex flex-col items-start p-4 md:p-5">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Ricavi
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              € {revenue.totalRevenue.toLocaleString("it-IT")}
            </h3>
            <p className="text-[11px] text-green-600 dark:text-green-400 font-bold mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              €{revenue.averagePerNight} /notte
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Calendar className="h-12 w-12 text-primary" />
        </div>
        <CardContent className="flex flex-col items-start p-4 md:p-5">
          <div className="flex items-center mb-3">
            <Calendar className="h-5 w-5 text-primary mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Occupazione
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              {occupancy.occupancyRate}%
            </h3>
            <p className="text-[11px] text-primary font-bold mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              {occupancy.occupiedDays}/{occupancy.totalDays} gg
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Users className="h-12 w-12 text-blue-600" />
        </div>
        <CardContent className="flex flex-col items-start p-4 md:p-5">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Prenotazioni
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              {totalBookings}
            </h3>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold mt-1 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
              €{revenue.averagePerBooking.toFixed(0)} /pren.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-300 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Activity className="h-12 w-12 text-orange-600" />
        </div>
        <CardContent className="flex flex-col items-start p-4 md:p-5">
          <div className="flex items-center mb-3">
            <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Media Notti
            </p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              {averageNights}
            </h3>
            <p className="text-[11px] text-orange-600 dark:text-orange-400 font-bold mt-1 flex items-center gap-1.5">
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
