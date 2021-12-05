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
    body('password', 'Invalid password').trim().isLength({ min: 6 }),
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

// @route   PUT /manager/approvenurse
// @desc    Approve nurse
// @access  protected: manager
router.put(
  '/approvenurse',
  isAuthManager,
  [body('nurseId', 'Nurse id invalid/missing').trim().notEmpty()],
  managerController.approveNurse
);

// @route   PUT /manager/approvedoctor/:doctorId
// @desc    Approve doctor
// @access  protected: manager
router.put(
  '/approvedoctor',
  isAuthManager,
  [body('doctorId', 'Doctor id invalid/missing').trim().notEmpty()],
  managerController.approveDoctor
);

// @route   DELETE /manager/nurse
// @desc    Remove a nurse
// @access  protected: manager
router.delete(
  '/nurse',
  isAuthManager,
  [body('email', 'Invalid/empty email').trim().isEmail()],
  managerController.removeNurse
);

// @route   GET /manager/nurselist
// @desc    Retrieve list of all nurses
// @access  protected: manager
router.get('/nurselist', isAuthManager, managerController.nurseList);

// @route   POST /manager/doctor
// @desc    Register new doctor
// @access  protected: manager
router.post(
  '/doctor',
  isAuthManager,
  [
    body('first_name', 'Invalid/empty first name').trim().notEmpty(),
    body('last_name', 'Invalid/empty last name').trim().notEmpty(),
    body('email', 'Invalid/empty email').trim().isEmail(),
    body('dob', 'Invalid/empty dob').trim().notEmpty(),
    body('password', 'Invalid/empty password').trim().isLength({ min: 6 }),
    body('registration_number', 'Invalid/empty registration_number').trim().notEmpty(),
  ],
  managerController.registerDoctor
);

// @route   DELETE /manager/doctor
// @desc    Remove a doctor
// @access  protected: manager
router.delete(
  '/doctor',
  isAuthManager,
  [body('email', 'Invalid/empty email').trim().isEmail()],
  managerController.removeDoctor
);

// @route   GET /manager/doctorlist
// @desc    Retrieve list of all doctors
// @access  protected: manager
router.get('/doctorlist', isAuthManager, managerController.doctorList);

// @route   POST /manager/patient
// @desc    Register new patient
// @access  protected: manager
router.post(
  '/patient',
  isAuthManager,
  [
    body('first_name', 'Invalid/empty first name').trim().notEmpty(),
    body('last_name', 'Invalid/empty last name').trim().notEmpty(),
    body('email', 'Invalid/empty email').trim().isEmail(),
    body('dob', 'Invalid/empty dob').trim().notEmpty(),
    body('password', 'Invalid/empty password').trim().isLength({ min: 6 }),
  ],
  managerController.registerPatient
);

// @route   DELETE /manager/patient
// @desc    Remove a patient
// @access  protected: manager
router.delete(
  '/patient',
  isAuthManager,
  body('email', 'Invalid/empty email').trim().isEmail(),
  managerController.removePatient
);

// @route   GET /manager/patientlist
// @desc    Retrieve list of all patients
// @access  protected: manager
router.get('/patientlist', isAuthManager, managerController.patientList);

// @route   GET /manager/report
// @desc    Generate report
// @access  protected: manager
router.get('/report', isAuthManager, managerController.generateReport);

// @route   GET /manager/report/download/:filename
// @desc    Generate report
// @access  protected: manager
router.get('/report/download/:filename', managerController.downloadReport);

module.exports = router;
