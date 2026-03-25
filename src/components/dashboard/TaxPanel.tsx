import type { TaxConfig, TaxTarget } from "./types";

interface TaxPanelProps {
  tax: TaxConfig;
  onTaxChange: (tax: TaxConfig) => void;
}

const targets: { value: TaxTarget; label: string }[] = [
  { value: "mae", label: "Fintech Mãe" },
  { value: "filha", label: "Fintech Filha" },
  { value: "tudo", label: "Tudo" },
];

const TaxPanel = ({ tax, onTaxChange }: TaxPanelProps) => {
  const toggle = () => onTaxChange({ ...tax, enabled: !tax.enabled });

  return (
    <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-xs font-bold">%</span>
        </div>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Configuração de Taxa
        </h2>
        <button
          onClick={toggle}
          className="ml-auto flex items-center gap-2 group cursor-pointer"
        >
          <span
            className={`text-xs font-semibold transition-colors ${
              tax.enabled ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {tax.enabled ? "Ativada" : "Desativada"}
          </span>
          <div
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
              tax.enabled ? "bg-primary" : "bg-border"
            }`}
          >
            <div
              className={`absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition-all duration-200 ${
                tax.enabled ? "left-[18px]" : "left-[3px]"
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-5 transition-opacity duration-300 ${
          !tax.enabled ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Incide sobre
          </p>
          <div className="flex flex-wrap gap-2">
            {targets.map((t) => (
              <button
                key={t.value}
                onClick={() => onTaxChange({ ...tax, target: t.value })}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold border transition-all duration-150 ${
                  tax.target === t.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Percentual
          </p>
          <div className="relative">
            <input
              type="number"
              value={tax.rate || ""}
              onChange={(e) =>
                onTaxChange({ ...tax, rate: parseFloat(e.target.value) || 0 })
              }
              onFocus={(e) => e.target.select()}
              className="w-full bg-secondary border border-border text-foreground rounded-lg px-3 py-2 pr-8 text-right font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
              %
            </span>
          </div>
          {tax.enabled && tax.rate > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Descontando{" "}
              <span className="text-primary font-bold">{tax.rate}%</span> de{" "}
              {targets.find((t) => t.value === tax.target)?.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxPanel;
