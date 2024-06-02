import React from 'react'
import styled from 'styled-components'

const AthleteInfo = ({ homeTown, status, country, age, fightingStyle, legReach, reach, weightClass }) => {
    return (
        <Wrapper>
            <h1>Info</h1>
            <div className="info">
                <div className="status">
                    status <span>{status}</span>
                </div>
                <hr />
                <div className="placeOfBirth">
                    place Of Birth <span>{homeTown},{country}</span>
                </div>
                <hr />
                <div className="age">
                    <p>age <span>{age}</span></p>
                    <p>WEIGHT  <span>{weightClass.pound}</span></p>
                </div>
                <div className="reach">
                    <p>reach  <span>{reach}</span></p>
                    <p>leg reach <span>{legReach}</span></p>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
     background-color: #212126;
     display: grid;
     place-items: center;
     color: white;
     padding: 2rem 3rem;
     padding-bottom: 5rem;
     h1{
        color: red;
        text-transform: uppercase;
        margin-bottom: 4rem;
     }
     .info{
        display: flex;
        flex-wrap: wrap;
        gap: 5rem;
     }
     .age,.reach{
        display: flex;
        gap: 2rem;
     }
     .status,.placeOfBirth,.age p,.reach p{
        text-transform:uppercase;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        span{
            font-size:2rem;
            letter-spacing: 2px;
        }   
     }
`

export default AthleteInfo