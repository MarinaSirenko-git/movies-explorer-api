const cors = require('cors');
const ForbiddenError = require('../errors/forbidden-error');

const whitelist = ['http://localhost:3000', 'http://sirenko-movies.nomoredomains.club', 'https://sirenko-movies.nomoredomains.club'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new ForbiddenError('Доступ к ресурсу запрещён'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(corsOptions);
