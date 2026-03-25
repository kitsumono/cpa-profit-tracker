import { useState, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ThemeToggle from "@/components/ThemeToggle";

interface Row {
  id: number;
  dep1: number;
  dep2: number;
  saque: number;
  mae: number;
}

const calcProfit = (r: Row) => r.saque + r.mae - (r.dep1 + r.dep2);

const CellInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) => (
  <input
    type="number"
    value={value || ""}
    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    className="w-full bg-transparent text-right font-mono text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary rounded transition-colors"
    placeholder="0"
  />
);

let nextId = 1;

const Dashboard = () => {
  const [rows, setRows] = useState<Row[]>([
    { id: nextId++, dep1: 0, dep2: 0, saque: 0, mae: 0 },
  ]);

  const addRow = useCallback(() => {
    setRows((prev) => [
      ...prev,
      { id: nextId++, dep1: 0, dep2: 0, saque: 0, mae: 0 },
    ]);
  }, []);

  const removeRow = useCallback((id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const updateRow = useCallback(
    (id: number, field: keyof Omit<Row, "id">, value: number) => {
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
      );
    },
    []
  );

  const totalProfit = rows.reduce((sum, r) => sum + calcProfit(r), 0);

  const chartData = rows.map((r, i) => {
    const cumulative = rows
      .slice(0, i + 1)
      .reduce((sum, row) => sum + calcProfit(row), 0);
    return { name: `#${i + 1}`, profit: cumulative };
  });

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">$</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              CPA Money
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Linhas</p>
            <p className="text-2xl font-bold text-foreground mt-1 font-mono">{rows.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Investido</p>
            <p className="text-2xl font-bold text-foreground mt-1 font-mono">
              R$ {rows.reduce((s, r) => s + r.dep1 + r.dep2, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Profit Total</p>
            <p
              className={`text-2xl font-bold mt-1 font-mono ${
                totalProfit >= 0 ? "text-chart-positive" : "text-chart-negative"
              }`}
            >
              R$ {totalProfit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    #
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    1 DEP
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    2 DEP
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    SAQUE
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    MÃE
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-primary uppercase tracking-wider font-bold">
                    PROFIT
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const profit = calcProfit(row);
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-3 py-1 text-muted-foreground font-mono text-xs">
                        {i + 1}
                      </td>
                      <td className="px-1 py-1">
                        <CellInput
                          value={row.dep1}
                          onChange={(v) => updateRow(row.id, "dep1", v)}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <CellInput
                          value={row.dep2}
                          onChange={(v) => updateRow(row.id, "dep2", v)}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <CellInput
                          value={row.saque}
                          onChange={(v) => updateRow(row.id, "saque", v)}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <CellInput
                          value={row.mae}
                          onChange={(v) => updateRow(row.id, "mae", v)}
                        />
                      </td>
                      <td
                        className={`px-3 py-2 text-right font-mono font-semibold text-sm ${
                          profit >= 0
                            ? "text-chart-positive"
                            : "text-chart-negative"
                        }`}
                      >
                        {profit.toFixed(2)}
                      </td>
                      <td className="px-2 py-1">
                        <button
                          onClick={() => removeRow(row.id)}
                          className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remover linha"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-border">
            <button
              onClick={addRow}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Adicionar linha
            </button>
          </div>
        </div>

        {/* Chart */}
        {rows.length > 0 && (
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
        )}
      </main>
    </div>
  );
};

export default Dashboard;
