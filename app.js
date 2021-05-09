const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const handleError = require('./errors/handleError');
const corsMiddleware = require('./middlewares/cors');
const limiterConfig = require('./utils/configs/limiterConfig');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const limiter = rateLimit(limiterConfig);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.options('*', corsMiddleware);
app.use(corsMiddleware);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

module.exports = app;
