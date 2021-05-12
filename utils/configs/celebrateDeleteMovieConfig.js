const { Joi } = require('celebrate');

const celebrateDeleteMovieConfig = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
};

module.exports = celebrateDeleteMovieConfig;
