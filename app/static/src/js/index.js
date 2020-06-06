import '@babel/polyfill'
import React, {useEffect, useState} from 'react'
import {Provider, useSelector, useDispatch} from 'react-redux'
import {
    Hero,
    HeroBody,
    HeroHeader,
    HeroFooter,
    Button,
    Footer,
    Container,
    NavbarMenu,
    NavbarBurger,
    Navbar,
    Icon,
    NavbarEnd,
    NavbarBrand,
    NavbarItem,

} from 'bloomer'

import {render} from 'react-dom'
import SignUp from './forms/signup.form'
import Login from './forms/login.form'
import TodoList from './components/todo-list.component'
import Todo from './forms/todo.form'
import {showLogin, showSignUp, showTodoForm, login, logout} from './actions'
import store from './store'


const App = () => {
    const isLoggedIn = useSelector(state => state.user !== null)
    const user = useSelector(state => state.user)
    const [isActive, setActive] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const auth = localStorage.getItem('auth')
        if (auth) {
            dispatch(login(JSON.parse(auth)))
        }
    }, [isLoggedIn])

    const onClickNav = () => {
        setActive(!isActive)
    }
    return <Hero isFullHeight={true} isColor='light'>
        <HeroHeader>
            <Navbar>
                <NavbarBrand>
                    <NavbarItem>
                        {user ? `Welcome ${user.first_name} ${user.last_name}` : "Simple Todo App"}
                    </NavbarItem>

                    <NavbarBurger isActive={isActive} onClick={onClickNav}/>
                </NavbarBrand>
                <NavbarMenu isActive={isActive}>
                    <NavbarEnd>
                        {user ? <>
                            <NavbarItem>
                                <Button isLink isColor='danger'
                                        onClick={() => dispatch(showTodoForm())}>
                                    <Icon className="fa fa-plus"/>
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button isLink isColor='danger'
                                        onClick={() => dispatch(logout())}>
                                    Log Out
                                </Button>
                            </NavbarItem>
                        </> : <>
                            <NavbarItem>
                                <Button isLink isColor='info' onClick={() => dispatch(showLogin())}>
                                    Log in
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button isLink isColor='dark'
                                        onClick={() => dispatch(showSignUp())}>
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>}
                    </NavbarEnd>
                </NavbarMenu>
            </Navbar>
        </HeroHeader>
        <HeroBody>
            <TodoList/>
            <Todo/>
            <Login/>
            <SignUp/>
        </HeroBody>
        <HeroFooter>
            <Footer>
                <Container>
                    Created By <a href="https://www.linkedin.com/in/abdulachik/">
                    Abdul Hamid
                </a>
                </Container>
            </Footer>
        </HeroFooter>
    </Hero>
}

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container')
)


