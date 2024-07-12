import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ProfilePage from "./Profile";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import RecipeDetails from "./RecipeDetails";
import ExternalRecipes from "./ExternalRecipes";
import Favorites from "./Favorites";
import Search from "./Search";
import About from "./About";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import Login from "../pages/Login";
import Profile from "./Profile";
import Logout from "./Logout";
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token
    if (token) {
      fetch("/checksession", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          } else {
            r.json().then((error) => {
              console.error("Failed to fetch session:", r.status, error);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  console.log(user.id);
  return (
    <>
      <Profile user={user} />
      {/* <Navbar /> */}
      <Logout onLogout={handleLogout} />
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/register" component={SignupForm} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/external-recipes" element={<ExternalRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/create-recipe" element={<RecipeForm />} />
      </Routes> */}
    </>
  );
};

export default App;
