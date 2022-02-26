const Joi = require("joi");

//validations
const id = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().min(5)
const status = Joi.string()

//rules
//create user
const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  // role: role.required(),
  // status: status.required()
})

//update user
const updateUserSchema = Joi.object({
  email: email,
  role: role,
  password: password,
  status: status
})

//get user
const getUserSchema = Joi.object({
  userId: id.required()
})

//recovery password
const recoveryUserPassword = Joi.object({
  email: email.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, recoveryUserPassword }