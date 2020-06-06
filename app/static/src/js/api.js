const post = async (url, body, token) => {
    const options = {
        method: 'POST',
        body,
    }
    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await fetch(url, options)
    const json = await response.json()
    if (response.status === 500) {
        throw new Error(json.errorMessage)
    }

    return json
}
const get = async (url, token) => {
    const options = {
        method: 'GET',
    }
    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await fetch(url, options)

    return await response.json()
}
const patch = async (url, body, token) => {
    const options = {
        method: 'patch',
        body,
    }
    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await fetch(url, options)

    return await response.json()
}
const deleteFetch = async (url, token) => {
    const options = {
        method: 'delete',
    }
    if (token) {
        options.headers = {
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await fetch(url, options)

    return await response.json()
}


export function signUp(body) {
    return post('/signup', body)
}


export function login(body) {
    return post('/login', body)
}

export function addTodo(body, token) {
    return post('/api/todos/', body, token)
}

export function completeTodo(todoId, token) {
    return post(`/api/todos/${todoId}/`, null, token)
}

export function editTodo(body, todoId, token) {
    return patch(`/api/todos/${todoId}/`, body, token)
}

export function removeTodo(todoId, token) {
    return deleteFetch(`/api/todos/${todoId}/`, token)
}

export function getTodos(token) {
    return get('/api/todos/', token)
}

export function filterTodos(url, token) {
    return get(`/api/todos/${url}`, token)
}
