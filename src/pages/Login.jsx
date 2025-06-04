import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import '../Styling/Login.css';


function Login() {
  const { setUser } = useContext(ProfileContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      setUser({ ...foundUser, isGuest: false });
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleGuestLogin = () => {
    setUser({ name: 'Guest', isGuest: true });
    navigate('/dashboard');
  };

  return (
<div className="login-screen">
  <img src={`${process.env.PUBLIC_URL}/images/panda-login-bg.png`} 
    alt=""
    className="login-bg"
    aria-hidden="true"
  />
    
    <div className="login-wrapper">

      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>

      <button onClick={handleGuestLogin}>Continue as Guest</button>
    </div>
   </div> 
  );
}

export default Login;
