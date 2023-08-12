const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Требуется авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};
