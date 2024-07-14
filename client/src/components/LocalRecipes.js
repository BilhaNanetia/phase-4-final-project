import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5555/local-recipes');
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Local Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>Posted on: {recipe.date_posted ? recipe.date_posted.toLocaleString() : 'Unknown'}</p>
            <p>Author: {recipe.user ? recipe.user.username : 'Unknown'}</p>
            <h3>Ingredients:</h3>
            <ul>
              {Array.isArray(recipe.ingredients) ? (
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))
              ) : (
                <li>{recipe.ingredients}</li>
              )}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {Array.isArray(recipe.instructions) ? (
                recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))
              ) : (
                <li>{recipe.instructions}</li>
              )}
            </ol>
            {recipe.image_url && (
              <img src={`http://localhost:5555/${recipe.image_url}`} alt={recipe.title} />
            )}
            <h3>Comments:</h3>
            <ul>
              {recipe.comments?.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalRecipes;