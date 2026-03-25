export type OpType = "bau" | "roleta" | "escadinha" | "kamikaze" | "outro";

export const OP_LABELS: Record<OpType, string> = {
  bau: "Baú",
  roleta: "Roleta",
  escadinha: "Escadinha",
  kamikaze: "Kamikaze",
  outro: "Outro",
};

export const OP_COLORS: Record<OpType, string> = {
  bau: "text-amber-500",
  roleta: "text-purple-500",
  escadinha: "text-blue-500",
  kamikaze: "text-red-500",
  outro: "text-muted-foreground",
};

export interface Row {
  id: number;
  dep1: number;
  dep2: number;
  saque: number;
  mae: number;
  tipo: OpType;
}

export type TaxTarget = "mae" | "filha" | "tudo";

export interface TaxConfig {
  enabled: boolean;
  target: TaxTarget;
  rate: number;
}

export const calcProfit = (r: Row) => r.saque + r.mae - (r.dep1 + r.dep2);

export const calcTax = (r: Row, tax?: TaxConfig): number => {
  if (!tax || !tax.enabled || tax.rate <= 0) return 0;
  const pct = tax.rate / 100;
  switch (tax.target) {
    case "mae":
      return r.mae * pct;
    case "filha":
      return r.saque * pct;
    case "tudo":
      return (r.saque + r.mae) * pct;
  }
};

export const calcNetProfit = (r: Row, tax: TaxConfig) =>
  calcProfit(r) - calcTax(r, tax);
