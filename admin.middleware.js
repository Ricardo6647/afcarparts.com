const { load } = require('../store');

exports.adminRequired = (req, res, next) => {
  const token = req.headers.authorization || '';
  if (!token.startsWith('token-')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = token.replace('token-', '').trim();
  const users = load('users');
  const user = users.find(u => u.id === userId);

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }

  req.user = user;
  next();
};
