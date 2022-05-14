const Joi = require("joi");

//validations
const id = Joi.number().integer()
const emotion = Joi.string().min(1)

//rules
//create emotion
const createEmotionSchema = Joi.object({
  emotion: emotion.required(),
})

//update emotion
const updateEmotionSchema = Joi.object({
  emotion: emotion.required(),
})

//get emotion
const getEmotionSchema = Joi.object({
  emotionId: id.required()
})

module.exports = { createEmotionSchema, updateEmotionSchema, getEmotionSchema }