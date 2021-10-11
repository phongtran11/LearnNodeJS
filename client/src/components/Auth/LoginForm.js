import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function LoginForm() {
    const { loginUser } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const { username, password } = loginForm;

    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const login = async (event) => {
        event.preventDefault();

        const loginData = await loginUser(loginForm);
        console.log(loginData);
    };

    return (
        <>
            <Form className='my-4'>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Dont't have an account?
                <Link to='/register'>
                    <Button className='mx-1' variant='info' size='sm'>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
}

export default LoginForm;
