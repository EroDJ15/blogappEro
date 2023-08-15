const catchAsync = require('../utils/catchAsync.js'); // Importar la función de utilidad catchAsync
const User = require('./../models/user.model.js'); // Importar el modelo de usuario
const bcrypt = require('bcryptjs'); // Importar la biblioteca bcryptjs para el hash de contraseñas
const generateJWT = require('./../utils/jwt.js');

exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password, description } = req.body; // Obtener los datos del cuerpo de la solicitud

  const salt = await bcrypt.genSalt(12); // Generar una sal para el hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, salt); // Generar la contraseña con hash

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
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

exports.signIn = async (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};
