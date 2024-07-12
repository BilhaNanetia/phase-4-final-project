import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import RecipeDetails from './RecipeDetails';
import ExternalRecipes from './ExternalRecipes';
import Search from './Search';
import About from './About';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import Login from '../pages/Login';
import Profile from './Profile';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Auto-login
    fetch('/checksession').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

    // Fetch recipes
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5555/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleRecipeSubmit = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/register" component={SignupForm} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/external-recipes" element={<ExternalRecipes />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
        <Route path="/create-recipe" element={<RecipeForm onRecipeSubmit={handleRecipeSubmit} />} />
      </Routes>
    </>
  );
};

export default App;
