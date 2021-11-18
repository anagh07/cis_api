const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const resValidationError = require('../utils/resValidationError');

exports.registerPatient = async (req, res, next) => {
  // Check if input data has errors
  resValidationError(req, res, next);

  // Check if patient already exists
  const { first_name, last_name, email, dob, address, phone } = req.body;
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
    first_name,
    last_name,
    email,
    dob,
    address,
    phone,
  };
  try {
    const existingPatient = await Patient.create({
      ...payload,
      password: hashedPassword,
    });
    // res.status(200).json(patient);

    // Return jwt
    const token = await jwt.sign(
      {
        patient: {
          id: existingPatient.id,
          email: existingPatient.email,
          auth: 'patient',
        },
      },
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
    const { id, first_name, last_name, email, dob, address, phone } = patientProfile;
    return res
      .status(200)
      .json({ id, first_name, last_name, email, dob, address, phone });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};
