const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Fighter = require('../models/Fighter');
const WeightClass = require('../models/WeightClass');
const path = require('path');

const getAll = async (req, res) => {
  const fighters = await Fighter.find({}).populate('weightClass');
  return res.status(StatusCodes.OK).json({ fighters });
};

const createFighter = async (req, res) => {
  const {
    fighterName,
    nickName,
    country,
    gender,
    fightingStyle,
    status,
    reach,
    legReach,
    win,
    draw,
    lose,
    homeTown,
    weightClass,
  } = req.body;

  // Check if weightClass exists
  const weightClassSchema = await WeightClass.findById(weightClass);
  if (!weightClassSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide a valid weight class ID' });
  }

  // Check if file was uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'No files were uploaded' });
  }

  // Validate file size
  const fighterImage = req.files.fighterImage;
  const maxSize = 1024 * 1024; // 1MB
  if (fighterImage.size > maxSize) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please upload an image smaller than 1MB' });
  }

  // Move uploaded file to destination
  const imagePath = path.join(
    __dirname,
    '../public/uploads/fighters/',
    fighterImage.name
  );
  await fighterImage.mv(imagePath);

  // Create fighter record
  const image = `/uploads/fighters/${fighterImage.name}`;
  const newFighter = await Fighter.create({
    fighterName,
    fightingStyle,
    nickName,
    reach,
    country,
    gender,
    win,
    lose,
    draw,
    homeTown,
    status,
    legReach,
    image,
    weightClass,
  });

  // Return success response
  return res.status(StatusCodes.CREATED).json({ fighter: newFighter });
};

const getSingleFighter = async (req, res) => {
  const { id } = req.params;
  const fighter = await Fighter.findById(id).populate('weightClass');
  if (!fighter) {
    throw new NotFoundError('fighter not found!');
  }
  return res.status(StatusCodes.OK).json({ fighter });
};

const updateFighter = async (req, res) => {
  const { id } = req.params;
  const {
    fighterName,
    nickName,
    country,
    gender,
    fightingStyle,
    status,
    reach,
    legReach,
    homeTown,
    weightClass,
  } = req.body;
  const weightClassSchema = await WeightClass.findById(weightClass);
  if (!weightClassSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide a valid weight class ID' });
  }

  const fighter = await Fighter.findById(id);
  let image;

  if (req.files && Object.keys(req.files).length !== 0) {
    const fighterImage = req.files.fighterImage;
    const maxSize = 1024 * 1024;
    if (fighterImage.size > maxSize) {
      throw new CustomError.BadRequestError('Please upload image smaller 1MB');
    }
    const imagePath = path.join(
      __dirname,
      '../public/uploads/fighters/' + `${fighterImage.name}`
    );

    await fighterImage.mv(imagePath);
    image = `/uploads/fighters/${fighterImage.name}`;
    fighter.image = image;
  }

  if (!fighter) {
    throw new NotFoundError('fighter not found!');
  }
  fighter.fighterName = fighterName;
  fighter.nickName = nickName;
  fighter.country = country;
  fighter.reach = reach;
  fighter.homeTown = homeTown;
  fighter.legReach = legReach;
  fighter.gender = gender;
  fighter.fightingStyle = fightingStyle;
  fighter.status = status;
  fighter.weightClass = weightClassSchema._id;
  await fighter.save();
  return res.status(StatusCodes.OK).json({ fighter });
};

const updateFighterRecord = async (req, res) => {
  const { id } = req.params;
  const { win, lose, draw } = req.body;
  const fighter = await Fighter.findById(id);

  if (!fighter) {
    throw new NotFoundError('fighter not found!');
  }
  fighter.win = win;
  fighter.draw = draw;
  fighter.lose = lose;
  return res.status(StatusCodes.OK).json({ msg: 'record updated' });
};

const deleteFighter = async (req, res) => {
  const { id } = req.params;
  const fighter = await Fighter.findById(id);
  if (!fighter) {
    throw new NotFoundError('fighter not found!');
  }
  await fighter.deleteOne();
  return res.status(StatusCodes.OK).json({ msg: 'deleted' });
};

module.exports = {
  getAll,
  getSingleFighter,
  createFighter,
  updateFighter,
  deleteFighter,
  updateFighterRecord,
};
