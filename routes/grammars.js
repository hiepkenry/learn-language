const express = require('express');
const testUser = require('../middleware/testUser');

const router = express.Router();
const {
  createGrammar,
  deleteGrammar,
  getAllGrammars,
  updateGrammar,
  getGrammar,

} = require('../controllers/grammars');

router.route('/').post(testUser, createGrammar).get(getAllGrammars);


router
  .route('/:id')
  .get(getGrammar)
  .delete(testUser, deleteGrammar)
  .patch(testUser, updateGrammar);

module.exports = router;
