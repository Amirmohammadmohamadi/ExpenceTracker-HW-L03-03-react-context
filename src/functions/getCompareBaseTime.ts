import type { Transaction } from "../constants/mockTransactions";

export type ResultItemCBT = {
  costIncomes:number;
  costExpenses:number;
  date:string;
  color?:string;
  name?:string;
  value?:number;
};

export const compareBaseTime = (transactions:Transaction[]) :ResultItemCBT[] => {
    return transactions.reduce<ResultItemCBT[]>((acc, item) => {
        const findedIndex = acc.findIndex((object) => item.date === object.date);
        if (findedIndex !== -1) {
          if(item.type === "income") {
            acc[findedIndex]!.costIncomes += item.cost;
          } else {
            acc[findedIndex]!.costExpenses += item.cost;
          }
        } else {
          const costIncomes = item.type === "income" ? item.cost : 0;
          const costExpenses = item.type === "expense" ? item.cost : 0;
          acc = [...acc, { costIncomes, costExpenses, date: item.date }];
        }
        return acc;
      }, []);
}