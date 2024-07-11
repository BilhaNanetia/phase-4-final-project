import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState(''); // Add state variable for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('/login', {
        username, // Send username in the login request
        email,
        password
      });

      const accessToken = response.data.access_token;
      localStorage.setItem('jwtToken', accessToken); // Assuming JWT storage in localStorage

      navigate('/recipes'); // Redirect to recipes list after successful login
    } catch (error) {
      console.error('There was an error logging in!', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid username, email, or password.'); // Update error message
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
