import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/Register.css';


function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.acceptTerms) return setError('You must accept the terms.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    if (users.some(user => user.username === form.username)) {
      return setError('Username already taken.');
    }

    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    navigate('/');
  };

  return (

    <div className="register-screen">
  <div
    className="hero-bg"
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/pandas-hero.png)`
    }}
    aria-hidden="true"
  />

    <div className="register-wrapper">

      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        /><br />

        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleChange}
          /> I accept the terms and conditions
        </label><br />

        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default Register;
