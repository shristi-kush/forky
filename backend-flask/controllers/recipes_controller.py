from flask import jsonify
from models.db import db
from models.recipe import Recipe


def _parse_recipe_id(recipe_id):
    try:
        return int(recipe_id)
    except (TypeError, ValueError):
        return None


def create_recipe(data):
    try:
        user_id = data.get("user_id")
        title = data.get("title")
        description = data.get("description")
        ingredients = data.get("ingredients")
        steps = data.get("steps")
        image = data.get("image")

        if not all([user_id, title, description, ingredients, steps, image]):
            return jsonify({"error": "All fields are required"}), 400

        recipe = Recipe(
            user_id=user_id,
            title=title,
            description=description,
            ingredients=ingredients,
            steps=steps,
            image=image,
        )
        db.session.add(recipe)
        db.session.commit()
        return jsonify(recipe.to_dict()), 201
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500


def get_all_recipes():
    try:
        recipes = Recipe.query.all()
        return jsonify([recipe.to_dict() for recipe in recipes]), 200
    except Exception:
        return jsonify({"error": "Internal server error"}), 500


def update_recipe(data):
    try:
        recipe_id = _parse_recipe_id(data.get("id"))
        user_id = data.get("user_id")
        title = data.get("title")
        description = data.get("description")
        ingredients = data.get("ingredients")
        steps = data.get("steps")
        image = data.get("image")

        if not all([recipe_id, user_id, title, description, ingredients, steps, image]):
            return jsonify({"error": "All fields are required"}), 400

        recipe = db.session.get(Recipe, recipe_id)
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        recipe.user_id = user_id
        recipe.title = title
        recipe.description = description
        recipe.ingredients = ingredients
        recipe.steps = steps
        recipe.image = image
        db.session.commit()
        return jsonify(recipe.to_dict()), 200
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500


def delete_recipe(recipe_id):
    try:
        if not recipe_id:
            return jsonify({"error": "Recipe ID is required"}), 400

        parsed_id = _parse_recipe_id(recipe_id)
        if parsed_id is None:
            return jsonify({"error": "Recipe not found"}), 404

        recipe = db.session.get(Recipe, parsed_id)
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        db.session.delete(recipe)
        db.session.commit()
        return jsonify({"message": "Recipe deleted successfully"}), 200
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500
