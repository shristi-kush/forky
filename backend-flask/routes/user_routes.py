from flask import Blueprint, request
from controllers import user_controller

user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def register():
    return user_controller.create_user(request.get_json() or {})


@user_bp.route("/login", methods=["POST"])
def login():
    return user_controller.login_user(request.get_json() or {})
