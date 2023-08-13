const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

const validateUrl = (url) => {
  if (isUrl(url)) return url;
  throw new BadRequestError('Невалидный URL');
};

const idValidation = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) return id;
  throw new BadRequestError('Невалидный id');
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

const validateSignIn = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

const validateUserId = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .custom(idValidation),
    }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      about: Joi.string()
        .min(2)
        .max(30)
        .required(),
    }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .custom(validateUrl),
    }),
});

const validateCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom(idValidation),
    }),
});

const validateCardCreation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      link: Joi.string()
        .required()
        .custom(validateUrl),
    }),
});

module.exports = {
  validateUserId,
  validateSignUp,
  validateSignIn,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCardCreation,
  validateCardId,
};
