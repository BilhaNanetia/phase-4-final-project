import React, { useState } from "react";

const Signup = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (password !== passwordConfirmation) {
      setErrors(["Passwords do not match"]);
      return;
    }

    setIsLoading(true);

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors || ["Registration failed"]));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
        setErrors(["An error occurred. Please try again later."]);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {errors.length > 0 && (
        <div className="error-messages">
          <p>Errors:</p>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Signup;
