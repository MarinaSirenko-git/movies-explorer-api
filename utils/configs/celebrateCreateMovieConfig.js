const { Joi } = require('celebrate');
const { enNameMovie } = require('../regex/regexPattern');

const celebrateCreateMovieConfig = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailer: Joi.string().required(),
    thumbnail: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required().regex(enNameMovie),
  }),
};

module.exports = celebrateCreateMovieConfig;
