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
} = require('../controllers/userController');

const router = express.Router();

router.get('/', [authenticateUser, authorizePermissions('admin')], getAllUsers);
router.get('/showMe', [authenticateUser], showMe);
router.patch('/updatePassword', [authenticateUser], updatePassword);
router.patch('/updateUser', [authenticateUser], updateUser);
router.get('/:id', [authenticateUser], getUser);

module.exports = router;
