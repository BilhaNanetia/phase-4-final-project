import React, { useState, useEffect } from "react";
import EditProfile from "./EditPage";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  if (editMode) {
    return <EditProfile user={user} />;
  }

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>

      <button onClick={toggleEditMode}>Edit Profile</button>
    </div>
  );
};

export default Profile;
