import { createContext, useState, useEffect, useMemo } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    console.log("User Data on Login:", userData); // Debugging: Check received data
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
