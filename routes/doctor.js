const express = require('express');
const { body, query } = require('express-validator');
const { isAuthDoctor, isAuthAll } = require('../middlewares/isAuth');
const doctorController = require('../controllers/doctor');
const patientController = require('../controllers/patient');
const nurseController = require('../controllers/nurse');
const router = express.Router();

// @route   POST /doctor
// @desc    Register new doctor
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
  doctorController.registerDoctor
);

// @route   GET /doctor
// @desc    Get doctor profile
// @access  protected
router.get('/', isAuthDoctor, doctorController.getDoctorProfile);

// @route   GET /doctor/patientlist
// @desc    Retrieve list of all patients
// @access  protected: manager, doctor,
router.get('/patientlist', isAuthDoctor, patientController.patientList);

// @route   GET /doctor/appointments/list
// @desc    Get list of appointments for current doctor
// @access  protected
router.get('/appointments/list', isAuthDoctor, doctorController.getAppointmentsList);

// @route   GET /doctor/appointments/pending
// @desc    Get list of appointments pending confirmation for current doctor
// @access  protected
router.get('/appointments/pending', isAuthDoctor, doctorController.pendingAppointments);

// @route   GET /doctor/patientsfromidlist
// @desc    Get list of patients from array of ids
// @access  protected
router.post(
  '/patientsfromidlist',
  isAuthAll,
  body('patientIds', 'Provide list of patient ids').isArray(),
  nurseController.getPatientsFromIdList
);

// @route   PUT /doctor/appointments/:appId?accepted=false
// @desc    Accept/reject appointment requested by nurse
// @access  protected
router.put(
  '/appointments/:appointmentId',
  isAuthDoctor,
  query('accepted', 'missing query param accepted=true/false').notEmpty(),
  doctorController.acceptRejectAppointment
);

// @route   GET /doctor/doctorlist
// @desc    Get list of doctors
// @access  protected
router.get('/doctorlist', isAuthAll, doctorController.doctorList);

// @route   GET /doctor/appointments/list/:doctorId
// @desc    Get list of appointments for specific doctor
// @access  protected
router.get(
  '/appointments/list/:doctorId',
  isAuthAll,
  doctorController.doctorAppointmentList
);

module.exports = router;
