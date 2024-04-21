import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../../utils'

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
    return (
        <section>

        </section>
    )
}

export default Profile