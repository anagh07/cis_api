const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Nurse = require('../models/Nurse');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const SelfAssessment = require('../models/SelfAssessment');
const Comment = require('../models/Comment');
const { findByPk } = require('../models/SelfAssessment');

exports.registerNurse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

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
    const existingNurse = await Nurse.findOne({ where: { email } });
    if (existingNurse)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

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
      { expiresIn: 3600 }
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getNurseProfile = async (req, res, next) => {
  const { nurse } = req;
  try {
    const nurseProfile = await Nurse.findByPk(nurse.id);
    if (!nurseProfile)
      return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { nurse } = req;
  const { datetime, location, note, patientId, saId } = req.body;

  // Check if appointment exists at this time
  const existingAppointments = await Appointment.findAll();
  let flag = false;
  existingAppointments.every((existingAppointment) => {
    if (
      nurse.id === existingAppointment.nurseId ||
      patientId === existingAppointment.patientId
    ) {
      let preferredTime = new Date(datetime);
      let existingTime = new Date(existingAppointment.datetime);
      let difference = Math.abs(
        parseInt(preferredTime.getTime()) - parseInt(existingTime.getTime())
      );
      if (difference < 900000) {
        flag = true;
        return false;
      }
    }
    return true;
  });
  if (flag) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Failed to create appointment: time conflict' }] });
  }

  const datetimeJS = new Date(datetime);
  try {
    const appointment = await Appointment.create({
      datetime: datetimeJS.toUTCString(),
      location,
      note,
      patientId,
      nurseId: nurse.id,
      saId,
    });

    // Mark the self assessment as reviewed
    const sa = await SelfAssessment.findByPk(saId);
    if (sa) {
      sa.nurseReviewed = true;
      await sa.save();
    }
    return res.status(200).json({ appointment });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getAppointmentsList = async (req, res, next) => {
  const { nurse } = req;
  try {
    let appointmentsList = await Appointment.findAll({ where: { nurseId: nurse.id } });
    if (!appointmentsList) appointmentsList = [];
    return res.status(200).json({ appointmentsList });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Server error');
  }
};

exports.getPendingSelfAssessmentsWithPatients = async (req, res, next) => {
  try {
    const pendingSelfAssessments = await Promise.allSettled(
      await SelfAssessment.findAll({ where: { nurseReviewed: false } })
    );
    if (pendingSelfAssessments.length == 0)
      return res.status(200).json({ pendingReview: pendingSelfAssessments });
    const pendingPatients = await Promise.allSettled(
      pendingSelfAssessments.map(async (selfAssessment) => {
        return await Patient.findByPk(selfAssessment.value.PatientId);
      })
    );
    const pendingAssessmentsWithPatients = pendingSelfAssessments.map(
      (assessment, index) => {
        assessment.patient = pendingPatients[index];
        console.log(assessment);
        return assessment;
      }
    );
    return res.status(200).json({ pendingReview: pendingAssessmentsWithPatients });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getPendingSelfAssessments = async (req, res, next) => {
  try {
    const pendingSa = await SelfAssessment.findAll({ where: { nurseReviewed: false } });
    if (!pendingSa || pendingSa.length === 0)
      return res.status(200).json({ pendingSelfAssessments: [] });
    return res.status(200).json({ pendingSelfAssessments: pendingSa });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getPatientsFromIdList = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { patientIds } = req.body;
  try {
    const patients = await Promise.all(
      patientIds.map(async (patientid) => {
        return await Patient.findByPk(patientid, { attributes: { exclude: 'password' } });
      })
    );
    const filteredPatients = patients.filter((patient) => patient !== null);
    return res.status(200).json({ patients: filteredPatients });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ errors: [{ msg: 'Server error' }] });
  }
};

exports.rejectPatient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { selfAssessmentId } = req.body;
  try {
    const selfAssessment = await SelfAssessment.findByPk(selfAssessmentId);
    if (!selfAssessment)
      return res.status(400).json({ errors: [{ msg: 'Self assessment not found' }] });
    await selfAssessment.update({ rejected: true, nurseReviewed: true });
    await selfAssessment.save();
    return res.status(200).json({ msg: 'Successfully rejected' });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ errors: [{ msg: 'Server error' }] });
  }
};

exports.addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { selfAssessmentId, text } = req.body;
  const { nurse } = req;
  try {
    const comment = await Comment.create({ nurseId: nurse.id, selfAssessmentId, text });
    return res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errors: [{ msg: 'Server error' }] });
  }
};

exports.requestDoctorAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { datetime, location, note, patientId, saId, doctorId } = req.body;

  // Check if appointment exists at this time
  const existingAppointments = await Appointment.findAll();
  let flag = false;
  existingAppointments.every((existingAppointment) => {
    if (
      doctorId === existingAppointment.doctorId ||
      patientId === existingAppointment.patientId
    ) {
      let preferredTime = new Date(datetime);
      let existingTime = new Date(existingAppointment.datetime);
      let difference = Math.abs(
        parseInt(preferredTime.getTime()) - parseInt(existingTime.getTime())
      );
      if (difference < 900000) {
        flag = true;
        return false;
      }
    }
    return true;
  });
  if (flag) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Failed to request appointment: time conflict' }] });
  }

  const datetimeJS = new Date(datetime);
  try {
    const appointment = await Appointment.create({
      datetime: datetimeJS.toUTCString(),
      location,
      note,
      patientId,
      doctorId,
      saId,
    });

    // Mark the self assessment as reviewed
    const sa = await SelfAssessment.findByPk(saId);
    if (sa) {
      sa.nurseReviewed = true;
      await sa.save();
    }
    return res.status(200).json({ appointment });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Server error');
  }
};
