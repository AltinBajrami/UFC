const mongoose = require('mongoose');

const ReferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide refer name '],
    minlength: 3,
    maxlength: 50,
  },
  age: {
    type: Number,
    min: 40,
    max: 65,
    required: [true, 'Please provide age'],
  },
  referedEvents: {
    type: Number,
    min: 0,
    default: 0,
  },
  homeTown: {
    type: String,
    required: [true, 'Please provide home town'],
    minlength: 3,
    maxlength: 50,
  },
});

module.exports = mongoose.model('Refer', ReferSchema);
