const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const Manager = require('../models/Manager');

exports.login = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email } = req.body;
  try {
    // Check if user exists
    const patient = await Patient.findOne({
      where: { email: email },
    });
    if (patient) {
      return loginPatient(req, res, next, patient);
    }
    const manager = await Manager.findOne({
      where: { email },
    });
    if (manager) {
      return loginManager(req, res, next, manager);
    }
    // Implement login for nurse and doctor
    // If none then send error
    return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

const loginPatient = async (req, res, next, patient) => {
  const passedEmail = req.body.email;
  const passedPassword = req.body.password;
  try {
    // Match password
    const passwordMatch = await bcrypt.compare(passedPassword, patient.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // Return jwt
    const token = await jwt.sign(
      {
        patient: {
          id: patient.id,
          email: patient.email,
          auth: 'patient',
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: 36000 }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

const loginManager = async (req, res, next, manager) => {
  const { email, password } = req.body;

  try {
    // Match password
    const passwordMatch = await bcrypt.compare(password, manager.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // Return jwt
    const token = await jwt.sign(
      {
        manager: {
          id: manager.id,
          email: manager.email,
          auth: 'manager',
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: 36000 }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};
