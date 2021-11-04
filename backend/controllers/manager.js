const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');

exports.registerManager = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if it already exist
  const { first_name, last_name, email, password } = req.body;
  try {
    const existingManager = await Manager.findOne({ where: { email: email } });
    if (existingManager)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    // Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const manager = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };

    // Save to db
    const createdManager = await Manager.create(manager);

    // Sign and return jwt
    const token = await jwt.sign(
      {
        manager: {
          id: createdManager.id,
          email: createdManager.email,
          auth: 'manager',
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getManagerProfile = async (req, res, next) => {
  const { manager } = req;
  try {
    // Get profile from db
    const managerProfile = await Manager.findByPk(manager.id);
    if (!managerProfile)
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
    const { id, first_name, last_name, email } = managerProfile;
    return res.status(200).json({ id, first_name, last_name, email });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};
