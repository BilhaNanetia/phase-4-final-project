
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Favorites = () => {
const [favorites, setFavorites] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
const fetchFavorites = async () => {
setIsLoading(true);
setError(null);

try {
const token = localStorage.getItem('jwtToken'); 

const response = await axios.get('/favorites', {
headers: { Authorization: `Bearer ${token}` } // Include JWT token in header
});

setFavorites(response.data);
} catch (error) {
console.error('There was an error fetching favorites!', error);
setError('An error occurred. Please try again later.');
} finally {
setIsLoading(false);
}
};

fetchFavorites();
}, []); // Empty dependency array for fetching on component mount

const handleAddToFavorites = async (recipeId) => {
setIsLoading(true);
setError(null);

try {
const token = localStorage.getItem('jwtToken'); 

await axios.post('/favorites', { recipe_id: recipeId }, {
headers: { Authorization: `Bearer ${token}` } // Include JWT token in header
});


} catch (error) {
console.error('There was an error adding to favorites!', error);
setError('An error occurred. Please try again later.');
} finally {
setIsLoading(false);
}
};

return (
<div>
<h2>Favorites</h2>
{isLoading ? (
<p>Loading favorites...</p>
) : error ? (
<p className="error-message">{error}</p>
) : favorites.length > 0 ? (
<ul>
{favorites.map(recipe => (
<li key={recipe.id}>
<Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
<button onClick={() => handleAddToFavorites(recipe.id)}>Remove</button>
</li>
))}
</ul>
) : (
<p>You have no favorite recipes yet.</p>
)}
</div>
);
};

export default Favorites;






