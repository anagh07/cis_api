const express = require('express');
const { body } = require('express-validator');
const nurseController = require('../controllers/nurse');
const patientController = require('../controllers/patient');
const { isAuthNurse, isAuthAll } = require('../middlewares/isAuth');
const router = express.Router();

// @route   POST /nurse
// @desc    Register new nurse
// @access  public
router.post(
  '/',
  [
    body('first_name', 'Invalid/empty first name').trim().notEmpty(),
    body('last_name', 'Invalid/empty last name').trim().notEmpty(),
    body('email', 'Invalid/empty email').trim().isEmail(),
    body('dob', 'Invalid/empty dob').trim().notEmpty(),
    body('password', 'Invalid/empty password').trim().isLength({ min: 6 }),
    body('address', 'Invalid/empty address').trim().notEmpty(),
    body('phone', 'Invalid/empty phone').trim().notEmpty(),
    body('registration_number', 'Invalid/empty registration number').trim().notEmpty(),
  ],
  nurseController.registerNurse
);

// @route   GET /nurse
// @desc    Get nurse profile
// @access  protected
router.get('/', isAuthNurse, nurseController.getNurseProfile);

// @route   GET /nurse/getProfile/:nurseId
// @desc    Get nurse profile by nurse id
// @access  protected
router.get('/getProfile/:nurseId', isAuthAll, nurseController.getNurseProfileById);

// @route   GET /nurse/patientlist
// @desc    Retrieve list of all patients
// @access  protected: manager
router.get('/patientlist', isAuthNurse, patientController.patientList);

// @route   POST /nurse/appointment
// @desc    Create appointment
// @access  protected
router.post(
  '/appointment',
  isAuthNurse,
  [
    body('datetime', 'datetime invalid/missing').trim().notEmpty(),
    body('location', 'location missing').trim().notEmpty(),
  ],
  nurseController.createAppointment
);

// @route   GET /nurse/appointmentslist
// @desc    Get list of appointments for current nurse
// @access  protected
router.get('/appointmentslist', isAuthNurse, nurseController.getAppointmentsList);

// @route   GET /nurse/sawpatients
// @desc    Get list of self assessments and patients pending review
// @access  protected
router.get(
  '/sawpatients',
  isAuthNurse,
  nurseController.getPendingSelfAssessmentsWithPatients
);

// @route   GET /nurse/pendingsa
// @desc    Get list of pending self assessments
// @access  protected
router.get('/pendingsa', isAuthNurse, nurseController.getPendingSelfAssessments);

// @route   GET /nurse/patientsfromidlist
// @desc    Get list of pending self assessments.
// @access  protected
router.post(
  '/patientsfromidlist',
  isAuthNurse,
  body('patientIds', 'Provide list of patient ids').isArray(),
  nurseController.getPatientsFromIdList
);

// @route   POST /nurse/rejectpatient
// @desc    Reject a self assessment test taken by a patient
// @access  protected
router.post(
  '/rejectpatient',
  isAuthNurse,
  body('selfAssessmentId', 'Self assessment id not provided').notEmpty(),
  nurseController.rejectPatient
);

// @route   POST /nurse/sa/comment
// @desc    Comment on a ticket
// @access  protected
router.post(
  '/sa/comment',
  isAuthNurse,
  [
    body('selfAssessmentId', 'selfAssessmentId missing').trim().notEmpty(),
    body('text', 'Comment text missing').trim().notEmpty(),
  ],
  nurseController.addComment
);

// @route   POST /nurse/appointmentWithDoctor
// @desc    Request appointment with doctor
// @access  protected
router.post(
  '/appointmentWithDoctor',
  isAuthNurse,
  [
    body('datetime', 'datetime invalid/missing').trim().notEmpty(),
    body('location', 'location missing').trim().notEmpty(),
    body('patientId', 'patientId missing').trim().notEmpty(),
    body('doctorId', 'doctorId missing').trim().notEmpty(),
  ],
  nurseController.requestDoctorAppointment
);

module.exports = router;
