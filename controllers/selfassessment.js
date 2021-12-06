const { validationResult } = require('express-validator');
const SelfAssessment = require('../models/SelfAssessment');
const Patient = require('../models/Patient');
const Comment = require('../models/Comment');
const Appointment = require('../models/Appointment');

exports.submitSelfAssessment = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Check if user has pending Self Assessment
  const existingSA = await SelfAssessment.findAll({
    where: { PatientId: req.patient.id, rejected: false },
  });
  if (existingSA.length !== 0) {
    const sortedSA = existingSA.sort((sa1, sa2) => {
      let dsa1 = new Date(sa1.updatedAt);
      let dsa2 = new Date(sa2.updatedAt);
      return dsa2 - dsa1;
    });
    if (!sortedSA[0].nurseReviewed) {
      return res.status(403).json({
        errors: [
          { msg: 'Cannot submit, curernt submission pending review with a nurse.' },
        ],
      });
    } else {
      const doctorApp = await Appointment.findOne({
        where: { saId: sortedSA[0].id, nurseId: null, doctorAccepted: null },
      });
      if (doctorApp) {
        return res.status(403).json({
          errors: [
            { msg: 'Cannot submit, curernt submission pending review with a doctor.' },
          ],
        });
      }
    }
  }

  const { a1, a2, a3, a4, a5, a6, a7 } = req.body;
  try {
    const selfAssessment = await SelfAssessment.create({
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      PatientId: req.patient.id,
    });
    return res.status(200).json(selfAssessment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getSelfAssessments = async (req, res, next) => {
  const { id } = req.patient;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) return res.status(400).json({ errors: [{ msg: 'Invalid token' }] });
    const selfAssessments = await patient.getSelfAssessments();
    if (!selfAssessments) {
      return res.status(200).json({ pendingSelfAssessments: [] });
    }
    return res.status(200).json({ selfAssessments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

exports.getSaComments = async (req, res, next) => {
  const saId = req.params.id;
  try {
    const sa = await SelfAssessment.findByPk(saId);
    const comments = await Comment.findAll({ where: { selfAssessmentId: sa.id } });
    return res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /sa/:id
// @desc    Retrieve self assessment
exports.getSelfAssessmentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sa = await SelfAssessment.findByPk(id);
    if (!sa) return res.status(400).json({ errors: [{ msg: 'Invalid token' }] });
    return res.status(200).json(sa);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
