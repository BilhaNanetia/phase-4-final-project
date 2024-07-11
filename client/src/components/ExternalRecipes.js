import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExternalRecipes.css';

const ExternalRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchExternalRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5555/external-recipes'); 
        setRecipes(response.data.meals);
      } catch (error) {
        console.error('There was an error fetching the external recipes!', error);
      }
    };

    fetchExternalRecipes();
  }, []);

  return (
    <div className="container">
      <h1>External Recipes</h1>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map(recipe => (
            <li key={recipe.idMeal}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} width="400"/>
              <h2>{recipe.strMeal}</h2>
              <p>{recipe.strInstructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default ExternalRecipes;
