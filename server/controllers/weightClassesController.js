const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const WeightClass = require('../models/WeightClass');

const getAll = async (req, res) => {
  const weightClasses = await WeightClass.find({});
  return res.status(StatusCodes.OK).json({ weightClasses });
};

const createFinish = async (req, res) => {
  const { className, pound } = req.body;
  if (!className || !pound) {
    throw new BadRequestError('Please provide className and pound');
  }

  const weightClass = await WeightClass.create({ className, pound });
  return res.status(StatusCodes.CREATED).json({ weightClass });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const weightClass = await WeightClass.findById(id);
  if (!weightClass) {
    throw new NotFoundError('weight Class not found!');
  }
  return res.status(StatusCodes.OK).json({ weightClass });
};

const updateWeightClass = async (req, res) => {
  const { id } = req.params;

  const { className, pound } = req.body;
  if (!className || !pound) {
    throw new BadRequestError('Please provide fightType and pound');
  }

  const weightClass = await WeightClass.findById(id);

  if (!weightClass) {
    throw new NotFoundError('Weight Class not found!');
  }
  weightClass.className = className;
  weightClass.pound = pound;
  await weightClass.save();
  return res.status(StatusCodes.OK).json({ weightClass });
};

const deleteWeightClass = async (req, res) => {
  const { id } = req.params;
  const weightClass = await WeightClass.findById(id);
  if (!weightClass) {
    throw new NotFoundError('Weight Class not found!');
  }
  await weightClass.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'deleted' });
};

module.exports = {
  getAll,
  getOne,
  createFinish,
  updateWeightClass,
  deleteWeightClass,
};
