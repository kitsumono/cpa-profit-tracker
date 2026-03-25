import { TrendingUp, TrendingDown, Layers, DollarSign, Percent } from "lucide-react";
import type { Row, TaxConfig } from "./types";
import { calcProfit, calcTax, calcNetProfit } from "./types";

interface SummaryCardsProps {
  rows: Row[];
  tax: TaxConfig;
}

const SummaryCards = ({ rows, tax }: SummaryCardsProps) => {
  const totalInvested = rows.reduce((s, r) => s + r.dep1 + r.dep2, 0);
  const totalReturn = rows.reduce((s, r) => s + r.saque + r.mae, 0);
  const totalProfit = rows.reduce((s, r) => s + calcProfit(r), 0);
  const totalTax = rows.reduce((s, r) => s + calcTax(r, tax), 0);
  const totalNet = rows.reduce((s, r) => s + calcNetProfit(r, tax), 0);
  const roi = totalInvested > 0 ? ((totalNet / totalInvested) * 100) : 0;

  const cards = [
    {
      label: "Linhas",
      value: rows.length.toString(),
      icon: Layers,
      color: "text-foreground",
    },
    {
      label: "Investido",
      value: `R$ ${totalInvested.toFixed(2)}`,
      icon: DollarSign,
      color: "text-foreground",
    },
    {
      label: "Retorno",
      value: `R$ ${totalReturn.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-foreground",
      sub: totalReturn > 0 ? `${((totalReturn / Math.max(totalInvested, 1)) * 100).toFixed(0)}% do investido` : undefined,
    },
    {
      label: "Profit Líquido",
      value: `R$ ${totalNet.toFixed(2)}`,
      icon: totalNet >= 0 ? TrendingUp : TrendingDown,
      color: totalNet >= 0 ? "text-emerald-500" : "text-red-500",
      sub: tax.enabled && totalTax > 0 ? `Taxa: -R$ ${totalTax.toFixed(2)}` : undefined,
    },
    {
      label: "ROI",
      value: `${roi.toFixed(1)}%`,
      icon: Percent,
      color: roi >= 0 ? "text-emerald-500" : "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="bg-card border border-border rounded-lg p-4 animate-fade-in hover:border-primary/30 transition-colors duration-200"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <card.icon className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {card.label}
            </p>
          </div>
          <p className={`text-xl font-bold font-mono ${card.color}`}>
            {card.value}
          </p>
          {card.sub && (
            <p className="text-[11px] text-muted-foreground mt-1">{card.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
