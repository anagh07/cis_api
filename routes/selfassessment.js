const express = require('express');
const { body } = require('express-validator');
const saController = require('../controllers/selfassessment');
const { isAuthAll } = require('../middlewares/isAuth');
const router = express.Router();

// @route   GET /sa/comments/:id
// @desc    Comments on a ticket
// @access  protected
router.get('/comments/:id', isAuthAll, saController.getSaComments);

// @route   GET /sa/:id
// @desc    Retrieve self assessment
// @access  protected
router.get('/:id', isAuthAll, saController.getSelfAssessmentById);

module.exports = router;
