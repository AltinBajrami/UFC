import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AthleteRecord = ({ fights }) => {
    console.log("🚀 ~ AthleteRecord ~ fights:", fights)
    if (fights.length === 0) {
        return null;
    }
    return (
        <Wrapper>
            <h1 className='head'>Athlete record</h1>
            {fights.map(fight => {
                const { fighter1ID, fighter2ID, winnerID, finishID, minute, round, seconds } = fight;
                return <article className='fight' key={fight._id}>
                    <div className="img-container">
                        <div className="fighter1">
                            <img src={`http://localhost:5000${fighter1ID.image1}`} className='img' alt={fighter1ID.fighterName} />
                            {winnerID && winnerID._id === fighter1ID._id && <span>won</span>}
                        </div>
                        <div className="fighter1">
                            <img src={`http://localhost:5000${fighter2ID.image1}`} className='img' alt={fighter2ID.fighterName} />
                            {winnerID && winnerID._id === fighter2ID._id && <span>won</span>}
                        </div>
                    </div>
                    <div className="data">
                        <div className="names">
                            <h1> <Link to={`/fighter/${fighter1ID._id}`}>{fighter1ID.fighterName.split(' ')[1]}  </Link></h1>
                            <h1>vs</h1>
                            <h1> <Link to={`/fighter/${fighter2ID._id}`}>{fighter2ID.fighterName.split(' ')[1]}  </Link></h1>
                        </div>
                        {winnerID &&
                            <div className="winnerInfo">
                                <p>round : <span>{round}</span></p>
                                <p>time : <span>{minute} : {seconds}</span></p>
                                <p>method : <span>{finishID.finishType}</span></p>
                            </div>
                        }
                    </div>
                </article>
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 90%;
    margin: 5rem auto;
    
    .fight{
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
        margin: 3rem 0;
        border-radius: var(--borderRadius);
        padding: 2rem;
    }
    .fight:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.4);
    }
    .head{
        text-transform: uppercase;
        font-weight: bold;
        font-size:3rem
    }
    .img-container{
        display: flex;
        gap: 1rem;
        .fighter1,.fighter2{
            position: relative;
        }
        .img{
            height: 100px;
            object-fit:contain;
            filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
        }
        span{
            background-color: red;
            color: white;
            padding: 0.2rem 0.5rem;
            text-transform: uppercase;
            position: absolute;
            bottom: 0;
        }
    }
    .data{
        padding: 1rem;
        text-align:center;
        display: grid;
        place-items: center;
    }
    .names{
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        color:red;
        h1{
            text-transform: uppercase;
        }
        a{
            color: black;
            text-decoration:none;
        }
        h1:hover{
            text-decoration:underline;
        }
    }
    .winnerInfo{
        max-width: 20rem;
        display: flex;
        gap: 1rem;
        justify-content:ce;
        flex-wrap: wrap;
        p{
            display: flex;
            flex-direction: column;
            text-transform: capitalize;
            color: var(--grey-400);
            span{
                color: black;
                font-weight:bold
            }
        }
    }
    @media (min-width: 600px){
        .fight{
            display: grid;
            grid-template-columns: auto auto;
        }
        .img-container{
            .img{
                height: 200px;
                width: 140px;
                object-fit: cover;
            }
        }
    }
    @media (min-width: 992px){
        .img-container{
            gap: 1rem;
            .img{
                height: 200px;
                width: 200px;
            }
        }
    }
`

export default AthleteRecord