import React, {useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    Button,
    Control,
    Delete, Field, Input, Label,
    Modal,
    ModalBackground,
    ModalCard,
    ModalCardBody, ModalCardFooter,
    ModalCardHeader,
    Progress,
    ModalCardTitle
} from "bloomer"
import {signUp} from "../api"
import {login, hideSignUp} from '../actions'

const SignUp = () => {
    const formRef = useRef()
    const dispatch = useDispatch()
    const passwordRef = useRef()
    const [passProgress, setPassProgress] = useState('')
    const [password, setPassword] = useState('')
    const showSignUp = useSelector(state => state.showSignUp)

    const onSignUp = () => {
        const formData = new FormData(formRef.current)
        signUp(formData).then(
            response => {
                dispatch(login(response))
                dispatch(hideSignUp())
            })
    }
    return <Modal isActive={showSignUp}>
        <ModalBackground/>
        <ModalCard>
            <ModalCardHeader>
                <ModalCardTitle>
                    Sign Up
                </ModalCardTitle>
                <Delete onClick={() => dispatch(hideSignUp())}/>
            </ModalCardHeader>
            <ModalCardBody>
                <form ref={formRef}>
                    <Field>
                        <Label>
                            First Name
                        </Label>
                        <Control>
                            <Input type="text" name="first_name"/>
                        </Control>
                    </Field>
                    <Field>
                        <Label>
                            Last Name
                        </Label>
                        <Control>
                            <Input type="text" name="last_name"/>
                        </Control>
                    </Field>
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
                            <Input type="password" name="password" onKeyDown={event => {
                                setPassword(event.currentTarget.value)
                            }}/>
                        </Control>
                    </Field>
                    <Field>
                        <Label>
                            Confirm Password
                        </Label>
                        <Control>
                            <Input type="password" onKeyUp={(event) => {
                                setPassProgress(event.currentTarget.value)
                            }}/>
                            <Progress value={passProgress.length}
                                      isSize="small"
                                      isHidden={passProgress.length === 0 && password.length === 0}
                                      max={password.length}
                                      isColor={passProgress.length < password.length ? 'danger' : 'success'}/>
                        </Control>
                    </Field>
                </form>
            </ModalCardBody>
            <ModalCardFooter>
                <Button isColor="primary" onClick={onSignUp}>
                    Sign Up
                </Button>

            </ModalCardFooter>
        </ModalCard>
    </Modal>
}

export default SignUp