from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()

# Association table to store favorites relationship between users and recipes
favorites = db.Table(
    'favorites',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('date_favorited', db.DateTime, default=datetime.utcnow)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    serialize_rules = ('-password_hash', '-favorites', '-recipes', '-comments')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    favorite_recipes = association_proxy('favorite_relationships', 'recipe')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipe'
    serialize_rules = ('-users', '-comments')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    users = db.relationship('User', secondary=favorites, backref=db.backref('favorite_relationships', lazy='dynamic'))

    comments = db.relationship('Comment', backref='recipe', lazy=True)


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comment'
    serialize_rules = ('-user', '-recipe')

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    
