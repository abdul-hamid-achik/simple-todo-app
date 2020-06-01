from flask import request, jsonify, Response
from dateutil import parser
from flask_classful import FlaskView, route
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import models


class TodoView(FlaskView):
    route_base = '/api/todos'
    decorators = [
        jwt_required
    ]
    excluded_methods = [
        'get_todo',
        'get_model',
    ]

    @staticmethod
    def get_model():
        return models.Todo

    def get_user(self):
        return models.User.where('email', get_jwt_identity()).first()

    def get_todo(self, todo_id):
        return self.get_model().find(todo_id)

    def index(self):
        """ Lists all todo items """
        queryset = self.get_model()

        sort_by_priority = request.args.get('priority')
        if sort_by_priority and sort_by_priority == 'asc':
            queryset.order_by('priority')
        elif sort_by_priority and sort_by_priority == 'desc':
            queryset.order_by('priority', 'desc')

        sort_by_due_date = request.args.get('due_date')
        if sort_by_due_date and sort_by_due_date == 'asc':
            queryset.order_by('due_date')
        elif sort_by_due_date and sort_by_due_date == 'desc':
            queryset.order_by('due_date', 'desc')

        return jsonify(
            queryset.get().serialize()
        )

    def post(self):
        """ Creates a new todo """

        name = request.form.get('name')
        due_date = request.form.get('due_date')
        priority = request.form.get('priority')

        if due_date:
            due_date = parser.parse(due_date)
        todo = self.get_model()(
            name=name,
            due_date=due_date,
            priority=priority
        )
        todo.user_id = self.get_user().id
        todo.save()
        return jsonify(todo.serialize())

    def get(self, todo_id):
        """ Shows a todo """
        return jsonify(self.get_todo(todo_id).serialize())

    def patch(self, todo_id):
        """ Update a todo """
        todo = self.get_todo(todo_id)
        for key, value in request.form.items():
            if hasattr(todo, key) and str(getattr(todo, key)) != value:
                if key == 'due_date':
                    value = parser.parse(value)
                setattr(todo, key, value)
        todo.save()

        return jsonify(todo.serialize())

    def delete(self, todo_id):
        """ Remove a todo """
        todo = self.get_todo(todo_id)
        todo.delete()
        return jsonify({})

    @route('/<todo_id>/', methods=['POST'])
    def complete(self, todo_id):
        """ Complete a todo """
        todo = self.get_todo(todo_id)
        todo.completed = True
        todo.save()
        return jsonify(todo.serialize())


class MainView(FlaskView):
    route_base = '/'

    def index(self):
        pass

    @route('/signup', methods=['POST'])
    def signup(self):
        user = models.User(
            first_name=request.form.get('first_name'),
            last_name=request.form.get('last_name'),
            email=request.form.get('email')
        )

        user.set_password(request.form.get('password'))
        user.save()
        response = user.serialize()
        response.setdefault('token', user.get_access_token())

        return jsonify(response)

    @route('/logout', methods=['POST'])
    def logout(self):
        pass

    @route('/login', methods=['POST'])
    def login(self):
        email = request.form.get('email')
        user = models.User.where('email', email).get()

        if user.check_password(request.form.get('password')):
            return jsonify({
                'token': user.get_access_token()
            })
        else:
            return Response(status=401)
