/* eslint-disable react/jsx-props-no-spreading */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    if (!userLocal) return;
    setUser(JSON.parse(userLocal));
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const authContextValue = {
    setUser,
    logout,
    user,
  };
  console.log(user);
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
