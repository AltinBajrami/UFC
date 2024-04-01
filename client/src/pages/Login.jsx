import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import customFetch from '../utils';
import { toast } from 'react-toastify'
import { useAppContext } from '../context/AppContext';

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ email: '', password: '' });

    const { saveUser, removeUser } = useAppContext()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await customFetch.post('/auth/login', values, { withCredentials: true });
            console.log(response);
            const data = response.data;
            console.log(data);
            saveUser(data.user)
            toast.success(`Welcome, ${data.user.firstName}. Redirecting to home page...`)
            navigate('/');
        } catch (error) {
            removeUser();
            setValues({ email: '', password: '' })
            toast.error(error?.response?.data?.msg);
        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return <form className='form' onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }}>Login</h2>
        <div className="form-row">
            <label id='email' htmlFor="email" className='form-label'>email</label>
            <input type="email" name='email' className='form-input' onChange={handleChange} value={values.email} required />
        </div>
        <div className="form-row">
            <label id='password' htmlFor="password" className='form-label'>password</label>
            <input type="password" name='password' className='form-input' value={values.password} onChange={handleChange} required />
        </div>

        <button type='submit' className='btn-css btn-block'>Submit</button>

        <p style={{ marginTop: '1rem' }}>
            Don't have an account?
            <Link to='/register' style={{ marginLeft: '0.5rem' }}>
                Register
            </Link>
        </p>
        <p>
            Forgot your password?{' '}
            <Link to='/forgot-password' style={{ marginLeft: '0.5rem' }}>
                Reset Password
            </Link>
        </p>

    </form>
}

const Wrapper = styled.div`
    
`

export default Login