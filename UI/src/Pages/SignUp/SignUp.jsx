import { Link } from 'react-router'
import './test-signup.css'

const SignUp = () => {
    return (
        <div className='signup-page-container'>
            <title>Sign Up</title>
            <div className="signup-text-main">Sign Up</div>
            <form action="" method="POST" className='form-main'>
                <div className="input-fields">
                    <input type="text" placeholder="Full Name" name='name' />
                    <input type="email" placeholder="Email Address" name='email' />
                    <input type="password" placeholder="Password" name='password' />
                    <input type="password" placeholder="Confirm Password" name='confirm-password' />
                </div>
                <div>
                    <button className="signup-btn-main">Sign Up</button>
                    <p>Already have an account?
                        <Link href="#">
                            <strong>Log in</strong>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default SignUp