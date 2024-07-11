import React, { useEffect, useState } from "react";

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch(`/user/${userId}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }, [userId]);

  if (errors.length > 0) {
    return (
      <div>
        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}</h1>
          <p>Email: {user.email}</p>
          <p>Recipes: {user.recipes.length}</p>
          <p>Favorites: {user.favorites.length}</p>
          <p>Comments: {user.comments.length}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
