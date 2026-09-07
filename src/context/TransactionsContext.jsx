import { createContext, useEffect, useReducer, useState } from "react";
import { mockTransactions } from "../constants/mockTransactions";
import { ADD, DELETE } from "../constants/variables";
import { boolean } from "yup";
import { colorPallet } from "../constants/colorPallet";

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

  const expensesBaseCategory = () => {
    const colorCache = new Map();
    return transactions
      .filter((item) => item.type === "expense")
      .reduce((acc, item) => {
        const findedIndex = acc.findIndex(
          (object) => object.cat === item.category
        );
        if (findedIndex !== -1) {
          acc[findedIndex].cost += item.cost;
        } else {
          acc = [
            ...acc,
            {
              cat: item.category,
              cost: item.cost,
              color: colorPallet[acc.length - 1],
            },
          ];
        }
        return acc;
      }, []);
  };

  const compareBaseTime = () => {
    return transactions.reduce((acc, item) => {
      const findedIndex = acc.findIndex((object) => item.date === object.date);
      if (findedIndex !== -1) {
        item.type === "income"
          ? (acc[findedIndex].costIncomes += item.cost)
          : (acc[findedIndex].costExpenses += item.cost);
      } else {
        const costIncomes = item.type === "income" ? item.cost : 0;
        const costExpenses = item.type === "expense" ? item.cost : 0;
        acc = [...acc, { costIncomes, costExpenses, date: item.date }];
      }
      return acc;
    }, []);
  };
  // console.log("compareBaseTime result:",compareBaseTime());

  // console.log("expensesBaseCategory:", expensesBaseCategory());
  // console.log(Boolean([1, 2, 3, 5, 7, 9].findIndex((item) => item === 10)));

  const total = totalIncome() - totalExpense();

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        dispatch,
        totalExpense,
        totalIncome,
        total,
        expensesBaseCategory,
        compareBaseTime,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
