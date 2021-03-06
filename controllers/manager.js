const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { stringify } = require('csv-stringify/sync');
const fs = require('fs');
const Manager = require('../models/Manager');
const Nurse = require('../models/Nurse');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const SA = require('../models/SelfAssessment');
const SelfAssessment = require('../models/SelfAssessment');

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
    if (!nurse) return res.status(404).json({ errors: [{ msg: 'Nurse not found' }] });
    const appointments = await Appointment.findAll({ where: { nurseId: nurse.id } });
    appointments.forEach(async (appointment) => {
      let selfass = await SA.findByPk(appointment.saId);
      selfass.nurseReviewed = false;
      await selfass.save();
    });
    await nurse.destroy();
    return res.status(200).json({ msg: 'Deleted successfully' });
  } catch (error) {
    console.log(error);
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
        rejected: nurse.rejected,
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
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.removeDoctor = async (req, res, next) => {
  const { email } = req.body;
  try {
    const doctor = await Doctor.findOne({ where: { email } });
    const appointments = await Appointment.findAll({ where: { doctorId: doctor.id } });
    appointments.forEach(async (appointment) => {
      let selfass = await SA.findByPk(appointment.saId);
      selfass.nurseReviewed = false;
      await selfass.save();
    });
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
        rejected: doctor.rejected,
      };
    });
    return res.status(200).json({ doctorList });
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

exports.registerPatient = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if it already exist
  const { first_name, last_name, email, password, dob, address, phone } = req.body;
  try {
    const existingPatient = await Patient.findOne({ where: { email: email } });
    if (existingPatient)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    // Encrypt password with bcrypt
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const patient = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      dob,
      address,
      phone,
    };

    // Save to db
    const createdPatient = await Patient.create(patient);

    // Sign and return jwt
    const token = await jwt.sign(
      {
        patient: {
          id: createdPatient.id,
          email: createdPatient.email,
          auth: 'patient',
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

exports.removePatient = async (req, res, next) => {
  const { email } = req.body;
  try {
    const patient = await Patient.findOne({ where: { email } });
    await patient.destroy();
    return res.status(200).json({ msg: 'Deleted successfully' });
  } catch (error) {
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
    return res.status(500).send('Server error');
  }
};

exports.approveNurse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { nurseId, approval } = req.body;
    const nurse = await Nurse.findByPk(nurseId);
    if (!nurse) return res.status(400).json({ errors: [{ msg: 'Nurse not found' }] });
    if (approval) await nurse.update({ verified: true, rejected: false });
    else await nurse.update({ verified: false, rejected: true });
    await nurse.save();
    const updatedNurse = await Nurse.findByPk(nurseId);
    return res.status(200).json({ msg: 'Nurse approved', nurse: updatedNurse });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.approveDoctor = async (req, res, next) => {
  try {
    const { doctorId, approval } = req.body;
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) return res.status(400).json({ errors: [{ msg: 'doctor not found' }] });
    if (approval) await doctor.update({ verified: true, rejected: false });
    else await doctor.update({ verified: false, rejected: true });
    await doctor.save();
    const updatedDoctor = await Doctor.findByPk(doctorId);
    return res.status(200).json({ msg: 'Doctor approved', Doctor: updatedDoctor });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

// @route   GET /manager/report
// @desc    Generate report
exports.generateReport = async (req, res, next) => {
  try {
    let patients = await Patient.findAll({ attributes: { exclude: ['password'] } });
    let nurses = await Nurse.findAll({ attributes: { exclude: ['password'] } });
    let doctors = await Doctor.findAll({ attributes: { exclude: ['password'] } });
    let appointments = await Appointment.findAll();
    let selfAssessments = await SA.findAll();
    // Write patients csv
    const dataFolder = path.normalize(__dirname + '/data');
    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder);
    }
    const patientPath = path.join(__dirname, 'data', 'patients.csv');
    const nursePath = path.join(__dirname, 'data', 'nurses.csv');
    const doctorPath = path.join(__dirname, 'data', 'doctors.csv');
    const appointmentPath = path.join(__dirname, 'data', 'appointments.csv');
    const saPath = path.join(__dirname, 'data', 'sa.csv');
    let output = stringify(patients, {
      header: true,
      columns: [
        'id',
        'first_name',
        'last_name',
        'dob',
        'email',
        'address',
        'phone',
        'createdAt',
      ],
    });
    fs.writeFile(patientPath, output, (err) => {
      if (err) console.log(err);
    });
    // Write nurses csv
    output = stringify(nurses, {
      header: true,
      columns: [
        'id',
        'first_name',
        'last_name',
        'dob',
        'email',
        'address',
        'phone',
        'registration_number',
        'verified',
        'createdAt',
      ],
    });
    fs.writeFile(nursePath, output, (err) => {
      if (err) console.log(err);
    });
    // Write doctors csv
    output = stringify(doctors, {
      header: true,
      columns: [
        'id',
        'first_name',
        'last_name',
        'dob',
        'email',
        'address',
        'phone',
        'registration_number',
        'verified',
        'createdAt',
      ],
    });
    fs.writeFile(doctorPath, output, (err) => {
      if (err) console.log(err);
    });
    // Write appointments csv
    output = stringify(appointments, {
      header: true,
      columns: [
        'id',
        'datetime',
        'location',
        'note',
        'patientId',
        'nurseId',
        'doctorId',
        'saId',
        'createdAt',
      ],
    });
    fs.writeFile(appointmentPath, output, (err) => {
      if (err) console.log(err);
    });
    // Write self assessments csv
    output = stringify(selfAssessments, {
      header: true,
      columns: [
        'id',
        'PatientId',
        'q1',
        'a1',
        'q2',
        'a2',
        'q3',
        'a3',
        'q4',
        'a4',
        'q5',
        'a5',
        'q6',
        'a6',
        'q7',
        'a7',
        'nurseReviewed',
        'nurseComment',
        'rejected',
        'createdAt',
      ],
    });
    fs.writeFile(saPath, output, (err) => {
      if (err) console.log(err);
    });

    res.status(200).json({
      statistics: {
        patients: patients.length,
        nurses: nurses.length,
        doctors: doctors.length,
        selfAssessments: selfAssessments.length,
        appointments: appointments.length,
      },
      paths: {
        patients: patientPath,
        nurses: nursePath,
        doctors: doctorPath,
        appointments: appointmentPath,
        selfAssessments: saPath,
      },
      urls: {
        patients: path.basename(patientPath),
        nurses: path.basename(nursePath),
        doctors: path.basename(doctorPath),
        appointments: path.basename(appointmentPath),
        selfAssessments: path.basename(saPath),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /manager/report/download/:filename
// @desc    Generate report
exports.downloadReport = async (req, res, next) => {
  const { filename } = req.params;
  const fpath = path.join(__dirname, 'data', filename);
  try {
    switch (filename) {
      case 'patients.csv':
      case 'doctors.csv':
      case 'nurses.csv':
      case 'appointments.csv':
      case 'sa.csv':
        res.download(fpath);
        break;

      default:
        res.status(404).json({ errors: [{ msg: 'File not found' }] });
        break;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   PUT /manager/report/sa
// @desc    Get self assessments in duration
exports.selfAssessmentDuration = async (req, res, next) => {
  const { from, to } = req.body;
  let fromUTC = new Date(from);
  let toUTC = new Date(to);

  try {
    let sas = await SelfAssessment.findAll();
    let filteredSas = sas.filter((sa) => {
      if (
        Number(sa.createdAt) <= Number(toUTC) &&
        Number(sa.createdAt >= Number(fromUTC))
      ) {
        return true;
      }
    });

    const totalSasCount = filteredSas.length;
    let rejectedSasCount = 0;
    let pendingSasCount = 0;

    filteredSas.map((sa) => {
      if (sa.rejected) rejectedSasCount++;
      if (!sa.rejected) pendingSasCount++;
    });

    res.status(200).json({
      selfAssessments: filteredSas,
      totalSasCount,
      rejectedSasCount,
      pendingSasCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   PUT /manager/report/appointments
// @desc    Get self appointments in duration
exports.appointmentsInDuration = async (req, res, next) => {
  const { from, to } = req.body;
  let fromUTC = new Date(from);
  let toUTC = new Date(to);

  try {
    let app = await Appointment.findAll();
    let filteredApp = app.filter((app) => {
      if (
        Number(app.createdAt) <= Number(toUTC) &&
        Number(app.createdAt >= Number(fromUTC))
      ) {
        return true;
      }
    });

    const totalAppCount = filteredApp.length;

    res.status(200).json({
      appointments: filteredApp,
      totalAppCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
