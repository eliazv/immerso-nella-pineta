import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";
import { SeasonalityStats } from "@/services/dashboardService";

interface SeasonalityChartProps {
  data: SeasonalityStats;
}

// Ordine corretto dei mesi per l'ordinamento
const monthOrder = [
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

const SeasonalityChart: React.FC<SeasonalityChartProps> = ({ data }) => {
  // Combina i dati di prenotazioni e prezzi medi
  const chartData = monthOrder.map((month) => {
    const bookingsData = data.monthlyBookings.find(
      (item) => item.month === month,
    );
    const priceData = data.monthlyAvgPrice.find((item) => item.month === month);

    return {
      month,
      shortMonth: month.substring(0, 3),
      bookings: bookingsData?.count || 0,
      avgPrice: priceData?.price || 0,
    };
  });

  // Formatter per i valori in euro
  const euroFormatter = (value: number) => `€ ${value.toLocaleString("it-IT")}`;

  return (
    <div className="space-y-8">
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
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
              dataKey="shortMonth"
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `${value}`}
              orientation="left"
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis
              yAxisId="right"
              tickFormatter={euroFormatter}
              orientation="right"
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Prenotazioni") return [value, name];
                if (name === "Prezzo medio")
                  return [euroFormatter(value as number), name];
                return [value, name];
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="bookings"
              name="Prenotazioni"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              opacity={0.7}
              barSize={30}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgPrice"
              name="Prezzo medio"
              stroke="#ff7d00"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Mesi con più prenotazioni</h3>
          {[...chartData]
            .sort((a, b) => b.bookings - a.bookings)
            .slice(0, 3)
            .map((month, index) => (
              <div
                key={month.month}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{month.month}</span>
                </div>
                <div className="text-right font-medium">
                  {month.bookings} prenotazioni
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Mesi con prezzo medio più alto</h3>
          {[...chartData]
            .sort((a, b) => b.avgPrice - a.avgPrice)
            .slice(0, 3)
            .map((month, index) => (
              <div
                key={month.month}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{month.month}</span>
                </div>
                <div className="text-right font-medium">
                  {euroFormatter(month.avgPrice)}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <div className="text-center text-muted-foreground text-sm mt-2">
        La stagionalità mostra la relazione tra numero di prenotazioni e prezzi
        medi durante l'anno.
        <br />
        Usa questi dati per ottimizzare i prezzi nei periodi di alta domanda e
        stimolare le prenotazioni nei periodi con meno richieste.
      </div> */}
    </div>
  );
};

export default SeasonalityChart;
