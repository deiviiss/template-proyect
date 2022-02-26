const { Router } = require('express')
const router = Router()

const AuthService = require('../services/auth.service')
const service = new AuthService()

const passport = require('passport')

//handler
const validatorHandler = require('./../middlewares/validator.handler')
//schemas validations
const { recoveryUserPassword } = require('./../schemas/user.schema')


// login
router.post('/login',

  passport.authenticate('local', { session: false }), //load user

  async (req, res, next) => {

    try {
      const user = req.user

      const rta = await service.singToken(user)

      res.json(rta)

    } catch (error) {

      next(error)
    }
  }
)

//recovery
router.post('/recovery',

  //no se requiere validar el email
  // validatorHandler(recoveryUserPassword, 'email'),

  async (req, res, next) => {
    try {
      const { email } = req.body

      const rta = await service.sendRecovery(email)

      res.json(rta)
    } catch (error) {
      next(error)
    }
  }
)

//change password
router.post('/change-password',
  //!data validation layer
  //!schema in joi that validates token as alphanumeric and new password with a minimum and a maximum field require
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body

      const rta = await service.changePassword(token, newPassword)

      //compare with router of maester
      res.json(rta)

    } catch (error) {
      next(error)
    }
  }
)

module.exports = router