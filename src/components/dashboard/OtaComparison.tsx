import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import { OTAStats } from "@/services/dashboardService";

interface OtaComparisonProps {
  data: OTAStats;
}

const COLORS = [
  "#0088FE",
  "#FF8042",
  "#00C49F",
  "#8884d8",
  "#82ca9d",
  "#FFBB28",
];

const OtaComparison: React.FC<OtaComparisonProps> = ({ data }) => {
  // Controllo di sicurezza per evitare errori se i dati non sono disponibili
  if (
    !data ||
    !data.bookingCount ||
    !data.revenue ||
    !Array.isArray(data.bookingCount) ||
    !Array.isArray(data.revenue)
  ) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        <div className="text-center">
          <p>Nessun dato disponibile per il confronto OTA</p>
        </div>
      </div>
    );
  }

  // Ordina i dati per numero di prenotazioni (dal più grande al più piccolo)
  const sortedBookingData = [...data.bookingCount].sort(
    (a, b) => b.count - a.count
  );
  const sortedRevenueData = [...data.revenue].sort(
    (a, b) => b.revenue - a.revenue
  );

  // Formatter per i valori in euro
  const euroFormatter = (value: number) => `€ ${value.toLocaleString("it-IT")}`;

  // Personalizzazione del tooltip per i grafici a torta
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div className="space-y-8">
      {/* Prima riga: grafici a torta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-center">
            Distribuzione prenotazioni per OTA
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sortedBookingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="ota"
                >
                  {sortedBookingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}`, "Prenotazioni"]}
                  labelFormatter={(name) => `${name}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-center">
            Distribuzione ricavi per OTA
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sortedRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="ota"
                >
                  {sortedRevenueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    euroFormatter(value),
                    "Ricavi",
                  ]}
                  labelFormatter={(name) => `${name}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seconda riga: grafico a barre per confronto prezzi medi */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-center">
          Prezzo medio per notte per OTA
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.averagePerNight}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="ota"
                tick={{ fill: "#555" }}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis
                tickFormatter={euroFormatter}
                tick={{ fill: "#555" }}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <Tooltip
                formatter={(value: number) => [
                  euroFormatter(value),
                  "Prezzo medio per notte",
                ]}
              />
              <Bar
                dataKey="average"
                name="Prezzo medio per notte"
                radius={[4, 4, 0, 0]}
                maxBarSize={80}
              >
                {data.averagePerNight.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabella riassuntiva */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-3 text-left font-medium">Piattaforma</th>
              <th className="p-3 text-right font-medium">Prenotazioni</th>
              <th className="p-3 text-right font-medium">Ricavi totali</th>
              <th className="p-3 text-right font-medium">Prezzo medio</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookingData.map((item, index) => {
              const revenueItem = data.revenue.find((r) => r.ota === item.ota);
              const avgItem = data.averagePerNight.find(
                (a) => a.ota === item.ota
              );

              return (
                <tr
                  key={item.ota}
                  className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}
                >
                  <td className="p-3 border-t">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      {item.ota}
                    </div>
                  </td>
                  <td className="p-3 text-right border-t">{item.count}</td>
                  <td className="p-3 text-right border-t">
                    {revenueItem ? euroFormatter(revenueItem.revenue) : "-"}
                  </td>
                  <td className="p-3 text-right border-t">
                    {avgItem ? euroFormatter(avgItem.average) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtaComparison;
