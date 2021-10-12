import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authReducer } from '../reducer/authReducer';
import { apiUrl, localStorageToken } from './constants';
import setAuthToken from '../utils/setAuthTokenAcess';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Store user
    const loadUser = async () => {
        if (localStorage[localStorageToken]) {
            setAuthToken(localStorage[localStorageToken]);
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`);
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(localStorageToken);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    useEffect(() => loadUser(), []);

    // Register
    const registerUser = async (registerForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/register`,
                registerForm
            );
            if (response.data.success) {
                localStorage.setItem(
                    localStorageToken,
                    response.data.accessToken
                );
            }

            await loadUser();
            return response.data;
        } catch (error) {
            if (error) return error.response.data;
            else return { success: false, message: error.response.data };
        }
    };

    // Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(
                    localStorageToken,
                    response.data.accessToken
                );
            }

            await loadUser();

            return response.data;
        } catch (error) {
            if (error) return error.response.data;
            else return { success: false, message: error.response.data };
        }
    };

    // Return Provider
    const authContextData = { loginUser, authState, registerUser };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};
