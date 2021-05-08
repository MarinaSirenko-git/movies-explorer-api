const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const { SECRET_KEY = 'super-strong-secret' } = process.env;

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
        const err = new Error('Переданы некорректные данные при создании пользователя');
        err.statusCode = 400;
        next(err);
      } else if (e.name === 'MongoError' && e.code === 11000) {
        const err = new Error('Такой email уже зарегистрирован');
        err.statusCode = 409;
        next(err);
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
        message: 'Пользователь авторизован',
      });
    })
    .catch(() => {
      const err = new Error('Пользователь не авторизован');
      err.statusCode = 401;
      next(err);
    });
};

const clearCookie = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    const err = new Error('Jwt не найден в Cookies');
    err.statusCode = 401;
    next(err);
  } else {
    res
      .status(202)
      .clearCookie('jwt', {
        sameSite: 'None',
        secure: true,
      })
      .send({ message: 'Cookies удалены' });
  }
};

const getCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt;
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      } else if (!token) {
        const err = new Error('Jwt не найден в Cookies');
        err.statusCode = 401;
        next(err);
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
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      }
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Переданы некорректные данные при обновлении профиля');
        err.statusCode = 400;
        next(err);
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
