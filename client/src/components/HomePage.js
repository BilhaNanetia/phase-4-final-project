import React from 'react';
import Login from './LoginForm';
import Signup from './SignupForm';
import './Homepage.css';

const HomePage = () => {
  return (
    <section className="homepage-section">
      <div className="homepage-container">
        <div className="homepage-content">
          <h1 className="homepage-title">Welcome to Yum Kingdom</h1>
          <p className="homepage-description">Discover, share, and manage your favorite recipes with ease. Explore new dishes, create your own, and connect with fellow food enthusiasts.</p>
          {/* <a href="#" className="homepage-readmore">Read more about our app
            <svg className="homepage-readmore-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a> */}
        </div>
        <div className="homepage-auth">
          <div className="homepage-login">
            <h2>Sign in to Yum Kingdom</h2>
            <Login />
          </div>
          <div className="homepage-signup">
            <h2>Sign Up for Yum Kingdom</h2>
            <Signup />
          </div>
        </div>
      </div>
    </section>
  );
};



export default HomePage;
