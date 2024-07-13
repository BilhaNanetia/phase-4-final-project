from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
from config import Config
from models import db, User, Recipe, Comment

blacklist = set() 

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route('/register', methods=['POST'])
def register():
    if request.is_json:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
    else:
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity={'id': user.id, 'username': user.username})

    return jsonify(access_token=access_token, user={'id': user.id, 'username': user.username}), 201


@app.route('/login', methods=['POST'])
def login():
    if request.is_json:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
    else:
        email = request.form.get('email')
        password = request.form.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity={'id': user.id, 'username': user.username})
    return jsonify(access_token=access_token, user={'id': user.id, 'username': user.username}), 200


# Get User Profile
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])

    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email
    }

    return make_response(jsonify(user_data), 200)

# Update User Profile
@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])

    if not user:
        return jsonify({'message': 'User not found'}), 404

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

# Delete User Profile
@app.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])

    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

#  Create Recipe
@app.route('/recipes', methods=['POST'])
@jwt_required()
def create_recipe():
    data = request.get_json()
    current_user = get_jwt_identity()

    try:
        recipe = Recipe(
            title=data['title'],
            description=data['description'],
            ingredients=data['ingredients'],
            instructions=data['instructions'],
            user_id=current_user['id']
        )

        db.session.add(recipe)
        db.session.commit()

        return jsonify({'message': 'Recipe created successfully', 'recipe': recipe.serialize()}), 201
    except KeyError:
        return jsonify({'error': 'Missing required fields'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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

# Get Single Recipe
@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    recipe_data = {
        'id': recipe.id,
        'title': recipe.title,
        'description': recipe.description,
        'ingredients': recipe.ingredients,
        'instructions': recipe.instructions,
        'author': recipe.author.username
    }

    return jsonify(recipe_data), 200

# Update Recipe
@app.route('/recipes/<int:recipe_id>', methods=['PUT'])
@jwt_required()
def update_recipe(recipe_id):
    data = request.get_json()
    current_user = get_jwt_identity()
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    if recipe.user_id != current_user['id']:
        return jsonify({'message': 'Permission denied'}), 403

    if 'title' in data:
        recipe.title = data['title']
    if 'description' in data:
        recipe.description = data['description']
    if 'ingredients' in data:
        recipe.ingredients = data['ingredients']
    if 'instructions' in data:
        recipe.instructions = data['instructions']

    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully'}), 200

# Delete Recipe
@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def delete_recipe(recipe_id):
    current_user = get_jwt_identity()
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    if recipe.user_id != current_user['id']:
        return jsonify({'message': 'Permission denied'}), 403

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'}), 200
# Search Recipes
@app.route('/recipes/search', methods=['GET'])
def search_recipes():
    q = request.args.get('q')
    if not q:
        return jsonify({'message': 'Search query is required'}), 400

    recipes = Recipe.query.filter(
        (Recipe.title.ilike(f'%{q}%')) |
        (Recipe.description.ilike(f'%{q}%')) |
        (Recipe.ingredients.ilike(f'%{q}%')) |
        (Recipe.instructions.ilike(f'%{q}%'))
    ).all()

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


# Fetch Recipes from Public API
@app.route('/external-recipes', methods=['GET'])
def get_external_recipes():
    response = requests.get(f'https://www.themealdb.com/api/json/v1/1/random.php?api_key={app.config["THEMEALDB_API_KEY"]}')
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

@app.route('/checksession', methods=['GET'])
@jwt_required()
def check_session():
    try:
        current_user = get_jwt_identity()
        app.logger.info(f'Current User: {current_user}')
        if not current_user:
            return jsonify({'message': 'No active session'}), 401

        return make_response(jsonify({
            'id': current_user['id'],
            'username': current_user['username']
        }), 200)
    except Exception as e:
        app.logger.error(f'Error: {e}')
        return jsonify({'message': 'Error processing request'}), 500



if __name__ == '__main__':
    app.run(port=5555, debug=True)
