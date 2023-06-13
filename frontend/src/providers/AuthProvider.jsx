import { createContext, useState } from 'react';
import axios from 'axios';

export const authContext = createContext();

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async function(email, password) {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser({ email });
      }
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/logout');
      setIsLoggedIn(false);
      setUser(null);

    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  const userData = { isLoggedIn, user, login, logout };

  return (
    <authContext.Provider value={ userData }>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
