import { Link } from 'react-router'
import './Login.css'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const takeUser = (e) => [
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    ]

    const submit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/users/login")
        } catch (error) {

        }
    }

    return (
        <div className='login-page-container'>
            <title>Log In</title>
            <div className="login-text-main">Log In</div>
            <form action="" method="GET" className='login-form-main'>
                <div className="login-input-fields">
                    <input type="email" placeholder="Email Address" name='email' value={user.email} onChange={takeUser} required />
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