const createMiniEventTable = async sql => {
  await sql`
    CREATE TABLE IF NOT EXISTS MiniEvents (
      miniEventId SERIAL PRIMARY KEY,
      eventTypeName VARCHAR(255) NOT NULL
    )
  `;
};
module.exports = createMiniEventTable;
