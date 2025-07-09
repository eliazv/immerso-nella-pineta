import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { it } from "date-fns/locale";

interface ChartData {
  period: string;
  value: number;
}

interface OccupancyChartProps {
  data?: ChartData[];
  title?: string;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({
  data = [],
  title = "Tasso di Occupazione",
}) => {
  const [viewType, setViewType] = useState<"weekly" | "monthly">("monthly");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate chart data based on view type and current date
  const chartData = useMemo(() => {
    if (viewType === "weekly") {
      // Generate 6 weeks of data
      const weeks = [];
      for (let i = 5; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(currentDate, i), {
          weekStartsOn: 1,
        });
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        weeks.push({
          period: `${format(weekStart, "dd/MM", { locale: it })}`,
          value: Math.floor(Math.random() * 100), // TODO: Replace with real data
        });
      }
      return weeks;
    } else {
      // Generate 6 months of data
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = subMonths(currentDate, i);
        months.push({
          period: format(monthDate, "MMM", { locale: it }),
          value: Math.floor(Math.random() * 100), // TODO: Replace with real data
        });
      }
      return months;
    }
  }, [viewType, currentDate]);

  const maxValue =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.value))
      : 100;

  const handlePrevious = () => {
    if (viewType === "weekly") {
      setCurrentDate(subWeeks(currentDate, 6));
    } else {
      setCurrentDate(subMonths(currentDate, 6));
    }
  };

  const handleNext = () => {
    if (viewType === "weekly") {
      setCurrentDate(addWeeks(currentDate, 6));
    } else {
      setCurrentDate(addMonths(currentDate, 6));
    }
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-ardesia">
              {title}
            </CardTitle>
            <p className="text-sm text-ardesia/60 mt-1">
              {viewType === "weekly" ? "Settimanale" : "Mensile"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={viewType}
              onValueChange={(value: "weekly" | "monthly") =>
                setViewType(value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Settimanale</SelectItem>
                <SelectItem value="monthly">Mensile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium text-ardesia">
            {viewType === "weekly"
              ? `${format(subWeeks(currentDate, 5), "dd MMM", {
                  locale: it,
                })} - ${format(currentDate, "dd MMM yyyy", { locale: it })}`
              : `${format(subMonths(currentDate, 5), "MMM yyyy", {
                  locale: it,
                })} - ${format(currentDate, "MMM yyyy", { locale: it })}`}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end justify-between gap-2 h-24">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex items-end justify-center h-20 mb-2">
                <div
                  className="bg-petrolio/20 rounded-t-lg w-full transition-all duration-300 hover:bg-petrolio/30"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    minHeight: "8px",
                  }}
                >
                  <div
                    className="bg-petrolio rounded-t-lg w-full"
                    style={{
                      height: `${Math.min(
                        (item.value / maxValue) * 100,
                        100
                      )}%`,
                      minHeight: "4px",
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-ardesia/60 font-medium">
                {item.period}
              </span>
            </div>
          ))}
        </div>
        {chartData.length === 0 && (
          <div className="text-center py-8 text-ardesia/50">
            <p>Nessun dato disponibile</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
