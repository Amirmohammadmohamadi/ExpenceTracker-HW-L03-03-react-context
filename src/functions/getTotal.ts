import type { Transaction } from "../constants/mockTransactions";
import { totalExpense } from "./getTotalExpense";
import { totalIncome } from "./getTotalIncome";

export const totalBalance = (transactions:Transaction[]):number=> totalIncome(transactions)-totalExpense(transactions);
