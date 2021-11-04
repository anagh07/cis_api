const express = require('express');
const { body } = require('express-validator');
const patientController = require('../controllers/patient');
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

module.exports = router;
