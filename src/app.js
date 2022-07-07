const express = require('express');
const routerApi = require('./routes/index');
const app = express()
const port = process.env.PORT || 4000
const cors = require("cors");
const morgan = require("morgan")

//errors
const { logErrors, ormErrorHandler, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

//middlewares
app.use(express.json())
app.use(morgan('dev')); //message server

// const corsOptions = { origin: "http://frontend.com" };

app.use(cors());

//errors
app.use(logErrors) //any errors
app.use(ormErrorHandler) //orm errors
app.use(errorHandler) // send error to client
app.use(boomErrorHandler) //boom errors

//auth LocalStrategy
require('./utils/auth')

//routes
routerApi(app)

//server on
app.listen(port, () => {
  console.log('Server online');
})