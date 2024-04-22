const express = require('express');

const {
  getAll,
  getOne,
  createFinish,
  updateWeightClass,
  deleteWeightClass,
} = require('../controllers/weightClassesController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router.get('/', [authenticateUser, authorizePermissions('admin')], getAll);
router.post(
  '/',
  [authenticateUser, authorizePermissions('admin')],
  createFinish
);
router.patch(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  updateWeightClass
);
router.get('/:id', [authenticateUser, authorizePermissions('admin')], getOne);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteWeightClass
);

module.exports = router;
