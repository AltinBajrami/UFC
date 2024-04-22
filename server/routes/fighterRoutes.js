const express = require('express');

const {
  getAll,
  getSingleFighter,
  createFighter,
  updateFighter,
  deleteFighter,
  updateFighterRecord,
} = require('../controllers/fighterController');

const router = express.Router();

router.get('/', getAll);
router.post('/', createFighter);
router.get('/updateRecord/:id', updateFighterRecord);
router.patch('/:id', updateFighter);
router.get('/:id', getSingleFighter);
router.delete('/:id', deleteFighter);

module.exports = router;
