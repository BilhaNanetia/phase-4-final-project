import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
