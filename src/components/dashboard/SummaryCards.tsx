import type { Row } from "./types";

interface SummaryCardsProps {
  rows: Row[];
  totalProfit: number;
}

const SummaryCards = ({ rows, totalProfit }: SummaryCardsProps) => (
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
);

export default SummaryCards;
