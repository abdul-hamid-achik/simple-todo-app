import pytest
from datetime import datetime
from app.models import Todo
from app import bcrypt


def test_user_adds_todo(user_with_password):
    user = user_with_password

    todo = Todo(
        name="Finish Exam",
        priority=4,
        due_date=datetime.now()
    )

    user.todos().save(todo)
    assert user.todos().count() == 1


def test_user_set_password(user):
    password = 'randompassword'
    user.set_password(password)
    assert bcrypt.check_password_hash(user.password, password)


def test_user_get_access_token(user):
    assert user.get_access_token()


def test_user_check_password(user_with_password):
    user = user_with_password
    assert user.check_password('password')
