import { Plus, Trash2 } from "lucide-react";
import CellInput from "./CellInput";
import type { Row, TaxConfig, OpType } from "./types";
import { calcProfit, calcTax, calcNetProfit, OP_LABELS, OP_COLORS } from "./types";

interface DataTableProps {
  rows: Row[];
  tax: TaxConfig;
  onAddRow: () => void;
  onRemoveRow: (id: number) => void;
  onUpdateRow: (id: number, field: keyof Omit<Row, "id">, value: number | OpType) => void;
}

const opTypes: OpType[] = ["bau", "roleta", "escadinha", "kamikaze", "outro"];

const DataTable = ({ rows, tax, onAddRow, onRemoveRow, onUpdateRow }: DataTableProps) => {
  const totalInvested = rows.reduce((s, r) => s + r.dep1 + r.dep2, 0);
  const totalSaque = rows.reduce((s, r) => s + r.saque, 0);
  const totalMae = rows.reduce((s, r) => s + r.mae, 0);
  const totalProfit = rows.reduce((s, r) => s + calcProfit(r), 0);
  const totalTax = rows.reduce((s, r) => s + calcTax(r, tax), 0);
  const totalNet = rows.reduce((s, r) => s + calcNetProfit(r, tax), 0);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-center px-3 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider w-10">
                #
              </th>
              <th className="text-center px-3 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider w-24">
                Tipo
              </th>
              <th className="text-right px-3 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                1 DEP
              </th>
              <th className="text-right px-3 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                2 DEP
              </th>
              <th className="text-right px-3 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                SAQUE
              </th>
              <th className="text-right px-3 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                MÃE
              </th>
              {tax.enabled && (
                <th className="text-right px-3 py-3 text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                  TAXA
                </th>
              )}
              <th className="text-right px-3 py-3 text-[10px] font-bold text-primary uppercase tracking-wider">
                PROFIT
              </th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const net = calcNetProfit(row, tax);
              const taxVal = calcTax(row, tax);
              return (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-b-0 group hover:bg-secondary/30 transition-colors duration-150"
                >
                  <td className="px-3 py-1 text-center text-muted-foreground font-mono text-xs">
                    {i + 1}
                  </td>
                  <td className="px-1 py-1 text-center">
                    <select
                      value={row.tipo}
                      onChange={(e) =>
                        onUpdateRow(row.id, "tipo", e.target.value as OpType)
                      }
                      className={`bg-transparent border-none text-xs font-bold cursor-pointer focus:outline-none focus:bg-secondary rounded-md px-1 py-1 transition-colors ${OP_COLORS[row.tipo]}`}
                    >
                      {opTypes.map((op) => (
                        <option key={op} value={op} className="bg-card text-foreground">
                          {OP_LABELS[op]}
                        </option>
                      ))}
                    </select>
                  </td>
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
                  {tax.enabled && (
                    <td className="px-2 py-2 text-right font-mono text-xs text-amber-500">
                      -{taxVal.toFixed(2)}
                    </td>
                  )}
                  <td
                    className={`px-3 py-2 text-right font-mono font-bold text-sm ${
                      net >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {net.toFixed(2)}
                  </td>
                  <td className="px-2 py-1">
                    <button
                      onClick={() => onRemoveRow(row.id)}
                      className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-150"
                      aria-label="Remover linha"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-border bg-secondary/20">
                <td className="px-3 py-2 text-center font-mono text-xs text-muted-foreground">
                  Σ
                </td>
                <td />
                <td className="px-3 py-2 text-right font-mono text-xs font-bold text-foreground">
                  {totalInvested > 0 ? totalInvested.toFixed(2) : ""}
                </td>
                <td />
                <td className="px-3 py-2 text-right font-mono text-xs font-bold text-foreground">
                  {totalSaque > 0 ? totalSaque.toFixed(2) : ""}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs font-bold text-foreground">
                  {totalMae > 0 ? totalMae.toFixed(2) : ""}
                </td>
                {tax.enabled && (
                  <td className="px-2 py-2 text-right font-mono text-xs font-bold text-amber-500">
                    -{totalTax.toFixed(2)}
                  </td>
                )}
                <td
                  className={`px-3 py-2 text-right font-mono font-bold text-sm ${
                    totalNet >= 0 ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {totalNet.toFixed(2)}
                </td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div className="px-4 py-3 border-t border-border">
        <button
          onClick={onAddRow}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-150 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" />
          Adicionar linha
        </button>
      </div>
    </div>
  );
};

export default DataTable;
