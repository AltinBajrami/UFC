const createEventTable = async sql => {
  await sql`
    CREATE TABLE IF NOT EXISTS Events (
        eventId SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        MainEventID INT,
        PrelimsEventID INT,
        EarlyPrelimsEventID INT,
        VenueInformation VARCHAR(255),
        ArenaID VARCHAR(30) not null,
        Image VARCHAR(255) 
      )
    `;
};
module.exports = createEventTable;
