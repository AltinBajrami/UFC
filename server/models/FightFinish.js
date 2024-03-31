const mongoose = require('mongoose');

const FinishSchema = new mongoose.Schema({
  finishType: {
    type: String,
    required: [true, 'Please provide finishType '],
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: [true, 'Please provide description '],
    minlength: 3,
    maxlength: 50,
  },
});
const FinishModel = mongoose.model('finishs', FinishSchema);
module.exports = FinishModel;
