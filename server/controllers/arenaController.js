const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Arena = require('../models/Arena');

const createArena = async (req, res) => {
  const { seatingCapacity, location, name, notes } = req.body;
  if (!seatingCapacity || !location || !name) {
    throw new BadRequestError('Please provide name,location and capacity');
  }
  const arena = await Arena.create({ name, location, seatingCapacity, notes });
  res.status(StatusCodes.OK).json({ msg: 'created arena', arena });
};

const getAllArenas = async (req, res) => {
  const arenas = await Arena.find({});
  res.status(StatusCodes.OK).json({ arenas });
};

const getArena = async (req, res) => {
  const { id } = req.params;
  const arena = await Arena.findById(id);
  if (!arena) {
    throw new NotFoundError('Arena not found');
  }
  res.status(StatusCodes.OK).json({ arena });
};
const updateArena = async (req, res) => {
  const { id } = req.params;
  const { seatingCapacity, location, name } = req.body;

  if (!seatingCapacity || !location || !name) {
    throw new BadRequestError('Please provide name,location and capacity');
  }

  const arena = await Arena.findById(id);
  if (!arena) {
    throw new NotFoundError('Arena not found');
  }

  arena.seatingCapacity = seatingCapacity;
  arena.location = location;
  arena.name = name;
  await arena.save();
  res.status(StatusCodes.OK).json({ arena });
};
const deleteArena = async (req, res) => {
  const { id } = req.params;
  const arena = await Arena.findById(id);
  if (!arena) {
    throw new NotFoundError('Arena not found');
  }
  await arena.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'deleted arena' });
};

module.exports = {
  getAllArenas,
  getArena,
  updateArena,
  createArena,
  deleteArena,
};
