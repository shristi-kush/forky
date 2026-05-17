import os


def get_database_uri():
    if os.getenv("DATABASE_URL"):
        return os.getenv("DATABASE_URL")

    instance_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "instance")
    os.makedirs(instance_dir, exist_ok=True)
    db_path = os.path.join(instance_dir, "recipe_app.db").replace("\\", "/")
    return f"sqlite:///{db_path}"
