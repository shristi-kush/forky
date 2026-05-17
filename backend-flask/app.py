import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from config import get_database_uri
from models.db import db
from models.recipe import Recipe
from models.user import User
from routes.recipes_routes import recipes_bp
from routes.user_routes import user_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = get_database_uri()
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(recipes_bp, url_prefix="/recipes")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5002))
    print(f"SQLite database: {app.config['SQLALCHEMY_DATABASE_URI']}")
    app.run(host="0.0.0.0", port=port, debug=True)
