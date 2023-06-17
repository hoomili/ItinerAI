import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";

const Login = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(email, password);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Login failed; user does not exist");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-message">Login to get started!</h1>
      {error && <p className="error">{error}</p>}
      <form className="login-form" onSubmit={onSubmit}>
        <p>
          <label className="login-label">
            Email:
            <input
              className="login-input"
              type="text"
              name="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </p>
        <p>
        <label className="login-label">
          Password:
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          </label>
        </p>
        <p>
          <button className="login-submit" type="submit" name="submit">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
