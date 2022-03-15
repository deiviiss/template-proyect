
const boom = require('@hapi/boom')
// const bcrypt = require('bcrypt')

//models - conection to bd
const { models } = require('./../libs/sequelize')

class ThoughtService {

  constructor() { }

  //service methods

  //create Thought
  async create(data) {
    // const newThought = await models.Thought.create({
    //   ...body, //clona el objeto data
    // })

    console.log(data);
    const newThought = await models.Thought.create(data)

    return newThought
  }

  //get all Thoughts
  async find() {

    const data = await models.Thought.findAll(
      {
        include: ['user']
      }
    )


    // for (let i = 0; i < data.length; i++) {
    //   delete data[i].dataValues.password
    // }

    for (let i = 0; i < data.length; i++) {
      delete data[i].dataValues.user.dataValues.password
      delete data[i].dataValues.user.dataValues.recoveryToken
    }

    return data
  }

  async findOne(thoughtId) {

    const thought = await models.Thought.findByPk(thoughtId)

    if (!thought) {
      throw boom.notFound('Thought not found, sorry')
    }

    return thought
  }

  async update(thoughtId, changes) {
    const thought = await this.findOne(thoughtId)

    await thought.update(changes)

    return { message: 'Update success' }
  }

  async delete(thoughtId) {
    const thought = await this.findOne(thoughtId)
    await thought.destroy()

    return { thoughtId }
  }
}

module.exports = ThoughtService