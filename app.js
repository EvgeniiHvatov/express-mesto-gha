const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/router');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignUp, validateSignIn } = require('./middlewares/validators');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '64c930767e860899bafc68f4',
//   };

//   next();
// });

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);
app.use(auth);
app.use(router);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка по умолчанию.' : message,
  });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт: ${PORT}`);
});
