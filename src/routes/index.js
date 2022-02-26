const { Router } = require('express')
//routes
const usersRouter = require('./users.router')
const authRouter = require('./auth.router')

function routerApi(app) {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/users', usersRouter)
  router.use('/auth', authRouter)
}

module.exports = routerApi