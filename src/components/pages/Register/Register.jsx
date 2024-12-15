import './Register.css'
const Register = () =>{
    return(
        <div className="main-register">
            <div className="container-register">
                <p className="left-text-register">CompanyName</p>
                <p className="main-text-register">Hi there!</p>
                <p className="welcome-text-register">Welcome to CompanyName</p>
                <input type="email" className="email-input-register" placeholder='Email '/>
                <input type="login" className="login-input-register" placeholder='Login'/>
                <input type="text" className="first-name-input-register" placeholder='First Name'/>
                <input type="text" className="last-name-input-register" placeholder='Last Name'/>
                <input type="date" className="birth-date-input-register" placeholder='Birth Date' />

                <input type="password" className="password-input-register" placeholder='Password'/>
                <input type="password" className="password-confirmation-input-register" placeholder='Password Confirmation'/>
                <button className="button-login-register">Register</button>

                <p className="register-text-register">Do you already have an account?<a className='signUp-register' href=""> Sign In</a></p>
                </div>
        </div>
    )
}
export default Register