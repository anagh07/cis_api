const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const { validationResult } = require('express-validator');

exports.registerPatient = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

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

exports.patientList = async (req, res, next) => {
  try {
    const patientDbList = await Patient.findAll();
    const patientList = patientDbList.map((patient) => {
      return {
        id: patient.id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        dob: patient.dob,
        email: patient.email,
        address: patient.address,
        phone: patient.phone,
      };
    });
    return res.status(200).json({ patientList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getAppointments = async (req, res, next) => {
  const { patient } = req;
  try {
    const appointments = await Appointment.findAll({ where: { patientId: patient.id } });
    const nurseApp = appointments.filter((appointment) => appointment.nurseId !== null);
    const doctorApp = appointments.filter(
      (appointment) =>
        appointment.doctorId !== null && appointment.doctorAccepted === true
    );
    const finalApp = [...nurseApp, ...doctorApp];
    return res.status(200).json({ appointments: finalApp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.deleteAppointment = async (req, res, next) => {
  const { appointmentId } = req.body;
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    await appointment.destroy();
    res.status(200).json({ msg: 'Successfully deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
