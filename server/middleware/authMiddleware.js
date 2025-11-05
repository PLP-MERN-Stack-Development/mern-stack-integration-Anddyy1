const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect private routes
const protect = async (req, res, next) => {
  let token;

  // Get token from Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, block access
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token provided',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(401).json({
      success: false,
      error: 'Not authorized, token failed or expired',
    });
  }
};

module.exports = protect;
