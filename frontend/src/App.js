import { useContext } from 'react';
import { authContext } from './providers/AuthProvider';
import './App.scss';
import Login from './components/Login';
import Navbar from './components/TopNavigationBar';

function App() {

  const { isLoggedIn } = useContext(authContext);
  
  return (
    <div className="App">
      <Navbar />
      <h1>Project init</h1>
      {!isLoggedIn && <Login />}
    </div>
  );
}

export default App;
