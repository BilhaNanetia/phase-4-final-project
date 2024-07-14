import React, { useState, useEffect } from "react";

const EditProfile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

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
          r.json().then((data) => {
            setUserData(data);
            setProfilePicture(data.profile_picture);
            setBio(data.bio);
          });
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
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("profile_picture", profilePicture);
      formData.append("bio", bio);

      fetch("/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "30px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#34495e" }}>Username:</label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#34495e" }}>Email:</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#34495e" }}>Password:</label>
          <input
            type="password"
            value={userData.password || ""}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            placeholder="Leave blank to keep current password"
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#34495e" }}>Profile Picture:</label>
          <input
            type="file"
            onChange={handleProfilePictureChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#34495e" }}>Bio:</label>
          <textarea
            value={bio}
            onChange={handleBioChange}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "100px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "none", backgroundColor: "#16a085", color: "#fff", fontWeight: "bold" }}>Update Profile</button>
      </form>
      {message && <p style={{ marginTop: "20px", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default EditProfile;