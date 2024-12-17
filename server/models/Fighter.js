const mongoose = require('mongoose');
const {
  FIGHTER_FIGHTING_STYLE,
  GENDER,
  STATUS,
} = require('../utils/constants');

const FighterSchema = new mongoose.Schema({
  homeTown: {
    type: String,
    required: [
      true,
      'Please provide fighter fighting style',
    ],
    minlength: 3,
    maxlength: 50,
  },
  win: {
    type: Number,
    min: 0,
    default: 0,
  },
  draw: {
    type: Number,
    min: 0,
    default: 0,
  },
  lose: {
    type: Number,
    min: 0,
    default: 0,
  },
  reach: Number,
  legReach: Number,
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: 'active',
  },
  fightingStyle: {
    type: String,
    enum: Object.values(FIGHTER_FIGHTING_STYLE),
    required: [
      true,
      'Please provide fighter fighting style',
    ],
  },
  image1: {
    type: String,
    default:
      '/uploads/fighters/no-profile-image.png',
  },
  image2: {
    type: String,
    default:
      '/uploads/fighters/no-profile-image.png',
  },
  gender: {
    type: String,
    enum: Object.values(GENDER),
    default: 'male',
  },
  country: String,
  fighterName: {
    type: String,
    required: [
      true,
      'Please provide fighter name',
    ],
    minlength: 3,
    maxlength: 50,
  },
  nickName: {
    type: String,
    maxlength: 50,
  },
  weightClass: {
    type: mongoose.Types.ObjectId,
    ref: 'weightClasses',
  },
  age: {
    type: Number,
    min: 20,
    max: 60,
  },
});

const FighterModel = mongoose.model(
  'Fighter',
  FighterSchema
);
module.exports = FighterModel;
