const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../utils/configs/envConfig');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    const err = new Error('Jwt не найден в Cookie. Необходима авторизация');
    err.statusCode = 401;
    next(err);
  }
  let payload;
  if (token) {
    try {
      payload = jwt.verify(token, SECRET_KEY, { maxAge: 3600000 * 24 * 7 });
    } catch (e) {
      const err = new Error('Jwt не прошёл верификацию. Необходима авторизация');
      err.statusCode = 401;
      next(err);
    }
  }
  req.user = payload;
  next();
};
