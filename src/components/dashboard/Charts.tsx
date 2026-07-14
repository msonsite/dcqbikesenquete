"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CHART_COLORS = [
  "#E30613",
  "#1A1A1A",
  "#6B7280",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

interface PercentageChartProps {
  title: string;
  data: { name: string; value: number; count: number }[];
}

export function PercentageChart({ title, data }: PercentageChartProps) {
  const chartData = data.filter((d) => d.count > 0);

  return (
    <div className="rounded-2xl border border-dcq-gray-border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-dcq-black">{title}</h3>
      {chartData.length === 0 ? (
        <p className="py-8 text-center text-gray-400">Nog geen data</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value ?? 0} antwoorden`, "Aantal"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

interface BarChartCardProps {
  title: string;
  data: { label: string; count: number; assisted?: number }[];
  showAssisted?: boolean;
}

export function BarChartCard({
  title,
  data,
  showAssisted = false,
}: BarChartCardProps) {
  return (
    <div className="rounded-2xl border border-dcq-gray-border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-dcq-black">{title}</h3>
      {data.length === 0 ? (
        <p className="py-8 text-center text-gray-400">Nog geen data</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar
              dataKey="count"
              name="Alle antwoorden"
              fill="#010101"
              radius={[4, 4, 0, 0]}
            />
            {showAssisted && (
              <Bar
                dataKey="assisted"
                name="Website hielp"
                fill="#ee2726"
                radius={[4, 4, 0, 0]}
              />
            )}
            {showAssisted && <Legend />}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
