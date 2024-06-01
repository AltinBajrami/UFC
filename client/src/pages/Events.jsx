import React, { useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils';
import EventLanding from '../components/EventLanding';
import SingleEvent from '../components/SingleEvent';

const getAllEvents = () => {
    return {
        queryKey: ['events'],
        queryFn: async () => {
            const response = await customFetch.get('/events', { withCredentials: true });
            return response.data;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllEvents());
    return ''
}

const Events = () => {
    const { data } = useQuery(getAllEvents())
    // console.log(data);
    if (data.length === 0) {
        return <h3>No events,please add some</h3>
    }

    const { name, date, image, arena, fights } = data[1];
    const { fighter1ID, fighter2ID } = fights[1];

    return <Wrapper>
        <EventLanding name={name} fighter1Name={fighter1ID?.fighterName.split(' ')[0]}
            fighter2Name={fighter2ID?.fighterName.split(' ')[1]} date={date} image={image}
            arenaName={arena.name} arenaLocation={arena.location} />

        <div className="events">
            {data.map((event) => {
                return <SingleEvent key={event.eventid} {...event} />
            })}
        </div>
    </Wrapper >
}

const Wrapper = styled.section`
    .events{
        margin: 5rem auto;
        display: grid;
        gap: 3rem;
    }
    /* @media (min-width : 600px){
        .events{
            grid-template-columns: 1fr 1fr;
        }
    } */
`

export default Events