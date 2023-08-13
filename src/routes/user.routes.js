const express = require('express');

// Controladores
const userController = require('./../controllers/user.controllers');

// Middlewares
const userMiddlewares = require('./../middlewares/user.middlewares');
const validationMiddlewares = require('./../middlewares/validation.middlewares');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', userController.findAllUsers);

// Ruta para obtener, actualizar y eliminar un usuario específico por su ID
router
  .use('/:id', userMiddlewares.validUser) // Middleware para validar el usuario
  .route('/:id')
  .get(userController.findOneUser) // Obtener un usuario por su ID
  .patch(validationMiddlewares.updateValidation, userController.updateUser) // Actualizar un usuario por su ID
  .delete(userController.deleteUser); // Eliminar un usuario por su ID

module.exports = router;
