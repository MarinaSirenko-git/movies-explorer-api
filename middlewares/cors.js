const cors = require('cors');
const ForbiddenError = require('../errors/forbidden-error');
const { ALLOWED_ORIGINS } = require('../utils/configs/envConfig');

const corsOptions = {
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new ForbiddenError('Доступ к ресурсу запрещён'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = cors(corsOptions);
