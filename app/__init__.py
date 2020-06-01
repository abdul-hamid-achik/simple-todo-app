from flask import Flask
from flask_orator import Orator
from flask_static_digest import FlaskStaticDigest
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from orator.orm import Factory
from app.config import DefaultConfig

factory = Factory()
db = Orator()
static_digest = FlaskStaticDigest()
jwt_manager = JWTManager()
bcrypt = Bcrypt()


def create_app(configuration=DefaultConfig):
    app = Flask(__name__)
    app.config.from_object(configuration)
    db.init_app(app)
    jwt_manager.init_app(app)
    bcrypt.init_app(app)
    static_digest.init_app(app)

    from app.routes import TodoView, MainView

    resources = [
        TodoView,
        MainView
    ]
    for resource in resources:
        resource.register(app)
    return app
