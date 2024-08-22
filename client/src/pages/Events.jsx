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

    console.log(events);


    useEffect(() => {
        const now = new Date().getTime();
        setEvents(data.filter(event => {
            const eventTime = new Date(event.date).getTime();
            return eventTime > now;
        }));
    }, [data]);

    const { name, date, image, arenaId, fights } = data?.[0];

    let fighter1ID;
    let fighter2ID;

    if (fights?.[0]) {
        fighter1ID = fights[0].fighter1ID;
        fighter2ID = fights[0].fighter2ID;
    } else {
        fighter1ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
        fighter2ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
    }

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
        <EventLanding name={name} fighter1Name={fighter1ID?.fighterName?.split(' ')[1]}
            fighter2Name={fighter2ID?.fighterName?.split(' ')[1]} date={date} image={image}
            arenaName={arenaId.name} arenaLocation={arenaId.location} />

        <div className="info">
            <div className="buttons">
                <button onClick={upcomingEvents} style={{ color: `${isPastEvents ? 'grey' : 'black'}` }}>Upcoming</button>
                <button onClick={pastEvents} style={{ color: `${isPastEvents ? 'black' : 'grey'}` }}>Past</button>
            </div>
            <p>{events?.length} events</p>
            {user && user.role === 'admin' && (
                <CreateButton> <Link to="/events/create">Create new event</Link></CreateButton>
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

const CreateButton = styled.div`
  margin: 30px 0;
  text-align: center;
  a{
    color: black;
    text-transform: capitalize;
    text-decoration: none;
    background-color: aliceblue;
    padding: 10px 20px;
    border-radius: 8px;
    transition: var(--transition);
  }
  a:hover{
    background-color: #d7edff
  }
  `

export default Events