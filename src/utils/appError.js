class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 404 starts with 4
    this.isOperational = true; // errors that we created
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
