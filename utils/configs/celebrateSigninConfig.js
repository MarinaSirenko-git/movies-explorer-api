const { Joi } = require('celebrate');

const celebrateSigninConfig = {
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }),
    password: Joi.string().required(),
  }),
};
module.exports = celebrateSigninConfig;
