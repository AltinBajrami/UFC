import React from 'react'
import customFetch from '../utils'
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import AthleteRecord from '../components/AthleteRecord';
import AthleteInfo from '../components/AthleteInfo';

const getSingleFighter = (id) => {
    return {
        queryKey: ['singleFighter', id],
        queryFn: async () => {
            const { data } = await customFetch(`fighters/${id}`);
            return data;
        }
    }
}
const getAllFightsByFighterId = (id) => {
    return {
        queryKey: ['fights', 'fighter', id],
        queryFn: async () => {
            const response = await customFetch.get('/fights/fighter/' + id);
            return response.data;
        }
    }
}


export const loader = (queryClient) => async ({ params }) => {
    await queryClient.ensureQueryData(getSingleFighter(params.id))
    await queryClient.ensureQueryData(getAllFightsByFighterId(params.id))
    return params.id;
}

const AthleteProfile = () => {
    const id = useLoaderData()
    const { data } = useQuery(getSingleFighter(id));
    const { data: data1 } = useQuery(getAllFightsByFighterId(id));

    const { fighter } = data;
    console.log("🚀 ~ AthleteProfile ~ fighter:", data1?.fights)
    const { fighterName, fightingStyle, win, draw, lose, status, age, weightClass, country,
        image2, legReach, nickName, reach, homeTown } = fighter;

    return (
        <>
            <Wrapper>
                <div className="info">
                    <p>
                        <span>{weightClass.className} Division</span> <span>{status}</span>
                    </p>
                    <h3 className="nickName">{nickName && `"${nickName}"`}</h3>
                    <h1 className='name'>{fighterName}</h1>
                    <div className="weightClass">
                        {weightClass.className} Division
                    </div>
                    <div className="record">
                        {win} - {lose} - {draw} (w-l-d)
                    </div>
                </div>
                <div className="img-container">
                    <img src={`http://localhost:5000${image2}`} className='img' alt={fighterName} />
                </div>
            </Wrapper>
            <AthleteRecord fights={data1?.fights} />
            <AthleteInfo status={status} homeTown={homeTown} age={age} legReach={legReach} weightClass={weightClass}
                reach={reach} fightingStyle={fightingStyle} country={country} />
        </>
    )
}

const Wrapper = styled.section`
    display: grid;
    width: 100%;
    padding: 5rem 2rem;
    padding-bottom:0;
    background-color: #212126;
    color:white;
    gap: 2rem;
    justify-content: center;
     .info{
        max-width: 350px;
            p:first-child{
                display: flex;
                gap: 1rem;
                span{
                    background-color: var(--grey-700);
                    padding: 0.25rem 0.5rem;
                    color: whitesmoke;
                    border-radius: 5px;
                    text-transform: capitalize;
                }
             }
     }
     .nickName{
        color: var(--grey-400);
        font-weight: bolder;
        margin: 2rem auto;
        text-transform: uppercase;
        letter-spacing: 3px;
     }
     .name{
        font-weight: bolder;
        margin: 2rem auto;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 4rem;
        color: red;
     }
     .weightClass,.record{
        font-size:1.2rem;
        margin-bottom: 1rem;
     }
     .record{
        text-transform: uppercase;
     }

   .img-container{
    .img{
        height: 300px;
        object-fit:contain;
        width: 300px;
    }
   }
   @media (min-width: 992px){
    grid-template-columns: 1fr 1fr;
    place-items: center;
    .img-container{
    .img{
        height: 700px;
        object-fit:contain;
    }
   }
   }
`

export default AthleteProfile