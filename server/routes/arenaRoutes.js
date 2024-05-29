const express = require('express');
const {
  getAllArenas,
  getArena,
  updateArena,
  createArena,
  deleteArena,
} = require('../controllers/arenaController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createArena
);
router.get(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  getAllArenas
);
router.get('/:id', [authenticateUser, authorizePermissions('admin')], getArena);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateArena
);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteArena
);

module.exports = router;
