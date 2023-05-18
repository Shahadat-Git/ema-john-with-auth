import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Register = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext);
    const handleRegister = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password !== confirm) {
            return setError('Password not match')
        }

        createUser(email, password)
            .then((result) => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })

        // console.log(email, password)
    }
    return (
        <div className='form-container'>
            <form onSubmit={handleRegister}>
                <h3 className='form-title'>Register</h3>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' required />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name='confirm' required />
                </div>
                <button>Register</button>
            </form>
            <p><Link to='/login'> Already have an account?</Link></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;