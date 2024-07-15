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
    return <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', fontSize: '18px' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '40px auto', padding: '20px', backgroundColor: '#ebcfec', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Local Recipe List</h1>
      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
        {recipes.map((recipe) => (
          <li key={recipe.id} style={{ marginBottom: '20px', padding: '20px', borderBottom: '1px solid #ccc' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{recipe.title}</h2>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>{recipe.description}</p>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Ingredients:</h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {Array.isArray(recipe.ingredients) ? (
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient} style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{ingredient}</span>
                  </li>
                ))
              ) : (
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>{recipe.ingredients}</span>
                </li>
              )}
            </ul>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Instructions:</h3>
            <ol style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {Array.isArray(recipe.instructions) ? (
                recipe.instructions.map((instruction) => (
                  <li key={instruction} style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{instruction}</span>
                  </li>
                ))
              ) : (
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>{recipe.instructions}</span>
                </li>
              )}
            </ol>
            {recipe.image_url && (
              <img src={`http://localhost:5555/${recipe.image_url}`} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalRecipes;