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
import {login, hideLogin, showError} from '../actions'
import {login as apiLogin} from '../api'

const Login = () => {
    const formRef = useRef()
    const dispatch = useDispatch()
    const showLogin = useSelector(state => state.showLogin)
    const onLogin = () => {
        const formData = new FormData(formRef.current)
        apiLogin(formData).then(response => {
            dispatch(login(response))
            dispatch(hideLogin())
        }).catch(error => {
            dispatch(showError(error.message))
            dispatch(hideLogin())
        })
    }

    return <Modal isActive={showLogin}>
        <ModalBackground/>
        <ModalCard>
            <ModalCardHeader>
                <ModalCardTitle>
                    Login
                </ModalCardTitle>
                <Delete onClick={() => dispatch(hideLogin())}/>
            </ModalCardHeader>
            <ModalCardBody>
                <form ref={formRef}>
                    <Field>
                        <Label>
                            Email
                        </Label>
                        <Control>
                            <Input type="text" name="email"/>
                        </Control>
                    </Field>
                    <Field>
                        <Label>
                            Password
                        </Label>
                        <Control>
                            <Input type="password" name="password"/>
                        </Control>
                    </Field>
                </form>
            </ModalCardBody>
            <ModalCardFooter>
                <Button isColor="primary" onClick={onLogin}>
                    Login
                </Button>

            </ModalCardFooter>
        </ModalCard>
    </Modal>
}

export default Login