const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.post('/', authenticateUser, authorizePermissions('admin'), createEvent);
router.get('/', authenticateUser, getAllEvents);
router.get('/:id', authenticateUser, getEventById);
router.patch(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  updateEvent
);
router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  deleteEvent
);

module.exports = router;
