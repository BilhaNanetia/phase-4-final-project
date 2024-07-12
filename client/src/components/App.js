import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import ProfilePage from './Profile';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" component={SignupForm} />
        <Route path="/login" element={<LoginForm />} />
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
