const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @route   POST /doctor
// @desc    Register new doctor
exports.registerDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if doctor already exists
  const {
    first_name,
    last_name,
    email,
    dob,
    address,
    phone,
    registration_number,
    password,
  } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    // Password encryption
    const salt = await bcrypt.genSalt(12);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    // Save doctor to db
    const createdDoctor = await Doctor.create({
      first_name,
      last_name,
      email,
      dob,
      address,
      phone,
      registration_number,
      password: hashedPassowrd,
    });

    // Sign and return token
    const token = await jwt.sign(
      {
        doctor: {
          id: createdDoctor.id,
          email: createdDoctor.email,
          auth: 'doctor',
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /doctor
// @desc    Get doctor profile
exports.getDoctorProfile = async (req, res, next) => {
  const { doctor } = req;
  try {
    const doctorProfile = await Doctor.findByPk(doctor.id);
    if (!doctorProfile)
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    const {
      id,
      first_name,
      last_name,
      email,
      dob,
      address,
      phone,
      registration_number,
      verified,
    } = doctorProfile;
    return res.status(200).json({
      id,
      first_name,
      last_name,
      email,
      phone,
      address,
      dob,
      registration_number,
      verified,
    });
  } catch (error) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getAppointmentsList = async (req, res, next) => {
  const { doctor } = req;
  try {
    let appointmentsList = await Appointment.findAll({
      where: { doctorId: doctor.id, doctorAccepted: true },
    });
    if (!appointmentsList) appointmentsList = [];
    return res.status(200).json({ appointmentsList });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.pendingAppointments = async (req, res, next) => {
  const { doctor } = req;
  try {
    let appointmentsList = await Appointment.findAll({
      where: { doctorId: doctor.id, doctorAccepted: null },
    });
    if (!appointmentsList) appointmentsList = [];
    return res.status(200).json({ appointmentsList });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.acceptRejectAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { appointmentId } = req.params;
  const { accepted } = req.query;
  try {
    let appointment = await Appointment.findByPk(appointmentId);
    if (!appointment)
      return res.status(403).json({ errors: [{ msg: 'Appointment not found' }] });
    appointment.doctorAccepted = accepted;
    await appointment.save();
    appointment = await Appointment.findByPk(appointmentId);
    return res.status(200).json({ msg: 'Success', appointment });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
