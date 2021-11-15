/* eslint-disable react/jsx-props-no-spreading */
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const userLocal = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(userLocal));

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const authContextValue = {
    setUser,
    logout,
    user,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
