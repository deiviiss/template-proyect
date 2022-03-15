const Joi = require("joi");

//validations
const id = Joi.number().integer()
const thought = Joi.string()

//rules
//create user
const createThoughtSchema = Joi.object({
  thought: thought.required(),
})

//update user
const updateThoughtSchema = Joi.object({
  thought: thought.required(),
})

//get user
const getThoughtSchema = Joi.object({
  thoughtId: id.required()
})

module.exports = { createThoughtSchema, updateThoughtSchema, getThoughtSchema }