const User = require('../models/user.model.js');

exports.validUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id ${id} not found`,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user',
      error: error.message,
    });
  }
};
