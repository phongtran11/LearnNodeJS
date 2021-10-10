import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterForm = () => {
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
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Comfirm Password'
                        name='comfirmPassword'
                        required
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login'>
                    <Button className='mx-1' variant='info' size='sm'>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
