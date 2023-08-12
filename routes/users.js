const userRouter = require('express').Router();

const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validators');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUserId, getUserById);
// router.post('/signup', validateSignUp, createUser);
// router.post('/signin', validateSignIn, login);

userRouter.patch('/me', validateUpdateProfile, updateProfile);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRouter;
