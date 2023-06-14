import { useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import logoSample from "../images/logoSample.jpg";
import '../styles/TopNavigationBar.scss';

const Navbar = ({ onLoginLinkClick }) => {
  const { isLoggedIn, user, logout } = useContext(authContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav>
      <div className="top-nav-bar">
        <div className="logo">
          <img src={logoSample} />
        </div>
        <ul>
        <li className="nav-item">
            <a className="nav-link" href="/">Create Itinerary</a>
          </li>
          {isLoggedIn && user && (
            <>
            <li className="nav-item">
                <a href="/my-itineraries">My Itineraries</a>
              </li>
              <li className="nav-welcome">Welcome, {user.email}</li>
              <li className="nav-item">
                <button className="nav-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={onLoginLinkClick}>
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
