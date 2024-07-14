import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useLocation } from "react-router-dom";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
  const location = useLocation();
  const message = location.state && location.state.message;

  return (
    <div style={{ maxWidth: "70rem", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ textAlign: "center", fontSize: "2em", color: "#2c3e50", marginBottom: "20px" }}>Yum Kingdom</div>
      <hr />
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <hr />
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Don't have an account? &nbsp;
            <button 
              onClick={() => setShowLogin(false)}
              style={{ backgroundColor: "transparent", border: "none", color: "#3498db", cursor: "pointer", textDecoration: "underline" }}
            >
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm onLogin={onLogin} />
          <hr />
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account? &nbsp;
            <button 
              onClick={() => setShowLogin(true)}
              style={{ backgroundColor: "transparent", border: "none", color: "#3498db", cursor: "pointer", textDecoration: "underline" }}
            >
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
