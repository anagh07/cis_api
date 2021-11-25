const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const isAuthAll = require('../middlewares/isAuth').isAuthAll;

const router = express.Router();

// @route   POST /auth
// @desc    Login as patient, manager, nurse, doctor
// @access  public
/**
 * @swagger
 * components:
 *  schemas:
 *    loginCredentials:
 *      properties:
 *        email:
 *          type: string
 *          description: valid email
 *        password:
 *          type: string
 *          description: password min 6 characters
 *      required:
 *        - email
 *        - password
 *      description: Valid login information as json
 */
/**
 * @swagger
 * /auth:
 *  post:
 *    description: Login to existing account
 *    parameters:
 *      - name: loginCredentials
 *        in: body
 *        required: true
 *        type: object
 *        description: login credentials as json
 *        schema:
 *          $ref: '#/components/schemas/loginCredentials'
 */
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
