const express = require('express');

const {
  createSeatingLayout,
  getAllSeatingLayouts,
  getSingleSeatingLayout,
  updateSeatingLayout,
  deleteSeatingLayout,
} = require('../controllers/seatingLayoutController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.get(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  getAllSeatingLayouts
);
router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createSeatingLayout
);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateSeatingLayout
);
router.get(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  getSingleSeatingLayout
);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteSeatingLayout
);

module.exports = router;
