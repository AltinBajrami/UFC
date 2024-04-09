import React, { useState, useEffect } from 'react';
import { useLocation, Link, Form, redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../../utils';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    const query = useQuery();
    console.log(query.get('email'));
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            toast.error('please enter password');
            setLoading(false);
            return;
        }
        try {
            const { data } = await customFetch.post('/auth/reset-password', {
                password,
                token: query.get('token'),
                email: query.get('email'),
            }, { withCredentials: true });
            console.log(query);
            console.log(data);
            setLoading(false);
            toast.success(`Success, redirecting to login page shortly`)
            return navigate('/login')
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setLoading(false);
        }
    };
    return <form className='form' method='post' onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '2rem', letterSpacing: '3px', textAlign: "center" }}>Reset password</h2>
        <div className="form-row">
            <label htmlFor="password" className="form-label"></label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' />
        </div>
        <button type="submit" className='btn-css btn-block'>New Password</button>
    </form>
};


const Wrapper = styled.section`
      h4,
      p {
        text-align: center;
      }
      p {
        margin: 0;
        margin-top: 1rem;
      }
    `;



export default ResetPassword