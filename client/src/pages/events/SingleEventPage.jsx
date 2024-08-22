import React from 'react'
import customFetch from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EventLanding from '../../components/EventLanding';
import SingleFight from '../../components/SingleFight';
import { useAppContext } from '../../context/AppContext';

const getSingleEvent = (id) => {
    return {
        queryKey: ['event', id],
        queryFn: async () => {
            const response = await customFetch('/events/' + id);
            console.log(response.data);

            return response.data;
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
    const { user } = useAppContext()

    const { image, name, arena, date, mainEventId, prelimsEventId, earlyPrelimsEventId } = data.event;
    const fights = data.fights;

    if (fights.length === 0) {
        return <EventLanding image={image} name={name} date={date} arenaLocation={arena?.location} arenaName={arena?.name}
            fighter1Name={'TBO'} fighter2Name={'TBO'}
        />
    }
    const { fighter1ID, fighter2ID } = fights[0];

    const mainFights = fights.filter((item) => item.miniEventID === mainEventId)
    const prelimsfights = fights.filter((item) => item.miniEventID === prelimsEventId);
    const earlyprelimsfights = fights.filter((item) => item.miniEventID === earlyPrelimsEventId);

    return <Wrapper>
        <EventLanding image={image} name={name} date={date} arenaLocation={arena?.location} arenaName={arena?.name}
            fighter1Name={fighter1ID?.fighterName.split(' ')[1]} fighter2Name={fighter2ID?.fighterName.split(' ')[1]}
        />
        {user && user.role === 'admin' && (
            <CreateButton> <Link to="/fights/create">Add fight</Link></CreateButton>
        )}
        {mainFights.length > 0 &&
            <div className='fights'>
                <h1 className='mini-event'>Main Card</h1>
                {mainFights.map((item) => {
                    return <SingleFight key={item._id} {...item} />
                })}
            </div>
        }

        {prelimsfights.length > 0 &&
            <div className='fights'>
                <h1 className='mini-event'>prelims</h1>
                {prelimsfights.map((item) => {
                    return <SingleFight key={item._id} {...item} />
                })}
            </div>
        }
        {earlyprelimsfights.length > 0 &&
            <div className='fights'>
                <h1 className='mini-event'>early prelims</h1>
                {earlyprelimsfights.map((item) => {
                    return <SingleFight key={item._id} {...item} />
                })}
            </div>
        }
    </Wrapper>
}

const Wrapper = styled.div`
    .fights{
        display: grid;
        gap: 3rem;
        background-color: #ffffff;
        margin: 5rem auto;
    }
    .mini-event{
        width: 90%;
        margin: 0 auto;
        font-weight: 900;
        letter-spacing: -2px;
        text-transform: uppercase;
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
export default SingleEventPage