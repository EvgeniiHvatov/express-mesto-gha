const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const validateUrl = (url) => {
  const result = validator.isURL(url);
  if (result) {
    return url;
  }
  throw new BadRequestError('Невалидный URL');
};

const isRegex = (avatar) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(avatar)) {
    return avatar;
  }
  throw new BadRequestError('Невалидный URL, не соответствует regex');
};

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(isRegex),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(isRegex),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCardCreation,
  validateCardId,
};
