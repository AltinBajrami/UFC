import React from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import customFetch from '../../utils';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const response = await customFetch.post('/auth/forgot-password', data, { withCredentials: true })
        console.log(response);
        toast.success(response.data.msg)
        return redirect('/');
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }
    return null;
}


const ForgotPassword = () => {
    return (
        <Form method='post' className='form'>
            <h2 style={{ marginBottom: '2rem', letterSpacing: '3px', textAlign: "center" }}>Forgot password</h2>
            <div className="form-row">
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" name="email" className='form-input' required />
            </div>
            <button className='btn-css btn-block'>Submit</button>
            <div style={{ marginTop: '1rem' }}>
                <p>
                    Already  have an account??{' '}
                    <Link to='/login' style={{ marginLeft: '0.5rem' }}>
                        Login
                    </Link>
                </p>
                <p>
                    Register for free?{' '}
                    <Link to='/register' style={{ marginLeft: '0.5rem' }}>
                        Register
                    </Link>
                </p>
            </div>
        </Form>
    )
}

export default ForgotPassword