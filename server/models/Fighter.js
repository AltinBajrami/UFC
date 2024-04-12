const mongoose = require('mongoose');

const FighterSchema = new mongoose.Schema({
  homeTown: {
    type: String,
    required: [true, 'Please provide fighter fighting style'],
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
    enum: ['active', 'retired'],
    default: 'active',
  },
  fightingStyle: {
    type: String,
    required: [true, 'Please provide fighter fighting style'],
    minlength: 3,
    maxlength: 50,
  },
  image: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  country: String,
  fighterName: {
    type: String,
    required: [true, 'Please provide fighter name'],
    minlength: 3,
    maxlength: 50,
  },
  nickName: {
    type: String,
    required: [true, 'Please provide fighter nickname'],
    minlength: 3,
    maxlength: 50,
  },
  weightClass: {
    type: mongoose.Types.ObjectId,
    ref: 'weightClasses',
  },
});

const FighterModel = mongoose.model('Fighter', FighterSchema);
module.exports = FighterModel;
