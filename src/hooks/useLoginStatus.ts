import { useContext } from "react";
import { LoginContextStatus } from "../context/LoginStatusContext";

export const useLoginStatus = () => {
    const context = useContext(LoginContextStatus)
    if(!context){
        throw new Error("useLoginStatus must be used within LoginContextStatusProvider")
    }
    return context;
};