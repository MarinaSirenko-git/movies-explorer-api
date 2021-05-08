const { Joi } = require('celebrate');

const celebrateSignupConfig = {
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};
module.exports = celebrateSignupConfig;
