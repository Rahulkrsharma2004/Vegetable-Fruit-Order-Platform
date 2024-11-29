import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    setIsAdminLoggedIn(localStorage.getItem("isAdminLoggedIn"));
    setAdmin(localStorage.getItem("adminName"));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAdminLoggedIn, setIsAdminLoggedIn, admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
