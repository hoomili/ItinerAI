import { useState } from 'react';
import axios from 'axios';

const RegisterNewUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');

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
    <div className='register'>
      {error && <p className="error">{error}</p>}
      {registrationSuccess && <p className="success">You are successfully registered! Please login.</p>}
      <form onSubmit={onSubmit}>
        <p>
          <input 
          type='text' 
          name='firstName'
            value={firstName} 
            placeholder='First Name'
            onChange={event => setFirstName(event.target.value)} />
        </p>
        <p>
        <input 
          type='text' 
          name='lastName'
            value={lastName} 
            placeholder='Last Name'
            onChange={event => setLastName(event.target.value)} />
        </p>
        <p>
        <input 
          type='email' 
          name='email'
            value={email} 
            placeholder='Enter email here'
            onChange={event => setEmail(event.target.value)} />
        </p>
        <p>
        <input 
          type='text' 
          name='username'
            value={username} 
            placeholder='Enter a username here'
            onChange={event => setUsername(event.target.value)} />
        </p>
        <p>
        <input 
          type='password' 
          name='password'
            value={password} 
            placeholder='Enter password here'
            onChange={event => setPassword(event.target.value)} />
        </p>
        <p className='submit'>
          <button type='submit' name='submit'>Register</button>
        </p>
      </form>
    </div>
  )
}

export default RegisterNewUser;