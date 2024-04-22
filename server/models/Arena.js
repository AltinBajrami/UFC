const mongoose = require('mongoose');

const ArenaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide arena name'],
    minlength: [3, 'Arena name must be at least 3 characters'],
    unique: [true, 'Name is taken'],
  },
  location: {
    type: String,
    required: [true, 'Please provide arena location'],
    minlength: [3, 'Arena location must be at least 3 characters'],
  },
  seatingCapacity: {
    type: Number,
    required: [true, 'Please provide arena seating capacity'],
    min: [300, 'Arena capacity must be at least 300'],
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Arena', ArenaSchema);
