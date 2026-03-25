import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Row } from "./types";
import { calcProfit } from "./types";

interface ProfitChartProps {
  rows: Row[];
}

const ProfitChart = ({ rows }: ProfitChartProps) => {
  const chartData = rows.map((_, i) => {
    const cumulative = rows
      .slice(0, i + 1)
      .reduce((sum, row) => sum + calcProfit(row), 0);
    return { name: `#${i + 1}`, profit: cumulative };
  });

  if (rows.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Lucro Acumulado
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 72%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 25%)" opacity={0.2} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "hsl(0, 5%, 55%)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(0, 5%, 55%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 9%)",
                border: "1px solid hsl(0, 5%, 18%)",
                borderRadius: "8px",
                color: "hsl(0, 0%, 93%)",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Profit"]}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="hsl(0, 72%, 45%)"
              strokeWidth={2}
              fill="url(#profitGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitChart;
