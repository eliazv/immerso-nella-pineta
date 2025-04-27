import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { OccupancyStats } from "@/services/dashboardService";

interface OccupancyChartProps {
  data: OccupancyStats;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ data }) => {
  // Abbrevia i nomi dei mesi per migliorare la visualizzazione
  const chartData = data.monthlyOccupancy.map((item) => ({
    ...item,
    monthShort: item.month.substring(0, 3), // Prende le prime 3 lettere del nome del mese
  }));

  // Calcola la media annuale per mostrare la linea di riferimento
  const averageRate = data.occupancyRate;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="monthShort"
            tick={{ fill: "#555" }}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            tick={{ fill: "#555" }}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(1)}%`,
              "Occupazione",
            ]}
            labelFormatter={(label) => {
              const fullMonth = chartData.find(
                (item) => item.monthShort === label
              )?.month;
              return fullMonth || label;
            }}
          />
          <Legend />
          <Bar
            name="Tasso di Occupazione"
            dataKey="rate"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <ReferenceLine
            y={averageRate}
            stroke="#ff7d00"
            strokeDasharray="3 3"
            isFront={false}
            label={{
              value: `Media: ${averageRate}%`,
              fill: "#ff7d00",
              position: "insideTopRight",
            }}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="text-center text-muted-foreground text-sm mt-2">
        Occupazione media annuale: <strong>{averageRate}%</strong> (
        {data.occupiedDays} giorni su {data.totalDays})
      </div>
    </div>
  );
};

export default OccupancyChart;
