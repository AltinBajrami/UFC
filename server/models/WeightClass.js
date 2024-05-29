const mongoose = require('mongoose');

const WeightClassesSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Please provide class name '],
    minlength: 3,
    maxlength: 50,
  },
  pound: {
    type: Number,
    min: 0,
    required: [true, 'Please provide pound'],
  },
});

module.exports = mongoose.model('weightClasses', WeightClassesSchema);
