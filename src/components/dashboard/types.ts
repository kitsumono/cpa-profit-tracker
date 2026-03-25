export interface Row {
  id: number;
  dep1: number;
  dep2: number;
  saque: number;
  mae: number;
}

export const calcProfit = (r: Row) => r.saque + r.mae - (r.dep1 + r.dep2);
