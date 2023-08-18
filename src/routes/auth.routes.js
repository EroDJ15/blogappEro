const express = require('express');
const authController = require('../controllers/auth.controller');

const validationmiddlewares = require('../middlewares/validation.middlewares');
const userMiddlewares = require('./../middlewares/user.middlewares.js');

const router = express.Router();

router.post(
  '/signup',
  validationmiddlewares.createUserValidation,
  authController.signUp
);

router.post(
  '/signin',
  validationmiddlewares.loginValidation,
  authController.signIn
);

router.patch(
  '/password/:id',
  validationmiddlewares.updatePasswordValidation,
  userMiddlewares.validUser,
  authController.updatePassword
);

module.exports = router;
