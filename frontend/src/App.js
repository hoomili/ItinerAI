import { useContext } from 'react';
import { authContext } from './providers/AuthProvider';
import './App.scss';
import Login from './components/Login';
import Navbar from './components/TopNavigationBar';
import ItineraryListItem from './components/itinerarylistitem';

function App() {

  const { isLoggedIn } = useContext(authContext);
  
  return (
    <div className="App">
      <Navbar />
      <h1>Project init</h1>
      {!isLoggedIn && <Login />}
      <ItineraryListItem/>
    </div>
  );
}

export default App;
