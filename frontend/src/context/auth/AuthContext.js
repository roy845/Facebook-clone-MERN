import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        fetchAgain,
        setFetchAgain,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
