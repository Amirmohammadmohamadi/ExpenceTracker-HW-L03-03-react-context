import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../../constants/mockTransactions";

const TRANSACTIONS = "transactions";

const transactionsStorage = (state)=> {
    localStorage.setItem(TRANSACTIONS,JSON.stringify(state));
}

export const transactionSlice = createSlice({
    name:"transactions",
    initialState: JSON.parse(localStorage.getItem(TRANSACTIONS)) || mockTransactions,
    reducers:{
        add(state,action){
            state.push(action.payload);
            transactionsStorage(state);
        },
        delete(state,action){
            const index = state.findIndex(item => item.id === action.payload);
            state.splice(index,1);
            transactionsStorage(state);
        },
        total(){
            return this.totalIncome()-this.totalExpense();
        },
    }
});

export const transactionsActions = transactionSlice.actions;