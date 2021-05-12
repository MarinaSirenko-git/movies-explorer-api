const { Joi } = require('celebrate');
const { urlRegex, ruNameMovie, enNameMovie } = require('../regex/regexPattern');

const celebrateCreateMovieConfig = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailer: Joi.string().required().regex(urlRegex),
    thumbnail: Joi.string().required().regex(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(ruNameMovie),
    nameEN: Joi.string().required().regex(enNameMovie),
  }),
};

module.exports = celebrateCreateMovieConfig;
