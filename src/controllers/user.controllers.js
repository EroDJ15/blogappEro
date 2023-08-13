const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync.js');

//muestra todos los usuarios
exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    users,
  });
});

//muestra un usuario
exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

//actualiza un usuario
exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, description } = req.body;

  await user.update({ name, description });

  res.status(200).json({
    status: 'success',
    message: 'User updated',
  });
});

//borra un usuario (desactiva)
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: 'unavailable' });

  res.status(200).json({
    status: 'success',
    message: 'User deleted',
  });
});
