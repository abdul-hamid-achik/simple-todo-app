import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Control,
    Delete, Field, Input, Label,
    Modal,
    ModalBackground,
    ModalCard,
    ModalCardBody, ModalCardFooter,
    ModalCardHeader,
    ModalCardTitle
} from "bloomer";
import {addTodo, hideTodoForm, editTodo as editTodoAction} from '../actions'
import {addTodo as apiAddTodo, editTodo as apiEditTodo} from '../api'

const Todo = () => {
    const formRef = useRef()
    const dispatch = useDispatch()
    const showTodoForm = useSelector(state => state.showTodoForm)

    const editTodo = useSelector(state => state.editTodo)
    const user = useSelector(state => state.user)
    const onAddTodo = () => {
        const formData = new FormData(formRef.current)
        apiAddTodo(formData, user.token).then(response => {
            dispatch(addTodo(response))
            dispatch(hideTodoForm())
        })
    }
    const onEditTodo = () => {
        const formData = new FormData(formRef.current)
        apiEditTodo(formData, editTodo.id, user.token).then(response => {
            dispatch(editTodoAction(response))
            dispatch(hideTodoForm())
        })
    }

    return <Modal isActive={showTodoForm || editTodo}>
        <ModalBackground/>
        <ModalCard>
            <ModalCardHeader>
                <ModalCardTitle>
                    New TODO
                </ModalCardTitle>
                <Delete onClick={() => dispatch(hideTodoForm())}/>
            </ModalCardHeader>
            <ModalCardBody>
                <form ref={formRef}>
                    <Field>
                        <Label>
                            Name
                        </Label>
                        <Control>
                            <Input type="text" name="name"
                                   defaultValue={editTodo ? editTodo.name : undefined}/>
                        </Control>
                    </Field>
                    <Field>
                        <Label>
                            Priority
                        </Label>
                        <Control>
                            <Input type="number" name="priority"
                                   defaultValue={editTodo ? editTodo.priority : undefined}/>
                        </Control>
                    </Field>
                    <Field>
                        <Label>
                            Due Date
                        </Label>
                        <Control>
                            <Input type="date" name="due_date"
                                   defaultValue={editTodo ? editTodo.due_date : undefined}/>
                        </Control>
                    </Field>
                </form>
            </ModalCardBody>
            <ModalCardFooter>
                <Button isColor="primary" onClick={editTodo ? onEditTodo : onAddTodo}>
                    {editTodo ? "Update" : "Submit"}
                </Button>
            </ModalCardFooter>
        </ModalCard>
    </Modal>
}

export default Todo