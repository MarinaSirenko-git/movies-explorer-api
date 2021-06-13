const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-req-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauth-error');
const NotFoundError = require('../errors/not-found-error');

const { SECRET_KEY } = require('../utils/configs/envConfig');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (e.name === 'MongoError' && e.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
      } else {
        next(e);
      }
    });
};

const authorizeUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({
        success: 'Пользователь авторизован',
      });
    })
    .catch(() => {
      next(new UnauthorizedError('Неверное имя пользователя или пароль'));
    });
};

const clearCookie = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Jwt не найден в Cookies'));
  } else {
    res
      .status(202)
      .clearCookie('jwt', {
        sameSite: 'None',
        secure: true,
      })
      .send({ success: 'Cookies удалены' });
  }
};

const getCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt;
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else if (!token) {
        next(new UnauthorizedError('Jwt не найден в Cookies'));
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (e.name === 'MongoError' && e.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createUser,
  authorizeUser,
  clearCookie,
  getCurrentUser,
  updateUserProfile,
};
