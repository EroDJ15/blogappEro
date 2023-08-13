const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();
const userRoutes = require('./routes/user.routes'); // Importamos las rutas de usuarios
const authRoutes = require('./routes/auth.routes.js'); // Importamos las rutas de autenticación

// Habilitamos CORS para permitir solicitudes desde otros dominios
app.use(cors());

// Configuramos el middleware de logging para mostrar los registros en la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Habilitamos el uso de JSON en las solicitudes
app.use(express.json());

// Establecemos las rutas de usuarios en /api/v1/users
app.use('/api/v1/users', userRoutes);

// Establecemos las rutas de autenticación en /api/v1/auth
app.use('/api/v1/auth', authRoutes);

// Ruta de inicio que muestra un mensaje de bienvenida
app.get('/', (req, res) => {
  res.send('Welcome to our server!');
});

// Middleware para manejar rutas no encontradas
app.all('*', (req, res, next) => {
  //return res.status(404).json({
  //status: 'error',
  //message: `Can't find ${req.originalUrl} on this server!`,
  // });
  //const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //err.statusCode = 404;
  //next(err);

  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// Middleware para manejar errores
app.use(globalErrorHandler);

module.exports = app;
