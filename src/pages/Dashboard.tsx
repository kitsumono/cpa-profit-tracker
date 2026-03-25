import { useState, useCallback } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TaxPanel from "@/components/dashboard/TaxPanel";
import DataTable from "@/components/dashboard/DataTable";
import ProfitChart from "@/components/dashboard/ProfitChart";
import type { Row, TaxConfig, OpType } from "@/components/dashboard/types";

let nextId = 1;

const Dashboard = () => {
  const [rows, setRows] = useState<Row[]>([
    { id: nextId++, dep1: 0, dep2: 0, saque: 0, mae: 0, tipo: "bau" },
  ]);

  const [tax, setTax] = useState<TaxConfig>({
    enabled: false,
    target: "mae",
    rate: 0,
  });

  const addRow = useCallback(() => {
    setRows((prev) => [
      ...prev,
      { id: nextId++, dep1: 0, dep2: 0, saque: 0, mae: 0, tipo: "bau" },
    ]);
  }, []);

  const removeRow = useCallback((id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const updateRow = useCallback(
    (id: number, field: keyof Omit<Row, "id">, value: number | OpType) => {
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
      );
    },
    []
  );

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-extrabold text-sm">$</span>
            </div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              CPA Money
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-5 py-6 space-y-5">
        <SummaryCards rows={rows} tax={tax} />
        <TaxPanel tax={tax} onTaxChange={setTax} />
        <DataTable rows={rows} tax={tax} onAddRow={addRow} onRemoveRow={removeRow} onUpdateRow={updateRow} />
        <ProfitChart rows={rows} tax={tax} />
      </main>
    </div>
  );
};

export default Dashboard;
