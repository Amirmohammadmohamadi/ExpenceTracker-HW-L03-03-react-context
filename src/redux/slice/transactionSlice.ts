import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockTransactions, type Transaction } from "../../constants/mockTransactions";

const TRANSACTIONS = "transactions";

const transactionsStorage = (state:Transaction[])=> {
    localStorage.setItem(TRANSACTIONS,JSON.stringify(state));
}

const stored = localStorage.getItem(TRANSACTIONS)

export const transactionSlice = createSlice({
    name:"transactions",
    initialState: (stored ? JSON.parse(stored) : mockTransactions)as Transaction[],
    reducers:{
        add(state,action:PayloadAction<Transaction>){
            state.push(action.payload);
            transactionsStorage(state);
        },
        delete(state,action:PayloadAction<number>){
            const index = state.findIndex(item => item.id === action.payload);
            state.splice(index,1);
            transactionsStorage(state);
        },
    }
});

export const transactionsActions = transactionSlice.actions;