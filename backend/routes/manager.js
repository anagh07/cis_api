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

// @route   POST /manager/nurse
// @desc    Register new nurse
// @access  protected: manager
router.post(
  '/nurse',
  isAuthManager,
  [
    body('first_name', 'Invalid/empty first name').trim().notEmpty(),
    body('last_name', 'Invalid/empty last name').trim().notEmpty(),
    body('email', 'Invalid/empty email').trim().isEmail(),
    body('dob', 'Invalid/empty dob').trim().notEmpty(),
    body('password', 'Invalid/empty password').trim().isLength({ min: 6 }),
    body('registration_number', 'Invalid/empty registration_number').trim().notEmpty(),
  ],
  managerController.registerNurse
);

// @route   DELETE /manager/nurse
// @desc    Register new nurse
// @access  protected: manager
router.delete(
  '/nurse',
  isAuthManager,
  [
    body('email', 'Invalid/empty email').trim().isEmail(),
  ],
  managerController.removeNurse
);

// @route   GET /manager/nurselist
// @desc    Retrieve list of all nurses
// @access  protected: manager
router.get('/nurselist', isAuthManager, managerController.nurseList);

module.exports = router;
