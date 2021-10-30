const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const db = require('../db/dbconnect');

exports.registerPatient = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if patient already exists
  const { first_name, last_name, email, dob, password } = req.body;
  try {
    const existing_patient = await db.query('SELECT * FROM patient WHERE email=$1', [
      email,
    ]);
    if (existing_patient.rows.length != 0) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }

  // Encrypt password
  // Encrypt password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save user
  try {
    const patientSaved = await db.query(
      'INSERT INTO patient (first_name, last_name, dob, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, dob, email, password]
    );
    res.status(200).json(patientSaved.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }

  // Return jwt
};
