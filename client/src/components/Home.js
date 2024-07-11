import React from 'react';
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