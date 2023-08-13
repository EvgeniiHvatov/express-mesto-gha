const router = require('express').Router();

const routesCards = require('./cards');
const routesUsers = require('./users');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', routesUsers);
router.use('/cards', routesCards);
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
