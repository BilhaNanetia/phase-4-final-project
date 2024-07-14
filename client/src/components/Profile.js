import React, { useState, useEffect } from "react";
import EditProfile from "./EditPage";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

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
            r.json().then(() => console.error("Failed to fetch profile"));
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [user]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteProfile = () => {
    const token = localStorage.getItem("token");
    fetch(`/profile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          localStorage.removeItem("token");
          setUser(null);
          // Navigate to home page after state update
          navigate("/", { replace: true });
        } else {
          console.error("Failed to delete profile");
        }
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
      });
  };

  if (editMode) {
    return <EditProfile user={user} />;
  }

  if (!userData) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Profile</h1>
      <p style={{ fontSize: "1.2em", color: "#34495e" }}>
        <strong>Username:</strong> {userData.username}
      </p>
      <p style={{ fontSize: "1.2em", color: "#34495e" }}>
        <strong>Email:</strong> {userData.email}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={toggleEditMode}
          style={{ padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#16a085", color: "#fff", fontWeight: "bold" }}
        >
          Edit Profile
        </button>
        <button
          onClick={handleDeleteProfile}
          style={{ padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#e74c3c", color: "#fff", fontWeight: "bold" }}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
