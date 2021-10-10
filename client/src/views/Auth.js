import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const Auth = ({ authRoute }) => {
    let body = (
        <>
            {authRoute === "login" && <LoginForm />}
            {authRoute === "register" && <RegisterForm />}
        </>
    );
    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div class='landing-inner'>
                    <h1>Learning App</h1>
                    <h4>Tracking your learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
