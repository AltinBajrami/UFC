import React from 'react'
import styled from 'styled-components'
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Link } from 'react-router-dom';
day.extend(advancedFormat);

const SingleEvent = ({ fights, arena, name, date, eventid }) => {

    if (!fights[0]) {
        return <h2>no fights added</h2>
    }
    const { fighter1ID, fighter2ID } = fights[0]
    return (
        <Wrapper>
            <div className="header">
                <h2>{name}</h2>
            </div>
            <div className="img-container">
                <img src={`http://localhost:5000/${fighter1ID?.image1}`} className='img' alt={fighter1ID?.fighterName} />
                <img src={`http://localhost:5000/${fighter2ID?.image1}`} className='img' alt={fighter2ID?.fighterName} />
            </div>
            <div className="info">
                <Link to={`/events/${eventid}`}> {fighter1ID.fighterName.split(' ')[1]} vs {fighter2ID.fighterName.split(' ')[1]}</Link>
                <p className='date'>{day(date).format('MMM D, YYYY h:mm ')}</p>
                <p className='arena'>{arena.name}</p>
                <p className='location'>{arena.location}</p>
            </div>
            <div className="btns">
                <Link to={`/events/tickets/${eventid}`} className='btn'>Tickets</Link>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
    box-shadow:0 0 20px rgba(0, 0, 0, 0.05);
    width: 90%;
    margin: 0 auto;
    display: grid;
    place-items: center;
    gap: 1rem;
    border-radius: var(--borderRadius);
    &:hover{
        box-shadow:0 0 3px rgba(0, 0, 0, 0.5);
    }
    .header h2{
        text-transform: uppercase;
        font-weight:bold;
        margin-top: 1rem;
    }
    .img-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        .img{
            height: 100px;
            filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.3));
        }
        border-bottom: 1px solid rgba(0,0,0,0.3);
    }
    .info{
        text-align: center;
        a{
            text-transform:uppercase;
            font-weight:bold;
            letter-spacing: normal;
            margin-top: 1rem;
            font-size: 1.3rem;
            color: black;
            text-decoration:none;
        }
        a:hover{
            color: red;
        }
        .date{
            font-weight:bold;
            letter-spacing: 2px;
        }
        .arena,.location{
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }
    }
    .btns{
        margin-top: 0.5rem;
        margin-bottom: 2.5rem;
        .btn {
            position: relative;
            display: inline-block;
            border: 2px solid black;
            border-radius: 0;
            color: black;
            padding: 0.7rem 3rem;
            overflow: hidden;
            transition: 0.5s all ease-in;
            text-transform:uppercase;
            font-weight:bold;
        }
        .btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: red;
            transition: 0.5s all ease-in;
        }

        .btn:hover {
            background-color: var(--grey-200);
        }

        .btn:hover::before {
            width: 100%;
        }
    }

    @media (min-width : 992px){
        grid-template-columns: auto 1fr 1fr auto;
        gap: 3rem;
        padding: 4rem 3rem;
        align-items: center;
        box-shadow:none;
        .btns{
            margin: 0;
        }
        .header h2{
            margin: 0;
        }
        .img-container{
            .img{
                height: 150px;
            }
        }
    }

`
export default SingleEvent