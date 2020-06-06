import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Error from './error.component'
import {
    Tile,
    Title,
    Subtitle,
    Container,
    DropdownMenu,
    DropdownContent,
    DropdownDivider,
    DropdownItem,
    Button,
    Icon,
    DropdownTrigger,
    Dropdown,
} from "bloomer";

import {
    getTodos as apiGetTodos,
    filterTodos
} from '../api'
import {getTodos, hideTodoForm} from '../actions'
import Todo from './todo.component'

const TodoList = () => {
    let debounce
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const todos = useSelector(state => state.todos)
    const [dropdown, setDropdown] = useState(false)
    const [loadData, setLoadData] = useState(true)
    const [filter, setFilter] = useState('')
    const errors = useSelector(state => state.errors)

    const showDropdown = value => {
        if (debounce) {
            clearTimeout(debounce)
        }
        debounce = setTimeout(() => {
            setDropdown(value)
        }, 50)
    }
    useEffect(() => {
        if (user && loadData) {
            apiGetTodos(user.token).then(response => {
                dispatch(getTodos(response))
                dispatch(hideTodoForm())
                setLoadData(false)
            })
        }
        return () => {
        }
    }, [user, loadData])


    const updateTodos = (key) => {
        let url
        switch (key) {
            case 'most-important':
                url = '?priority=asc'
                break
            case 'least-important':
                url = '?priority=desc'
                break
            case 'most-recent':
                url = '?due_date=asc'
                break
            case 'least-recent':
                url = '?due_date=desc'
                break

            default:
                url = ''
                break
        }
        setFilter(key)

        filterTodos(url, user.token).then(response => {
            dispatch(getTodos(response))
        })
    }
    return <Container>
        {errors.length > 0 ? errors.map(
            (message, key) => <Error key={key}
                                     message={message}/>
        ) : undefined}
        <Dropdown isActive={dropdown} isHidden={!user || todos.length === 0}>
            <DropdownTrigger>
                <Button isOutlined
                        aria-haspopup="true"
                        onMouseOver={() => showDropdown(true)}
                        onMouseLeave={() => showDropdown(false)}
                        onClick={() => showDropdown(!dropdown)}
                        aria-controls="dropdown-menu">
                    <span>Sort By</span>
                    <Icon className="fa fa-angle-down" isSize="small"/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu onMouseOver={() => showDropdown(true)}
                          onMouseLeave={() => showDropdown(false)}>
                <DropdownContent>
                    <DropdownItem href="#" isActive={filter === 'most-important'}
                                  onClick={() => updateTodos('most-important')}>
                        Most Important
                    </DropdownItem>
                    <DropdownItem href="#" isActive={filter === 'least-important'}
                                  onClick={() => updateTodos('least-important')}>
                        Least Important
                    </DropdownItem>
                    <DropdownDivider/>
                    <DropdownItem href="#" isActive={filter === 'most-recent'}
                                  onClick={() => updateTodos('most-recent')}>
                        Most Recent
                    </DropdownItem>
                    <DropdownItem href="#" isActive={filter === 'least-recent'}
                                  onClick={() => updateTodos('least-recent')}>
                        Least Recent
                    </DropdownItem>
                    <DropdownDivider isHidden={filter === ''}/>
                    <DropdownItem isHidden={filter === ''} href="#"
                                  onClick={() => updateTodos('')}>
                        Clear Filters
                    </DropdownItem>
                </DropdownContent>
            </DropdownMenu>
        </Dropdown>
        <Tile isAncestor>
            <Tile isParent isVertical className="todos">
                {todos.length > 0 ? todos.map(todo => <Todo key={todo.id} todo={todo}/>) :
                    <Tile isChild>
                        <Title>
                            {user ? "No items to do were found" : "Welcome"}
                        </Title>
                        <Subtitle>
                            {user ? "" : "Sign up or Login from the navbar"}
                        </Subtitle>
                    </Tile>}
            </Tile>
        </Tile>
    </Container>
}

export default TodoList