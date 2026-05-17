from models.db import db


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(64), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.JSON, nullable=False)
    steps = db.Column(db.JSON, nullable=False)
    image = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "_id": str(self.id),
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "ingredients": self.ingredients,
            "steps": self.steps,
            "image": self.image,
        }
