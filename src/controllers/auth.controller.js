const catchAsync = require('../utils/catchAsync.js');
const User = require('./../models/user.model.js');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt.js');
const AppError = require('../utils/appError.js');

exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password, description } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    description,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'user created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
    },
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(`user with email:${email} not found`, 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect password or email', 401));
  }

  const token = await generateJWT(user.id);
  delete user.password;

  res.status(200).json({
    status: 'success',
    message: 'user logged',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // get current user from the request object and check for authorization header
  const { user } = req;

  const { currentPassword, newPassword } = req.body;

  if (currentPassword === newPassword) {
    return next(new AppError('new password must be different', 400));
  }

  // check if the current password is correct
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('incorrect password', 401));
  }

  // hash the new password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // update the user password
  await user.update({
    password: hashedPassword,
    passwordChangeAt: new Date(),
  });

  // delete the password from the user object
  return res.status(200).json({
    status: 'success',
    message: 'password updated',
  });
});
