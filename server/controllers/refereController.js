const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Refer = require('../models/Refer');

const getAll = async (req, res) => {
  const refers = await Refer.find({});
  return res.status(StatusCodes.OK).json({ refers });
};

const createRefer = async (req, res) => {
  const { referedEvents, age, name, homeTown } = req.body;
  if (!name || !age || !homeTown) {
    throw new BadRequestError('Please provide name,age and homeTown');
  }

  const refer = await Refer.create({ age, name, referedEvents, homeTown });
  return res.status(StatusCodes.CREATED).json({ refer });
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const refer = await Refer.findById(id);
  if (!refer) {
    throw new NotFoundError('refer not found!');
  }
  return res.status(StatusCodes.OK).json({ refer });
};

const updateRefer = async (req, res) => {
  const { id } = req.params;

  const { referedEvents, age, name, homeTown } = req.body;
  if (!name || !age) {
    throw new BadRequestError('Please provide name,homeTown and age');
  }

  const refer = await Refer.findById(id);

  if (!refer) {
    throw new NotFoundError('refer not found!');
  }
  refer.age = age;
  refer.referedEvents = referedEvents;
  refer.name = name;
  refer.homeTown = homeTown;
  await refer.save();
  return res.status(StatusCodes.OK).json({ refer });
};

const deleteRefer = async (req, res) => {
  const { id } = req.params;
  const refer = await Refer.findById(id);
  if (!refer) {
    throw new NotFoundError('refer not found!');
  }
  await refer.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'deleted', refer });
};

module.exports = {
  getAll,
  getOne,
  createRefer,
  updateRefer,
  deleteRefer,
};
