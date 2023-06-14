import { useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import logoSample from "../images/logoSample.jpg";
import "../styles/TopNavigationBar.scss";

const Navbar = ({ onLoginLinkClick }) => {
  const { isLoggedIn, user, logout } = useContext(authContext);

  const handleLogout = async () => {
    try {
      await logout();
      // window.location.href = "/"
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
            <Link to="/">
              Create Itinerary
            </Link>
          </li>
          {isLoggedIn && user && (
            <>
              <li className="nav-item">
                <Link to="/my-itineraries">My Itineraries</Link>
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
                <Link to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
