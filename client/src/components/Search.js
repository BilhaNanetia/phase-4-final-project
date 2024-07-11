import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!query.trim()) {
      setIsLoading(false);
      return; // Handle empty search term
    }

    try {
      const [flaskResponse, externalResponse] = await Promise.all([
        axios.get(`/recipes/search?q=${query}`),
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      ]);

      const combinedResults = [
        ...flaskResponse.data,
        ...externalResponse.data.meals.map(meal => ({
          id: meal.idMeal,
          title: meal.strMeal,
          source: 'TheMealDB'
        }))
      ];

      setResults(combinedResults);
    } catch (error) {
      console.error('There was an error searching for recipes!', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear results when query changes
    setResults([]);
  }, [query]);

  return (
    <div>
      <h1>Search Recipes</h1>
      <form onSubmit={handleSearch}>
        <label>
          Search:
          <input type="text" value={query} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map(recipe => (
            <li key={recipe.id || recipe.name}> 
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              {recipe.source && <span className="source">({recipe.source})</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default Search;
