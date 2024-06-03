const createEventTable = async sql => {
  await sql`
    CREATE TABLE IF NOT EXISTS Events (
        eventId SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        MainEventID INT,
        PrelimsEventID INT,
        EarlyPrelimsEventID INT,
        VenueInformation VARCHAR(255),
        ArenaID VARCHAR(30) not null,
        Image VARCHAR(255) ,
        CONSTRAINT fk_main_event FOREIGN KEY (MainEventID) REFERENCES MiniEvents(miniEventId),
        CONSTRAINT fk_prelims_event FOREIGN KEY (PrelimsEventID) REFERENCES MiniEvents(miniEventId),
        CONSTRAINT fk_early_prelims_event FOREIGN KEY (EarlyPrelimsEventID) REFERENCES MiniEvents(miniEventId)
      )
    `;
};
module.exports = createEventTable;
