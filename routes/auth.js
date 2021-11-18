const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const isAuthAll = require('../middlewares/isAuth').isAuthAll;

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

// @route   GET /auth
// @desc    Get patient, manager, nurse, doctor profile
// @access  protected
router.get('/', isAuthAll, authController.getUser);

module.exports = router;
