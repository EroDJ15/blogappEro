const { body, validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  else
    return res.status(400).json({
      status: 'error',
      message: 'Validation errors',
      errors: errors.array(),
    });
};

exports.updateValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  exports.validate,
];

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('email')
    .notEmpty()
    .withMessage('email es required')
    .isEmail()
    .withMessage('email is not valid'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long')
    .matches(/[a-zA-Z]/)
    .withMessage('password must contain a number and letters'),
  exports.validate,
];

exports.loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('email es required')
    .isEmail()
    .withMessage('email is not valid'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long')
    .matches(/[a-zA-Z]/)
    .withMessage('password must contain a number and letters'),
  exports.validate,
];

exports.updatePasswordValidation = [
  body('currentPassword')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long')
    .matches(/[a-zA-Z]/)
    .withMessage('password must contain a number and letters'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 chars long')
    .matches(/[a-zA-Z]/)
    .withMessage('password must contain a number and letters'),
  exports.validate,
];
