const express = require('express');
const router = express.Router();
const {
  getAllRanked,
  getOneRanked,
  createRanked,
  updateRanked,
  deleteRanked,
} = require('../controllers/rankedController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

// Admin-only routes for ranked entries
router.get(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  getAllRanked
);
router.get(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  getOneRanked
);
router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createRanked
);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateRanked
);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteRanked
);

module.exports = router;
