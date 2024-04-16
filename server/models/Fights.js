const mongoose = require('mongoose');

const FightSchema = new mongoose.Schema({
  fightID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  miniEventID: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  fighter1ID: {
    type: mongoose.Types.ObjectId,
    ref: 'Fighter',
    required: true,
  },
  fighter2ID: {
    type: mongoose.Types.ObjectId,
    ref: 'Fighter',
    required: true,
  },
  winnerID: {
    type: mongoose.Types.ObjectId,
    ref: 'Fighter',
    required: true,
  },
  round: {
    type: Number,
    min: 0,
    required: [true, 'Please provide the number of the round'],
  },
  time: {
    type: String,
    required: [true, 'Please provide the time of the fight'],
    minlength: 3,
    maxlength: 50,
  },
  finishID: {
    type: mongoose.Types.ObjectId,
    ref: 'finishs',
    required: true,
  },
  refereeID: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
});

const FightModel = mongoose.model('Fight', FightSchema);
module.exports = FightModel;
