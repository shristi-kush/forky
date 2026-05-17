from flask import Blueprint, jsonify, request
from controllers import ai_controller, recipes_controller

recipes_bp = Blueprint("recipes", __name__)


@recipes_bp.route("/all", methods=["GET"])
def get_all():
    return recipes_controller.get_all_recipes()


@recipes_bp.route("/create", methods=["POST"])
def create():
    return recipes_controller.create_recipe(request.get_json() or {})


@recipes_bp.route("/update", methods=["POST"])
def update():
    return recipes_controller.update_recipe(request.get_json() or {})


@recipes_bp.route("/delete/<recipe_id>", methods=["POST"])
def delete(recipe_id):
    return recipes_controller.delete_recipe(recipe_id)


@recipes_bp.route("/generate", methods=["POST"])
def generate():
    body, status = ai_controller.generate_recipe(request.get_json() or {})
    return jsonify(body), status
