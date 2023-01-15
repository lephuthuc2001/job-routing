import React from "react";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [name, setName] = useState("");
  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(false);
  };

  const getUserName = (name) => {
    setName(name);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, getUserName, name }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
