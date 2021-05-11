const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauth-error');

const { SECRET_KEY } = require('../utils/configs/envConfig');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Jwt не найден в Cookie. Необходима авторизация'));
  }
  let payload;
  if (token) {
    try {
      payload = jwt.verify(token, SECRET_KEY, { maxAge: 3600000 * 24 * 7 });
    } catch (e) {
      next(new UnauthorizedError('Jwt не прошёл верификацию. Необходима авторизация'));
    }
  }
  req.user = payload;
  next();
};
