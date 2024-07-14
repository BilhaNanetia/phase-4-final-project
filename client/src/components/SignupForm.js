import React, { useState } from "react";

const Signup = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // Add profile picture state
  const [bio, setBio] = useState(""); // Add bio state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, profilePicture, bio }), 
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Log the response data
      localStorage.setItem("token", data.access_token);
      onLogin(data.user); 
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{
          width: "100%",
          height: "40px",
          padding: "5px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          resize: "vertical"
        }}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;