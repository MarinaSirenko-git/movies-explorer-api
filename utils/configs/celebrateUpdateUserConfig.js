const { Joi } = require('celebrate');

const celebrateUpdateUserConfig = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru'] } }),
  }),
};
module.exports = celebrateUpdateUserConfig;
