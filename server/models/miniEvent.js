const mongoose = require('mongoose');

const MiniEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide arena name'],
    minlength: [3, 'Mini event name must be at least 3 characters'],
    unique: [true, 'Name is taken'],
  },
});

module.exports = mongoose.model('MiniEvent', MiniEventSchema);
