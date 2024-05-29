const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  row: { type: String, required: true },
  column: { type: String, required: true },
  price: { type: Number, required: true },
});

const TicketsOrderLayoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    seatingLayout: {
      type: mongoose.Types.ObjectId,
      ref: 'SeatingLayout',
    },
    event: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, 'provide amount'],
      min: 1,
    },
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    sessionId: {
      type: String,
    },
    orderItems: [SingleOrderItemSchema],
    paymentIntentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('TicketsOrder', TicketsOrderLayoutSchema);
