const mongoose = require('mongoose');

const FightSchema = new mongoose.Schema({
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
  },
  round: {
    type: Number,
    min: 1,
    max: 5,
  },
  minute: {
    type: Number,
    min: 0,
    max: 5,
  },
  seconds: {
    type: Number,
    min: 0,
    max: 59,
  },
  finishID: {
    type: mongoose.Types.ObjectId,
    ref: 'finishs',
  },
  miniEventID: Number,
  eventID: Number,
  refereeID: {
    type: mongoose.Types.ObjectId,
    ref: 'Refer',
    default: null,
  },
  weightClassID: {
    type: mongoose.Types.ObjectId,
    ref: 'weightClasses',
    required: true,
  },
});

const FightModel = mongoose.model('Fight', FightSchema);
module.exports = FightModel;
