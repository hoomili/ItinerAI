import { useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import logo from '../doc/logo.png'

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(authContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav>
      <div className='logo'>
        <img src={logo} alt='Logo' />
      </div>
      <ul>
        {isLoggedIn && user && (
          <>
          <li>Welcome, {user.email}</li>
          <li>
            <a href="/my-itineraries">My Itineraries</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
          </>
        )} 
        {!isLoggedIn && (
          <>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          </>
        )}
        <li>
          <a href="/">Create Itinerary</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;