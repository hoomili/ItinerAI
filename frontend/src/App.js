import { useContext, useState } from 'react';
import { authContext } from './providers/AuthProvider';
import './App.scss';
import Login from './components/Login';
import RegisterNewUser from './components/Register';
import Navbar from './components/TopNavigationBar';
import './App.scss';
import Homepage from './components/Homepage';
import ItineraryListItem from './components/itinerarylistitem';

function App() {

  const { isLoggedIn } = useContext(authContext);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginLinkClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
  };
  
  return (
    <div className="App">
      <Navbar onLoginLinkClick={handleLoginLinkClick}/>
      {showLoginForm && <Login onClose={handleLoginFormClose} />}
      <h1>Project init</h1>
      <RegisterNewUser />
      <Homepage />
      <ItineraryListItem/>
    </div>
  );
}

export default App;
