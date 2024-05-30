const { StatusCodes } = require('http-status-codes');
const sql = require('../utils/db');
const { BadRequestError } = require('../errors');
const path = require('path');
const Arena = require('../models/Arena');
const fs = require('fs');

const createEvent = async (req, res) => {
  const { name, date, venueInformation, arenaId } = req.body;

  if (!name || !date || !venueInformation || !arenaId) {
    throw new BadRequestError(
      'Please provide all properties that are required'
    );
  }
  const mainEventId = await sql`
    SELECT * FROM MiniEvents
    WHERE eventTypeName = 'main event'
  `;
  const prelimsEventId = await sql`
    SELECT * FROM MiniEvents
    WHERE eventTypeName = 'Prelims'
  `;
  const earlyPrelimsEventId = await sql`
    SELECT * FROM MiniEvents
    WHERE eventTypeName = 'early prelims'
    `;
  if (mainEventId.length === 0) {
    return res.status(404).json({ msg: 'mainEvent not found' });
  }
  if (prelimsEventId.length === 0) {
    return res.status(404).json({ msg: 'prelimsEvent not found' });
  }
  if (earlyPrelimsEventId.length === 0) {
    return res.status(404).json({ msg: 'earlyPrelimsEvent not found' });
  }

  const image = req.files?.eventImage;
  if (!req.files || !image) {
    throw new BadRequestError('Provide event image please');
  }
  const imagePath1 = path.join(
    __dirname,
    `../public/uploads/events/` + `${image.name}`
  );

  await image.mv(imagePath1);
  const eventImage = `/uploads/events/${image.name}`;

  const arenaExists = await Arena.findById(arenaId);
  if (!arenaExists) {
    throw new BadRequestError('Provide a valid arena id');
  }

  const result = await sql`
      INSERT INTO Events (name, date, MainEventID, PrelimsEventID, EarlyPrelimsEventID, VenueInformation,
         ArenaID,Image)
      VALUES (${name},${date},${mainEventId[0].minieventid},${prelimsEventId[0].minieventid},
        ${earlyPrelimsEventId[0].minieventid},${venueInformation},${arenaId},${eventImage})
    `;
  return res.status(200).json({ msg: 'event created' });
};

const getAllEvents = async (req, res) => {
  try {
    const result = await sql`
          SELECT * FROM Events
        `;
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`
          SELECT * FROM Events
          WHERE eventId = ${id}
        `;
    if (result.length === 0) {
      res.status(404).json({ msg: 'Event not found' });
    } else {
      res.status(StatusCodes.OK).json(result[0]);
    }
  } catch (error) {
    console.error('Error getting event by ID:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, venueInformation, arenaId } = req.body;

  const result = await sql`SELECT * FROM Events WHERE eventId = ${id}`;

  console.log('🚀 ~ updateEvent ~ event:', result);
  if (result.length === 0) {
    return res.status(404).json({ msg: `Event with ID ${id} not found` });
  }
  const event = result[0];

  const arenaExists = await Arena.findById(arenaId);
  if (!arenaExists) {
    throw new BadRequestError('Provide a valid arena id');
  }

  let eventImage = event.image;
  if (req.files && Object.keys(req.files).length !== 0) {
    const imagePath = path.join(__dirname, '../public', eventImage);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    const image = req.files?.eventImage;

    const imagePath1 = path.join(
      __dirname,
      `../public/uploads/events/` + `${image.name}`
    );

    await image.mv(imagePath1);
    eventImage = `/uploads/events/${image.name}`;
  }

  await sql`
    UPDATE Events
    SET
        name = ${name},
        date = ${date},
        VenueInformation = ${venueInformation},
        ArenaID = ${arenaId},
        Image = ${eventImage}
    WHERE eventId = ${id}
`;

  res.status(200).json({ msg: 'Updated event' });
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await sql`
    SELECT * FROM Events
    WHERE eventId = ${id}
    `;
    console.log(event, id);

    if (event[0].length === 0) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const imagePath = path.join(__dirname, '../public', event[0].image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await sql`
          DELETE FROM Events
          WHERE eventId = ${id}
        `;
    return res.status(200).json({ msg: 'event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
