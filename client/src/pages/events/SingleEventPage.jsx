import React from 'react'
import customFetch from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import EventLanding from '../../components/EventLanding';
import SingleFight from '../../components/SingleFight';

const getSingleEvent = (id) => {
    return {
        queryKey: ['event', id],
        queryFn: async () => {
            const response = await customFetch('/events/' + id, { withCredentials: true });
            return response.data
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleEvent(id));
    return id;
}

const SingleEventPage = () => {
    const id = useLoaderData();
    const { data } = useQuery(getSingleEvent(id))
    console.log("🚀 ~ SingleEventPage ~ data:", data)
    const { image, name, arena, date, fights } = data;
    const { fighter1ID, fighter2ID } = fights[1];

    return <Wrapper>
        <EventLanding image={image} name={name} date={date} arenaLocation={arena?.location} arenaName={arena?.name}
            fighter1Name={fighter1ID?.fighterName.split(' ')[1]} fighter2Name={fighter2ID?.fighterName.split(' ')[1]}
        />
        <div className="fights">
            {fights.map((item) => {
                return <SingleFight />
            })}
        </div>
    </Wrapper>
}

const Wrapper = styled.div`
    
`

export default SingleEventPage