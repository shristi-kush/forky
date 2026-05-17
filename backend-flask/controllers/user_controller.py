from flask import jsonify
from models.db import db
from models.user import User


def create_user(data):
    try:
        email = data.get("email")
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists"}), 400
        user = User(
            email=email,
            password=data.get("password"),
            name=data.get("name"),
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except Exception:
        db.session.rollback()
        return jsonify("Internal Server Error"), 500


def login_user(data):
    try:
        email = data.get("email")
        password = data.get("password")
        user = User.query.filter_by(email=email).first()
        if user:
            if user.password == password:
                return jsonify({
                    "status": "logged-in",
                    "name": user.name,
                    "id": str(user.id),
                }), 200
            return jsonify("password is incorrect"), 400
        return jsonify("no user exists"), 400
    except Exception:
        return jsonify("Internal Server Error"), 500
