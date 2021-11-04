const { validationResult } = require('express-validator');
const SelfAssessment = require('../models/SelfAssessment');
const Patient = require('../models/Patient');

exports.submitSelfAssessment = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { a1, a2, a3, a4 } = req.body;
  try {
    const selfAssessment = await SelfAssessment.create({
      a1,
      a2,
      a3,
      a4,
      PatientId: req.patient.id,
    });
    return res.status(200).json(selfAssessment);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getSelfAssessments = async (req, res, next) => {
  const { id } = req.patient;
  try {
    const patient = await Patient.findByPk(id);
    const selfAssessments = await patient.getSelfAssessments();
    return res.status(200).json({ selfAssessments });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};
