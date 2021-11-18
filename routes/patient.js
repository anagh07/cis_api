const express = require('express');
const { body } = require('express-validator');
const patientController = require('../controllers/patient');
const selfAssessmentController = require('../controllers/selfassessment');
const isAuthPatient = require('../middlewares/isAuth').isAuthPatient;

const router = express.Router();

// @route   POST /patient
// @desc    Register new patient
// @access  public
router.post(
  '/',
  [
    body('first_name', 'Invalid/empty first name').trim().notEmpty(),
    body('last_name', 'Invalid/empty last name').trim().notEmpty(),
    body('email', 'Invalid/empty email').trim().isEmail(),
    body('dob', 'Invalid/empty dob').trim().notEmpty(),
    body('password', 'Invalid/empty password').trim().isLength({ min: 6 }),
  ],
  patientController.registerPatient
);

// @route   GET /patient
// @desc    Get patient profile
// @access  protected
router.get('/', isAuthPatient, patientController.getPatientProfile);

// @route   POST /patient/selfassessment
// @desc    Submit self assessment form
// @access  protected
router.post(
  '/selfassessment',
  isAuthPatient,
  [
    body('a1', 'Field missing/invalid answer-1').trim().notEmpty().isBoolean(),
    body('a2', 'Field missing/invalid answer-2').trim().isBoolean().notEmpty(),
    body('a3', 'Field missing/invalid answer-3').trim().isBoolean().notEmpty(),
    body('a5', 'Field missing/invalid answer-5').trim().isBoolean().notEmpty(),
    body('a6', 'Field missing/invalid answer-6').trim().isBoolean().notEmpty(),
    body('a7', 'Field missing/invalid answer-7').trim().isBoolean().notEmpty(),
  ],
  selfAssessmentController.submitSelfAssessment
);

// @route   GET /patient/selfassessment
// @desc    Retrieve self assessments
// @access  protected
router.get('/selfassessment', isAuthPatient, selfAssessmentController.getSelfAssessments);

module.exports = router;
