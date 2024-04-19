const mongoose = require("mongoose");

const RankedSchema = new mongoose.Schema({
  weightClass: {
    type: mongoose.Types.ObjectId,
    ref: "weightClasses",
    required: true,
  },
  champion: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank1: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank2: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank3: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank4: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank5: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank6: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank7: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank8: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank9: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
  rank10: {
    type: mongoose.Types.ObjectId,
    ref: "Fighter",
    default: null,
  },
});

const RankedModel = mongoose.model("Ranked", RankedSchema);
module.exports = RankedModel;
