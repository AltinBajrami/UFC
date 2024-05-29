const { StatusCodes } = require('http-status-codes');
const sql = require('../utils/db');
const { BadRequestError } = require('../errors');
const path = require('path');
const Arena = require('../models/Arena');
const { log } = require('console');

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

  // const image = req.files?.eventImage;
  // console.log(req.body, req.files);
  // if (!req.files || !image) {
  //   throw new BadRequestError('Provide event image please');
  // }
  // const imagePath1 = path.join(
  //   __dirname,
  //   `../public/uploads/events/` + `${image.name}`
  // );

  // await image.mv(imagePath1);
  // const eventImage = `/uploads/events/${image.name}`;

  const arenaExists = await Arena.findById(arenaId);
  if (!arenaExists) {
    throw new BadRequestError('Provide a valid arena id');
  }

  const result = await sql`
      INSERT INTO Events (name, date, MainEventID, PrelimsEventID, EarlyPrelimsEventID, VenueInformation,
         ArenaID,Image)
      VALUES (${name},${date},${mainEventId[0].minieventid},${prelimsEventId[0].minieventid},
        ${earlyPrelimsEventId[0].minieventid},${venueInformation},${arenaId},'')
    `;
  console.log(result);
  return res.status(200).json({ result: result.rows });
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
    console.error('Error getting mini-event by ID:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const {
    name,
    date,
    mainEventId,
    prelimsEventId,
    earlyPrelimsEventId,
    venueInformation,
    arenaId,
  } = req.body;

  const event = await sql('SELECT * FROM Events WHERE eventId = $1', [eventId]);

  if (event?.rows?.length === 0) {
    return res.status(404).json({ msg: `Event with ID ${eventId} not found` });
  }

  const arenaExists = await Arena.findById(arenaId);
  if (!arenaExists) {
    throw new BadRequestError('Provide a valid arena id');
  }

  let eventImage = event.image;
  if (req.files && Object.keys(req.files).length !== 0) {
    const image = req.files?.eventImage;

    const imagePath1 = path.join(
      __dirname,
      `../public/uploads/events/` + `${image.name}`
    );

    await image.mv(imagePath1);
    eventImage = `/uploads/events/${image.name}`;
  }

  const updatedEvent = await sql(
    `
      UPDATE Events
      SET name = $1, date = $2, MainEventID = $3, PrelimsEventID = $4, EarlyPrelimsEventID = $5,
          VenueInformation = $6, ArenaID = $7, Image = $8
      WHERE eventId = $9
      RETURNING *
    `,
    [
      name,
      date,
      mainEventId,
      prelimsEventId,
      earlyPrelimsEventId,
      venueInformation,
      arenaId,
      eventImage,
    ]
  );

  res.status(200).json(updatedEvent.rows[0]);
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
