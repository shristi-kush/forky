from models.db import db


class User(db.Model):
    __tablename__ = "registeredusers"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "_id": str(self.id),
            "email": self.email,
            "password": self.password,
            "name": self.name,
        }
