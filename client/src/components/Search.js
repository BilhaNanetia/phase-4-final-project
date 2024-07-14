import React, { useState } from 'react';
import axios from 'axios';


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
      const externalResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const externalResults = externalResponse.data.meals || [];

      setResults(externalResults);
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
          Search by ingredient:
          <input type="text" value={query} onChange={handleInputChange} placeholder="Enter an ingredient (e.g. chicken, beef, etc.)" style={{
            width: '90%',
            padding: '10px',
            fontSize: '18px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }} />
        </label>
        <button type="submit" disabled={isLoading} style={{
          padding: '10px 20px',
          fontSize: '18px',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: '#fff',
          cursor: 'pointer'
        }}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message" style={{
        color: 'red'
      }}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && searchAttempted && (
        results.length > 0 ? (
          <div className="card-container" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {results.map((recipe, index) => (
              <div className="card" key={recipe.idMeal} style={{
                width: '25%',
                padding: '20px',
                margin: '20px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgb(151, 36, 151, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
                }
              }}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} width="460"/>
                <h2>{recipe.strMeal}</h2>
                <p>{recipe.strInstructions}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )
      )}
    </div>
  );
};

export default Search;