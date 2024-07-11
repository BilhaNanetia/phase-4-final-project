# YUM KINGDOM
## Description
This is a full-stack web application designed to facilitate users in sharing, discovering, and managing recipes. It provides a seamless interface for users to register, log in, create and browse recipes, add favorites, and leave comments. Additionally, it integrates with an external API to fetch and display recipes, enriching the user’s experience with a diverse range of culinary options. The application is built with a Flask API backend and a responsive React frontend, providing a robust,smooth and interactive experience for cooking enthusiasts.
## Features
- User registration and login with JWT authentication.
- Logged in users can create and share their own recipes.
- Logged in users can search and browse recipes from both local database and external API
- Logged in users can save their favorite recipes
- Logged in users can click on a recipe to view detailed information, including ingredients, instructions, and author details.
- Logged in users can view a list of all recipes.
- Logged in users can comment on recipes.
- Logged in users can manage their own profile
- Logged in users can log out from the application
## Prerequisites
- Node.js installed, to run and build the React frontend of the application
- A code editor like Visual Studio Code 
- Python installed, to run the Flask backend of the application. 
- Flask installed
- pip installed, to manage Python packages
- JWT(JSON Web Token) installed, to manage user authentication in the application
## Installation
- Clone the repository
```console
git clone https://github.com/BilhaNanetia/phase-4-final-project.git
cd phase-4-final-project
```
- Install the dependencies for the frontend and backend:
```console
pipenv install
pipenv shell
npm install --prefix client
```
- Change into the server directory:
```console
cd server
```
- Configure the FLASK_APP environment variables
```console
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```
- Set up the database:
```console
flask db init
flask db migrate -m "Initial migration."
flask db upgrade head
```
- Seed the database with initial data
```console
python seed.py
```
- Run the Flask API with:
```console
python app.py
```
- Run the React app in another terminal:
```console
cd client
npm install react-icons
npm start --prefix client
```
## Usage
- In the web browser, start by creating an account by signing in
- Browse recipes, create new ones or  search for recipes 
- Save your favorite recipes
- Comment on other recipes and view other people's comments on different recipes
- Manage your profile
## API Endpoints
- Recipes
    - GET /recipes: Retrieve all recipes
    - POST /recipes: Create a new recipe
    - GET /recipes/{id}: Retrieve a recipe
    - PUT /recipes/{id}: Update a recipe
    - DELETE /recipes/{id}: Delete a recipe
- Users
    - POST /register: Create a new user
    - DELETE /profile: Delete user's profile
    - POST /login: Log in
    - GET /profile: View user's profile
    - PUT /profile: Update user profile
- Favorites
    - GET /favorites: Retrieve all favorites for a user
    - POST /favorites: Create a new favorite
- Comments
    - POST /recipes/{id}/comments: Add comment to a recipe
    - GET /recipes/{id}/comments: Get comments for a recipe
- External Recipes
    - GET /external-recipes: Retrieve  external recipes
## Contributing
- Fork the repository
- Create your feature branch
- Commit your changes
- Push to the branch
- Open a pull request
## Contributors
This project was a collaborative effort by the following individuals:
- AmariahAK(Gitub username)
- Audrey-cKH(Gitub username)
- Munyat(Gitub username)
- BilRos(Gitub username)
