import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducer/authReducer";
import { apiUrl, localStorageToken } from "./constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`);
            if (response.data.success) {
                localStorage.setItem(
                    localStorageToken,
                    response.data.accessToken
                );
            }
            return response.data;
        } catch (error) {
            if (error) return error.response.data;
            else return { success: false, message: error.response.data };
        }
    };

    const authContextData = { loginUser };
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};
