import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MdCancel } from "react-icons/md";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import customFetch from '../../utils';

const Cancel = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('sessionId');

    useEffect(() => {
        toast.error('Payment Failed,redirecting to home');
        setTimeout(() => {
            return navigate('/');
        }, 3000)
    }, [])

    const getSession = async () => {
        await customFetch.post('/tickets/failed', { sessionId }, { withCredentials: true });
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <Wrapper>
            <div className="cancel-center">
                <MdCancel />
                <h3>Payment Canceled</h3>
                <p>Sorry for your trouble,your payment was canceled</p>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    height: calc(100vh - 5rem);
    display: grid;
    place-items: center;
    background-color: var(--grey-50);
    .cancel-center{
        text-align: center;
        max-width: 500px;
        padding: 2rem 4rem;
        background-color: white;
        border-radius: var(--borderRadius);
        box-shadow: var(--shadow-3);
        letter-spacing:2.4px;
        svg{
            color: red;
            font-size:2.5rem;
            margin-bottom: 1.5rem;
        }
    }
`

export default Cancel