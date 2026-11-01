import { Link } from 'react-router'
import axios from 'axios'
import './SignUp.css'
import { useState } from 'react'

const SignUp = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [match, setMatch] = useState(true);

    const takeUser = (e) => {
        const { name, value } = e.target;

        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submit = async (e) => {
        e.preventDefault();
        if (user.password != user.confirmPassword) {
            console.log("passwords don't match");
            setMatch(false);
            return;
        }
        
        setLoading(true);
        setMatch(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/users/signup',
                user
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='signup-page-container'>

            <title>Sign Up</title>
            <div className="signup-text-main">Sign Up</div>

            <form action="" method="POST" className='form-main' onSubmit={submit}>

                <div className="input-fields">
                    <input type="text" placeholder="Full Name" name='name' value={user.name} onChange={takeUser} required />
                    <input type="email" placeholder="Email Address" name='email' value={user.email} onChange={takeUser}
                        required />
                    <input type="password" placeholder="Password" name='password' value={user.password} onChange={takeUser} required />
                    <input type="password" placeholder="Confirm Password" name='confirmPassword' value={user.confirmPassword} onChange={takeUser} required />
                    {match ? "" : <p className='no-match-field' style={{ color: "red" }}>Passwords don't match</p>}
                </div>

                <div>
                    <button className="signup-btn-main" type="submit" disabled={loading}> {loading ? "Signing Up" : "Sign Up"}</button>

                    <p>Already have an account?
                        <Link to="#">
                            <strong>Log in</strong>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default SignUp