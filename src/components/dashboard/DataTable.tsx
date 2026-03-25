import { Plus, Trash2 } from "lucide-react";
import CellInput from "./CellInput";
import type { Row } from "./types";
import { calcProfit } from "./types";

interface DataTableProps {
  rows: Row[];
  onAddRow: () => void;
  onRemoveRow: (id: number) => void;
  onUpdateRow: (id: number, field: keyof Omit<Row, "id">, value: number) => void;
}

const DataTable = ({ rows, onAddRow, onRemoveRow, onUpdateRow }: DataTableProps) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
            <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">1 DEP</th>
            <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">2 DEP</th>
            <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">SAQUE</th>
            <th className="text-right px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">MÃE</th>
            <th className="text-right px-3 py-3 text-xs font-semibold text-primary uppercase tracking-wider font-bold">PROFIT</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const profit = calcProfit(row);
            return (
              <tr key={row.id} className="border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors">
                <td className="px-3 py-1 text-muted-foreground font-mono text-xs">{i + 1}</td>
                <td className="px-1 py-1">
                  <CellInput value={row.dep1} onChange={(v) => onUpdateRow(row.id, "dep1", v)} />
                </td>
                <td className="px-1 py-1">
                  <CellInput value={row.dep2} onChange={(v) => onUpdateRow(row.id, "dep2", v)} />
                </td>
                <td className="px-1 py-1">
                  <CellInput value={row.saque} onChange={(v) => onUpdateRow(row.id, "saque", v)} />
                </td>
                <td className="px-1 py-1">
                  <CellInput value={row.mae} onChange={(v) => onUpdateRow(row.id, "mae", v)} />
                </td>
                <td className={`px-3 py-2 text-right font-mono font-semibold text-sm ${profit >= 0 ? "text-chart-positive" : "text-chart-negative"}`}>
                  {profit.toFixed(2)}
                </td>
                <td className="px-2 py-1">
                  <button
                    onClick={() => onRemoveRow(row.id)}
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
        onClick={onAddRow}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Plus className="h-4 w-4" />
        Adicionar linha
      </button>
    </div>
  </div>
);

export default DataTable;
