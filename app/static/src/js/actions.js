export const login = payload => ({
    type: 'login',
    payload
})
export const logout = () => ({
    type: 'logout',
    payload: undefined
})
export const hideLogin = () => ({
    type: 'hideLogin',
    payload: false
})


export const showLogin = () => ({
    type: 'showLogin',
    payload: true
})


export const showSignUp = () => ({
    type: 'showSignUp',
    payload: true
})

export const hideSignUp = () => ({
    type: 'hideSignUp',
    payload: false
})

export const addTodo = payload => ({
    type: 'addTodo',
    payload
})
export const editTodo = payload => ({
    type: 'editTodo',
    payload
})

export const removeTodo = payload => ({
    type: 'removeTodo',
    payload
})
export const deleteTodo = payload => ({
    type: 'deleteTodo',
    payload
})
export const completeTodo = payload => ({
    type: 'completeTodo',
    payload
})
export const getTodos = payload => ({
    type: 'getTodos',
    payload
})

export const showTodoForm = payload => ({
    type: 'showTodoForm',
    payload
})

export const hideTodoForm = payload => ({
    type: 'hideTodoForm',
    payload
})

export const showError = payload => ({
    type: 'showError',
    payload
})

export const setEditTodo = payload => ({
    type: 'setEditTodo',
    payload
})