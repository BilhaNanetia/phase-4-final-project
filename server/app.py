from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests

app = Flask(__name__)
app.config.from_object('config.Config')

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from models import User, Recipe, Favorite, Comment

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity={'id': user.id, 'username': user.username})
    return jsonify(access_token=access_token), 200

# Update User Profile
@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

# Create Recipe
@app.route('/recipes', methods=['POST'])
@jwt_required()
def create_recipe():
    data = request.get_json()
    current_user = get_jwt_identity()

    recipe = Recipe(
        title=data['title'],
        description=data['description'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        user_id=current_user['id']
    )

    db.session.add(recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe created successfully'}), 201

# Get All Recipes
@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    output = []
    for recipe in recipes:
        recipe_data = {
            'id': recipe.id,
            'title': recipe.title,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions,
            'author': recipe.author.username
        }
        output.append(recipe_data)

    return jsonify(output), 200

# Add Recipe to Favorites
@app.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    current_user = get_jwt_identity()

    favorite = Favorite(user_id=current_user['id'], recipe_id=data['recipe_id'])
    db.session.add(favorite)
    db.session.commit()

    return jsonify({'message': 'Recipe added to favorites'}), 201

# Get User's Favorites
@app.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=current_user['id']).all()
    output = []
    for favorite in favorites:
        recipe = Recipe.query.get(favorite.recipe_id)
        recipe_data = {
            'id': recipe.id,
            'title': recipe.title,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions,
            'author': recipe.author.username
        }
        output.append(recipe_data)

    return jsonify(output), 200

# Fetch Recipes from Public API
@app.route('/external-recipes', methods=['GET'])
def get_external_recipes():
    response = requests.get('https://api.spoonacular.com/recipes/random?number=10&apiKey=YOUR_API_KEY')
    if response.status_code != 200:
        return jsonify({'message': 'Failed to fetch recipes'}), 500

    return jsonify(response.json()), 200

# Add Comment to Recipe
@app.route('/recipes/<int:recipe_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(recipe_id):
    data = request.get_json()
    current_user = get_jwt_identity()

    comment = Comment(
        content=data['content'],
        user_id=current_user['id'],
        recipe_id=recipe_id
    )

    db.session.add(comment)
    db.session.commit()

    return jsonify({'message': 'Comment added successfully'}), 201

# Get Comments for a Recipe
@app.route('/recipes/<int:recipe_id>/comments', methods=['GET'])
def get_comments(recipe_id):
    comments = Comment.query.filter_by(recipe_id=recipe_id).all()
    output = []
    for comment in comments:
        comment_data = {
            'id': comment.id,
            'content': comment.content,
            'author': comment.user.username
        }
        output.append(comment_data)

    return jsonify(output), 200

if __name__ == '__main__':
    app.run(debug=True)
