import { useContext, useState } from 'react';
import { authContext } from '../providers/AuthProvider';

const Login = ({ onClose }) => {
  const { login } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(email, password);
      
      setEmail('');
      setPassword('');
      onClose();
    } catch (error) {
      console.error(error);
      setError('Login failed; user does not exist');
    }
  };

  return (
    <div className='login'>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <p>
          <input type='text' name='username'
            value={email} placeholder='Enter email here'
            onChange={event => setEmail(event.target.value)} />
        </p>
        <p>
          <input type='password' name='password'
            value={password} placeholder='Enter password here'
            onChange={event => setPassword(event.target.value)} />
        </p>
        <p className='submit'>
          <button type='submit' name='submit'>Login</button>
        </p>
      </form>
    </div>
  )
}

export default Login;