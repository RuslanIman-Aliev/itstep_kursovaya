import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [name, setFirstName] = useState('');
    const [surname, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !login || !surname || !name || !birthDate || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const newUser = {
            email,
            login,
            name,
            surname,
            birthDate,
            password,
        };

        try {
            const response = await fetch('https://localhost:7152/api/user/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Something went wrong');
            }
        } catch (error) {
            setError('Error occurred while registering');
        }
    };

    return (
        <div className="main-register">
            <div className="container-register">
                <p className="left-text-register">CompanyName</p>
                <p className="main-text-register">Hi there!</p>
                <p className="welcome-text-register">Welcome to CompanyName</p>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="email-input-register" 
                        placeholder="Email" 
                    />
                    <input 
                        type="text" 
                        value={login} 
                        onChange={(e) => setLogin(e.target.value)} 
                        className="login-input-register" 
                        placeholder="Login" 
                    />
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className="first-name-input-register" 
                        placeholder="First Name" 
                    />
                    <input 
                        type="text" 
                        value={surname} 
                        onChange={(e) => setLastName(e.target.value)} 
                        className="last-name-input-register" 
                        placeholder="Last Name" 
                    />
                    <input 
                        type="date" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                        className="birth-date-input-register" 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="password-input-register" 
                        placeholder="Password" 
                    />
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="password-confirmation-input-register" 
                        placeholder="Password Confirmation" 
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button className="button-login-register">Register</button>
                </form>

                <p className="register-text-register">
                    Do you already have an account? <a className="signUp-register" href="/login">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
