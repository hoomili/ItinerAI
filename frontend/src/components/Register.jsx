import { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Register.scss";

const RegisterNewUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', {
        firstName,
        lastName,
        email,
        username,
        password
      });

      setRegistrationSuccess(true);
      
      const loginResponse = await login(email, password);

      if (loginResponse.status === 200) {
        navigate('/');
      }

    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setError('');
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='register-container'>
      <h1 className='register-message'>Hey, Fellow Traveler! Sign up to get started on your next adventure!</h1>
      {error && <p className="error">{error}</p>}
      {registrationSuccess && <p className="success">You are successfully registered! Please login.</p>}
      <form onSubmit={onSubmit}>
        <p>
          <input className='register-input'
          type='text' 
          name='firstName'
            value={firstName} 
            placeholder='First Name'
            onChange={event => setFirstName(event.target.value)} />
        </p>
        <p>
        <input className='register-input'
          type='text' 
          name='lastName'
            value={lastName} 
            placeholder='Last Name'
            onChange={event => setLastName(event.target.value)} />
        </p>
        <p>
        <input className='register-input'
          type='email' 
          name='email'
            value={email} 
            placeholder='Enter email here'
            onChange={event => setEmail(event.target.value)} />
        </p>
        <p>
        <input className='register-input'
          type='text' 
          name='username'
            value={username} 
            placeholder='Enter a username here'
            onChange={event => setUsername(event.target.value)} />
        </p>
        <p>
        <input className='register-input'
          type='password' 
          name='password'
            value={password} 
            placeholder='Enter password here'
            onChange={event => setPassword(event.target.value)} />
        </p>
        <p>
          <button className='register-submit' type='submit' name='submit'>Sign Up</button>
        </p>
      </form>
    </div>
  )
}

export default RegisterNewUser;