import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginForm() {
    return (
        <>
            <Form className='my-4'>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Password'
                        name='Password'
                        required
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
