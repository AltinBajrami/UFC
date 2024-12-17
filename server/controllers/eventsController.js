const {
  StatusCodes,
} = require('http-status-codes');
const {
  BadRequestError,
  NotFoundError,
} = require('../errors');
const path = require('path');
const Arena = require('../models/Arena');
const Fights = require('../models/Fights');
const fs = require('fs');
const Event = require('../models/Events');

const createEvent = async (req, res) => {
  const {
    name,
    date,
    venueInformation,
    arenaId,
  } = req.body;

  if (
    !name ||
    !date ||
    !venueInformation ||
    !arenaId
  ) {
    throw new BadRequestError(
      'Please provide all properties that are required'
    );
  }

  const arenaExists = await Arena.findById(
    arenaId
  );
  if (!arenaExists) {
    throw new BadRequestError(
      'Provide a valid arena id'
    );
  }

  const image = req.files?.eventImage;
  if (!req.files || !image) {
    throw new BadRequestError(
      'Provide event image please'
    );
  }
  const imagePath1 = path.join(
    __dirname,
    `../public/uploads/events/` + `${image.name}`
  );

  await image.mv(imagePath1);
  const eventImage = `/uploads/events/${image.name}`;

  await Event.create({
    name,
    date,
    venueInformation,
    image: eventImage,
    arenaId: arenaId,
  });
  return res
    .status(200)
    .json({ msg: 'event created' });
};

const getAllEvents = async (req, res) => {
  const events = await Event.find({}).populate(
    'arenaId'
  );
  let newEvents = [];

  for (let i = 0; i < events.length; i++) {
    // Fetch fights for the current event
    const fights = await Fights.find({
      eventID: events[i]._id,
    }).populate(
      'fighter1ID fighter2ID winnerID weightClassID finishID'
    );

    newEvents[i] = {
      ...events[i]._doc,
      fights: [...fights],
    };
  }
  res
    .status(StatusCodes.OK)
    .json({ events: newEvents });
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate(
    'arenaId'
  );
  if (!event) {
    throw new NotFoundError('Event not found');
  }

  const fights = await Fights.find({
    eventID: id,
  }).populate(
    'fighter1ID fighter2ID winnerID weightClassID finishID'
  );

  return res
    .status(StatusCodes.OK)
    .json({ event, fights });
};

const getNextEvent = async (req, res) => {
  const now = new Date();

  // Query to find the next event
  let event = await Event.findOne({
    date: { $gte: now },
  }).sort({ date: 1 });

  if (!event) {
    event = await Event.findOne({
      date: { $lt: now },
    }).sort({ date: -1 });
  }

  const fights = await Fights.find({
    eventID: event._id,
  }).populate(
    'fighter1ID fighter2ID winnerID weightClassID'
  );
  await event.populate('arenaId');
  return res
    .status(StatusCodes.OK)
    .json({ event, fights });
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    date,
    venueInformation,
    arenaId,
  } = req.body;

  const event = await Event.findById(id).populate(
    'arenaId'
  );
  if (!event) {
    throw new NotFoundError('Event not found');
  }

  const arenaExists = await Arena.findById(
    arenaId
  );
  if (!arenaExists) {
    throw new BadRequestError(
      'Provide a valid arena id'
    );
  }

  let eventImage = event.image;
  if (
    req.files &&
    Object.keys(req.files).length !== 0
  ) {
    const imagePath = path.join(
      __dirname,
      '../public',
      eventImage
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    const image = req.files?.eventImage;

    const imagePath1 = path.join(
      __dirname,
      `../public/uploads/events/` +
        `${image.name}`
    );

    await image.mv(imagePath1);
    eventImage = `/uploads/events/${image.name}`;
  }

  event.name = name;
  event.date = date;
  event.venueInformation = venueInformation;
  event.arenaId = arenaId;
  event.image = eventImage;
  await event.save();

  res
    .status(200)
    .json({ msg: 'Updated event', event });
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id).populate(
    'arenaId'
  );
  if (!event) {
    throw new NotFoundError('Event not found');
  }

  const imagePath = path.join(
    __dirname,
    '../public',
    event.image
  );
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await event.deleteOne();

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'deleted event' });
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNextEvent,
};
