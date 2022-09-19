const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const {
  createVocab,
  deleteVocab,
  getAllVocabs,
  updateVocab,
  getVocab,
  showStats,
} = require('../controllers/vocabs');

router.route('/').post(testUser, createVocab).get(getAllVocabs);
router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(getVocab)
  .delete(testUser, deleteVocab)
  .patch(testUser, updateVocab);

module.exports = router;
