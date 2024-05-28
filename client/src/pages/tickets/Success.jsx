import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MdAttachMoney } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import customFetch from '../../utils';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get('sessionId');



    const getSession = async () => {
        try {
            await customFetch.post('/tickets/success', { sessionId }, { withCredentials: true });
            toast.success('Payment Successfully,redirecting to orders');
            setTimeout(() => {
                return navigate('/my-orders');
            }, 3000)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
        setTimeout(() => {
            return navigate('/my-orders');
        }, 3000)
    }
    useEffect(() => {
        getSession()
    }, [])

    return (
        <Wrapper>
            <div className="success-center">
                <MdAttachMoney />
                <h3>Payment Successfully</h3>
                <p>Thank you for payment,hopefully you'll have fun</p>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    height: calc(100vh - 5rem);
    display: grid;
    place-items: center;
    background-color: var(--grey-50);
    .success-center{
        text-align: center;
        max-width: 500px;
        padding: 2rem 4rem;
        background-color: white;
        border-radius: var(--borderRadius);
        box-shadow: var(--shadow-3);
        letter-spacing:2.4px;
        svg{
            color: green;
            font-size:2.5rem;
            margin-bottom: 1.5rem;
        }
    }
`

export default Success