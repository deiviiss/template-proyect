const Joi = require("joi");

//validations
const id = Joi.number().integer()
const emotionId = Joi.number().integer()
const thought = Joi.string()
const createAt = Joi.date()

//rules
//create thought
const createThoughtSchema = Joi.object({
  thought: thought.required(),
  emotionId: emotionId.required(),
  createAt: createAt
})

//update thought
const updateThoughtSchema = Joi.object({
  thought: thought,
  emotionId: emotionId,
  createAt: createAt
})

//get thought
const getThoughtSchema = Joi.object({
  thoughtId: id.required()
})

module.exports = { createThoughtSchema, updateThoughtSchema, getThoughtSchema }