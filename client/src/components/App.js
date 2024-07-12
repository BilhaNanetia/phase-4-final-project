import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ProfilePage from "./Profile";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import RecipeDetails from "./RecipeDetails";
import ExternalRecipes from "./ExternalRecipes";
import Search from "./Search";
import About from "./About";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import Login from "../pages/Login";
import Profile from "./Profile";
origin/profile_pages
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

  if (!user) return <Login onLogin={setUser} />;
  return (
    <>
      <Profile user={user} />
      { <Navbar /> }
      {<Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/register" component={SignupForm} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/external-recipes" element={<ExternalRecipes />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/create-recipe" element={<RecipeForm />} />
      </Routes> }
    </>
  );
};

export default App;
