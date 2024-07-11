import React from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          Yum Kingdom
        </NavLink>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/profile" className="nav__link">
                Profile
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/about" className="nav__link">
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/favorites" className="nav__link">
                Favorites
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/search" className="nav__link">
                Search
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/external-recipes" className="nav__link">
                External Recipes
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/create-recipe" className="nav__link">
                Create Recipe
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/logout" className="nav__link">
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav__close" id="nav-close">
            <IoClose />
          </div>
        </div>
        <div className="nav__toggle" id="nav-toggle">
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
