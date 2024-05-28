const express = require('express');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getUser,
  showMe,
  updateUser,
  updatePassword,
  deleteUser,
  changeUserRole,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', [authenticateUser, authorizePermissions('admin')], getAllUsers);
router.get('/showMe', [authenticateUser], showMe);
router.patch('/updatePassword', [authenticateUser], updatePassword);
router.patch('/updateUser', [authenticateUser], updateUser);
router.patch(
  '/changeUserRole/:id',
  [authenticateUser, authorizePermissions('admin')],
  changeUserRole
);
router.get('/:id', [authenticateUser], getUser);
router.delete(
  '/:id',
  [authenticateUser, authorizePermissions('admin')],
  deleteUser
);

module.exports = router;
