import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchAttempted(true);
    setResults([]);  // Clear previous results

    if (!query.trim()) {
      setIsLoading(false);
      setError('Please enter a search term');
      return;
    }

    try {
      // Local API call
      const localResponse = await axios.get(`/recipes/search?q=${query}`);
      const localResults = localResponse.data;

      // External API call (consider proxying this through your backend)
      const externalResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const externalResults = externalResponse.data.meals || [];

      const combinedResults = [
        ...localResults,
        ...externalResults.map(meal => ({
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
      {isLoading && <p>Loading...</p>}
      {!isLoading && searchAttempted && (
        results.length > 0 ? (
          <ul>
            {results.map(recipe => (
              <li key={recipe.id || recipe.title}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                {recipe.source && <span className="source"> ({recipe.source})</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found.</p>
        )
      )}
    </div>
  );
};

export default Search;