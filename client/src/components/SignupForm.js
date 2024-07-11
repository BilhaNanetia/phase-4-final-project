import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Add state for confirmation
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSuccess(false); // Reset success state for new attempts

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    if (!validEmail.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await axios.post('/register', {
        username,
        email,
        password
      });

      setIsSuccess(true); // Set success state after successful registration
      console.log(response.data); // Log the response data for debugging
      navigate('/welcome'); // Navigate to a welcome page or dashboard
    } catch (error) {
      console.error('There was an error registering!', error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message); // Handle email conflict error
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isSuccess && <p className="success-message">Registration successful! Redirecting...</p>}
    </div>
  );
};

export default Signup;
