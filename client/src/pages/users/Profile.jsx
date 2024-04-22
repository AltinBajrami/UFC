import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../../utils'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

    console.log(user);
    const { userId } = user;
    return (
        <Wrapper>
            {/* Profile Info */}
            <div className='profile'>
                <img src="path/to/image.jpg" alt="User" className='img' />
                <div className='userData'>
                    <h2>User Name</h2>
                    <p>Email: user@example.com</p>
                    <p>Phone: +1234567890</p>
                </div>
                <Link to={'/users/update/' + userId}>Update profile</Link>
            </div>

            {/* Tickets */}
            <div className='tikets'>
                <h2>Tickets</h2>

            </div>
        </Wrapper>
    );
}
const Wrapper = styled.section`
    
`
export default Profile