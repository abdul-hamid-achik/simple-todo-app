import pytest
import os
from datetime import datetime, timedelta
from orator.migrations import Migrator, DatabaseMigrationRepository
from app import create_app, db, factory
from app.models import User, Todo
from app.config import TestConfig


@pytest.fixture
def app():
    return create_app(TestConfig)


@pytest.fixture(autouse=True)
def before_tests(app):
    with app.app_context():
        migrations_path = app.config['MIGRATION_PATH']
        os.unlink('/tmp/test.db')
        repository = DatabaseMigrationRepository(db, 'migrations')
        migrator = Migrator(repository, db)

        if not migrator.repository_exists():
            repository.create_repository()

        migrator.run(migrations_path)


@pytest.fixture()
def user():
    return factory(User).make()


@pytest.fixture()
def user_with_password(app, user):
    with app.app_context():
        user.set_password('password')
        user.save()

    return user


@pytest.fixture
def todo(app, user):
    with app.app_context():
        todo = factory(Todo).create()
    return todo


@pytest.fixture
def headers(app, user_with_password):
    user = user_with_password
    return {'Authorization': f'Bearer {user.get_access_token()}'}
