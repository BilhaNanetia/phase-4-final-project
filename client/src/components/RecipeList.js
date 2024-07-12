import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeForm from "./RecipeForm";
import "./RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        setRecipes(response.data.meals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe === selectedRecipe ? null : recipe);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="recipe-list">
      <button className="toggle-form-button" onClick={toggleForm}>
        {showForm ? "Hide Recipe Form" : "Add New Recipe"}
      </button>
      {showForm && <RecipeForm />}
      {recipes.map((recipe) => (
        <div key={recipe.idMeal} className="recipe-card" onClick={() => handleRecipeClick(recipe)}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
          <h3 className="recipe-title">{recipe.strMeal}</h3>
          {selectedRecipe === recipe && (
            <div className="recipe-details">
              <h4>Ingredients</h4>
              <ul>
                {Object.keys(recipe)
                  .filter((key) => key.startsWith("strIngredient") && recipe[key])
                  .map((key, index) => (
                    <li key={index}>{recipe[key]}</li>
                  ))}
              </ul>
              <h4>Instructions</h4>
              <p>{recipe.strInstructions}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
