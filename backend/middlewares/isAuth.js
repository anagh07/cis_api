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

exports.matchAdminKey = (req, res, next) => {
  const { admin_key } = req.body;
  if (admin_key != process.env.CIS_ADMIN_KEY)
    return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
  next();
};
