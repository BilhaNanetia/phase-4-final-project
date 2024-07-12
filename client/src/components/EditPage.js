import React, { useState, useEffect } from "react";

const EditProfile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.id) {
      const token = localStorage.getItem("token");
      fetch(`/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => setUserData(data));
          } else {
            r.json().then(() => setMessage("Failed to fetch profile"));
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setMessage("Error fetching profile");
        });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((updatedUser) => {
              setUserData(updatedUser);
              setMessage("Profile updated successfully");
            });
          } else {
            r.json().then(() => setMessage("Failed to update profile"));
          }
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          setMessage("Error updating profile");
        });
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={userData.password || ""}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProfile;
