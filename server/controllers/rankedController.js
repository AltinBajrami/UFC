const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Ranked = require('../models/Ranked');
const Fighters = require('../models/Fighter');

const getAllRanked = async (req, res) => {
  try {
    const ranked = await Ranked.find({})
      .populate('weightClass', 'className')
      .populate('champion', 'fighterName nickName image1')
      .populate(
        'rank1 rank2 rank3 rank4 rank5 rank6 rank7 rank8 rank9 rank10',
        'fighterName nickName'
      )
      .sort({ weightClass: 1 })
      .exec();

    return res.status(StatusCodes.OK).json({ ranked });
  } catch (error) {
    console.error('Error fetching ranked fighters:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
};

const getOneRanked = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the ranked entry by ID and populate the related fields
    const ranked = await Ranked.findById(id)
      .populate('weightClass', 'className')
      .populate('champion', 'fighterName nickName')
      .populate(
        'rank1 rank2 rank3 rank4 rank5 rank6 rank7 rank8 rank9 rank10',
        'fighterName nickName'
      )
      .exec();

    if (!ranked) {
      throw new NotFoundError('Ranked entry not found!');
    }

    return res.status(StatusCodes.OK).json({ ranked });
  } catch (error) {
    console.error('Error fetching ranked fighter:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
};

const createRanked = async (req, res) => {
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
  if (!weightClass || !champion) {
    throw new BadRequestError('Please provide weight class and champion');
  }

  const rankedExists = await Ranked.findOne({ weightClass });
  if (rankedExists) {
    throw new BadRequestError(
      'Ranked list already exists for this weight class'
    );
  }

  const doesChampionExist = await Fighters.findById(champion);

  if (!doesChampionExist) {
    throw new BadRequestError('Provide a champion to create ranked list');
  }

  // Create the ranked entry
  const newRanked = await Ranked.create({
    weightClass,
    champion,
    rank1: rank1 ? rank1 : null,
    rank2: rank2 ? rank2 : null,
    rank3: rank3 ? rank3 : null,
    rank4: rank4 ? rank4 : null,
    rank5: rank5 ? rank5 : null,
    rank6: rank6 ? rank6 : null,
    rank7: rank7 ? rank7 : null,
    rank8: rank8 ? rank8 : null,
    rank9: rank9 ? rank9 : null,
    rank10: rank10 ? rank10 : null,
  });
  return res.status(StatusCodes.CREATED).json({ newRanked });
};

const updateRanked = async (req, res) => {
  const { id } = req.params;
  const {
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

  // Find the ranked entry by ID
  let ranked = await Ranked.findById(id);
  if (!ranked) {
    throw new NotFoundError('Ranked entry not found!');
  }

  // Update the ranked entry
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
