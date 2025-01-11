import React, { useState, useEffect } from "react";
import { navigate, useNavigate } from "react-router-dom";
import './Auth.css';
import { checkAuth } from "./CheckAuth";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [isAuthenticated,setAuth]= useState(true)
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
 
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const isAuthenticated = await checkAuth();
                if (isAuthenticated) {
                    setAuth(true)
                    alert("You are already logged in!");
                    navigate('/'); 
                    return
                }
                setAuth(false)
            } catch (authError) {
                console.error("Authentication error:", authError);
            }
        };
        
        checkUserAuth();  
    }, [navigate]);
    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost:7152/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
                credentials: "include",
            });

            if (response.ok) {
                alert("Login successful!");
                navigate('/');
            } else {
                const errorData = await response.json().catch(() => null);
                alert(`Login failed: ${errorData?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Login request failed:", error);
            alert("An error occurred while making the request.");
        }
    };


    return (
       
        <div className="main-auth">
            {!isAuthenticated &&(
            <div className="container-auth">
                <p className="left-text-auth">CompanyName</p>
                <p className="main-text-auth">Hi there!</p>
                <p className="welcome-text-auth">Welcome to CompanyName</p>
                <input
                    type="text"
                    className="email-input-auth"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    type="password"
                    className="password-input-auth"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button-login-auth" onClick={handleLogin}>
                    Login
                </button>
                <p className="register-text-auth">
                    Don't have an account? <a className="signUp-auth" href="" onClick={()=>navigate('/register')}>Sign Up</a>
                </p>
            </div>
        )}
        </div>
    
    );
};

export default Auth;
