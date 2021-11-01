const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

exports.registerPatient = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if patient already exists
  const { first_name, last_name, email, dob } = req.body;
  const passedPassword = req.body.password;
  try {
    const existing_patient = await Patient.findOne({ where: { email: email } });
    if (existing_patient) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(passedPassword, salt);

  // Save user
  const payload = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    dob: dob,
  };
  try {
    const existingPatient = await Patient.create({
      ...payload,
      password: hashedPassword,
    });
    // res.status(200).json(patient);

    // Return jwt
    const token = await jwt.sign(
      { patient: { id: existingPatient.id, email: existingPatient.email } },
      process.env.JWT_SECRET,
      {
        expiresIn: 36000,
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getPatientProfile = async (req, res, next) => {
  const { patient } = req;

  try {
    // Get profile from db
    const patientProfile = await Patient.findByPk(patient.id);
    if (!patientProfile)
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    return res.status(200).json(patientProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};
