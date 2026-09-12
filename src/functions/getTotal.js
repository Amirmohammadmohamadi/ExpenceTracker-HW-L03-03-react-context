import { totalExpense } from "./getTotalExpense";
import { totalIncome } from "./getTotalIncome";

export const total = (transactions)=> {
    return totalIncome(transactions)-totalExpense(transactions);
}