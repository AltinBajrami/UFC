const express = require('express');

const {
  getAll,
  getOne,
  createRefer,
  updateRefer,
  deleteRefer,
} = require('../controllers/refereController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.get('/', [authenticateUser, authorizePermissions('admin')], getAll);
router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createRefer
);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateRefer
);
router.get('/:id', [authenticateUser, authorizePermissions('admin')], getOne);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteRefer
);

module.exports = router;
