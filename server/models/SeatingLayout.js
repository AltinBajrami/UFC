const mongoose = require('mongoose');

const SeatingLayoutSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: [true, 'provide section name'],
    minlength: 3,
    unique: true,
  },
  row: {
    type: Number,
    required: [true, 'provide row'],
    min: 1,
  },
  column: {
    type: Number,
    required: [true, 'provide column'],
    min: 1,
  },
  arena: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Arena',
  },
});

module.exports = mongoose.model('SeatingLayout', SeatingLayoutSchema);
