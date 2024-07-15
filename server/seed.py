#seed.py
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

        # Create 10 users
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email()
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
                'image_url': 'https://media.istockphoto.com/id/910704720/photo/traditional-italian-dish-spaghetti-carbonara-with-bacon-in-a-cream-sauce.webp?b=1&s=170667a&w=0&k=20&c=7S2o8ApMpDJPLwEVbm7t1nMWJEcUQ23-OReOrQ5iQFc=&v=2'
            },
            {
                'title': 'Chicken Tikka Masala',
                'description': 'Grilled chicken chunks in a creamy tomato sauce.',
                'ingredients': 'Chicken, Yogurt, Tomato Sauce, Cream, Spices',
                'instructions': '1. Marinate chicken. 2. Grill chicken. 3. Prepare sauce. 4. Combine chicken and sauce.',
                'image_url': 'https://media.istockphoto.com/id/1286704566/photo/image-of-turquoise-blue-cooking-pan-filled-with-butter-chicken-tikka-curry-large-chunks-of.webp?b=1&s=170667a&w=0&k=20&c=3rt7nZlUzTXK2wpI4brComuxmuwRhCYQxWgmJx4K__s=&v=2'
            },
            {
                'title': 'Caesar Salad',
                'description': 'A green salad of romaine lettuce with Caesar dressing.',
                'ingredients': 'Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing',
                'instructions': '1. Wash and chop lettuce. 2. Prepare dressing. 3. Toss all ingredients together.',
                'image_url': 'https://media.istockphoto.com/id/1761002938/photo/caesar-style-salad-fresh-vegetables-with-grilled-sliced-chicken-breast-on-wooden-table.webp?b=1&s=170667a&w=0&k=20&c=6P3nCNT4Ntw4-VCofCxdkoVkVbZsgxuSMcvsoou9BwQ=&v=2'
            },
            {
                'title': 'Beef Stroganoff',
                'description': 'A Russian dish of sautéed beef in a sour cream sauce.',
                'ingredients': 'Beef, Mushrooms, Onions, Sour Cream, Egg Noodles',
                'instructions': '1. Sauté beef and vegetables. 2. Make sauce. 3. Cook noodles. 4. Combine all.',
                'image_url': 'https://media.istockphoto.com/id/1460067261/photo/beef-stroganoff-mushroom-rice-straw-potato.webp?b=1&s=170667a&w=0&k=20&c=XxQtv1F9ua4uxt1a3XMrHR8JVwlTQoDpM3CWDuDfksM=&v=2'
            },
            {
                'title': 'Vegetable Stir Fry',
                'description': 'A quick and healthy mix of vegetables.',
                'ingredients': 'Mixed Vegetables, Soy Sauce, Ginger, Garlic, Oil',
                'instructions': '1. Chop vegetables. 2. Heat oil in wok. 3. Stir fry vegetables. 4. Add sauce and serve.',
                'image_url': 'https://media.istockphoto.com/id/588595864/photo/steaming-mixed-vegetables-in-the-wok-asian-style-cooking.webp?b=1&s=170667a&w=0&k=20&c=BWA5VqmGAhCvhnwrmlwOgeNlyQYA_OMTdPrln1psL08=&v=2'
            },
            {
                'title': 'Chocolate Chip Cookies',
                'description': 'Classic homemade cookies with chocolate chips.',
                'ingredients': 'Flour, Butter, Sugar, Eggs, Chocolate Chips',
                'instructions': '1. Mix ingredients. 2. Form cookies. 3. Bake until golden.',
                'image_url': 'https://media.istockphoto.com/id/1419417928/photo/group-of-chocolate-chip-cookies-on-background.webp?b=1&s=170667a&w=0&k=20&c=CTMjAnw110A1flHby03mm4teDDHdmA-63Pt8OpscIdA=&v=2'
            },
            {
                'title': 'Greek Salad',
                'description': 'A fresh salad with tomatoes, cucumbers, and feta cheese.',
                'ingredients': 'Tomatoes, Cucumbers, Onions, Feta Cheese, Olives',
                'instructions': '1. Chop vegetables. 2. Add feta and olives. 3. Dress with olive oil and oregano.',
                'image_url': 'https://media.istockphoto.com/id/529980296/photo/greek-salad.webp?b=1&s=170667a&w=0&k=20&c=sjWeJ9nmJ_PXMLZfw71YOcjTnNBXf_ITzCpzMXpOOK0=&v=2'
            },
            {
                'title': 'Beef Tacos',
                'description': 'Mexican-style tacos with seasoned ground beef.',
                'ingredients': 'Ground Beef, Taco Shells, Lettuce, Tomato, Cheese',
                'instructions': '1. Cook beef with seasonings. 2. Prepare toppings. 3. Assemble tacos.',
                'image_url': 'https://media.istockphoto.com/id/1333647378/photo/homemade-american-soft-shell-beef-tacos.webp?b=1&s=170667a&w=0&k=20&c=EkTSsbK0z4o8Oa9rRJfy0upjRH3_pqRoDeNf6qNHYqk=&v=2'
            },
            {
                'title': 'Mushroom Risotto',
                'description': 'Creamy Italian rice dish with mushrooms.',
                'ingredients': 'Arborio Rice, Mushrooms, Onion, White Wine, Parmesan',
                'instructions': '1. Sauté mushrooms and onions. 2. Add rice and wine. 3. Gradually add broth and stir.',
                'image_url': 'https://plus.unsplash.com/premium_photo-1694850980439-61487c39be4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TXVzaHJvb20lMjBSaXNvdHRvfGVufDB8fDB8fHww=&v=2'
            },
            {
                'title': 'Apple Pie',
                'description': 'Classic American dessert with sweet apple filling.',
                'ingredients': 'Apples, Pie Crust, Sugar, Cinnamon, Butter',
                'instructions': '1. Prepare pie crust. 2. Make apple filling. 3. Assemble and bake.',
                'image_url': 'https://media.istockphoto.com/id/184350005/photo/slice-of-apple-pie-on-a-plate-isolalted-on-a-white-background.webp?b=1&s=170667a&w=0&k=20&c=7I7GhKMHuoexjBv8u_ItjPuRqHC726cLx1pqY5QzZno=&v=2'
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