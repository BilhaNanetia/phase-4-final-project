import React from 'react';

const RecipeDetails = ({ recipe, onClose }) => {
  return (
    <div className="recipe-details-overlay">
      <div className="recipe-details-modal">
        <span className="close-btn" onClick={onClose}>&times;</span>
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
    </div>
  );
};

export default RecipeDetails;
