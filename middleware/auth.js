const jwt = require('jsonwebtoken');

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null)
      return res.status(403).json({ message: 'Invalid token' });

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ message: 'Invalid token' });

      req.user = user;

      next();
    });
  },
};
