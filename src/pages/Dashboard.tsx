import { useState, useCallback } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SummaryCards from "@/components/dashboard/SummaryCards";
import DataTable from "@/components/dashboard/DataTable";
import ProfitChart from "@/components/dashboard/ProfitChart";
import type { Row } from "@/components/dashboard/types";
import { calcProfit } from "@/components/dashboard/types";

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

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
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
        <SummaryCards rows={rows} totalProfit={totalProfit} />
        <DataTable rows={rows} onAddRow={addRow} onRemoveRow={removeRow} onUpdateRow={updateRow} />
        <ProfitChart rows={rows} />
      </main>
    </div>
  );
};

export default Dashboard;
