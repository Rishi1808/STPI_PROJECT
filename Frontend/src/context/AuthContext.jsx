import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("❌ Error loading user from localStorage:", err);
      return null;
    }
  });

  // Save user to localStorage on change
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("💾 User saved to localStorage:", user);
      } catch (err) {
        console.error("❌ Failed to save user to localStorage:", err);
      }
    }
  }, [user]);

  const login = (userData) => {
    console.log("📥 login() called with:", userData);
    setUser(userData);
  };

  const logout = () => {
    console.log("🚪 User logged out.");
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
