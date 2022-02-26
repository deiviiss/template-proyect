const express = require('express');
const routerApi = require('./routes/index');
const app = express()
const port = process.env.PORT || 3000

//errors
const { logErrors, ormErrorHandler, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

//middlewares
app.use(express.json())

//errors
app.use(logErrors)
app.use(ormErrorHandler) //orm errors
app.use(boomErrorHandler) //boom errors
app.use(errorHandler) //any errors

//auth LocalStrategy
require('./utils/auth')

//routes
routerApi(app)

//server on
app.listen(port, () => {
  console.log('Server on');
})