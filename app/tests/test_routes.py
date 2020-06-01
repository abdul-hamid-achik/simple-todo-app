import pytest
from flask import url_for
from datetime import datetime, timedelta
from dateutil import parser

from orator.exceptions.orm import ModelNotFound
from app import factory

from app.models import User, Todo


def test_api_create_todo_with_due_date_and_priority(client, headers):
    data = {
        'name': 'Test',
        'due_date': datetime.now().isoformat(),
        'priority': 0
    }

    response = client.post(url_for('TodoView:post'), data=data, headers=headers)

    assert response.status_code == 200
    assert response.json['due_date'].replace('+00:00', '') == data['due_date']
    assert response.json['priority'] == str(data['priority'])
    assert response.json['name'] == data['name']


def test_api_register(client):
    data = {
        'first_name': 'Abdul Habibi',
        'last_name': 'Chiquipug',
        'email': 'abdulachik@gmail.com',
        'password': 'acatisacat'
    }

    response = client.post(url_for('MainView:signup'), data=data)
    user = User.where('email', '=', data['email']).first()
    assert response.status_code == 200

    assert user.id == response.json['id']
    assert user.email == response.json['email']
    assert user.first_name == response.json['first_name']
    assert user.last_name == response.json['last_name']

    assert not response.json.get('password')
    assert 'token' in response.json


def test_unauthorized_access_routes(client):
    unauthorized_routes = [
        'TodoView:index',
        'TodoView:get',
        'TodoView:post',
        'TodoView:patch',
        'TodoView:delete',
        'TodoView:complete'
    ]

    for route in unauthorized_routes:
        if 'get' in route or 'index' in route:
            url = url_for(route) if 'index' in route else url_for(route, todo_id=1)
            response = client.get(url)
        elif 'delete' in route:
            response = client.delete(url_for(route, todo_id=1))
        elif 'patch' in route:
            response = client.patch(url_for(route, todo_id=1), data={})
        else:
            url = url_for(route, todo_id=1) if 'complete' in route else url_for(route)
            response = client.post(url, data={})
        assert response.status_code == 401


def test_api_create_todo(client, headers):
    data = {
        'name': 'Test create todo',
    }

    response = client.post(url_for('TodoView:post'), data=data, headers=headers)

    assert response.status_code == 200
    assert response.json['name'] == data['name']


def test_api_edit_todo(client, headers, todo):
    data = todo.serialize()
    data['due_date'] = (datetime.now() + timedelta(days=5)).replace(microsecond=0)
    response = client.patch(url_for('TodoView:patch', todo_id=todo.id), data=data, headers=headers)

    date_a = parser.parse(response.json['due_date']).replace(microsecond=0)
    date_b = data['due_date']
    assert response.status_code == 200
    assert date_a.day == date_b.day

    assert date_a.month == date_b.month
    assert date_a.year == date_b.year
    assert date_a.hour == date_b.hour
    assert date_a.second == date_b.second


def test_api_complete_todo(client, headers, todo):
    response = client.post(url_for('TodoView:complete', todo_id=todo.id), data={}, headers=headers)

    assert response.status_code == 200
    assert response.json['completed']


def test_api_delete_todo(client, headers, todo):
    response = client.delete(url_for('TodoView:delete', todo_id=todo.id), data={}, headers=headers)

    assert response.status_code == 200
    with pytest.raises(ModelNotFound):
        Todo.find_or_fail(todo.id)


def test_api_list_todos(client, headers):
    todos = factory(Todo, 10).create()
    response = client.get(url_for('TodoView:index'), headers=headers)

    assert response.status_code == 200
    assert len(response.json) == len(todos)


def test_api_sort_todos_by_priority(client, headers):
    todos = factory(Todo, 10).create()
    for index, todo in enumerate(todos):
        if index == 0:
            todo.priority = 0
        elif index == len(todos) - 1:
            todo.priority = 2
        else:
            todo.priority = 1
        todo.save()

    response = client.get(url_for('TodoView:index'), headers=headers)
    length = len(response.json)
    assert response.status_code == 200
    assert response.json[0]['id'] == todos[0].id
    assert response.json[length - 1]['id'] == todos[length - 1].id
    assert len(response.json) == len(todos)


def test_api_sort_todos_by_due_date(client, headers):
    todos = factory(Todo, 10).create()
    for index, todo in enumerate(todos):
        if index == 0:
            todo.due_date = datetime.now()
        elif index == len(todos) - 1:
            todo.due_date = datetime.now() + timedelta(days=10)
        else:
            todo.due_date = datetime.now() + timedelta(days=1)
        todo.save()

    response = client.get(url_for('TodoView:index'), headers=headers)
    length = len(response.json)
    assert response.status_code == 200
    assert response.json[0]['id'] == todos[0].id
    assert response.json[length - 1]['id'] == todos[length - 1].id
    assert len(response.json) == len(todos)
