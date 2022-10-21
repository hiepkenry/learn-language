const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const {
  createKanji,
  deleteKanji,
  getAllKanjis,
  updateKanji,
  getKanji,

} = require('../controllers/kanjis');

router.route('/').post(testUser, createKanji).get(getAllKanjis);


router
  .route('/:id')
  .get(getKanji)
  .delete(testUser, deleteKanji)
  .patch(testUser, updateKanji);

module.exports = router;
