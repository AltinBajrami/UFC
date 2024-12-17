const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'Please provide event name ',
    ],
    minlength: 3,
    maxlength: 50,
  },
  date: {
    type: Date,
    required: [true, 'Please provide date'],
  },
  venueInformation: String,
  arenaId: {
    type: mongoose.Types.ObjectId,
    ref: 'Arena',
  },
  image: String,
});

module.exports = mongoose.model(
  'Event',
  EventSchema
);
