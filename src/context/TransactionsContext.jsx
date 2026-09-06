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
    localStorage.setItem("transactions", JSON.stringify(filterd));
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

  const totalIncome = () => {
    return transactions.reduce((acc, item) => {
      if (item.type === "income") {
        acc += item.cost;
      }
      return acc;
    }, 0);
  };

  const totalExpense = () => {
    return transactions.reduce((acc, item) => {
      if (item.type === "expense") {
        acc += item.cost;
      }
      return acc;
    }, 0);
  };

  // const expensesBaseCatgory = ()=> {
  //   transactions.filter(item => item.type === "expense")
  //   .reduce((acc,currItem)=> {
  //     for(const item of acc) {
  //       if(item.cat === currItem.category){
  //         return item.cost += currItem.cost;
  //       } else {
  //         return [...acc,{cat:currItem.category,cost:currItem.cost,color:"white"}];
  //       }
  //     }
  //   },[])
  // };

  // console.log("expensesBaseCatgory:",expensesBaseCatgory());

  const total = totalIncome() - totalExpense();

  return (
    <TransactionContext.Provider
      value={{ transactions, dispatch, totalExpense, totalIncome, total }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
