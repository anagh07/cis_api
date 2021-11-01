const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

// @route   POST /auth/patient
// @desc    Login as patient
// @access  public
router.post(
  '/patient',
  [
    body('email', 'Invalid email').trim().isEmail().notEmpty(),
    body('password', 'Invalid password').trim().notEmpty(),
  ],
  authController.loginPatient
);

module.exports = router;
