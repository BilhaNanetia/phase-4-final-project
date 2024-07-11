import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Logic to remove user data from local storage or cookies (if used)
    localStorage.removeItem('jwtToken'); 

    try {
      const response = await axios.post('/logout'); 
      console.log('Logout successful:', response.data);
    } catch (error) {
      console.error('There was an error logging out!', error);
    }

    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
