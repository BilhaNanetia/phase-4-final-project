import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`/recipes/search?q=${query}`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('There was an error searching for recipes!', error);
      });
  };

  return (
    <div>
      <h1>Search Recipes</h1>
      <form onSubmit={handleSearch}>
        <label>
          Search:
          <input type="text" value={query} onChange={handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
