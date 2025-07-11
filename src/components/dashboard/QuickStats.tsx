import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calendar, Euro, Users } from "lucide-react";
import { localStorageService } from "@/services/localStorageService";

interface StatItem {
  label: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease";
  };
  icon: React.ComponentType<{ className?: string }>;
}

interface QuickStatsProps {
  data?: {
    totalRevenue: number;
    monthlyRevenue: number;
    totalBookings: number;
    occupancyRate: number;
    averageNightly: number;
    activeProperties: number;
  };
}

// Funzione per calcolare il cambiamento percentuale
const calculatePercentageChange = (
  current: number,
  previous: number
): { value: string; type: "increase" | "decrease" } => {
  if (previous === 0) {
    return {
      value: current > 0 ? "+100%" : "0%",
      type: current > 0 ? "increase" : "decrease",
    };
  }

  const change = ((current - previous) / previous) * 100;
  const roundedChange = Math.round(change);

  if (roundedChange === 0) {
    return { value: "0%", type: "increase" };
  }

  return {
    value: `${roundedChange > 0 ? "+" : ""}${roundedChange}%`,
    type: roundedChange > 0 ? "increase" : "decrease",
  };
};

// Funzione per ottenere i dati del mese precedente
const getPreviousMonthData = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const bookings = localStorageService.getBookings();

  const currentMonthBookings = bookings.filter((booking) => {
    try {
      const [day, month, year] = booking.CheckIn.split("/");
      const bookingDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      return (
        bookingDate.getMonth() === currentMonth &&
        bookingDate.getFullYear() === currentYear
      );
    } catch {
      return false;
    }
  });

  const previousMonthBookings = bookings.filter((booking) => {
    try {
      const [day, month, year] = booking.CheckIn.split("/");
      const bookingDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      return (
        bookingDate.getMonth() === previousMonth &&
        bookingDate.getFullYear() === previousYear
      );
    } catch {
      return false;
    }
  });

  const currentRevenue = currentMonthBookings.reduce(
    (sum, booking) =>
      sum +
      (parseFloat(booking.Totale?.replace("€", "").replace(",", ".")) || 0),
    0
  );

  const previousRevenue = previousMonthBookings.reduce(
    (sum, booking) =>
      sum +
      (parseFloat(booking.Totale?.replace("€", "").replace(",", ".")) || 0),
    0
  );

  return {
    currentMonthBookings: currentMonthBookings.length,
    previousMonthBookings: previousMonthBookings.length,
    currentRevenue,
    previousRevenue,
  };
};

const QuickStats: React.FC<QuickStatsProps> = ({
  data = {
    totalRevenue: 15420,
    monthlyRevenue: 3200,
    totalBookings: 24,
    occupancyRate: 78,
    averageNightly: 85,
    activeProperties: 3,
  },
}) => {
  const previousData = getPreviousMonthData();
  const stats: StatItem[] = [
    {
      label: "Ricavi Totali",
      value: `€${data.totalRevenue.toLocaleString()}`,
      change: calculatePercentageChange(
        data.totalRevenue,
        previousData.previousRevenue * 12
      ),
      icon: Euro,
    },
    {
      label: "Ricavi Mensili",
      value: `€${data.monthlyRevenue.toLocaleString()}`,
      change: calculatePercentageChange(
        data.monthlyRevenue,
        previousData.previousRevenue
      ),
      icon: TrendingUp,
    },
    {
      label: "Prenotazioni",
      value: data.totalBookings.toString(),
      change: calculatePercentageChange(
        previousData.currentMonthBookings,
        previousData.previousMonthBookings
      ),
      icon: Calendar,
    },
    {
      label: "Tasso Occupazione",
      value: `${data.occupancyRate}%`,
      change:
        data.occupancyRate > 0
          ? calculatePercentageChange(
              data.occupancyRate,
              Math.max(data.occupancyRate - 5, 0)
            )
          : undefined,
      icon: Users,
    },
    // Temporaneamente nascoste: Prezzo Medio e Alloggi Attivi
    // {
    //   label: "Prezzo Medio",
    //   value: `€${data.averageNightly}`,
    //   change:
    //     data.averageNightly > 0
    //       ? calculatePercentageChange(
    //           data.averageNightly,
    //           Math.max(data.averageNightly - 3, 0)
    //         )
    //       : undefined,
    //   icon: TrendingUp,
    // },
    // {
    //   label: "Alloggi Attivi",
    //   value: data.activeProperties.toString(),
    //   icon: Home,
    // },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-petrolio/10">
                <stat.icon className="h-4 w-4 text-petrolio" />
              </div>
              {stat.change && stat.change.value !== "0%" && (
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.change.type === "increase"
                      ? "text-menta"
                      : "text-warning"
                  }`}
                >
                  {stat.change.type === "increase" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change.value}
                </div>
              )}
            </div>
            <div>
              <div className="text-xl font-bold text-ardesia mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-ardesia/60 font-medium">
                {stat.label}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
