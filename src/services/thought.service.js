
const boom = require('@hapi/boom')
// const bcrypt = require('bcrypt')

//models - conection to bd
const { models } = require('./../libs/sequelize')

class ThoughtService {

  constructor() { }

  //service methods

  //create thought
  async create(data) {
    // const newThought = await models.Thought.create({
    //   ...body, //clona el objeto data
    // })
    const newThought = await models.Thought.create(data)

    return newThought
  }

  //get all thoughts
  async find() {

    const data = await models.Thought.findAll(
      {
        include: ['user', 'emotion']
      }
    )

    for (let i = 0; i < data.length; i++) {
      delete data[i].dataValues.user.dataValues.password
      delete data[i].dataValues.user.dataValues.recoveryToken
    }

    return data
  }

  //get thought by Id
  async findOne(thoughtId) {

    const thought = await models.Thought.findByPk(thoughtId)

    if (!thought) {
      throw boom.notFound('Thought not found, sorry')
    }

    return thought
  }

  //update thought
  async update(thoughtId, changes) {
    const thought = await this.findOne(thoughtId)

    await thought.update(changes)

    return { message: 'Update success' }
  }

  //delete thought
  async delete(thoughtId) {
    const thought = await this.findOne(thoughtId)
    await thought.destroy()

    return { thoughtId }
  }
}

module.exports = ThoughtService