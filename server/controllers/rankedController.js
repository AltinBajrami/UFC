const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Ranked = require('../models/Ranked');

const getAllRanked = async (req, res) => {
  const ranked = await Ranked.find({});
  return res.status(StatusCodes.OK).json({ ranked });
};

const getOneRanked = async (req, res) => {
  const { id } = req.params;

  // Find the ranked entry by ID
  const ranked = await Ranked.findById(id);
  if (!ranked) {
    throw new NotFoundError('Ranked entry not found!');
  }

  return res.status(StatusCodes.OK).json({ ranked });
};

const createRanked = async (req, res) => {
  const {
    rankedID,
    weightClass,
    champion,
    rank1,
    rank2,
    rank3,
    rank4,
    rank5,
    rank6,
    rank7,
    rank8,
    rank9,
    rank10,
  } = req.body;

  // Check if all required fields are provided
  if (!rankedID || !weightClass) {
    throw new BadRequestError(
      'Please provide all necessary information to create a ranked entry'
    );
  }

  // Create the ranked entry
  const newRanked = await Ranked.create({
    rankedID,
    weightClass,
    champion,
    rank1,
    rank2,
    rank3,
    rank4,
    rank5,
    rank6,
    rank7,
    rank8,
    rank9,
    rank10,
  });
  return res.status(StatusCodes.CREATED).json({ newRanked });
};

const updateRanked = async (req, res) => {
  const { id } = req.params;
  const {
    weightClass,
    champion,
    rank1,
    rank2,
    rank3,
    rank4,
    rank5,
    rank6,
    rank7,
    rank8,
    rank9,
    rank10,
  } = req.body;

  // Check if all required fields are provided
  if (!weightClass) {
    throw new BadRequestError(
      'Please provide all necessary information to update a ranked entry'
    );
  }

  // Find the ranked entry by ID
  let ranked = await Ranked.findById(id);
  if (!ranked) {
    throw new NotFoundError('Ranked entry not found!');
  }

  // Update the ranked entry
  ranked.weightClass = weightClass;
  ranked.champion = champion;
  ranked.rank1 = rank1;
  ranked.rank2 = rank2;
  ranked.rank3 = rank3;
  ranked.rank4 = rank4;
  ranked.rank5 = rank5;
  ranked.rank6 = rank6;
  ranked.rank7 = rank7;
  ranked.rank8 = rank8;
  ranked.rank9 = rank9;
  ranked.rank10 = rank10;

  await ranked.save();
  return res.status(StatusCodes.OK).json({ ranked });
};

const deleteRanked = async (req, res) => {
  const { id } = req.params;
  const ranked = await Ranked.findById(id);
  if (!ranked) {
    throw new NotFoundError('Ranked entry not found!');
  }
  await ranked.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'Ranked entry deleted' });
};

module.exports = {
  getAllRanked,
  getOneRanked,
  createRanked,
  updateRanked,
  deleteRanked,
};
