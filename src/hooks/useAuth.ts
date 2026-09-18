import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthentiactionContext";

export const useAuth = () => {
    const context = useContext(AuthenticationContext);
    if(!context) {
        throw new Error("useAuth must be used within AuthenticationProvider");
    }
    return context;
}; 