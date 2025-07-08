import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Euro,
  Users,
  Home
} from "lucide-react";

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

const QuickStats: React.FC<QuickStatsProps> = ({
  data = {
    totalRevenue: 15420,
    monthlyRevenue: 3200,
    totalBookings: 24,
    occupancyRate: 78,
    averageNightly: 85,
    activeProperties: 3
  }
}) => {
  const stats: StatItem[] = [
    {
      label: "Ricavi Totali",
      value: `€${data.totalRevenue.toLocaleString()}`,
      change: {
        value: "+12%",
        type: "increase"
      },
      icon: Euro
    },
    {
      label: "Ricavi Mensili",
      value: `€${data.monthlyRevenue.toLocaleString()}`,
      change: {
        value: "+8%",
        type: "increase"
      },
      icon: TrendingUp
    },
    {
      label: "Prenotazioni",
      value: data.totalBookings.toString(),
      change: {
        value: "+3",
        type: "increase"
      },
      icon: Calendar
    },
    {
      label: "Tasso Occupazione",
      value: `${data.occupancyRate}%`,
      change: {
        value: "-2%",
        type: "decrease"
      },
      icon: Users
    },
    {
      label: "Prezzo Medio",
      value: `€${data.averageNightly}`,
      change: {
        value: "+5%",
        type: "increase"
      },
      icon: TrendingUp
    },
    {
      label: "Alloggi Attivi",
      value: data.activeProperties.toString(),
      icon: Home
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-petrolio/10">
                <stat.icon className="h-4 w-4 text-petrolio" />
              </div>
              {stat.change && (
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.change.type === "increase" 
                    ? "text-menta" 
                    : "text-warning"
                }`}>
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
