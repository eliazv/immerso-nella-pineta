import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface ChartData {
  month: string;
  value: number;
}

interface OccupancyChartProps {
  data?: ChartData[];
  title?: string;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({
  data = [
    { month: "Feb", value: 65 },
    { month: "Mar", value: 80 },
    { month: "Apr", value: 45 },
    { month: "Mag", value: 90 },
    { month: "Giu", value: 75 },
    { month: "Lug", value: 95 },
  ],
  title = "Tasso di Occupazione",
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Ensure data is an array and find the maximum value to normalize the bars
  const chartData = Array.isArray(data) ? data : [];
  const maxValue =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.value))
      : 100;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-ardesia">
              {title}
            </CardTitle>
            <p className="text-sm text-ardesia/60 mt-1">Mensile</p>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-auto border-none shadow-none text-petrolio font-medium">
              <SelectValue />
              <ChevronDown className="h-4 w-4 ml-1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensile</SelectItem>
              <SelectItem value="weekly">Settimanale</SelectItem>
              <SelectItem value="daily">Giornaliero</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end justify-between gap-2 h-24">
          {chartData.slice(0, 6).map((item, index) => (
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
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
