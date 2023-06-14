import { useContext, useState, useEffect } from 'react';
import { authContext } from './providers/AuthProvider';
import './App.scss';
import Login from './components/Login';
import RegisterNewUser from './components/Register';
import Navbar from './components/TopNavigationBar';
import './App.scss';
import Homepage from './components/Homepage';

import ItineraryList from './components/ItineraryList';

function App() {

  const { isLoggedIn, user } = useContext(authContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLoginLinkClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };

  useEffect(() => {
    console.log('APP USER ID:', user?.id);
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  
  return (
    <div className="App">
      <Navbar onLoginLinkClick={handleLoginLinkClick}/>
      {showLoginForm && <Login onClose={handleLoginFormClose} />}
      {user && <ItineraryList userId={userId} />}
    </div>
  );
}

export default App;
