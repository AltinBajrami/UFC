const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Fight = require("../models/Fights");

const getAllFights = async (req, res) => {
  const fights = await Fight.find({});
  return res.status(StatusCodes.OK).json({ fights });
};

const getOneFight = async (req, res) => {
  const { id } = req.params;
  const fight = await Fight.findById(id);
  if (!fight) {
    throw new NotFoundError("fight not found!");
  }
  return res.status(StatusCodes.OK).json({ fight });
};

const createFight = async (req, res) => {
  const {
    miniEventID,
    fighter1ID,
    fighter2ID,
    winnerID,
    round,
    time,
    finishID,
    refereeID,
  } = req.body;

  // Check if all required fields are provided
  if (!fighter1ID || !fighter2ID || !winnerID || !round || !time || !finishID) {
    throw new BadRequestError(
      "Please provide all necessary information to create a fight",
    );
  }

  // Create the fight
  const fight = await Fight.create({
    miniEventID: miniEventID || null,
    fighter1ID,
    fighter2ID,
    winnerID,
    round,
    time,
    finishID,
    refereeID: refereeID || null,
  });
  return res.status(StatusCodes.CREATED).json({ fight });
};

const updateFight = async (req, res) => {
  const { id } = req.params;
  const {
    miniEventID,
    fighter1ID,
    fighter2ID,
    winnerID,
    round,
    time,
    finishID,
    refereeID,
  } = req.body;

  // Check if all required fields are provided
  if (!fighter1ID || !fighter2ID || !winnerID || !round || !time || !finishID) {
    throw new BadRequestError(
      "Please provide all necessary information to update a fight",
    );
  }

  // Find the fight by ID
  let fight = await Fight.findById(id);
  if (!fight) {
    throw new NotFoundError("Fight not found!");
  }

  // Update the fight
  fight.fighter1ID = fighter1ID;
  fight.fighter2ID = fighter2ID;
  fight.winnerID = winnerID;
  fight.round = round;
  fight.time = time;
  fight.finishID = finishID;

  // Update optional fields if provided
  if (miniEventID) {
    fight.miniEventID = miniEventID;
  }
  if (refereeID) {
    fight.refereeID = refereeID;
  }

  await fight.save();
  return res.status(StatusCodes.OK).json({ fight });
};

const deleteFight = async (req, res) => {
  const { id } = req.params;
  const fight = await Fight.findById(id);
  if (!fight) {
    throw new NotFoundError("Fight not found!");
  }
  await fight.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: "Fight deleted" });
};

module.exports = {
  getAllFights,
  getOneFight,
  createFight,
  updateFight,
  deleteFight,
};
