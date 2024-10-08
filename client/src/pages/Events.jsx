import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils';
import EventLanding from '../components/EventLanding';
import SingleEvent from '../components/SingleEvent';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

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
    const [events, setEvents] = useState(data);
    const [isPastEvents, setIsPastEvents] = useState(false);
    const { user } = useAppContext()

    if (data?.length === 0) {
        return <h3>No events for the moment</h3>
    }

    useEffect(() => {
        const now = new Date().getTime();
        setEvents(data.filter(event => {
            const eventTime = new Date(event.date).getTime();
            return eventTime > now;
        }));
    }, [data]);



    const pastEvents = () => {
        const now = new Date().getTime();
        setEvents(data.filter(event => {
            const eventTime = new Date(event.date).getTime();
            return eventTime < now;
        }));
        setIsPastEvents(true);
    }

    const upcomingEvents = () => {
        const now = new Date().getTime();
        setEvents(data.filter(event => {
            const eventTime = new Date(event.date).getTime();
            return eventTime > now;
        }));
        setIsPastEvents(false);
    }

    return <Wrapper>
        <EventLanding event={events?.[events.length - 1]} fights={events?.[events.length - 1]?.fights} />

        <div className="info">
            <div className="buttons">
                <button onClick={upcomingEvents} style={{ color: `${isPastEvents ? 'grey' : 'black'}` }}>Upcoming</button>
                <button onClick={pastEvents} style={{ color: `${isPastEvents ? 'black' : 'grey'}` }}>Past</button>
            </div>
            <p>{events?.length} events</p>
            {user && user.role === 'admin' && (
                <div className='createBtn'> <Link to="/events/create">Create new event</Link></div>
            )}
        </div>
        <div className="events">
            {events.map((event) => {
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
   .info{
    width: 100%;
    display: grid;
    place-items: center;
    .buttons{
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
        button{
            border: transparent;
            background: transparent;
            font-size: 3rem;
            text-transform: uppercase;
            letter-spacing: 4px;
            font-weight: 900;
        }
    }
    p{
        letter-spacing: 3px;
        margin-top: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.2rem;
    }
   }
`



export default Events