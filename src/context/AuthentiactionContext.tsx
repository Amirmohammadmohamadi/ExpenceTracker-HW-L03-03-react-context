import { createContext, useState, type ReactNode } from "react";

type AuthContextType = {
  auth:boolean;
  setAuth:(value:boolean)=>void;
}

export const AuthenticationContext = createContext<AuthContextType | null>(null);

const AuthenticationProvider = ({ children }:{children:ReactNode}) => {
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <AuthenticationContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
