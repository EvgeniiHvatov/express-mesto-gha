const cardRouters = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCardCreation,
  validateCardId,
} = require('../middlewares/validators');

cardRouters.get('/', getAllCards);
cardRouters.post('/', validateCardCreation, createCard);
cardRouters.delete('/:cardId', validateCardId, deleteCardById);
cardRouters.put('/:cardId/likes', validateCardId, likeCard);
cardRouters.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouters;
