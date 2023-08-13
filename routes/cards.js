const cardRoutes = require('express').Router();

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

cardRoutes.get('/', getAllCards);
cardRoutes.post('/', validateCardCreation, createCard);
cardRoutes.delete('/:cardId', validateCardId, deleteCardById);
cardRoutes.put('/:cardId/likes', validateCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRoutes;
