from app import app, db
from models import User, Recipe, Favorite, Comment

with app.app_context():
    db.create_all()

    # Create some users
    user1 = User(username='user1', email='user1@example.com')
    user1.set_password('password')
    user2 = User(username='user2', email='user2@example.com')
    user2.set_password('password')

    # Create some recipes
    recipe1 = Recipe(
        title='Spaghetti Carbonara',
        description='A classic Italian dish.',
        ingredients='Spaghetti, eggs, pancetta, parmesan cheese, pepper',
        instructions='Boil spaghetti. Cook pancetta. Mix eggs and cheese. Combine everything.',
        author=user1
    )
    recipe2 = Recipe(
        title='Tomato Soup',
        description='A simple and tasty soup.',
        ingredients='Tomatoes, onions, garlic, basil, cream',
        instructions='Cook onions and garlic. Add tomatoes and basil. Simmer. Blend and add cream.',
        author=user2
    )

    # Create some comments
    comment1 = Comment(
        content='This recipe is amazing!',
        user=user2,
        recipe=recipe1
    )
    comment2 = Comment(
        content='Thanks for sharing!',
        user=user1,
        recipe=recipe2
    )

    # Add to session and commit
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()
