import React from 'react'
import styled from 'styled-components'
import Hero from '../components/Hero'
import YouTubeVideo from '../components/YouTubeVideo'
import Quotes from '../components/Quotes'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../utils'

const getAll = () => {
    return {
        queryKey: ['quotes'],
        queryFn: async () => {
            const response = await customFetch.get('/quotes', { withCredentials: true });
            return response.data;
        }
    };
};


export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
}

const Landing = () => {

    const { data, isError } = useQuery(getAll());
    const { quotes } = data;

    if (isError) {
        return <div >
            <h2>Error fetching quotes</h2>
        </div>
    }

    return <Wrapper>
        <Hero />
        <YouTubeVideo videoId={'0OswAJOEXn8'} title={'UFC History'} />
        <Quotes quotes={quotes} />
    </Wrapper>
}

const Wrapper = styled.section`
 
`

export default Landing