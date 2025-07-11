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
  eachDayOfInterval,
  parseISO,
  isWithinInterval,
} from "date-fns";
import { it } from "date-fns/locale";
import { localStorageService } from "@/services/localStorageService";

interface ChartData {
  period: string;
  value: number;
}

interface OccupancyChartProps {
  data?: ChartData[];
  title?: string;
  selectedCalendar?: string;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({
  data = [],
  title = "Tasso di Occupazione",
  selectedCalendar = "all",
}) => {
  const [viewType, setViewType] = useState<"weekly" | "monthly">("monthly");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Funzione per calcolare l'occupazione reale basata sui dati delle prenotazioni
  const calculateRealOccupancy = (startDate: Date, endDate: Date): number => {
    let bookings = localStorageService.getBookings();

    // Filtra per appartamento se non è "all"
    if (selectedCalendar !== "all") {
      bookings = bookings.filter(
        (booking) => booking.apartment === selectedCalendar
      );
    }

    const totalDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    }).length;

    if (totalDays === 0) return 0;

    let occupiedDays = 0;

    // Per ogni giorno nel periodo, controlla se c'è una prenotazione
    eachDayOfInterval({ start: startDate, end: endDate }).forEach((day) => {
      const isOccupied = bookings.some((booking) => {
        if (!booking.CheckIn || !booking.CheckOut) return false;

        try {
          // Parse delle date nel formato DD/MM/YYYY
          const [checkInDay, checkInMonth, checkInYear] =
            booking.CheckIn.split("/");
          const [checkOutDay, checkOutMonth, checkOutYear] =
            booking.CheckOut.split("/");

          const checkInDate = new Date(
            parseInt(checkInYear),
            parseInt(checkInMonth) - 1,
            parseInt(checkInDay)
          );
          const checkOutDate = new Date(
            parseInt(checkOutYear),
            parseInt(checkOutMonth) - 1,
            parseInt(checkOutDay)
          );

          // Verifica se il giorno è nell'intervallo della prenotazione
          return isWithinInterval(day, {
            start: checkInDate,
            end: checkOutDate,
          });
        } catch (error) {
          return false;
        }
      });

      if (isOccupied) occupiedDays++;
    });

    return Math.round((occupiedDays / totalDays) * 100);
  };

  // Generate chart data based on view type and current date
  const chartData = useMemo(() => {
    // Se ci sono dati passati come prop, usali ma limitali a 6 voci
    if (data && data.length > 0) {
      const mappedData = data.map((item) => ({
        period: item.month || item.period,
        value: item.value || item.rate || 0,
      }));
      // Limita sempre a 6 voci (prendi le ultime 6)
      return mappedData.slice(-6);
    }

    // Altrimenti calcola i dati reali dalle prenotazioni
    if (viewType === "weekly") {
      // Generate 6 weeks of real data
      const weeks = [];
      for (let i = 5; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(currentDate, i), {
          weekStartsOn: 1,
        });
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        const occupancyRate = calculateRealOccupancy(weekStart, weekEnd);
        weeks.push({
          period: `${format(weekStart, "dd/MM", { locale: it })}`,
          value: occupancyRate,
        });
      }
      return weeks;
    } else {
      // Generate 6 months of real data
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = subMonths(currentDate, i);
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthDate);
        const occupancyRate = calculateRealOccupancy(monthStart, monthEnd);
        months.push({
          period: format(monthDate, "MMM", { locale: it }),
          value: occupancyRate,
        });
      }
      return months;
    }
  }, [viewType, currentDate, data, selectedCalendar]);

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
        <div className="flex items-end justify-between gap-1 h-32">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: `${100 / chartData.length}%` }}
            >
              <div className="relative flex items-end justify-center h-24 mb-2 w-full">
                <div
                  className="relative group cursor-pointer"
                  style={{ width: "80%" }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-ardesia text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.value}% occupazione
                  </div>

                  {/* Background bar */}
                  <div className="bg-neutro/30 rounded-lg w-full h-24">
                    {/* Filled bar */}
                    <div
                      className="bg-gradient-to-t from-petrolio to-petrolio/80 rounded-lg w-full transition-all duration-500 hover:from-petrolio/90 hover:to-petrolio/70"
                      style={{
                        height: `${Math.max((item.value / 100) * 100, 4)}%`,
                        minHeight: "4px",
                      }}
                    />
                  </div>

                  {/* Value label on top of bar */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-ardesia">
                    {item.value}%
                  </div>
                </div>
              </div>
              <span className="text-xs text-ardesia/60 font-medium text-center">
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
