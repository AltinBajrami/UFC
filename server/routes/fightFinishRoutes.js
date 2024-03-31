const express = require('express');

const {
  getAll,
  getSingleFinish,
  createFinish,
  updateFinish,
  deleteFinish,
} = require('../controllers/fightsfinishController');

const router = express.Router();

router.get('/', getAll);
router.post('/', createFinish);
router.patch('/:id', updateFinish);
router.get('/:id', getSingleFinish);
router.delete('/:id', deleteFinish);

module.exports = router;
