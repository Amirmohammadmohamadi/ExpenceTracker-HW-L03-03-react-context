import type { Transaction } from "../constants/mockTransactions";

export const totalIncome = (transactions:Transaction[]):number => {
    return transactions.reduce((acc, item) => {
        if (item.type === "income") {
          acc += item.cost;
        }
        return acc;
      }, 0);
}