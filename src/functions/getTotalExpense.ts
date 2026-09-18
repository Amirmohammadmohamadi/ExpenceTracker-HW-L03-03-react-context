import type { Transaction } from "../constants/mockTransactions";

export const totalExpense = (transactions:Transaction[]):number=> {
    return transactions.reduce((acc, item) => {
        if (item.type === "expense") {
          acc += item.cost;
        }
        return acc;
      }, 0);
}