const { Router } = require('express')
const router = Router()

const passport = require('passport')

//service
const UserService = require('./../services/user.service')
const service = new UserService

//handler
const validatorHandler = require('./../middlewares/validator.handler')
//schemas validations
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema')
//roles
const { checkRoles } = require('../middlewares/auth.handler')

// get users
router.get('/',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  async (req, res) => {
    try {
      const users = await service.find()

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  })

//create user
router.post('/',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(createUserSchema, 'body'),

  async (req, res) => {
    try {
      const body = req.body
      const newUser = await service.create(body)

      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }
)

//get user by id
router.get('/:userId',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(getUserSchema, 'params'),

  async (req, res, next) => {
    try {
      const { userId } = req.params

      const user = await service.findOne(userId)

      res.status(200).json([user])
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:userId',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(getUserSchema, 'params'),

  validatorHandler(updateUserSchema, 'body'),

  async (req, res, next) => {
    try {
      const { userId } = req.params
      const body = req.body

      const userUpdate = await service.update(userId, body)

      res.status(202).json(userUpdate)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:userId',

  passport.authenticate('jwt', { session: false }),

  validatorHandler(getUserSchema, 'params'),

  checkRoles('admin'),

  async (req, res, next) => {
    try {
      const { userId } = req.params

      const userDelete = await service.delete(userId)

      res.status(202).json(userDelete)

    } catch (error) {
      next(error)
    }
  }
)

module.exports = router