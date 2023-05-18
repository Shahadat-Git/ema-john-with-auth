import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const { signInUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)

    const from = location.state?.from.pathname || '/';


    const handleLogIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then((result) => {
                console.log(result.user)
                navigate(from)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })

        // console.log(email, password)

    }


    return (
        <div className='form-container'>
            <form onSubmit={handleLogIn}>
                <h3 className='form-title'>Login</h3>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type={show ? 'text' : 'password'} name='password' required />
                    <p onClick={() =>setShow(!show)}>show/hide password</p>
                </div>
                <button>Login</button>
            </form>
            <p>New to Ema-john?<Link to='/register'> Create New Account</Link></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;