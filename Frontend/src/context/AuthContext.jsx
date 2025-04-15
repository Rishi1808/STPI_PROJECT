import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = (userData) => {
    console.log("User Data on Login:", userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
