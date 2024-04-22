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

router.post('/', createArena);
router.get('/', getAllArenas);
router.get('/:id', getArena);
router.patch('/:id', updateArena);
router.delete('/:id', deleteArena);

module.exports = router;
