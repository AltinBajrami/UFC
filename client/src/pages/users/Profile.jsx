import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../../utils'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UpdateUserForm from '../../components/UpdateUserForm';
import UpdateUserPasswordForm from '../../components/UpdateUserPasswordForm';

const getUser = () => {
    return {
        queryKey: ['user'],
        queryFn: async () => {
            const response = await customFetch('/users/showMe', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getUser());
    return ''
}

const Profile = () => {

    const { data: { user }, isLoading, isError } = useQuery(getUser())

    return (
        <Wrapper className='page'>
            <div className="text-info">
                <h3>Personal Information</h3>
                <p>Manage your personal information here</p>
            </div>
            <div className="update-user-form">
                <UpdateUserForm {...user} />
            </div>
            <div className="text-info">
                <h3>Change password</h3>
                <p>Update your password associated with your account.</p>
            </div>
            <div className="update-user-password-form">
                <UpdateUserPasswordForm />
            </div>

        </Wrapper>
    );
}
const Wrapper = styled.section`
    display: grid;
    gap: 1rem;
    @media (min-width: 850px){
        grid-template-columns: 350px 1fr;
        gap: 5rem;
    }
    .text-info{
        text-align: start;
    }
    .text-info h3{
        color: black;
        letter-spacing: --letterSpacing;
        font-weight: 700;
    }
    .text-info p{
        color: var(--grey-500);
    }
    .form{
        margin: 0;
    }
`
export default Profile