const { Router } = require('express')
const router = Router()

const passport = require('passport')

//service
const ThoughtService = require('../services/thought.service')
const service = new ThoughtService

//handler
const validatorHandler = require('../middlewares/validator.handler')
//schemas validations
const { createThoughtSchema, updateThoughtSchema, getThoughtSchema } = require('../schemas/thought.schema')
//roles
const { checkRoles } = require('../middlewares/auth.handler')

// get thoughts
router.get('/',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  async (req, res, next) => {
    try {

      const thoughts = await service.find()

      res.status(200).json(thoughts)
    } catch (error) {
      next(error)
    }
  })

//create thought
router.post('/',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(createThoughtSchema, 'body'),

  async (req, res, next) => {
    try {

      const data = {
        ...req.body,
        userId: req.user.sub
      }

      const newThought = await service.create(data)

      res.status(201).json(newThought)
    } catch (error) {
      next(error)
    }
  }
)

//get thought by id
router.get('/:thoughtId',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(getThoughtSchema, 'params'),

  async (req, res, next) => {
    try {
      const { thoughtId } = req.params

      const thought = await service.findOne(thoughtId)

      res.status(200).json([thought])
    } catch (error) {
      next(error)
    }
  }
)
//edit thought by id
router.patch('/:thoughtId',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(getThoughtSchema, 'params'),

  validatorHandler(updateThoughtSchema, 'body'),

  async (req, res, next) => {
    try {
      const { thoughtId } = req.params
      const body = req.body

      const thoughtUpdate = await service.update(thoughtId, body)

      res.status(202).json(thoughtUpdate)
    } catch (error) {
      next(error)
    }
  }
)

//delete thought by id
router.delete('/:thoughtId',

  passport.authenticate('jwt', { session: false }),

  validatorHandler(getThoughtSchema, 'params'),

  checkRoles('admin'),

  async (req, res, next) => {
    try {
      const { thoughtId } = req.params

      const thoughtDelete = await service.delete(thoughtId)

      res.status(202).json(thoughtDelete)

    } catch (error) {
      next(error)
    }
  }
)

module.exports = router