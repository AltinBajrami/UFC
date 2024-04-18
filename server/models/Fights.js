const mongoose = require("mongoose");

const FightSchema = new mongoose.Schema({
  fighter1ID: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    required: true,
  },
  fighter2ID: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    required: true,
  },
  winnerID: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    required: true,
  },
  round: {
    type: Number,
    min: 0,
    max: 25,
    required: [true, "Please provide the number of the round"],
  },
  time: {
    type: Number,
    required: [true, "Please provide the time of the fight in minutes max 25"],
    minlength: 0,
    maxlength: 25,
  },
  finishID: {
    type: mongoose.Types.ObjectId,
    ref: "finishs",
    required: true,
  },
  miniEventID: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  refereeID: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
});

const FightModel = mongoose.model("Fight", FightSchema);
module.exports = FightModel;
