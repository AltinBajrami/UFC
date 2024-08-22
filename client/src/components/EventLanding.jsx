import React from 'react'
import styled from 'styled-components'

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const EventLanding = ({ date, name, image, fighter1Name, fighter2Name, arenaName, arenaLocation }) => {
  return (
    <Wrapper>
      <img src={`http://localhost:5000` + image} alt="no image" className='img' />
      <div className="landing-info">
        <h4>{name}</h4>
        <h2>{fighter1Name}</h2>
        <p className='vs'>vs</p>
        <h2>{fighter2Name}</h2>
        <div className="location">
          <p className='date'>{day(date).format('MMM D, YYYY h:mm ')}</p>
          <p>{arenaName} {arenaLocation}</p>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
     min-height: calc(100vh - 5rem);
    text-align: center;
    position: relative;
    width: 100%;
    .img{
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 100%;
    }
  .landing-info{
    position: absolute;
    color: white;
    padding-top: 14rem;
    display: grid;
    gap: 1.5rem;
    letter-spacing: 2px;
   text-align: center;
   width: 100%;
  }
  .vs{
    font-weight: 700;
    font-size: 1.5rem;
  }
  h4{
    font-weight: 700;
  }
  h2{
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .location{
    justify-self: center;
    display: flex;
    flex-direction: column;
    gap:0.8rem;
  }
  .date{
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
`

export default EventLanding