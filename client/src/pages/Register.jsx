import axios from 'axios';
import React from 'react'
import { Form } from 'react-router-dom'
import styled from 'styled-components'
import customFetch from '../utils';
import { redirect, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
        const response = await customFetch.post('/auth/register', data);
        console.log(response);
        toast.success('Successfully registered')
        toast.success('Please verify email then login')
        return redirect('/login');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const Register = () => {
    return <Form className='form' method='post'>
        <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }}>Register</h2>
        <div className="form-row">
            <label id='firstName' htmlFor="firstName" className='form-label' >First Name</label>
            <input type="text" name='firstName' className='form-input' required />
        </div>
        <div className="form-row">
            <label id='lastName' htmlFor="lastName" className='form-label'>Last Name</label>
            <input type="text" name='lastName' className='form-input' required />
        </div>
        <div className="form-row">
            <label id='email' htmlFor="email" className='form-label'>email</label>
            <input type="email" name='email' className='form-input' required />
        </div>
        <div className="form-row">
            <label id='password' htmlFor="password" className='form-label'>password</label>
            <input type="password" name='password' className='form-input' required />
        </div>
        <div className="form-row">
            <label id='country' htmlFor="country" className='form-label'>country</label>
            <input type="text" name='country' className='form-input' required />
        </div>
        <button type='submit' className='btn-css btn-block'>Submit</button>
        <p style={{ marginTop: '1rem' }}>
            Already  have an account?
            <Link to='/login' style={{ marginLeft: '0.5rem' }}>
                Log In
            </Link>
        </p>
    </Form>
}

const Wrapper = styled.div`
    
`

export default Register