import React from 'react';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const EventLanding = ({
  image = 'UFC 300',
  name = 'UFC 286',
  date = '08/12/2015',
  arenaLocation = 'abu dhabi',
  arenaName = 'T-Mobile',
  fighter1Name = 'Khabib',
  fighter2Name = 'McGregor',
}) => {
  // const { name, date, image, arenaId } = event;

  // let fighter1ID;
  // let fighter2ID;

  // if (fights?.[0]) {
  //   fighter1ID = fights[0].fighter1ID;
  //   fighter2ID = fights[0].fighter2ID;
  // } else {
  //   fighter1ID = {
  //     image1:
  //       '/uploads/fighters/no-profile-image.png',
  //     fighterName: 'Tbo tbo',
  //   };
  //   fighter2ID = {
  //     image1:
  //       '/uploads/fighters/no-profile-image.png',
  //     fighterName: 'Tbo tbo',
  //   };
  // }

  return (
    <div className="landing-container">
      <img
        src={`http://localhost:5000/` + image}
        alt="no image"
        className="img"
      />
      <div className="landing-info">
        <h4 className="landing-h4">{name}</h4>
        <h2 className="landing-h2">
          {fighter1Name}
        </h2>
        <p className="landing-vs">vs</p>
        <h2 className="landing-h2">
          {fighter2Name}
        </h2>
        <div className="landing-location">
          <p className="landing-date">
            {day(date).format(
              'MMM D, YYYY h:mm '
            )}
          </p>
          <p>
            {arenaName} {arenaLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventLanding;
