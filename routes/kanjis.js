const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const {
  createKanji,
  deleteKanji,
  getAllKanjis,
  updateKanji,
  getKanji,
  showStats,
} = require('../controllers/kanjis');

router.route('/').post(testUser, createKanji).get(getAllKanjis);
// router.route('/stats').get(showStats);

router
  .route('/:id')
  .get(getKanji)
  .delete(testUser, deleteKanji)
  .patch(testUser, updateKanji);

module.exports = router;
