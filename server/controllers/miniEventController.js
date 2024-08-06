const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const MiniEvent = require('../models/miniEvent');

const createMiniEvent = async (req, res) => {
  const { name } = req.body;
  if (!name) throw new BadRequestError('name is required');

  const miniEvent = MiniEvent.create({ name });
  res.status(StatusCodes.OK).json({ miniEvent });
};

const getAllMiniEvents = async (req, res) => {
  const miniEvents = await MiniEvent.find({});
  res.status(StatusCodes.OK).json({ miniEvents });
};

const getMiniEventById = async (req, res) => {
  const { id } = req.params;
  const miniEvent = await MiniEvent.findById(id);
  if (!miniEvent) {
    throw new NotFoundError('Mini-event not found');
  }
  res.status(StatusCodes.OK).json({ miniEvent });
};

const updateMiniEvent = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) throw new BadRequestError('name is required');

  const miniEvent = await MiniEvent.findById(id);
  if (!miniEvent) {
    throw new NotFoundError('Mini-event not found');
  }

  miniEvent.name = name;
  await miniEvent.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Mini Event updated successfully' });
};

const deleteMiniEvent = async (req, res) => {
  const { id } = req.params;
  const miniEvent = await MiniEvent.findById(id);
  if (!miniEvent) {
    throw new NotFoundError('Mini-event not found');
  }

  await miniEvent.deleteOne();
  return res
    .status(StatusCodes.OK)
    .json({ msg: 'Mini-event deleted successfully' });
};

module.exports = {
  createMiniEvent,
  getAllMiniEvents,
  getMiniEventById,
  updateMiniEvent,
  deleteMiniEvent,
};
