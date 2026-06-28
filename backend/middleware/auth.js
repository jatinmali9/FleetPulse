const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  const isHtmlRequest = req.accepts(['html', 'json']) === 'html' || req.path.endsWith('.html');

  const handleUnauthorized = () => {
    if (isHtmlRequest) {
      return res.redirect('/sign-in.html');
    }
    return res.status(401).json({ message: 'Not authorized, token missing' });
  };

  if (!token) return handleUnauthorized();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error(err);
    if (isHtmlRequest) {
      return res.redirect('/sign-in.html');
    }
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role ${req.user.role} not authorized` });
    }
    next();
  };
};
