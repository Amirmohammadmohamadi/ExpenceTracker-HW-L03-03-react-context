import { createContext, useState, type ReactNode } from "react";

type LoginContextType = {
  loginState:boolean;
  setLoginState:(value:boolean)=>void;
}

export const LoginContextStatus = createContext<LoginContextType | null>(null);

const LoginContextStatusProvider = ({ children }:{ children:ReactNode }) => {
  const [loginState, setLoginState] = useState<boolean>(true);

  return (
    <LoginContextStatus.Provider value={{ loginState , setLoginState }}>
      {children}
    </LoginContextStatus.Provider>
  );
};

export default LoginContextStatusProvider;
