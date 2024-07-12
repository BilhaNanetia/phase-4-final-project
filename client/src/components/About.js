import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Yum Kingdom</h2>
      <p className="about-description">
        Yum Kingdom is designed to help you explore new dishes, create your own culinary masterpieces, and share your favorite recipes with others.
      </p>
      <p className="about-features-title">Here are some of the things you can do:</p>
      <ul className="about-features-list">
        <li>Browse through a collection of delicious recipes.</li>
        <li>Search for specific recipes by ingredients or keywords.</li>
        <li>View detailed instructions and ingredients for each recipe.</li>
        <li>Create and share your own recipes.</li>
      </ul>
      <p className="about-note">
        This application is still under development, and we're constantly working on adding new features and improvements. We welcome your feedback and suggestions!
      </p>
    </div>
  );
};

export default About;
