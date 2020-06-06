import {Button, Checkbox, Tile, Icon} from "bloomer"
import {useDispatch, useSelector} from "react-redux"
import {completeTodo as apiComplete, removeTodo as apiRemoveTodo} from "../api"
import {completeTodo, removeTodo, setEditTodo} from "../actions"
import React, {useState} from "react"

const Todo = ({todo}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [disableEdit, setDisableEdit] = useState(false)

    const onEditTodo = () => {
        disableEdit && dispatch(setEditTodo(todo))
    }
    return <Tile key={todo.id} onClick={onEditTodo} isChild className="todo">
        <Checkbox className="todo--complete" defaultChecked={todo.completed} onChange={event => {
            if (event.currentTarget.checked) {
                apiComplete(todo.id, user.token).then(() => {
                    dispatch(completeTodo(todo.id))
                })
            }
        }}/>
        <p className="todo--name">{todo.name}</p>
        <Button className="todo--remove"
                isSize="small"
                onMouseOver={() => setDisableEdit(true)}
                onMouseLeave={() => setDisableEdit(false)}
                isColor="danger"
                onClick={() => {
                    apiRemoveTodo(todo.id, user.token).then(() => {
                        dispatch(removeTodo(todo.id, user.token))
                    })
                }}>
            <Icon isSize="small" className="fa fa-remove"/>
        </Button>
    </Tile>
}

export default Todo