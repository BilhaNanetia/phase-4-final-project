import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const isLocalRecipe = !recipe.source; 

  return (
    <div className="recipe-details-overlay">
      <div className="recipe-details-modal">
        <h2>{isLocalRecipe ? recipe.title : recipe.strMeal}</h2>
        <img src={isLocalRecipe ? recipe.image_url : recipe.strMealThumb} alt={isLocalRecipe ? recipe.title : recipe.strMeal} />
        <div className="recipe-info">
          <h3>Ingredients</h3>
          <ul>
            {isLocalRecipe
              ? recipe.ingredients.split(',').map((ingredient, index) => <li key={index}>{ingredient}</li>)
              : Object.keys(recipe)
                  .filter(key => key.startsWith('strIngredient') && recipe[key])
                  .map(key => (
                    <li key={key}>
                      {recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}
                    </li>
                  ))}
          </ul>
          <h3>Instructions</h3>
          <p>{isLocalRecipe ? recipe.instructions : recipe.strInstructions}</p>
        </div>
      </div>
      <Comments recipeId={id} />
    </div>
  );
};

export default RecipeDetails;
