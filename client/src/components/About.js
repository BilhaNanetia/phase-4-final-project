import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Yum Kingdom</h2>
      <p className="about-description">
      Yum Kingdom is a full-stack web application designed to facilitate users in sharing, discovering, and managing recipes. It provides a seamless interface for users to register, log in, create, browse recipes, and leave comments. Additionally, it integrates with an external API to fetch and display recipes, enriching the user’s experience with a diverse range of culinary options.
      </p>
      <p className="about-features-title">Here are some of the things you can do:</p>
      <ul className="about-features-list">
        <li>Browse through a collection of delicious recipes.</li>
        <li>Search for specific recipes by ingredients or keywords.</li>
        <li>View detailed instructions and ingredients for each recipe.</li>
        <li>Create and share your own recipes.</li>
        <li>User profile management</li>
        <li>Logout from the application</li>
      </ul>
      <p className="about-note">
        This application is still under development, and we're constantly working on adding new features and improvements. We welcome your feedback and suggestions!
      </p>
      <p className="about-contributors">
      Developed by :
       <a href="https://github.com/Munyat">Munyat</a> , 
       <a href="https://github.com/AmariahAK">AmariahAK</a> , 
       <a href="https://github.com/BilRos">BilRos</a> , 
       <a href="https://github.com/Audrey-cK">Audrey-cK</a> , 
       <a href="https://github.com/BilhaNanetia">BilhaNanetia</a>
      </p>
    </div>
  );
};

export default About;
