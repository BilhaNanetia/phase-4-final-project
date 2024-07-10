import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import RecipeDetails from './RecipeDetails';
import ExternalRecipes from './ExternalRecipes';
import Favorites from './Favorites';
import Search from './Search';
import About from './About';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/external-recipes" element={<ExternalRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipeList />} /> 
        <Route path="/create-recipe" element={<RecipeForm />} /> 
      </Routes>
    </>
  );
};

export default App;
