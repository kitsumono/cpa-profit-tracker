import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Row, TaxConfig } from "./types";
import { calcNetProfit, OP_LABELS, type OpType } from "./types";

interface ProfitChartProps {
  rows: Row[];
  tax: TaxConfig;
}

type ViewMode = "cumulative" | "byType";

const ProfitChart = ({ rows, tax }: ProfitChartProps) => {
  const [view, setView] = useState<ViewMode>("cumulative");

  if (rows.length === 0) return null;

  const cumulativeData = rows.map((_, i) => {
    const cumulative = rows
      .slice(0, i + 1)
      .reduce((sum, row) => sum + calcNetProfit(row, tax), 0);
    return { name: `#${i + 1}`, profit: cumulative };
  });

  const byTypeData = Object.entries(
    rows.reduce<Record<string, number>>((acc, row) => {
      const label = OP_LABELS[row.tipo];
      acc[label] = (acc[label] || 0) + calcNetProfit(row, tax);
      return acc;
    }, {})
  ).map(([name, profit]) => ({ name, profit }));

  const typeColors: Record<string, string> = {
    Baú: "#f59e0b",
    Roleta: "#a855f7",
    Escadinha: "#3b82f6",
    Kamikaze: "#ef4444",
    Outro: "#6b7280",
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Lucro Acumulado
        </h2>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          {(["cumulative", "byType"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${
                view === v
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "cumulative" ? "Acumulado" : "Por Tipo"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {view === "cumulative" ? (
            <AreaChart data={cumulativeData}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                  fontSize: "12px",
                  fontFamily: "JetBrains Mono, monospace",
                }}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Profit"]}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#profitGrad)"
                animationDuration={600}
              />
            </AreaChart>
          ) : (
            <BarChart data={byTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                  fontSize: "12px",
                  fontFamily: "JetBrains Mono, monospace",
                }}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Profit"]}
              />
              {byTypeData.map((entry) => (
                <Bar
                  key={entry.name}
                  dataKey="profit"
                  fill={typeColors[entry.name] || "#6b7280"}
                  radius={[4, 4, 0, 0]}
                  animationDuration={400}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
