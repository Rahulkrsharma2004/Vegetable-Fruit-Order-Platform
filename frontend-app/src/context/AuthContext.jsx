import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
//   const navigate = useNavigate()

//   const loginAdmin = () => {
//     setIsAdminLoggedIn(true);
//   };

//   const logoutAdmin = () => {
//     setIsAdminLoggedIn(false);
//   };

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
