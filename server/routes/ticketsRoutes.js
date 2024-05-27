const express = require('express');

const {
  createTicketsOrder,
  ticketsSuccess,
} = require('../controllers/ticketsController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.post('/', [authenticateUser], createTicketsOrder);
router.post('/success', [authenticateUser], ticketsSuccess);

module.exports = router;
