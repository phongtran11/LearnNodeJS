import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import AlertMessage from '../Layouts/alertMessage';

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext);

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const { username, password, confirmPassword } = registerForm;

    const [alert, setAlert] = useState(null);

    // Route
    const history = useHistory();

    // handle Change Form
    const onChangeRegisterForm = (e) =>
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

    // handle register
    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password not match' });
            setTimeout(() => setAlert(null), 2000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            console.log(1);

            if (registerUser.success) {
                history.push('/dashboard');
            } else {
                setAlert({
                    type: 'danger',
                    message: registerData.message,
                });
                setTimeout(() => setAlert(null), 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Comfirm Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button className="mx-1" variant="info" size="sm">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
