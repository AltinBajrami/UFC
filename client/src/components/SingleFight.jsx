import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SingleFight = ({ fighter1ID, fighter2ID, weightClassID, finishID, winnerID, round, minute, seconds }) => {

    return (
        <Wrapper>
            <div className="img-container">
                <img src={`http://localhost:5000/${fighter1ID?.image1}`} className='img'
                    alt={fighter1ID?.fighterName} />
                <p>{fighter1ID.country} {winnerID?._id === fighter1ID._id && <span className='won'>Won</span>}</p>
            </div>
            <div className="info">
                <div className="ranks">
                    <p className="rank">#2</p>
                    <p className="weight">{weightClassID.className} Bout</p>
                    <p className="rank">#1</p>
                </div>

                <div className="names">
                    <h3><Link to={`/fighter/${fighter1ID._id}`}>{fighter1ID.fighterName}</Link></h3>
                    <h3>vs</h3>
                    <h3><Link to={`/fighter/${fighter2ID._id}`}>{fighter2ID.fighterName}</Link></h3>
                </div>
                {winnerID &&
                    <div className="winnerInfo">
                        <p>round : <span>{round}</span></p>
                        <p>time : <span>{minute} : {seconds}</span></p>
                        <p>method : <span>{finishID.finishType}</span></p>
                    </div>
                }
            </div>
            <div className="img-container">
                <img src={`http://localhost:5000/${fighter2ID?.image1}`} className='img'
                    alt={fighter2ID?.fighterName} />
                <p>{fighter2ID.country} {winnerID?._id === fighter2ID._id && <span className='won'>Won</span>}</p>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.article`
    background-color: white;
    width: 90%;
    margin: 0 auto;
    display: grid;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: var(--borderRadius);
    position: relative;
    box-shadow:0 1px 3px rgba(0, 0, 0, 0.5);
    padding: 1rem;
    &:hover{
        box-shadow:0 0 8px rgba(0, 0, 0, 0.5);
    }
    .img-container{
        .img{
            max-height: 120px;
            object-fit: cover;
            width: 200px;
        }
    }
    @media (min-width : 1100px){
        grid-template-columns: 250px 1fr 250px;
        .img-container{
            .img{
                height: 180px;
                width: 240px;
                max-height: 300px;
            }
         }
    }


    .img-container{
        display: grid;
        place-items:center;
    
        p{
            text-transform: uppercase;
            font-weight:bold;
            margin: 1rem auto;
        }
    }
    .info{
        display: grid;
        place-items:center;
    }
    .ranks{
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-content: space-evenly;
        width: 95%;
        gap: 1rem;
    }
    .rank{
        color:var(--grey-700);
        font-weight:bold;
        text-transform:capitalize
    }
    .weight{
        font-weight:bold;
        text-transform:uppercase;
        color: var(--grey-500);
        justify-self:center;
    }
    .names{
        display: grid;
        place-items: center;
        width: 95%;
        margin: 0 auto;
        gap: 1rem;
        h3{
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 2px;
        }
        a{
            color: black;
            text-decoration:none;
        }
        a:hover{
            text-decoration: underline;
        }
    }
    @media (min-width : 520px){
        .names{
            grid-template-columns: auto 50px auto;
            justify-content: space-evenly;
            align-items: start;
        }
    }
    .winnerInfo{
        margin-top: 2rem;
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: space-between;
        align-items: center;
        text-transform:uppercase;
        color: var(--grey-500);
        font-weight: 400;
        letter-spacing: 2px;
        gap: 2rem;
        font-size:1rem;
        span{
            font-weight: bold;
            letter-spacing: 0px;
        }
    }
    .won{
        background-color: red;
        color: white;
        padding: 0.2rem 0.5rem;
        text-transform:uppercase;
        margin-left: 2rem;
        border-radius: var(--borderRadius);
        font-weight:normal;
    }

    `
export default SingleFight