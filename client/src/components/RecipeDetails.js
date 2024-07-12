import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
     .then(r => {
        setRecipe(r.data);
      })
     .catch(error => {
        console.error('Error in fetching recipe details', error);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }


  return (
    <div className="recipe-details-overlay">
      <div className="recipe-details-modal">
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="recipe-info">
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(recipe).filter(key => key.startsWith('strIngredient') && recipe[key]).map(key => (
              <li key={key}>{recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <p>{recipe.ingredients}</p>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <Comments recipeId={id} />
    </div>
  </div>
  );
};

export default RecipeDetails;
