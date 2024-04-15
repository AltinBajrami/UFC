const express = require('express');
const router = express.Router();
const {
  getAllFights,
  getOneFight,
  createFight,
  updateFight,
  deleteFight,
} = require('../controllers/fightsContoller');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

// Admin-only routes for fights
router.get(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  getAllFights
);
router.get(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  getOneFight
);
router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createFight
);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateFight
);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteFight
);

module.exports = router;
