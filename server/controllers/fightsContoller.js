const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Fight = require('../models/Fights');
const Event = require('../models/Events');
const MiniEvent = require('../models/miniEvent');
const Refer = require('../models/Refer');
const FightFinish = require('../models/FightFinish');
const Fighter = require('../models/Fighter');
const WeightClass = require('../models/WeightClass');

const getAllFights = async (req, res) => {
  const fights = await Fight.find({}).populate(
    'fighter1ID fighter2ID weightClassID refereeID winnerID finishID eventID'
  );
  return res.status(StatusCodes.OK).json({ fights });
};

const getOneFight = async (req, res) => {
  const { id } = req.params;
  const fight = await Fight.findById(id);
  if (!fight) {
    throw new NotFoundError('fight not found!');
  }
  return res.status(StatusCodes.OK).json({ fight });
};

const getAllFightsByFighterId = async (req, res) => {
  const { fighterId } = req.params;
  const fights1 = await Fight.find({ fighter1ID: fighterId }).populate(
    'fighter1ID fighter2ID weightClassID refereeID winnerID finishID'
  );
  const fights2 = await Fight.find({ fighter2ID: fighterId }).populate(
    'fighter1ID fighter2ID weightClassID refereeID winnerID finishID'
  );
  const fights = [...fights1, ...fights2];
  console.log('🚀 ~ getAllFightsByFighterId ~ fights:', fights);
  return res.status(StatusCodes.OK).json({ fights });
};

const createFight = async (req, res) => {
  const {
    miniEventID,
    fighter1ID,
    fighter2ID,
    weightClassID,
    refereeID,
    eventID,
  } = req.body;

  // Check if all required fields are provided
  if (!fighter1ID || !fighter2ID || !eventID || !miniEventID || !refereeID) {
    throw new BadRequestError(
      'Please provide all necessary information to create a fight'
    );
  }
  if (fighter1ID === fighter2ID) {
    throw new BadRequestError('Fighter 1 and 2 must not be the same');
  }

  const referee = await Refer.findById(refereeID);
  if (!referee) {
    throw new BadRequestError('Provide a valid refer id');
  }
  const fighter1 = await Fighter.findById(fighter1ID);
  if (!fighter1) {
    throw new BadRequestError('Provide a valid fighter id');
  }
  const fighter2 = await Fighter.findById(fighter2ID);
  if (!fighter2) {
    throw new BadRequestError('Provide a valid fighter id');
  }
  const weightClass = await WeightClass.findById(weightClassID);
  if (!weightClass) {
    throw new BadRequestError('Provide a valid weightClass id');
  }

  const event = await Event.findById(eventID);
  if (!event) {
    throw new NotFoundError('Not found event');
  }
  const miniEvent = await MiniEvent.findById(miniEventID);
  if (!miniEvent) {
    throw new BadRequestError('Provide a valid mini-event id');
  }

  // Create the fight
  const fight = await Fight.create({
    fighter1ID,
    fighter2ID,
    refereeID,
    eventID,
    miniEventID,
    weightClassID,
  });
  return res.status(StatusCodes.CREATED).json({ fight });
};

const updateFight = async (req, res) => {
  const { id } = req.params;
  const {
    miniEventID,
    fighter1ID,
    fighter2ID,
    round,
    minute,
    seconds,
    finishID,
    refereeID,
    eventID,
    winnerID,
  } = req.body;

  if (
    !fighter1ID ||
    !fighter2ID ||
    !eventID ||
    !miniEventID ||
    !refereeID ||
    !finishID ||
    !round ||
    !minute ||
    !seconds ||
    !winnerID
  ) {
    throw new BadRequestError(
      'Please provide all necessary information to create a fight'
    );
  }

  if (fighter1ID === fighter2ID) {
    throw new BadRequestError('Fighter 1 and 2 must not be the same');
  }

  const referee = await Refer.findById(refereeID);
  if (!referee) {
    throw new BadRequestError('Provide a valid refer id');
  }
  const fighter1 = await Fighter.findById(fighter1ID);
  if (!fighter1) {
    throw new BadRequestError('Provide a valid fighter id');
  }
  const fighter2 = await Fighter.findById(fighter2ID);
  if (!fighter2) {
    throw new BadRequestError('Provide a valid fighter id');
  }
  const fightFinish = await FightFinish.findById(finishID);
  if (!fightFinish) {
    throw new BadRequestError('Provide a valid fight finish id');
  }

  const event = await Event.findById(eventID);
  if (!event) {
    throw new NotFoundError('Not found event');
  }
  const miniEvent = await MiniEvent.findById(miniEventID);
  if (!miniEvent) {
    throw new BadRequestError('Provide a valid mini-event id');
  }

  if (winnerID) {
    if (winnerID !== fighter1ID && winnerID !== fighter2ID) {
      throw new BadRequestError('Winner must be fighter 1 or 2');
    }
  }

  // Create the fight
  const fight = await Fight.findByIdAndUpdate(
    id,
    {
      fighter1ID,
      fighter2ID,
      winnerID,
      round,
      minute,
      seconds,
      finishID,
      refereeID,
      eventID,
      miniEventID,
    },
    { new: true }
  );
  return res.status(StatusCodes.CREATED).json({ fight });
};

const deleteFight = async (req, res) => {
  const { id } = req.params;
  const fight = await Fight.findById(id);
  if (!fight) {
    throw new NotFoundError('Fight not found!');
  }
  await fight.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'Fight deleted' });
};

module.exports = {
  getAllFights,
  getOneFight,
  createFight,
  updateFight,
  deleteFight,
  getAllFightsByFighterId,
};
