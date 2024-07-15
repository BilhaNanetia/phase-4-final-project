from app import app, db
from models import User, Recipe, Comment
from faker import Faker
import random

fake = Faker()

def seed():
    with app.app_context():
        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

        # Create 10 users with profile pictures and bios
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                image_file='static/default_user_profile.jpg',  # Using local static image
                bio=fake.text(max_nb_chars=200)  # Adding bio
            )
            user.set_password(fake.password())
            users.append(user)
            db.session.add(user)
        db.session.commit()

        # Create 10 recipes with images
        recipes = [
            {
                'title': 'Spaghetti Carbonara',
                'description': 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
                'ingredients': 'Spaghetti, Eggs, Pecorino Romano, Pancetta, Black Pepper',
                'instructions': '1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.',
                'image_url': 'https://example.com/spaghetti_carbonara.jpg'
            },
            {
                'title': 'Chicken Tikka Masala',
                'description': 'Grilled chicken chunks in a creamy tomato sauce.',
                'ingredients': 'Chicken, Yogurt, Tomato Sauce, Cream, Spices',
                'instructions': '1. Marinate chicken. 2. Grill chicken. 3. Prepare sauce. 4. Combine chicken and sauce.',
                'image_url': 'https://example.com/chicken_tikka_masala.jpg'
            },
            {
                'title': 'Caesar Salad',
                'description': 'A green salad of romaine lettuce with Caesar dressing.',
                'ingredients': 'Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing',
                'instructions': '1. Wash and chop lettuce. 2. Prepare dressing. 3. Toss all ingredients together.',
                'image_url': 'https://example.com/caesar_salad.jpg'
            },
            {
                'title': 'Beef Stroganoff',
                'description': 'A Russian dish of sautéed beef in a sour cream sauce.',
                'ingredients': 'Beef, Mushrooms, Onions, Sour Cream, Egg Noodles',
                'instructions': '1. Sauté beef and vegetables. 2. Make sauce. 3. Cook noodles. 4. Combine all.',
                'image_url': 'https://example.com/beef_stroganoff.jpg'
            },
            {
                'title': 'Vegetable Stir Fry',
                'description': 'A quick and healthy mix of vegetables.',
                'ingredients': 'Mixed Vegetables, Soy Sauce, Ginger, Garlic, Oil',
                'instructions': '1. Chop vegetables. 2. Heat oil in wok. 3. Stir fry vegetables. 4. Add sauce and serve.',
                'image_url': 'https://example.com/vegetable_stir_fry.jpg'
            },
            {
                'title': 'Chocolate Chip Cookies',
                'description': 'Classic homemade cookies with chocolate chips.',
                'ingredients': 'Flour, Butter, Sugar, Eggs, Chocolate Chips',
                'instructions': '1. Mix ingredients. 2. Form cookies. 3. Bake until golden.',
                'image_url': 'https://example.com/chocolate_chip_cookies.jpg'
            },
            {
                'title': 'Greek Salad',
                'description': 'A fresh salad with tomatoes, cucumbers, and feta cheese.',
                'ingredients': 'Tomatoes, Cucumbers, Onions, Feta Cheese, Olives',
                'instructions': '1. Chop vegetables. 2. Add feta and olives. 3. Dress with olive oil and oregano.',
                'image_url': 'https://example.com/greek_salad.jpg'
            },
            {
                'title': 'Beef Tacos',
                'description': 'Mexican-style tacos with seasoned ground beef.',
                'ingredients': 'Ground Beef, Taco Shells, Lettuce, Tomato, Cheese',
                'instructions': '1. Cook beef with seasonings. 2. Prepare toppings. 3. Assemble tacos.',
                'image_url': 'https://example.com/beef_tacos.jpg'
            },
            {
                'title': 'Mushroom Risotto',
                'description': 'Creamy Italian rice dish with mushrooms.',
                'ingredients': 'Arborio Rice, Mushrooms, Onion, White Wine, Parmesan',
                'instructions': '1. Sauté mushrooms and onions. 2. Add rice and wine. 3. Gradually add broth and stir.',
                'image_url': 'https://example.com/mushroom_risotto.jpg'
            },
            {
                'title': 'Apple Pie',
                'description': 'Classic American dessert with sweet apple filling.',
                'ingredients': 'Apples, Pie Crust, Sugar, Cinnamon, Butter',
                'instructions': '1. Prepare pie crust. 2. Make apple filling. 3. Assemble and bake.',
                'image_url': 'https://example.com/apple_pie.jpg'
            }
        ]

        for recipe_data in recipes:
            recipe = Recipe(
                title=recipe_data['title'],
                description=recipe_data['description'],
                ingredients=recipe_data['ingredients'],
                instructions=recipe_data['instructions'],
                image_url=recipe_data['image_url'],
                author=random.choice(users)
            )
            db.session.add(recipe)
        db.session.commit()

        # Create 10 comments
        comments = [
            "This recipe is amazing! I'll definitely make it again.",
            "I loved how easy this was to follow. Great results!",
            "The flavors were perfect. My family enjoyed it.",
            "I made a few modifications and it turned out great.",
            "This has become a regular in our meal rotation. Thanks!",
            "The instructions were clear and the dish was delicious.",
            "I was skeptical at first, but this exceeded my expectations.",
            "A hit at our dinner party. Everyone asked for the recipe.",
            "Quick, easy, and tasty. What more could you ask for?",
            "I appreciate the detailed instructions. It helped a lot."
        ]

        all_recipes = Recipe.query.all()
        for comment_text in comments:
            comment = Comment(
                content=comment_text,
                user=random.choice(users),
                recipe=random.choice(all_recipes)
            )
            db.session.add(comment)
        db.session.commit()

if __name__ == "__main__":
    seed()
