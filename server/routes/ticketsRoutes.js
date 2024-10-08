const express = require('express');

const {
  createTicketsOrder,
  ticketsSuccess,
  getAllTicketsOrders,
  ticketsFailedToPay,
  getAllTicketsOrdersFromSingleSeatingLayout,
  downloadTicket,
} = require('../controllers/ticketsController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.get('/', [authenticateUser], getAllTicketsOrders);
router.get(
  '/:eventId/seatingLayout/:id',
  [authenticateUser],
  getAllTicketsOrdersFromSingleSeatingLayout
);
router.post('/', [authenticateUser], createTicketsOrder);
router.post('/success', [authenticateUser], ticketsSuccess);
router.post('/failed', [authenticateUser], ticketsFailedToPay);
router.get('/download/:ticketId', [authenticateUser], downloadTicket);

module.exports = router;
