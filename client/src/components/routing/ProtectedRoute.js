import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../Layouts/Navbar';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div>
                <div className="spinner-container">
                    <Spinner animation="border" variant="info" />
                </div>
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <NavbarMenu />
                        <Component {...props} {...rest} />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
