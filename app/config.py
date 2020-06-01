import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class DefaultConfig:
    BASE_DIR = BASE_DIR
    MIGRATION_PATH = os.path.join(BASE_DIR, 'migrations')
    SERVER_NAME = 'simple-todo-app'
    SECRET_KEY = os.urandom(16)
    JWT_SECRET_KEY = os.urandom(24)
    DEBUG = True
    ENVIRONMENT = 'development'
    ORATOR_DATABASES = {
        'default': {
            'driver': 'sqlite',
            'database': '/tmp/simple-todo-app.db'
        }
    }


class TestConfig(DefaultConfig):
    ORATOR_DATABASES = {
        'default': {
            'driver': 'sqlite',
            'database': '/tmp/test.db'
        }
    }
