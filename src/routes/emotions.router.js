const { Router } = require('express')
const router = Router()

const passport = require('passport')

//service
const EmotionService = require('./../services/emotion.service')
const service = new EmotionService

//handler
const validatorHandler = require('./../middlewares/validator.handler')
//schemas validations
const { createEmotionSchema, updateEmotionSchema, getEmotionSchema } = require('./../schemas/emotion.schema')
//roles
const { checkRoles } = require('../middlewares/auth.handler')

// get emotions
router.get('/',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  async (req, res, next) => {
    try {
      const emotions = await service.find()

      res.status(200).json(emotions)
    } catch (error) {
      next(error)
    }
  })

//create emotion
router.post('/',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(createEmotionSchema, 'body'),

  async (req, res, next) => {
    try {
      const body = req.body
      const newEmotion = await service.create(body)

      res.status(201).json(newEmotion)
    } catch (error) {
      next(error)
    }
  }
)

//get emotion by id
router.get('/:emotionId',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(getEmotionSchema, 'params'),

  async (req, res, next) => {
    try {
      const { emotionId } = req.params

      const emotion = await service.findOne(emotionId)

      res.status(200).json([emotion])
    } catch (error) {
      next(error)
    }
  }
)

//edit emotion by id
router.patch('/:emotionId',

  passport.authenticate('jwt', { session: false }),

  checkRoles('admin'),

  validatorHandler(getEmotionSchema, 'params'),

  validatorHandler(updateEmotionSchema, 'body'),

  async (req, res, next) => {
    try {
      const { emotionId } = req.params
      const body = req.body

      const emotionUpdate = await service.update(emotionId, body)

      res.status(202).json(emotionUpdate)
    } catch (error) {
      next(error)
    }
  }
)

//delete emotion by id
router.delete('/:emotionId',

  passport.authenticate('jwt', { session: false }),

  validatorHandler(getEmotionSchema, 'params'),

  checkRoles('admin'),

  async (req, res, next) => {
    try {
      const { emotionId } = req.params

      const emotionDelete = await service.delete(emotionId)

      res.status(202).json(emotionDelete)

    } catch (error) {
      next(error)
    }
  }
)

module.exports = router