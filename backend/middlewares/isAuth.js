const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('x-auth-token');

  // Check if token present
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token, not logged in' }] });
  }

  // Verify token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.patient = verifiedToken.patient;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
};
