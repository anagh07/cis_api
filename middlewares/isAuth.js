const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

exports.isAuthPatient = async (req, res, next) => {
  const token = req.get('x-auth-token');
  // Check if token present
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token, not logged in' }] });
  }
  // Verify token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (
      verifiedToken.patient.auth != 'patient' &&
      verifiedToken.manager.auth != 'manager'
    )
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    req.patient = verifiedToken.patient;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};

exports.isAuthNurse = async (req, res, next) => {
  const token = req.get('x-auth-token');
  // Check if token present
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token, not logged in' }] });
  }
  // Verify token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (
      verifiedToken.patient.auth != 'nurse' &&
      verifiedToken.manager.auth != 'manager'
    )
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    req.nurse = verifiedToken.nurse;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};

exports.isAuthManager = async (req, res, next) => {
  const token = req.get('x-auth-token');
  // Check if token present
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token, not logged in' }] });
  }
  // Verify token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken.manager.auth != 'manager')
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    req.manager = verifiedToken.manager;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};

exports.isAuthAll = async (req, res, next) => {
  const token = req.get('x-auth-token');
  // Check if token present
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token, not logged in' }] });
  }
  // Verify token
  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken)
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });

    if (verifiedToken.patient) req.user = verifiedToken.patient;
    if (verifiedToken.manager) req.user = verifiedToken.manager;
    if (verifiedToken.nurse) req.user = verifiedToken.nurse;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};

exports.matchAdminKey = (req, res, next) => {
  const { admin_key } = req.body;
  console.log(admin_key);
  if (admin_key != process.env.CIS_ADMIN_KEY)
    return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
  next();
};
