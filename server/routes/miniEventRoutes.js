const express = require('express');
const {
  createMiniEvent,
  deleteMiniEvent,
  updateMiniEvent,
  getAllMiniEvents,
  getMiniEventById,
} = require('../controllers/miniEventController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.post(
  '/',
  authenticateUser,
  authorizePermissions('admin'),
  createMiniEvent
);
router.get('/', authenticateUser, getAllMiniEvents);
router.get('/:id', authenticateUser, getMiniEventById);
router.patch(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  updateMiniEvent
);
router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  deleteMiniEvent
);

module.exports = router;
