import { Link } from 'react-router'
import './Login.css'

const Login = () => {

    return (
        <div className='login-page-container'>
            <title>Log In</title>
            <div className="login-text-main">Log In</div>
            <form action="" method="GET" className='login-form-main'>
                <div className="login-input-fields">
                    <input type="email" placeholder="Email Address" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <Link to="#" className="login-forgot">Forgot password?</Link>
                </div>
                <div>
                    <button className="login-btn-main">Log In</button>
                    <p>Don't have an account?
                        <Link to="/signup">
                            <strong>Sign up</strong>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Login