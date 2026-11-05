import { Link, useNavigate } from 'react-router'
import './Login.css'
import axios from 'axios'
import { useState } from 'react'

const Login = ({ setUserResponse }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Matched, setMatched] = useState(true);


    const takeUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8080/users/login", user);
            if (response) {
                console.log(response.data);
                setUserResponse(response.data);
                navigate("/", { replace: true });
            } else {
                setMatched(false);
            }
        } catch (error) {
            setError(error.response?.data || "Unable to connect to server");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login-page-container'>
            <title>Log In</title>
            <div className="login-text-main">Log In</div>
            <form action="" method="GET" className='login-form-main' onSubmit={submit}>
                <div className="login-input-fields">
                    <input type="email" placeholder="Email Address" name='email' value={user.email} onChange={takeUser} required />
                    <input type="password" placeholder="Password" name='password' value={user.password} onChange={takeUser} required />
                    <Link to="#" className="login-forgot">Forgot password?</Link>
                    {!Matched && <p className='no-match-field' style={{ color: "red" }}>Wrong Password</p>}
                    {error && <p className='error-field' style={{ color: "red" }}>{error}</p>}
                </div>
                <div>
                    <button className="login-btn-main" disabled={loading}>{loading ? "Loggin In" : "Log In"}</button>
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