from datetime import timedelta
from orator.orm import has_many, belongs_to
from flask_jwt_extended import create_access_token
from app import db, bcrypt, factory


class User(db.Model):
    __fillable__ = [
        'first_name',
        'last_name',
        'email',
    ]

    __guarded__ = [
        'id',
        'password',
    ]
    __hidden__ = ['password']

    @has_many('user_id')
    def todos(self):
        return Todo

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password, 10)

    def get_access_token(self):
        return create_access_token(identity=self.email, expires_delta=timedelta(days=1))

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)


class Todo(db.Model):
    __fillable__ = [
        'name',
        'due_date',
        'priority',
        'completed'
    ]

    __guarded__ = [
        'id',
        'user_id'
    ]

    __dates__ = [
        'created_at',
        'updated_at',
    ]
    __casts__ = {
        'due_date': 'date',
        'completed': 'bool'
    }
    __table__ = 'todos'

    @belongs_to('user_id')
    def user(self):
        return User


@factory.define(User)
def users_factory(faker):
    return {
        'first_name': faker.first_name(),
        'last_name': faker.last_name(),
        'email': faker.email(),
        'password': 'password'
    }


@factory.define(Todo)
def todos_factory(faker):
    user = factory(User).create()
    return {
        'user_id': user.id,
        'name': faker.text(),
        'due_date': faker.date_time_this_month(),
        'priority': 1
    }
