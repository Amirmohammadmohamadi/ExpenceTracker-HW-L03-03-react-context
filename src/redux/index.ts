import { configureStore } from "@reduxjs/toolkit";
import { transactionSlice } from "./slice/transactionSlice";
import { usersSlice } from "./slice/usersSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer,
        users: usersSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
