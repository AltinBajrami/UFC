const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const FightFinish = require('../models/FightFinish');

const getAll = async (req, res) => {
  const fightFinishs = await FightFinish.find({});
  return res.status(StatusCodes.OK).json({ fightFinishs });
};

const createFinish = async (req, res) => {
  const { finishType, description } = req.body;
  if (!finishType || !description) {
    throw new BadRequestError('Please provide fightType and description');
  }

  const fightFinish = await FightFinish.create({ finishType, description });
  return res.status(StatusCodes.CREATED).json({ fightFinish });
};

const getSingleFinish = async (req, res) => {
  const { id } = req.params;
  const fightFinish = await FightFinish.findById(id);
  if (!fightFinish) {
    throw new NotFoundError('fight finish not found!');
  }
  return res.status(StatusCodes.OK).json({ fightFinish });
};

const updateFinish = async (req, res) => {
  const { id } = req.params;
  const { finishType, description } = req.body;
  if (!finishType || !description) {
    throw new BadRequestError('Please provide fightType and description');
  }
  const fightFinish = await FightFinish.findById(id);

  if (!fightFinish) {
    throw new NotFoundError('fight finish not found!');
  }
  fightFinish.finishType = finishType;
  fightFinish.description = description;
  await fightFinish.save();
  return res.status(StatusCodes.OK).json({ fightFinish });
};

const deleteFinish = async (req, res) => {
  const { id } = req.params;
  const fightFinish = await FightFinish.findById(id);
  if (!fightFinish) {
    throw new NotFoundError('fight finish not found!');
  }
  await fightFinish.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'deleted' });
};

module.exports = {
  getAll,
  getSingleFinish,
  createFinish,
  updateFinish,
  deleteFinish,
};
