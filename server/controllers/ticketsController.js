const { StatusCodes } = require('http-status-codes');
const Tickets = require('../models/Ticket');
const SeatingLayout = require('../models/SeatingLayout');
const { BadRequestError } = require('../errors');
const Ticket = require('../models/Ticket');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createTicketsOrder = async (req, res) => {
  const {
    eventId: event,
    seatingLayoutId: seatingLayout,
    tickets,
    amount,
  } = req.body;
  const { userId } = req.user;

  const seatingLayoutTemp = await SeatingLayout.findById(
    seatingLayout
  ).populate('arena');
  if (!seatingLayoutTemp) {
    throw new BadRequestError('Provide a valid seatingLayout id');
  }

  const orderItems = tickets.map(({ rowId, columnId, price }) => {
    return { row: rowId, column: columnId, price };
  });

  const lineItems = tickets.map(ticket => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `UFC 300 ${seatingLayoutTemp.arena.name} (${seatingLayoutTemp.sectionName})`,
        description: `Ticket row ${ticket.rowId},column ${ticket.columnId}`,
      },
      unit_amount: Math.round(ticket.price * 100),
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `http://localhost:5173/tickets/success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url:
      'http://localhost:5173/tickets/cancel?sessionId={CHECKOUT_SESSION_ID}',
  });

  const ticketOrder = await Tickets.create({
    userId,
    seatingLayout,
    event,
    amount: tickets[0].price * tickets.length,
    sessionId: session.id,
    orderItems,
  });
  res.status(StatusCodes.CREATED).json({ id: session.id });
};

const ticketsSuccess = async (req, res) => {
  const sessionId = req.body.sessionId;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  console.log('🚀 ~ ticketsSuccess ~ session:', session);

  if (session?.payment_status === 'paid') {
    const ticketsOrder = await Ticket.findOne({ sessionId });
    ticketsOrder.paymentIntentId = session.payment_intent;
    await ticketsOrder.save();
  }

  res.send(`Payment successful`);
};

module.exports = {
  createTicketsOrder,
  ticketsSuccess,
};
