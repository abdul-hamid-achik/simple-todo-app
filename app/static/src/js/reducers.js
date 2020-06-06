export default function (state, action) {

    switch (action.type) {
        case 'login':
            localStorage.setItem('auth', JSON.stringify(action.payload))
            return {...state, user: action.payload}
        case 'hideLogin':
            return {
                ...state,
                showLogin: false
            }
        case 'showLogin':
            return {
                ...state,
                showLogin: true
            }
        case 'showError':
            return {
                ...state,
                errors: [...state.errors, action.payload]
            }
        case 'hideSignUp':
            return {
                ...state,
                showSignUp: false
            }
        case 'showSignUp':
            return {
                ...state,
                showSignUp: true
            }
        case 'addTodo':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case 'removeTodo':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            }
        case 'completeTodo':
            return {
                ...state,
                todos: [...state.todos.map(todo => {
                    if (todo && todo.id === action.payload) {
                        todo.completed = true
                    }
                }).filter(todo => todo && !todo.completed)]
            }
        case 'editTodo':
            return {
                ...state,
                todos: [...state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return action.payload
                    }
                    return todo
                })]
            }
        case 'getTodos':
            return {
                ...state,
                todos: action.payload
            }
        case 'hideTodoForm':
            return {
                ...state,
                editTodo: null,
                showTodoForm: false
            }
        case 'showTodoForm':
            return {
                ...state,
                showTodoForm: true

            }
        case 'setEditTodo':
            return {
                ...state,
                editTodo: action.payload
            }
        case 'logout':
            localStorage.removeItem('auth')
            return {
                ...state,
                user: null
            }

        default:
            return state

    }
}