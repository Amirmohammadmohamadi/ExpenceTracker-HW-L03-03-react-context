import { createContext, useEffect, useReducer, useState } from "react";
import { mockTransactions } from "../constants/mockTransactions";
import { ADD, DELETE } from "../constants/variables";

export const TransactionContext = createContext();

const transactioReducer = (state = [], action = { type: "", payload: "" }) => {
  if (action.type === ADD) {
    return [...state, action.payload];
  }
  if (action.type === DELETE) {
    const filterd = state.filter((item) => item.id !== action.payload);
    localStorage.setItem("transactions",JSON.stringify(filterd));
    return filterd;
  }
};

const transactionsStorage = localStorage.getItem("transactions");

const TransactionContextProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(
    transactioReducer,
    transactionsStorage ? JSON.parse(transactionsStorage) : mockTransactions
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
