const { ValidationError } = require('sequelize')

//captura cualquier error
function logErrors(err, req, res, next) {
  console.error(err);
  next(err)
}

//crea un formato para devolver al cliente, detiene el código
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

// error boom
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

//error orm
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}

module.exports = { logErrors, errorHandler, ormErrorHandler, boomErrorHandler }