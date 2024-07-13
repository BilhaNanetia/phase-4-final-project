import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when submitting the form
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the response data
        localStorage.setItem("token", data.access_token);
        onLogin(data.user); // assuming the response contains the user data
      } else {
        const errorResponse = await response.json();
        setErrors(errorResponse.errors); // Set errors if the response is not ok
      }
    } catch (error) {
      setErrors([error.message]); // Set errors if there's an error
    } finally {
      setIsLoading(false); // Set isLoading to false when the request is complete
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
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

        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};
export default Login;