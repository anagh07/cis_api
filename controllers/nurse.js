const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const resValidationError = require('../utils/resValidationError');
const Nurse = require('../models/Nurse');
const Appointment = require('../models/Appointment');

exports.registerNurse = async (req, res, next) => {
  resValidationError(req, res, next);

  // Check if nurse already exists
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
    const existingNurse = await Nurse.findOne({where: {email}});
    if (existingNurse)
      return res.status(400).json({errors: [{msg: 'User already exists'}]});

    // Password encryption
    const salt = await bcrypt.genSalt(12);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    // Save nurse to db
    const createdNurse = await Nurse.create({
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
        nurse: {
          id: createdNurse.id,
          email: createdNurse.email,
          auth: 'nurse',
        },
      },
      process.env.JWT_SECRET,
      {expiresIn: 3600}
    );
    return res.status(200).json({token});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getNurseProfile = async (req, res, next) => {
  const {nurse} = req;
  try {
    const nurseProfile = await Nurse.findByPk(nurse.id);
    if (!nurseProfile)
      return res.status(400).json({errors: [{msg: 'Profile not found'}]});
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
    } = nurseProfile;
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
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.createAppointment = async (req, res, next) => {
  resValidationError(req, res, next);
  const {nurse} = req;
  const {datetime, location, note, patientId} = req.body;
  try {
    const appointment = await Appointment.create({datetime, location, note, patientId, nurseId: nurse.id});
    return res.status(200).json({appointment});
  } catch (e) {
    console.log(e);
    return res.status(500).send('Server error');
  }
}
exports.getAppointmentsList = async (req, res, next) => {
  resValidationError(req, res, next);
  const {nurse} = req;
  try {
    let appointmentsList = await Appointment.findAll({where: {nurseId: nurse.id}});
    if (!appointmentsList) appointmentsList = [];
    return res.status(200).json({appointmentsList});
  } catch (e) {
    console.log(e);
    return res.status(500).send('Server error');
  }
}