import {createStore} from "redux";
import reducer from './reducers'

const defaultState = {
    showSignUp: false,
    showTodoForm: false,
    user: null,
    showLogin: false,
    editTodo: null,
    errors: [],
    todos: []

}

export default createStore(
    reducer,
    defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
