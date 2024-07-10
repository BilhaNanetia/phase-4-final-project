import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExternalRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchExternalRecipes = async () => {
      try {
        const response = await axios.get('/external-recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('There was an error fetching the external recipes!', error);
      }
    };

    fetchExternalRecipes();
  }, []);

  return (
    <div>
      <h1>External Recipes</h1>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default ExternalRecipes;
