import React from 'react'
import styled from 'styled-components'

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const EventLanding = ({ event, fights }) => {

  if (!event) {
    return <div className='landing-container' >
      <div className="landing-info">
        <h4 className='landing-h4'>UFC 300</h4>
        <h2 className='landing-h2'>pereira</h2>
        <p className='landing-vs'>vs</p>
        <h2 className='landing-h2'>hill</h2>
        <div className="landing-location">
          <p className='landing-date'>Sun,Apr 14 / 4:00 AM GMT+1</p>
          <p>T-Mobile Arena,Las Vegas United States</p>
        </div>
      </div>
    </div>
  }

  const { name, date, image, arenaId } = event;

  let fighter1ID;
  let fighter2ID;

  if (fights?.[0]) {
    fighter1ID = fights[0].fighter1ID;
    fighter2ID = fights[0].fighter2ID;
  } else {
    fighter1ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
    fighter2ID = { image1: '/uploads/fighters/no-profile-image.png', fighterName: 'Tbo tbo' };
  }

  return (
    <div className='landing-container'>
      <img src={`http://localhost:5000` + image} alt="no image" className='img' />
      <div className="landing-info">
        <h4 className='landing-h4'>{name}</h4>
        <h2 className='landing-h2'>{fighter1ID?.fighterName?.split(' ')[1]}</h2>
        <p className='landing-vs'>vs</p>
        <h2 className='landing-h2'>{fighter2ID?.fighterName?.split(' ')[1]}</h2>
        <div className="landing-location">
          <p className='landing-date'>{day(date).format('MMM D, YYYY h:mm ')}</p>
          <p>{arenaId?.name} {arenaId?.location}</p>
        </div>
      </div>
    </div>
  )
}


export default EventLanding