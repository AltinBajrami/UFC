import React from 'react'
import styled from 'styled-components'
import YouTubeVideo from '../components/YouTubeVideo'
import Quotes from '../components/Quotes'
import { useQuery } from '@tanstack/react-query'
import customFetch from '../utils'
import EventLanding from '../components/EventLanding'

const getAll = () => {
    return {
        queryKey: ['quotes'],
        queryFn: async () => {
            const response = await customFetch.get('/quotes', { withCredentials: true });
            return response.data;
        }
    };
};
const getNextEvent = () => {
    return {
        queryKey: ['nextEvent'],
        queryFn: async () => {
            const { data } = await customFetch.get('/events/next-event');
            return { event: data?.event, fights: data?.fights };
        }
    };
}


export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    await queryClient.ensureQueryData(getNextEvent());
    return null;
}

const Landing = () => {

    const { data, isError } = useQuery(getAll());
    const { event, fights } = useQuery(getNextEvent())?.data;
    console.log(event, fights);

    const { quotes } = data;



    return <Wrapper>
        <EventLanding event={event} fights={fights} />
        <YouTubeVideo videoId={'0OswAJOEXn8'} title={'UFC History'} />
        <Quotes quotes={quotes} isError={isError} />
    </Wrapper>
}

const Wrapper = styled.section`
 
`

export default Landing