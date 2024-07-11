import React, { useEffect, useState } from "react";

function Profile({ user }) {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      fetch(`/profile/${user.Id}`).then((r) => {
        if (r.ok) {
          r.json().then((data) => setUserData(data));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
    setFormData({
      username: userData.username,
      email: userData.email,
    });
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`/profile/${user.Id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        setUserData(data);
        setEditing(false);
      })
      .catch((err) => setErrors(err.errors));
  };

  if (errors.length > 0) {
    return (
      <div>
        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}
      </div>
    );
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <hr />
      {editing ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </label>
          <br />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
      <h3>Recipes</h3>
      <ul>
        {userData.recipes &&
          userData.recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
      </ul>

      <h3>Favorites</h3>
      <ul>
        {userData.favorites &&
          userData.favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.recipe.title}</li>
          ))}
      </ul>

      <h3>Comments</h3>
      <ul>
        {userData.comments &&
          userData.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </div>
  );
}

export default Profile;
