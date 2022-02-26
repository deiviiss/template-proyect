
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { array } = require('joi')

//models - conection to bd
const { models } = require('./../libs/sequelize')

class UserService {

  constructor() { }

  //service methods

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10)

    const newUser = await models.User.create({
      ...body, //clona el objeto data
      password: hash //cambia la propiedad password
    })

    delete newUser.dataValues.password //elimina la propiedad (dataValues es propio de sequelize)

    return newUser
  }

  async find() {

    const data = await models.User.findAll(
      {
        // include: ['customer']
      }
    )

    for (let i = 0; i < data.length; i++) {
      delete data[i].dataValues.password
      delete data[i].dataValues.recoveryToken
    }

    return data
  }

  async findOne(userId) {

    const user = await models.User.findByPk(userId)

    if (!user) {
      throw boom.notFound('User not found, sorry')
    }

    //convierte el objeto user en un array para poder usar delete
    // const arrUser = Object.values(user)
    //elimina propiedad password
    // for (let i = 0; i < arrUser.length; i++) {
    //   delete arrUser[i].password
    // }

    // return arrUser
    return user
  }

  async update(userId, changes) {
    const user = await this.findOne(userId)

    if (changes.password) {
      const hash = await bcrypt.hash(changes.password, 10)
      changes.password = hash
    }

    const rta = await user.update(changes)

    return rta
  }

  async delete(userId) {
    const user = await this.findOne(userId)
    await user.destroy()

    return { userId }
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });

    return rta;
  }
}

module.exports = UserService