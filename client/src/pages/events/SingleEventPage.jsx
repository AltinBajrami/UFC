import React from 'react'
import customFetch from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EventLanding from '../../components/EventLanding';
import SingleFight from '../../components/SingleFight';

const getSingleEvent = (id) => {
    return {
        queryKey: ['event', id],
        queryFn: async () => {
            const response = await customFetch('/events/' + id);
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
    const navigate = useNavigate()
    const { data } = useQuery(getSingleEvent(id))
    const { image, name, arena, date, fights } = data;
    if (fights.length === 0) {
        return <EventLanding image={image} name={name} date={date} arenaLocation={arena?.location} arenaName={arena?.name}
            fighter1Name={'TBO'} fighter2Name={'TBO'}
        />
    }
    const { fighter1ID, fighter2ID } = fights[0];

    const mainFights = fights.filter((item) => item.miniEventID == data.maineventid)
    const prelimsfights = fights.filter((item) => item.miniEventID == data.prelimseventid);
    const earlyprelimsfights = fights.filter((item) => item.miniEventID == data.earlyprelimseventid);

    return <Wrapper>
        <EventLanding image={image} name={name} date={date} arenaLocation={arena?.location} arenaName={arena?.name}
            fighter1Name={fighter1ID?.fighterName.split(' ')[1]} fighter2Name={fighter2ID?.fighterName.split(' ')[1]}
        />
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

export default SingleEventPage