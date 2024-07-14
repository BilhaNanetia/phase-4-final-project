import os
import secrets
from flask import Flask, request, jsonify, render_template, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
from PIL import Image
import requests
from config import Config
from models import db, User, Recipe, Favorite, Comment

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)
    
    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html', title='Register')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password_hash, password):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    
    return render_template('login.html', title='Login')

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    if request.method == 'POST':
        if 'picture' in request.files:
            picture_file = save_picture(request.files['picture'])
            current_user.image_file = picture_file
        
        current_user.username = request.form.get('username')
        current_user.email = request.form.get('email')
        current_user.bio = request.form.get('bio')
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account', image_file=image_file)

@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    current_user_id = get_jwt_identity()['id']
    user = User.query.get(current_user_id)

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])
    if 'bio' in data:
        user.bio = data['bio']

    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

@app.route('/recipes', methods=['POST'])
@jwt_required()
def create_recipe():
    data = request.get_json()
    current_user_id = get_jwt_identity()['id']

    recipe = Recipe(
        title=data['title'],
        description=data['description'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        user_id=current_user_id
    )

    db.session.add(recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe created successfully'}), 201

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

@app.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    current_user_id = get_jwt_identity()['id']

    favorite = Favorite(user_id=current_user_id, recipe_id=data['recipe_id'])
    db.session.add(favorite)
    db.session.commit()

    return jsonify({'message': 'Recipe added to favorites'}), 201

@app.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user_id = get_jwt_identity()['id']
    favorites = Favorite.query.filter_by(user_id=current_user_id).all()
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

@app.route('/external-recipes', methods=['GET'])
def get_external_recipes():
    response = requests.get('https://www.themealdb.com/api/json/v1/1/random.php?api_key={}'.format(app.config["THEMEALDB_API_KEY"]))
    if response.status_code != 200:
        return jsonify({'message': 'Failed to fetch recipes'}), 500

    return jsonify(response.json()), 200

@app.route('/recipes/<int:recipe_id>/comments', methods=['POST'])
@jwt_required()
def add_comment(recipe_id):
    data = request.get_json()
    current_user_id = get_jwt_identity()['id']

    comment = Comment(
        content=data['content'],
        user_id=current_user_id,
        recipe_id=recipe_id
    )

    db.session.add(comment)
    db.session.commit()

    return jsonify({'message': 'Comment added successfully'}), 201

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
    app.run(port=5555, debug=True)
