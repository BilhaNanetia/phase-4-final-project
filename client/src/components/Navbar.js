import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    onLogout();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <img src="https://www.festfoods.com/wp-content/uploads/06052024-Dads-Chicken-Breast.png" alt="Recipe Logo" />
          Yum Kingdom
        </NavLink>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink exact to="/" className="nav__link" activeClassName="nav__link--active">
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav__item">
                  <NavLink to="/profile" className="nav__link" activeClassName="nav__link--active">
                    Profile
                  </NavLink>
                </li>
                
                <li className="nav__item">
                  <NavLink to="/logout" className="nav__link" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav__item">
                  <NavLink to="/login" className="nav__link" activeClassName="nav__link--active">
                    Login
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="/register" className="nav__link" activeClassName="nav__link--active">
                    SignupForm
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav__item">
              <NavLink to="/about" className="nav__link" activeClassName="nav__link--active">
                About Us
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/search" className="nav__link" activeClassName="nav__link--active">
                Search
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/recipes" className="nav__link" activeClassName="nav__link--active">
                RecipeList
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
