import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async function(email, password) {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password
      }, { withCredentials: true });

      if (response.status === 200) {
        setIsLoggedIn(true);
        const userData = response.data
        console.log('adams user data', userData)
        setUser({ id: userData.id, email: userData.email, profile_pic: userData.profile_pic, first_name: userData.first_name});
      }
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', null, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);

    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  const userData = { isLoggedIn, user, login, logout };

  return (
    <AuthContext.Provider value={ userData }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;

