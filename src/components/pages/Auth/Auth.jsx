import './Auth.css'
const Auth = () =>{
    return(
        <div className="main-auth">
            <div className="container-auth">
                <p className="left-text-auth">CompanyName</p>
                <p className="main-text-auth">Hi there!</p>
                <p className="welcome-text-auth">Welcome to CompanyName</p>
                <input type="email" className="email-input-auth" placeholder='Email or Login'/>
                
                <input type="password" className="password-input-auth" placeholder='Password'/>
                <button className="button-login-auth">Login</button>

                <p className="register-text-auth">Don't have an account? <a className='signUp-auth' href="">Sign Up</a></p>
                </div>
        </div>
    )
}
export default Auth