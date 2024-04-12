const mongoose = require('mongoose');

const QuotesSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Please provide quote'],
    minlength: 3,
    maxlength: 200,
  },
  fighter: {
    type: mongoose.Types.ObjectId,
    ref: 'Fighter',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quotes', QuotesSchema);
