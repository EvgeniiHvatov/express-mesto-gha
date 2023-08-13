const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

const validateUrl = (url) => {
  if (isUrl(url)) return url;
  throw new BadRequestError('Невалидный URL');
};

const validateSignUp = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      avatar: Joi.string()
        .custom(validateUrl),
      password: Joi.string()
        .required(),
    }),
});

module.exports = {
  // validateUserId,
  validateSignUp,
  // validateSignIn,
  // validateUpdateProfile,
  // validateUpdateAvatar,
  // validateCardCreation,
  // validateCardId,
};
