/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { celebrate } = require('celebrate');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const helmet = require('helmet');
const router = require('./routes');
const handleError = require('./errors/handleError');
const corsMiddleware = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const celebrateSignupConfig = require('./utils/configs/celebrateSignupConfig');
const celebrateSigninConfig = require('./utils/configs/celebrateSigninConfig');
const limiterConfig = require('./utils/configs/limiterConfig');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, authorizeUser } = require('./controllers/users');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

const limiter = rateLimit(limiterConfig);

app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.options('*', corsMiddleware);
app.use(corsMiddleware);

mongoose.set('runValidators', true);

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signup', celebrate(celebrateSignupConfig), createUser);
app.post('/signin', celebrate(celebrateSigninConfig), authorizeUser);
app.use(auth);
app.use(router);

app.use('*', (req, res, next) => {
  const err = new Error('Страница не найдена');
  err.statusCode = 404;
  next(err);
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
