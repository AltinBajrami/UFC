import React from 'react'
import img from '../assets/landingImage.jpg'
import styled from 'styled-components'

const Hero = () => {
  return <Wrapper >
    <div className="landing-info">
      <h4>UFC 300</h4>
      <h2>pereira</h2>
      <p className='vs'>vs</p>
      <h2>hill</h2>
      <div className="location">
        <p className='date'>Sun,Apr 14 / 4:00 AM GMT+1</p>
        <p>T-Mobile Arena,Las Vegas United States</p>
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  height: calc(100vh - 5rem);
  text-align: center;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  background-attachment: scroll;
  .landing-info{
    color: whitesmoke;
    padding-top: 8rem;
    display: grid;
    gap: 1.5rem;
    letter-spacing: 2px;
  }
  .vs{
    font-weight: 700;
    font-size: 2rem;
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
export default Hero