const { Router } = require('express');
const { body } = require('express-validator');
const managerController = require('../controllers/manager');
const matchAdminKey = require('../middlewares/isAuth').matchAdminKey;
const isAuthManager = require('../middlewares/isAuth').isAuthManager;

const router = Router();

// @route   POST /manager
// @desc    Register new manager
// @access  public
router.post(
  '/',
  matchAdminKey,
  [
    body('first_name', 'Invalid first name').trim().notEmpty(),
    body('last_name', 'Invalid last name').trim().notEmpty(),
    body('email', 'Invalid email').trim().notEmpty().isEmail(),
    body('password', 'Invalid password').trim().isLength({ min: 10 }),
  ],
  managerController.registerManager
);

// @route   GET /manager
// @desc    Get manager profile
// @access  protected
router.get('/', isAuthManager, managerController.getManagerProfile);

module.exports = router;
