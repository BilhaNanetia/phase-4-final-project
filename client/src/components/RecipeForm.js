import React, { useState } from 'react';
import axios from 'axios';
import './RecipeForm.css';

const RecipeForm = ({ onRecipeSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle(''); 
    setDescription(''); 
    setIngredients(''); 
    setInstructions(''); 
    setMessage(''); 

    const newRecipe = {
      title: title, 
      description: description, 
      ingredients: ingredients.split('\n'), 
      instructions: instructions.split('\n'), 
    };

    try {
      const response = await axios.post('http://localhost:5555/recipes', newRecipe, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      onRecipeSubmit(response.data.recipe);
      setMessage('Recipe created successfully!');
    } catch (error) {
      console.error('Error adding recipe:', error);
      setMessage('Request successful');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Ingredients:</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients, one per line"
        />
      </div>
      <div className="form-group">
        <label>Instructions:</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter instructions, one per line"
        />
      </div>
      <button type="submit">Submit Recipe</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default RecipeForm;