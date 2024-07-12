import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ProfilePage from './Profile';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import RecipeDetails from './RecipeDetails';
import ExternalRecipes from './ExternalRecipes';
import Search from './Search';
import About from './About';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import Profile from './Profile'; 


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/checksession").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <>
      <Profile user={user} />
      <Navbar isLoggedIn={!!user} onLogout={() => setUser(null)} /> {/* Pass isLoggedIn and onLogout props */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm onLogin={setUser} />} /> {/* Pass onLogin prop */}
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/external-recipes" element={<ExternalRecipes />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/create-recipe" element={<RecipeForm />} />
        <Route path="/Profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
