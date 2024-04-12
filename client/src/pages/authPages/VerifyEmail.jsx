import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import customFetch from '../../utils';
import { toast } from 'react-toastify';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isUserLoading } = useAppContext();
    const query = useQuery();

    const verifyToken = async () => {
        setLoading(true);
        try {
            const { data } = await customFetch.post('/auth/verify-email', {
                verificationToken: query.get('token'),
                email: query.get('email'),
            });
            toast.success(data.msg)
        } catch (error) {
            // console.log(error.response);
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isUserLoading) {
            verifyToken();
        }
    }, []);

    if (loading) {
        return (
            <Wrapper className='page'>
                <h2>Loading...</h2>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper className='page'>
                <h4>There was an error, please double check your verification link </h4>
            </Wrapper>
        );
    }

    return (
        <Wrapper className='page'>
            <h2>Account Confirmed</h2>
            <Link to='/login' className='btn-css'>
                Please login
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`
export default VerifyEmail