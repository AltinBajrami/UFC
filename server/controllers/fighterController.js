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
    age,
  } = req.body;

  // Check if weightClass exists
  const weightClassSchema = await WeightClass.findById(weightClass);
  if (!weightClassSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide a valid weight class ID' });
  }

  let image1;
  let image2;

  if (req.files && Object.keys(req.files).length !== 0) {
    const fighterImage1 = req.files.fighterImage1;
    const fighterImage2 = req.files.fighterImage2;
    const maxSize = 1024 * 1024;
    if (fighterImage1.size > maxSize) {
      throw new BadRequestError('Please upload first image smaller 1MB');
    }
    if (fighterImage2.size > maxSize) {
      throw new BadRequestError('Please upload second image smaller 1MB');
    }

    const imagePath1 = path.join(
      __dirname,
      `../public/uploads/fighters/` + `${fighterImage1.name}`
    );

    const imagePath2 = path.join(
      __dirname,
      `../public/uploads/fighters/` + `${fighterImage2.name}`
    );

    await fighterImage1.mv(imagePath1);
    await fighterImage2.mv(imagePath2);
    image1 = `/uploads/fighters/${fighterImage1.name}`;
    image2 = `/uploads/fighters/${fighterImage2.name}`;
  }
  // Create fighter record

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
    image1,
    image2,
    weightClass,
    age,
    win,
    draw,
    lose,
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
    age,
  } = req.body;
  const weightClassSchema = await WeightClass.findById(weightClass);
  if (!weightClassSchema) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Please provide a valid weight class ID' });
  }

  const fighter = await Fighter.findById(id);

  if (!fighter) {
    throw new NotFoundError('fighter not found!');
  }

  if (req.files && Object.keys(req.files).length !== 0) {
    const fighterImage1 = req.files?.fighterImage1;
    const fighterImage2 = req.files?.fighterImage2;
    const maxSize = 1024 * 1024;

    if (fighterImage1) {
      if (fighterImage1.size > maxSize) {
        throw new BadRequestError('Please upload first image smaller 1MB');
      }

      const imagePath1 = path.join(
        __dirname,
        `../public/uploads/fighters/` + `${fighterImage1.name}`
      );
      await fighterImage1.mv(imagePath1);
      fighter.image1 = `/uploads/fighters/${fighterImage1.name}`;
    }

    if (fighterImage2) {
      if (fighterImage2.size > maxSize) {
        throw new BadRequestError('Please upload second image smaller 1MB');
      }
      const imagePath2 = path.join(
        __dirname,
        `../public/uploads/fighters/` + `${fighterImage2.name}`
      );

      await fighterImage2.mv(imagePath2);
      fighter.image2 = `/uploads/fighters/${fighterImage2.name}`;
    }
  }

  fighter.fighterName = fighterName;
  fighter.nickName = nickName || '';
  fighter.country = country;
  fighter.reach = reach;
  fighter.homeTown = homeTown;
  fighter.legReach = legReach;
  fighter.gender = gender;
  fighter.fightingStyle = fightingStyle;
  fighter.status = status;
  fighter.weightClass = weightClassSchema._id;
  fighter.age = age;
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
