import { createContext, useState } from "react";
import { mockTransactions } from "../constants/mockTransactions";

export const TransactionContext = createContext();

const TransactionContextProvider = ({children})=> {

    const [transactions,setTransactions] = useState(mockTransactions);

    return <TransactionContext.Provider value={{transactions,setTransactions}}>
        {children}
    </TransactionContext.Provider>
};

export default TransactionContextProvider;