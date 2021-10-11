import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function LoginForm() {
    // Context
    const { loginUser } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    // Local state
    const { username, password } = loginForm;

    // Route
    const history = useHistory();

    // handle Change Form
    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    // handle Login
    const login = async (event) => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                history.push("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className='my-4' onSubmit={login}>
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
