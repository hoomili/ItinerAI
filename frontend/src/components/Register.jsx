import { useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Register.scss";

const RegisterNewUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const defaultProfilePic = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError('Required field missing');
      return;
    }

    try {
      const profilePicUrl = profilePic || defaultProfilePic;
      const response = await axios.post('http://localhost:8080/register', {
        firstName,
        lastName,
        email,
        profilePic: profilePicUrl,
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
    setProfilePic('');
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
          name='profile-pic'
            value={profilePic} 
            placeholder='Add a profile picture here'
            onChange={event => setProfilePic(event.target.value)} />
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