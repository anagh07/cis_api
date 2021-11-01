const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');

exports.loginPatient = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const passedEmail = req.body.email;
  const passedPassword = req.body.password;
  try {
    // Check if user exists
    const existingPatient = await Patient.findOne({
      where: { email: passedEmail },
    });

    if (!existingPatient) {
      return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
    }

    // Match password
    const passwordMatch = await bcrypt.compare(passedPassword, existingPatient.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Return jwt
    const token = await jwt.sign(
      {
        patient: { id: existingPatient.id, email: existingPatient.email },
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
