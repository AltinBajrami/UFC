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
            const { data } = await customFetch.get('/events');
            return data.events;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllEvents());
    return ''
}

const Events = () => {
    const { data } = useQuery(getAllEvents())
    let events = data;

    if (events?.length === 0) {
        return <h3>No events,please add some</h3>
    }
    console.log(events);

    const { name, date, image, arenaId, fights } = events?.[0];

    let fighter1ID;
    let fighter2ID;

    if (fights?.[0]) {
        fighter1ID = fights[0].fighter1ID;
        fighter2ID = fights[0].fighter2ID;
    } else {
        fighter1ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
        fighter2ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
    }

    return <Wrapper>
        <EventLanding name={name} fighter1Name={fighter1ID?.fighterName?.split(' ')[1]}
            fighter2Name={fighter2ID?.fighterName?.split(' ')[1]} date={date} image={image}
            arenaName={arenaId.name} arenaLocation={arenaId.location} />

        <div className="events">
            {data.map((event) => {
                return <SingleEvent key={event._id} {...event} />
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