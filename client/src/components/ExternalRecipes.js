import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExternalRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/external-recipes')
      .then(response => {
        setRecipes(response.data.recipes);
      })
      .catch(error => {
        console.error('There was an error fetching the external recipes!', error);
      });
  }, []);

  return (
    <div>
      <h1>External Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExternalRecipes;
