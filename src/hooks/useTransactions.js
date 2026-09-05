import { useContext } from "react";
import { TransactionContext } from "../context/TransactionsContext";

export const useTransactions = ()=> useContext(TransactionContext);