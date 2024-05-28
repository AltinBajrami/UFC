const { StatusCodes } = require('http-status-codes');
const SeatingLayout = require('../models/SeatingLayout');
const Arena = require('../models/Arena');
const { BadRequestError } = require('../errors');

const createSeatingLayout = async (req, res) => {
  const { sectionName, row, column, arenaId } = req.body;
  if (!sectionName || !row || !column) {
    throw new BadRequestError('Please provide name,row and column');
  }
  const arena = await Arena.findById(arenaId);
  if (!arena) {
    throw new BadRequestError('Please provide a valid arena id');
  }
  const seatingLayout = await SeatingLayout.create({
    sectionName,
    row,
    column,
    arena: arenaId,
  });
  arena.seatingCapacity =
    arena.seatingCapacity + seatingLayout.row * seatingLayout.column;
  await arena.save();
  return res
    .status(StatusCodes.CREATED)
    .json({ msg: 'seating layout created' });
};

const getAllSeatingLayouts = async (req, res) => {
  const seatingLayouts = await SeatingLayout.find({}).populate('arena');
  return res.status(StatusCodes.OK).json({ seatingLayouts });
};

const getSingleSeatingLayout = async (req, res) => {
  const { id } = req.params;
  const seatingLayout = await SeatingLayout.findById(id).populate('arena');
  if (!seatingLayout) {
    throw new BadRequestError('Seating layout not found');
  }
  return res.status(StatusCodes.OK).json({ seatingLayout });
};

const updateSeatingLayout = async (req, res) => {
  const { id } = req.params;
  const { sectionName, row, column, arenaId } = req.body;
  if (!sectionName || !row || !column) {
    throw new BadRequestError('Please provide name,row and column');
  }

  const seatingLayout = await SeatingLayout.findById(id);
  if (!seatingLayout) {
    throw new BadRequestError('Seating layout not found');
  }

  let newArena = await Arena.findById(arenaId);
  if (!newArena) {
    throw new BadRequestError('Please provide a valid arena id');
  }

  const oldArena = await Arena.findById(seatingLayout.arena);
  oldArena.seatingCapacity -= seatingLayout.row * seatingLayout.column;

  if (seatingLayout.arena.equals(newArena._id)) {
    oldArena.seatingCapacity += row * column;
  } else {
    newArena.seatingCapacity += row * column;
    seatingLayout.arena = newArena._id;
  }

  seatingLayout.sectionName = sectionName;
  seatingLayout.row = row;
  seatingLayout.column = column;

  await Promise.all([oldArena.save(), newArena.save(), seatingLayout.save()]);

  return res.status(StatusCodes.OK).json({ msg: 'updated', seatingLayout });
};
const deleteSeatingLayout = async (req, res) => {
  const { id } = req.params;
  const seatingLayout = await SeatingLayout.findById(id);
  if (!seatingLayout) {
    throw new BadRequestError('Seating layout not found');
  }
  const arena = await Arena.findById(seatingLayout.arena);
  arena.seatingCapacity -= seatingLayout.row * seatingLayout.column;
  await Promise.all([arena.save(), seatingLayout.deleteOne()]);

  return res.status(StatusCodes.OK).json({ msg: 'deleted seating layout' });
};

module.exports = {
  createSeatingLayout,
  getAllSeatingLayouts,
  getSingleSeatingLayout,
  updateSeatingLayout,
  deleteSeatingLayout,
};
