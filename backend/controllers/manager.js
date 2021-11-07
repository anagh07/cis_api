const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');
const Nurse = require('../models/Nurse');
const Doctor = require('../models/Doctor');

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

exports.registerNurse = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if it already exist
  const {
    first_name,
    last_name,
    email,
    password,
    dob,
    address,
    phone,
    registration_number,
  } = req.body;
  try {
    const existingNurse = await Nurse.findOne({ where: { email: email } });
    if (existingNurse)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    // Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nurse = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      dob,
      address,
      phone,
      registration_number,
      verified: true,
    };

    // Save to db
    const createdNurse = await Nurse.create(nurse);

    // Sign and return jwt
    const token = await jwt.sign(
      {
        nurse: {
          id: createdNurse.id,
          email: createdNurse.email,
          auth: 'nurse',
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

exports.removeNurse = async (req, res, next) => {
  const { email } = req.body;
  try {
    const nurse = await Nurse.findOne({ where: { email } });
    await nurse.destroy();
    return res.status(200).json({ msg: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

exports.nurseList = async (req, res, next) => {
  try {
    const nurseDbList = await Nurse.findAll();
    const nurseList = nurseDbList.map((nurse) => {
      return {
        id: nurse.id,
        first_name: nurse.first_name,
        last_name: nurse.last_name,
        dob: nurse.dob,
        email: nurse.email,
        address: nurse.address,
        phone: nurse.phone,
        registration_number: nurse.registration_number,
        verified: nurse.verified,
      };
    });
    return res.status(200).json({ nurseList });
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

exports.registerDoctor = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if it already exist
  const {
    first_name,
    last_name,
    email,
    password,
    dob,
    address,
    phone,
    registration_number,
  } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ where: { email: email } });
    if (existingDoctor)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    // Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      dob,
      address,
      phone,
      registration_number,
      verified: true,
    };

    // Save to db
    const createdDoctor = await Doctor.create(doctor);

    // Sign and return jwt
    const token = await jwt.sign(
      {
        nurse: {
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
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.removeDoctor = async (req, res, next) => {
  const { email } = req.body;
  try {
    const doctor = await Doctor.findOne({ where: { email } });
    await doctor.destroy();
    return res.status(200).json({ msg: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

exports.doctorList = async (req, res, next) => {
  try {
    const doctorDbList = await Doctor.findAll();
    const doctorList = doctorDbList.map((doctor) => {
      return {
        id: doctor.id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        dob: doctor.dob,
        email: doctor.email,
        address: doctor.address,
        phone: doctor.phone,
        registration_number: doctor.registration_number,
        verified: doctor.verified,
      };
    });
    return res.status(200).json({ doctorList });
  } catch (error) {
    return res.status(500).send('Server error');
  }
};
