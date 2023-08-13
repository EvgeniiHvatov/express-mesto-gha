const userRoutes = require('express').Router();
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validators');

userRoutes.get('/', getAllUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:userId', validateUserId, getUserById);
userRoutes.patch('/me', validateUpdateProfile, updateProfile);
userRoutes.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRoutes;
