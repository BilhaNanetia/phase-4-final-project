import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your_jwt_secret_key'
    THEMEALDB_API_KEY = os.environ.get('THEMEALDB_API_KEY') or 'your_themealdb_api_key'
    UPLOAD_FOLDER = os.path.join('static', 'user_images')  # Define the upload folder for user images
    DEFAULT_USER_PROFILE = 'default_user_profile.jpg'  # Default user profile image filename

    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # Allowed image file extensions

    @staticmethod
    def get_default_user_profile():
        return os.path.join(Config.UPLOAD_FOLDER, Config.DEFAULT_USER_PROFILE)
