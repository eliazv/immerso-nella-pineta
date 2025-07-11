import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
} from "recharts";
import { RevenueStats } from "@/services/dashboardService";

interface RevenueChartProps {
  data: RevenueStats;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Controllo di sicurezza per evitare errori se i dati non sono disponibili
  if (!data || !data.monthlyRevenue || !Array.isArray(data.monthlyRevenue)) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        <div className="text-center">
          <p>Nessun dato disponibile per i ricavi</p>
        </div>
      </div>
    );
  }

  // Organizziamo i dati per il grafico
  // Estraiamo il mese e l'anno separatamente per un migliore ordinamento
  const processedData = data.monthlyRevenue
    .map((item) => {
      const [monthName, year] = item.month.split(" ");
      return {
        ...item,
        monthName,
        year,
        shortMonth: monthName.substring(0, 3),
      };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return parseInt(a.year) - parseInt(b.year);

      // Array dei mesi per l'ordinamento
      const months = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ];

      return months.indexOf(a.monthName) - months.indexOf(b.monthName);
    });

  // Formatter per i valori in euro
  const euroFormatter = (value: number) => `€ ${value.toLocaleString("it-IT")}`;

  return (
    <div className="space-y-4">
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={processedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="shortMonth"
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              tickFormatter={euroFormatter}
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <Tooltip
              formatter={(value: number) => [euroFormatter(value), "Ricavo"]}
              labelFormatter={(label, items) => {
                const dataPoint = processedData.find(
                  (item) => item.shortMonth === label
                );
                return dataPoint
                  ? `${dataPoint.monthName} ${dataPoint.year}`
                  : label;
              }}
            />
            <Legend />
            <Bar
              dataKey="revenue"
              name="Ricavo Mensile"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
              maxBarSize={60}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-muted-foreground text-sm border-t pt-4">
        Ricavi totali: <strong>{euroFormatter(data.totalRevenue)}</strong> |
        Media per notte: <strong>{euroFormatter(data.averagePerNight)}</strong>{" "}
        | Media per prenotazione:{" "}
        <strong>{euroFormatter(data.averagePerBooking)}</strong>
      </div>
    </div>
  );
};

export default RevenueChart;
