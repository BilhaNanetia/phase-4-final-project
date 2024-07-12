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
=======
import './Home.css';

const Home = () => {
  return (
    <div className="container mt-10">
      <h1>Welcome to Yum Kingdom!</h1>
      <p>Discover and share amazing recipes from around the world! Whether you're a seasoned chef or just starting your culinary journey, RecipeMaster is your go-to resource for delicious and easy-to-follow recipes.</p>
      <p>Explore a wide variety of dishes, from quick and simple meals to gourmet creations. Save your favorites, add your own recipes, and join our community of food enthusiasts.</p>
      <div className="recipe-grid">
        <img
          src="https://images.unsplash.com/photo-1657143377606-ad2f0b790fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHJlY2lwZXN8ZW58MHx8MHx8fDA%3D"
          alt="Delicious Recipe 1"
          title="Delicious Recipe 1"
          width="60"
          height="30"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1661373057573-f0be9e070acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJlY2lwZSUyMGJhY2tncm91bmRzfGVufDB8fDB8fHww"
          alt="Delicious Recipe 2"
          title="Delicious Recipe 2"
          width="60"
          height="30"
        />
        <img
          src="https://images.unsplash.com/photo-1607367657351-08539dfe7ff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHJlY2lwZSUyMGJhY2tncm91bmRzfGVufDB8fDB8fHww"
          alt="Delicious Recipe 3"
          title="Delicious Recipe 3"
          width="60"
          height="30"
        />
        <img
          src="https://images.unsplash.com/photo-1710091691777-3115088962c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlY2lwZXN8ZW58MHx8MHx8fDA%3D"
          alt="Delicious Recipe 4"
          title="Delicious Recipe 4"
          width="60"
          height="30"
        />
      </div>
    </div>
  );
};

export default Home;
