const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

// @route   POST /auth
// @desc    Login as patient, manager, nurse, doctor
// @access  public
router.post(
  '/',
  [
    body('email', 'Invalid email').trim().isEmail().notEmpty(),
    body('password', 'Invalid password').trim().notEmpty(),
  ],
  authController.login
);

module.exports = router;
