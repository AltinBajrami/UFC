const { StatusCodes } = require('http-status-codes');
const Tickets = require('../models/Ticket');
const SeatingLayout = require('../models/SeatingLayout');
const { BadRequestError } = require('../errors');
const Ticket = require('../models/Ticket');
const path = require('path');
const fs = require('fs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createTicketsOrder = async (req, res) => {
  const {
    eventId: event,
    seatingLayoutId: seatingLayout,
    tickets,
    image,
    name,
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
    name,
    image,
  });
  res.status(StatusCodes.CREATED).json({ id: session.id });
};

const ticketsSuccess = async (req, res) => {
  const sessionId = req.body.sessionId;
  if (!sessionId) {
    throw new BadRequestError('Provide session Id');
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session?.payment_status === 'paid') {
    const ticketsOrder = await Ticket.findOne({ sessionId });
    ticketsOrder.paymentIntentId = session.payment_intent;
    ticketsOrder.status = 'paid';
    await ticketsOrder.save();
  }

  res.send(`Payment successful`);
};

const ticketsFailedToPay = async (req, res) => {
  const sessionId = req.body.sessionId;
  if (!sessionId) {
    throw new BadRequestError('Provide session Id');
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session) {
    const ticketsOrder = await Ticket.findOne({ sessionId });
    await ticketsOrder.deleteOne();
  }

  res.send(`Payment failed`);
};

const getAllTicketsOrders = async (req, res) => {
  const orders = await Tickets.find({ userId: req.user.userId }).populate(
    'seatingLayout'
  );

  return res.status(StatusCodes.OK).json({ orders });
};

const getAllTicketsOrdersFromSingleSeatingLayout = async (req, res) => {
  const { id, eventId } = req.params;
  console.log(req.params);
  const seatingLayoutTemp = await SeatingLayout.findById(id);
  if (!seatingLayoutTemp) {
    throw new BadRequestError('Provide a valid seatingLayout id');
  }

  const orders = await Tickets.find({
    seatingLayout: id,
    event: eventId,
  });

  const occupiedSeats = orders.flatMap(item =>
    item.orderItems.map(({ row, column }) => ({ row, column }))
  );

  return res.status(StatusCodes.OK).json({ occupiedSeats });
};

const downloadTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId).populate('seatingLayout');

    if (!ticket) {
      throw new BadRequestError('Ticket not found');
    }

    const filePath = path.join(
      __dirname,
      '../public',
      `ticket_${ticketId}.txt`
    );
    const fileContent = `
          Ticket Details:
          ---------------
          Event: ${ticket.name}
          Section: ${ticket.seatingLayout.sectionName}
          Amount: ${ticket.amount}$
          Status: ${ticket.status}
          Date of Purchase: ${ticket.createdAt.toDateString()}
          
          Order Items:
          ------------
          ${ticket.orderItems
            .map(
              (item, index) => `
          Item ${index + 1}:
          - Row: ${item.row}
          - Column: ${item.column}
          - Price: ${item.price}$
          `
            )
            .join('\n')}
              `;

    fs.writeFileSync(filePath, fileContent);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ticket_${ticketId}.txt`
    );
    res.setHeader('Content-Type', 'text/plain');

    res.download(filePath, err => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      } else {
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  createTicketsOrder,
  ticketsSuccess,
  getAllTicketsOrders,
  ticketsFailedToPay,
  getAllTicketsOrdersFromSingleSeatingLayout,
  downloadTicket,
};
